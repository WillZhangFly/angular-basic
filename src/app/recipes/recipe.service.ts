import { EventEmitter } from "@angular/core";

import { Recipe } from "./recipe.model";

export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[]= [
        new Recipe("Test Recipe One","Test Description for one","https://images.immediate.co.uk/production/volatile/sites/30/2021/08/Sausage-and-mushroom-ragu-203c7d4.jpg?quality=90&resize=960,872"),
        new Recipe("Test Recipe","Test Description","https://images.immediate.co.uk/production/volatile/sites/30/2021/08/Sausage-and-mushroom-ragu-203c7d4.jpg?quality=90&resize=960,872")
    ];

    getRecipes() {
        return this.recipes.slice();
    }

}