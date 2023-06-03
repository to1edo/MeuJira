import { FC, useReducer,useEffect } from 'react';
import { UIContext, uiReducer } from './';

export interface UIState {
    sidemenuOpen: boolean;
    isDragging:boolean;
}


const UI_INITIAL_STATE: UIState = {
    sidemenuOpen: false,
    isDragging: false
}


export const UIProvider:FC = ({ children }) => {

    const [state, dispatch] = useReducer( uiReducer, UI_INITIAL_STATE );


    const openSideMenu = () => dispatch({ type: 'UI - Open Sidebar' })

    const closeSideMenu = () => dispatch({ type: 'UI - Close Sidebar' })

    const changeIsDragging = () => dispatch({ type: 'UI - Change isDragging' })

    return (
        <UIContext.Provider value={{
            ...state,

            // Methods
            closeSideMenu,
            openSideMenu,
            changeIsDragging
        }}>
            { children }
        </UIContext.Provider>
    )
};