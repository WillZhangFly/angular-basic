import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/model/ingredient.model";

export class ShoppingListService {
    ingredientsChanged = new EventEmitter<Ingredient[]>();
    private ingredients: Ingredient[] = [
        new Ingredient('Apple' , 5),
        new Ingredient('Eggplant' , 7)
    ];

    getIngredients() {
      return [...this.ingredients];
    }

    addIngredient(ingredient: Ingredient) {
      this.ingredients.push(ingredient);
      this.ingredientsChanged.emit([...this.ingredients]);
    }

    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.emit([...this.ingredients]);
    }
}