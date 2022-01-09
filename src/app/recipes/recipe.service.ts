import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject } from "rxjs/internal/Subject";
import { Ingredient } from "../shared/model/ingredient.model";
import * as SLAction from "../shopping-list/store/shopping-list.action";
import * as fromApp from '../store/app.reducer';

import { Recipe } from "./recipe.model";

@Injectable()

export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();
    
    private recipes: Recipe[] = [];

    constructor(private store : Store<fromApp.AppState>){}
    setRecipes(recipes : Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next([...this.recipes]);
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(id:number) {
        return this.recipes[id];
    }

    addIngredientToShoppingList(ingredients: Ingredient[]) {
       this.store.dispatch(new SLAction.AddIngredients([...ingredients]));
    }

    addRecipe(recipe: Recipe) {
      this.recipes.push(recipe);
      this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
      this.recipes[index] = newRecipe;
      this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}