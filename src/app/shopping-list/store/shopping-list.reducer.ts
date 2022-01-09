import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/model/ingredient.model';
import * as ShoppingListActions from './shopping-list.action';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [new Ingredient('Apple', 5), new Ingredient('Eggplant', 7)],
  editedIngredient: null,
  editedIngredientIndex: -1,
};

export function shoppingListReducer(
  state: State = initialState,
  action
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
        if (index === state.editedIngredientIndex) {
          return {
            ..._ingredient,
            ...action.payload,
          };
        }
        return _ingredient;
      });

      return {
        ...state,
        ingredients: [...updatedIngredients],
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((_ingredient, index) => {
          return index !== state.editedIngredientIndex;
        }),
      };
    case ShoppingListActions.START_EDIT:
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: { ...state.ingredients[action.payload] },
      };
    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredientIndex: -1,
        editedIngredient: null,
      };
    default:
      return state;
  }
}
