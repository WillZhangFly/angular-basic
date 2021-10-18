import { Component, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../shared/model/ingredient.model';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {


  ingredients: Ingredient[] = [
    new Ingredient('Apple' , 5),
    new Ingredient('Eggplant' , 7)
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onShoppingItemSelected(event) {
    const {name, amount} = event;
    this.ingredients.push(new Ingredient(name, amount));
  }

}
