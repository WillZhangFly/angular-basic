import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/model/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";

import { Recipe } from "./recipe.model";

@Injectable()

export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[]= [
        new Recipe("Tasty Schnitzel","Test Description for one",
        "https://images.immediate.co.uk/production/volatile/sites/30/2021/08/Sausage-and-mushroom-ragu-203c7d4.jpg?quality=90&resize=960,872",
        [
            new Ingredient('Meat',1),
            new Ingredient('French Fries', 20)
        ]),
        new Recipe("Big Fat Burger","Test Description",
        "https://images.immediate.co.uk/production/volatile/sites/30/2021/08/Sausage-and-mushroom-ragu-203c7d4.jpg?quality=90&resize=960,872",
        [
            new Ingredient('Buns',2),
            new Ingredient('Meat', 20)
        ])
    ];

    constructor(private slService: ShoppingListService){}

    getRecipes() {
        return this.recipes.slice();
    }

    addIngredientToShoppingList(ingredients: Ingredient[]) {
       this.slService.addIngredients(ingredients);
    }

}