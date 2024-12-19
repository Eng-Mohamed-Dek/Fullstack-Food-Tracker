import { createContext, useReducer } from 'react';


// Define a Context object to hold the data state
export const FoodContext = createContext()

const reducer = (state, action) => {
    // Define the reducer logic here
    switch (action.type) {
        // type 1 
        case 'GET_FOODS':
            return { foods: action.payload }
        // type 2 
        case 'CREATE_FOOD':
            return {
                foods: [action.payload, ...state.foods],
            }
        // type 3
        case 'DELETE_FOOD': 
            return {
                foods: state.foods.filter(food => !food.id !== action.payload._id)
            }
        default:
            return state;
    }
}


// Provider component that will provide the data state to its children
export const FoodContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, { foods: null });

    return (
        <FoodContext.Provider value={{...state, dispatch}}>
             {children}
        </FoodContext.Provider>
    )
}