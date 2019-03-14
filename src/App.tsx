import React, { Component, useState } from "react";
import JssProvider from 'react-jss/lib/JssProvider';
import { create } from 'jss';
import { createGenerateClassName, jssPreset } from '@material-ui/core/styles';
import { MuiThemeProvider } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import Drawer from "./Drawer";
import Tester from './ComponentTester';
import { Button, Chip, Checkbox, TextField } from '@material-ui/core';

const generateClassName = createGenerateClassName();
const jss = create({
  ...jssPreset(),
  // We define a custom insertion point that JSS will look for injecting the styles in the DOM.
  insertionPoint: 'jss-insertion-point',
});
const theme1 = {
    palette: {
        primary: { main: '#1097a8', dark: '#00486b', light: '#14bfd5' },
        secondary: { main: '#a05fa5' },
        error: { main: '#ff0000' },
    }
}
const theme = createMuiTheme(theme1);
// console.log(theme, Tester)
function App() {
    
    // const [theme, setTheme] = useState(createMuiTheme(theme1));

    return (
        <JssProvider jss={jss} generateClassName={generateClassName}>
        <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
            <Drawer>
                <Tester
                    options={{
                        variant: ['outlined', 'contained', undefined],
                        color: ['primary', 'secondary', 'default'],
                        disabled: [true, false],
                    }}
                    Component={Button}
                >
                    Button
                </Tester>
                <Tester
                    options={{
                        variant: ['outlined', 'default'],
                        color: ['primary', 'secondary', 'default'],
                        disabled: [true, false],
                        onDelete: [() => true, undefined],
                        label: ['Chip'],
                        clickable: [true, false]
                    }}
                    Component={Chip}
                >
                </Tester>
                <Tester
                    options={{
                        color: ['primary', 'secondary', 'default'],
                        disabled: [true, false],
                        indeterminate: [true, false],
                        checked: [true, false]
                    }}
                    Component={Checkbox}
                >
                </Tester>
                <Tester
                    options={{
                        variant: ['standard', 'outlined', 'filled'],
                        helperText: ['helper text', undefined],
                        disabled: [false, true],
                        required: [true, false],
                        label: ['label'],
                        placeholder: ['placeholder', undefined],
                    }}
                    Component={TextField}
                >
                </Tester>
            </Drawer>
        </ThemeProvider>
        </MuiThemeProvider>
        </JssProvider>
    );
}

export default App;
