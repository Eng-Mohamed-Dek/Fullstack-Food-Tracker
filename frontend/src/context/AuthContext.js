import { createContext, useEffect, useReducer } from 'react';

export const AuthContext = createContext()

const reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN' :
            return { user: action.payload }
        case 'LOGOUT' :
            return { user: null }
        default:
            return state;
    }
}

// Provider component that will provide the data state to its children
export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, { user: null });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
    
        if (user) {
          dispatch({ type: 'LOGIN', payload: user }) 
        }
      }, [])

    console.log('AuthContext state:', state);

    return (
        <AuthContext.Provider value={{...state, dispatch}}>
             {children}
        </AuthContext.Provider>
    )
}