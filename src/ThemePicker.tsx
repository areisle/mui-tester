import React, { useState, useContext } from "react";
import { ThemeUpdater } from "./ThemeCreator";
import { useTheme } from "@material-ui/styles";
import ColorPicker from './ColorPicker';
import { Theme } from "@material-ui/core";
import { RGBColor } from "react-color";
import { Palette, PaletteColor } from "@material-ui/core/styles/createPalette";

const rgbaToString = ({ r, g, b, a}: RGBColor) => `rgba(${r}, ${g}, ${b}, ${a})`;

const ThemePicker: React.SFC<{
    type: keyof Palette, 
    level: keyof PaletteColor,
    className?: string,
}> = ({ type, level, className='' }) => {

    const themeModifier = useContext(ThemeUpdater);
    const theme: Theme = useTheme();
    // @ts-ignore
    const currentColor = theme.palette[type][level];
    
    return (
            <div className={className}>
                <ColorPicker
                    color={currentColor}
                    onChange={(color) => themeModifier.update(type, level, rgbaToString(color))}
                    label={`${type} ${level}: ${currentColor}`}
                />
            </div>
    );
}

export default ThemePicker;
