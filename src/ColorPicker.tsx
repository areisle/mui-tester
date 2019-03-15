import React, { useState, useRef } from 'react';
import { SketchPicker, ColorResult, RGBColor } from 'react-color';
import { Popover } from '@material-ui/core';
import { Color } from 'csstype';

/**
 * component that shows a swatch and a pop up color picker when clicked
 */
const ColorPicker: React.SFC<{ onChange: (color: RGBColor ) => void,color: Color, label?: string }> = ({ onChange, color, label = '' }) => {

    const anchor = useRef(null);
    // const [color, setColor] = useState<RGBColor>({ r: 0, g: 0, b: 0, a: 0.5 });
    const [displayPicker, setDisplayPicker] = useState(false);

    const handleClick = () => {
        setDisplayPicker(!displayPicker)
    };

    const handleClose = () => {
        setDisplayPicker(false)
    };

    const handleChange = (nextColor: ColorResult) => {
        // setColor(nextColor.rgb);
        onChange(nextColor.rgb);
    };

    const styles: any = {
        color: {
            width: '100%',
            height: '100%',
            borderRadius: 2,
            background: color,
        },
        label: {
            position: 'absolute',
            display: 'flex',
            top: 0,
            left: 0,
            fontSize: '0.75em',
            color: 'white',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: 5,
        },
        swatch: {
            padding: 5,
            width: '100%',
            height: '100%',
            position: 'relative',
            background: '#fff',
            borderRadius: 1,
            boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
            display: 'inline-block',
            cursor: 'pointer',
        },
        popover: {
            position: 'absolute',
            zIndex: '2',
        },
        cover: {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
        },
    };

    return (
        <div style={{ width: '100%', height: '100%'}}>
            <div style={styles.swatch} onClick={handleClick} ref={anchor}>
                <div style={styles.color} />
                <span style={styles.label}>{label}</span>
            </div>
            
            <Popover
                anchorEl={anchor.current}
                open={displayPicker}
                onClose={handleClose}
            >
                <SketchPicker color={color} onChange={handleChange} />
            </Popover>
        </div>
    )
}

export default ColorPicker;