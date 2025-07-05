import { createContext, ReactNode } from 'react';

export const LayoutContext = createContext({});

interface LayoutProviderProps {
    children: ReactNode;
}

export const LayoutProvider = ({ children }: LayoutProviderProps) => {
    return <LayoutContext.Provider value={{}}>{children}</LayoutContext.Provider>;
};
