import React, { useState, useReducer } from "react";
import { MuiThemeProvider, Theme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { RGBColor } from "react-color";
import ColorPicker from './ColorPicker';


export const ThemeUpdater = React.createContext({
    update: (type: string, level: string, color: string) => {},
});

enum ACTION_TYPES {
    UPDATE_COLOR = 'theme/UPDATE_COLOR',
}

const theme1 = {
    palette: {
        primary: { main: '#008799', dark: '#015d69' },
        secondary: { main: '#a05fa5' },
        // error: { main: '#ff0000' },
    }
}
const theme = createMuiTheme(theme1);
console.log(theme)

const themeReducer = (state: Theme, action: { type: string, payload: { type: string, level: string, color: string } }) => {
    switch (action.type) {
        case ACTION_TYPES.UPDATE_COLOR:
            const { color, level, type } = action.payload;
            return {
                ...state,
                palette: {
                    ...state.palette,
                    [type]: {
                        // @ts-ignore
                        ...state.palette[type],
                        [level]: color,
                    }
                }
            };
        default:
            return state;
    }
}

const ThemeCreator: React.SFC = ({ children }) => {

    const [theme, dispatch] = useReducer(themeReducer, createMuiTheme(theme1));

    const update = (type: string, level: string, color: string) => {
        console.log('update vars', type, level, color);
        dispatch({ 
            type: ACTION_TYPES.UPDATE_COLOR,
            payload: { type, level, color }
        })
    }

    return (
            <ThemeUpdater.Provider value={{
                update,
            }}>
            <MuiThemeProvider theme={theme}>
                <ThemeProvider theme={theme}>
                    {children}
                </ThemeProvider>
            </MuiThemeProvider>
            </ThemeUpdater.Provider>
    );
}

export default ThemeCreator;
