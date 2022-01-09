import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/model/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import * as SLAction from "../store/shopping-list.action";
import * as fromShoppingList from '../store/shopping-list.reducer';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('shoppingForm',{static: false}) shoppingForm: NgForm;
  subscription: Subscription;
  editMode:boolean = false;
  editedItemIndex:number;
  editedItem: Ingredient;
  
  constructor(private slService: ShoppingListService , private store : Store<fromShoppingList.AppState>) { }

  ngOnInit(): void {
    this.subscription = this.slService.startedEditing.subscribe(
      (index:number) => {
         this.editMode = true;
         this.editedItemIndex = index;
         this.editedItem = this.slService.getIngredient(index);
         const {name , amount} = this.editedItem;
         this.shoppingForm.setValue({
           name,
           amount
         });
      }
    );
  }

  addToShoppingList(form: NgForm) {
    const {name , amount} = form.value;
    const newIngredient = new Ingredient(name, amount);
    if(this.editMode){
      this.store.dispatch(new SLAction.UpdateIngredient({index: this.editedItemIndex, ingredient:newIngredient })); 
    }else{
      this.store.dispatch(new SLAction.AddIngredient(newIngredient)); 
    }
    this.editMode = false;
    form.reset();
  }

  onDelete() {
    this.store.dispatch(new SLAction.DeleteIngredient(this.editedItemIndex)); 
    this.onClear();
  }

  onClear() {
    this.shoppingForm.reset();
    this.editMode = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
