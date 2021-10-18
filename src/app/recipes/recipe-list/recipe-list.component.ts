import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() selectedChildRecipe: EventEmitter<Recipe> = new EventEmitter<Recipe>();

  recipes: Recipe[]= [new Recipe("Test Recipe One","Test Description for one","https://images.immediate.co.uk/production/volatile/sites/30/2021/08/Sausage-and-mushroom-ragu-203c7d4.jpg?quality=90&resize=960,872"),new Recipe("Test Recipe","Test Description","https://images.immediate.co.uk/production/volatile/sites/30/2021/08/Sausage-and-mushroom-ragu-203c7d4.jpg?quality=90&resize=960,872")];

  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe:Recipe) {

    this.selectedChildRecipe.emit(recipe);
  }

}
