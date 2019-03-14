import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";

const getCombos = (keys: string[], options: any[][]) => {
    if (keys.length === 1) {
        return options[0].map((opt) => ({ [keys[0]]: opt }))
    };
    const [key1, ...restKeys] = keys;
    const [opts, ...restOpts] = options;
    const combos: any[] = [];
    const otherCombos = getCombos(restKeys, restOpts);
    for (const opt of opts) {
        for (const combo of otherCombos) {
            combos.push({
                ...combo,
                [key1]: opt,
            })
        }
    }
    return combos;
}

function Options({ Component, options, children }: any) {

    const combos = getCombos(Object.keys(options), Object.values(options));

    const buttons = combos.map((combo, index) => (
        <div key={index} style={{
            padding: 15,
            display: 'inline-block'
        }}>
            <Component
                {...combo}
            >
                {children}
            </Component>
        </div>
    ))
    // const buttons = () => {
    //     const allButtons = [];
    //     for (const variant of propOpts.variant) {
    //         for (const color of propOpts.color) {
    //             for (const opt of propOpts.disabled) {
    //                 allButtons.push(
    //                     <div style={{
    //                         padding: 15,
    //                         display: 'inline-block'
    //                     }}>
    //                     <Button
    //                         // @ts-ignore
    //                         variant={variant}
    //                         // @ts-ignore
    //                         color={color}
    //                         disabled={opt}
    //                         key={`${variant}-${color}-${opt}`}
    //                     >
    //                         button
    //                     </Button>
    //                     </div>
    //                 );
    //             }
    //         }
    //     }
    //     return allButtons;
    // }

    return <div>{buttons}</div>
}

export default withStyles({}, { withTheme: true })(Options);