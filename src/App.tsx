import React from "react";
import JssProvider from "react-jss/lib/JssProvider";
import { create } from "jss";
import { createGenerateClassName, jssPreset } from "@material-ui/core/styles";
import ThemeCreator from "./ThemeCreator";
import Drawer from "./Drawer";
import Tester from "./ComponentTester";
import { Button, Chip, Checkbox, TextField, Theme } from "@material-ui/core";
import ThemePicker from './ThemePicker';
import { makeStyles } from "@material-ui/styles";
import classNames from 'classnames';
const queryString = require('query-string');

const generateClassName = createGenerateClassName();
const jss = create({
    ...jssPreset(),
    insertionPoint: "jss-insertion-point"
});

const useStyles = makeStyles({
    grid: {
        display: 'grid',
        gridTemplateRows: 'repeat(3, 100px)',
        gridTemplateColumns: 'repeat(6, 100px)',
        gridAutoFlow: 'column dense',
    },
    gridItemLarge: {
        gridColumn: 'span 2',
        gridRow: 'span 2'
    },
    hide: {
        display: 'none',
    }
})

const filterOptions = (options: any, query: { [key: string]: any }) => {
    console.log(options, query)
    const filtered: any = {...options};
    for (const key of Object.keys(options)) {
        if (query[key]) {
            const opts = (Array.isArray(query[key]) ? query[key] : [query[key]]).map(String)
            filtered[key] = options[key].filter((opt: any) => opts.includes(String(opt)));
        } else {
            filtered[key] = options[key];
        }
    }
    console.log(filtered)
    return filtered;
}
function App() {

    const classes = useStyles();
    console.log(window.location.search)

    const query = queryString.parse(window.location.search || '?', {arrayFormat: 'comma'});

    const isCompFiltered = Boolean(query.component);
    const filteredComps = Array.isArray(query.component) ? query.component : [query.component];
    console.log(query, filteredComps)
    return (
        <JssProvider jss={jss} generateClassName={generateClassName}>
            <ThemeCreator>
                <Drawer>
                    <div className={classNames(classes.grid)}>
                        <ThemePicker
                            type='primary'
                            level='main'
                            className={classNames(classes.gridItemLarge)}
                        />
                        <ThemePicker
                            type='primary'
                            level='light'
                        />
                        <ThemePicker
                            type='primary'
                            level='dark'
                        />
                        <ThemePicker
                            type='secondary'
                            level='main'
                            className={classNames(classes.gridItemLarge)}
                        />
                        <ThemePicker
                            type='secondary'
                            level='light'
                        />
                        <ThemePicker
                            type='secondary'
                            level='dark'
                        />
                        <ThemePicker
                            type='error'
                            level='main'
                            className={classNames(classes.gridItemLarge)}
                        />
                        <ThemePicker
                            type='error'
                            level='light'
                        />
                        <ThemePicker
                            type='error'
                            level='dark'
                        />
                    </div>
                        <Tester
                            options={filterOptions({
                                variant: ["outlined", "contained", undefined],
                                color: ["primary", "secondary", "default"],
                                disabled: [true, false]
                            }, query)}
                            Component={Button}
                            className={classNames({
                                [classes.hide]: isCompFiltered && !filteredComps.includes('button')
                            })}
                        >
                            Button
                        </Tester>
                    )} />
                    <Tester
                        options={filterOptions({
                            variant: ["outlined", "default"],
                            color: ["primary", "secondary", "default"],
                            disabled: [true, false],
                            onDelete: [() => true, undefined],
                            label: ["Chip"],
                            clickable: [true, false]
                        }, query)}
                        Component={Chip}
                        className={classNames({
                            [classes.hide]: isCompFiltered && !filteredComps.includes('chip')
                        })}
                    />
                    <Tester
                        options={filterOptions({
                            color: ["primary", "secondary", "default"],
                            disabled: [true, false],
                            indeterminate: [true, false],
                            checked: [true, false]
                        }, query)}
                        Component={Checkbox}
                        className={classNames({
                            [classes.hide]: isCompFiltered && !filteredComps.includes('checkbox')
                        })}
                    />
                    <Tester
                        options={filterOptions({
                            variant: ["standard", "outlined", "filled"],
                            helperText: ["helper text", undefined],
                            disabled: [false, true],
                            required: [true, false],
                            label: ["label"],
                            placeholder: ["placeholder", undefined]
                        }, query)}
                        Component={TextField}
                        className={classNames({
                            [classes.hide]: isCompFiltered && !filteredComps.includes('textfield')
                        })}
                    />
                </Drawer>
            </ThemeCreator>
        </JssProvider>
    );
}

export default App;
