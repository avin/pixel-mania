import React from 'react';
import DatGui, { DatBoolean, DatNumber, DatSelect } from 'react-dat-gui';

export default class ContourOptions extends React.Component {
    handleChangeOptions = options => {
        const { onChangeOptions } = this.props;

        onChangeOptions(options);
    };

    render() {
        const { options } = this.props;

        return (
            <div>
                <DatGui data={options} onUpdate={this.handleChangeOptions}>
                    <DatNumber key="distance" path="distance" min={1} max={150} step={1} label="Color distance" />
                    <DatBoolean key="invert" path="invert" label="Invert" />
                    <DatBoolean key="transparent" path="transparent" label="Transparent back" />
                    <DatNumber key="step" path="step" min={1} max={20} step={1} label="Step" />
                    <DatSelect
                        key="fillMode"
                        path="fillMode"
                        label="Fill mode"
                        options={['square-fill', 'square-empty', 'rain', 'cross']}
                    />
                </DatGui>
            </div>
        );
    }
}
