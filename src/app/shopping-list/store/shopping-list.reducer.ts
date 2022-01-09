import { Ingredient } from 'src/app/shared/model/ingredient.model';
import * as ShoppingListActions from './shopping-list.action';

const initialState = {
  ingredients: [new Ingredient('Apple', 5), new Ingredient('Eggplant', 7)],
};

export function shoppingListReducer(
  state = initialState,
  action: ShoppingListActions.actions
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, [...action.payload]],
      };
    case ShoppingListActions.UPDATE_INGREDIENT:
      const updatedIngredients = state.ingredients.map((_ingredient, index) => {
        if (index === action.payload.index) {
          return {
            ..._ingredient,
            ...action.payload.ingredient,
          };
        }
        return _ingredient;
      });

      return {
        ...state,
        ingredients: [...updatedIngredients],
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      return {
          ...state,
          ingredients: state.ingredients.filter((_ingredient, index) => {
              return index !== action.payload;
          })
      };
    default:
      return state;
  }
}
