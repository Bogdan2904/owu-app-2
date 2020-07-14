import React, {useState} from 'react';
import {DarkThemeContext, isDarkTheme} from "../../context/DarkThemeContext";

export function DarkThemeContextWrapper(props) {

    let [isDarkThemeOn, setIsDarkThemeOn] = useState(isDarkTheme)

    const toggleTheme = () => {
        setIsDarkThemeOn(isDarkThemeOn = !isDarkThemeOn)
    };

    const {children} = props;
    return (
        <DarkThemeContext.Provider value={{
            isDarkTheme: isDarkThemeOn,
            toggleTheme
        }}>
            {children}
        </DarkThemeContext.Provider>
    );
}

export default DarkThemeContextWrapper;