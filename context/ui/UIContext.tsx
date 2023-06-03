import { createContext } from 'react';


interface ContextProps {
    sidemenuOpen: boolean;
    isDragging: boolean;

    // Methods
    closeSideMenu: () => void;
    openSideMenu: () => void;
    changeIsDragging: ()=>void;
}


export const UIContext = createContext({} as ContextProps );

