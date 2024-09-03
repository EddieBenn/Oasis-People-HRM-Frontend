import React, {createContext, useContext, useEffect, useState} from 'react';


export const ThemeContext = createContext('')

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if(!context){
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context

}

export const ThemeContextProvider = ({ children }) => {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        localStorage.setItem('theme', theme);
        // document.documentElement.style.setProperty('--background-color', theme === 'light' ? 'white' : '#181A2A')
    }, [theme]);

    const toggleThemes =  () => {
       return setTimeout(()=>{
            setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
        }, 300)
    }

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleThemes }}>
            {children}
        </ThemeContext.Provider>
    );
};
