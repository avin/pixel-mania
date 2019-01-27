import React from 'react';
import DatGui, { DatColor, DatNumber, DatSelect, DatBoolean } from 'react-dat-gui';
import chroma from 'chroma-js';
import ColorsPallet from '../ColorsPallet/ColorsPallet';

export default class PixelizatorOptions extends React.Component {
    handleChangeOptions = options => {
        const { onChangeOptions } = this.props;

        options.colors = chroma
            .scale([options.fromColor, options.toColor])
            .mode(options.colorScaleMode)
            .colors(options.totalColors);

        onChangeOptions(options);
    };

    render() {
        const { options } = this.props;

        return (
            <div>
                <DatGui data={options} onUpdate={this.handleChangeOptions}>
                    <DatNumber key="pixelSize" path="pixelSize" min={1} max={100} step={1} label="Pixel size" />
                    <DatBoolean key="accurateColors" path="accurateColors" label="Accurate colors" />
                    <DatColor key="fromColor" path="fromColor" label="Color from" />
                    <DatColor key="toColor" path="toColor" label="Color to" />
                    <DatSelect
                        key="colorScaleMode"
                        path="colorScaleMode"
                        label="Color scale mode"
                        options={['hsl', 'hsv', 'lab', 'lch']}
                    />
                    <DatNumber key="totalColors" path="totalColors" label="Total colors" min={2} max={32} step={1} />
                </DatGui>
                <ColorsPallet colors={options.colors} />
            </div>
        );
    }
}
