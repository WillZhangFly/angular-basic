import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/model/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('shoppingForm') shoppingForm: NgForm;
  subscription: Subscription;
  editMode:boolean = false;
  editedItemIndex:number;
  editedItem: Ingredient;
  
  constructor(private slService: ShoppingListService) { }

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
    this.slService.addIngredient(newIngredient);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
