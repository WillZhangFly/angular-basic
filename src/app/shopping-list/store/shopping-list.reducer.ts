import { Ingredient } from 'src/app/shared/model/ingredient.model';
import * as ShoppingListActions from './shopping-list.action';

const initialState = {
    ingredients: [
        new Ingredient('Apple' , 5),
        new Ingredient('Eggplant' , 7)
    ]
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.AddIngredient){
    switch(action.type){
        case  ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients:[
                    ...state.ingredients,
                    action.payload
                ]
            };
        default:
            return state;
    }
}