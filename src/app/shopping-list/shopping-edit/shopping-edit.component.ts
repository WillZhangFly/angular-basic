import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/model/ingredient.model';
import * as SLAction from "../store/shopping-list.action";
import * as fromApp from '../../store/app.reducer';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('shoppingForm',{static: false}) shoppingForm: NgForm;
  subscription: Subscription;
  editMode:boolean = false;
  editedItem: Ingredient;
  
  constructor(private store : Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('shoppingList').subscribe(stateData => {
      if(stateData.editedIngredientIndex > -1){
        this.editMode = true;
        this.editedItem = stateData.editedIngredient;
        this.shoppingForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }else{
        this.editMode = false;
      }
    })
  }

  addToShoppingList(form: NgForm) {
    const {name , amount} = form.value;
    const newIngredient = new Ingredient(name, amount);
    if(this.editMode){
      this.store.dispatch(new SLAction.UpdateIngredient(newIngredient )); 
    }else{
      this.store.dispatch(new SLAction.AddIngredient(newIngredient)); 
    }
    this.editMode = false;
    form.reset();
  }

  onDelete() {
    this.store.dispatch(new SLAction.DeleteIngredient()); 
    this.onClear();
  }

  onClear() {
    this.shoppingForm.reset();
    this.editMode = false;
    this.store.dispatch(new SLAction.StopEdit());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(new SLAction.StopEdit());
  }
}
