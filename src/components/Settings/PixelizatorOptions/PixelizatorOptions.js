import React from 'react';
import DatGui, { DatColor, DatNumber, DatSelect, DatBoolean } from 'react-dat-gui';
import chroma from 'chroma-js';
import * as d3 from 'd3-scale-chromatic';
import ColorsPallet from '../ColorsPallet/ColorsPallet';
import { battery24pallet, nesPallet, pico8pallet } from '../../../utils/pallets';

export default class PixelizatorOptions extends React.Component {
    handleChangeOptions = options => {
        const { onChangeOptions } = this.props;

        switch (options.palletMode) {
            case 'colorScale': {
                options.colors = chroma
                    .scale([options.fromColor, options.toColor])
                    .mode(options.colorScaleMode)
                    .colors(options.totalColors);
                break;
            }
            case 'fullColor': {
                switch (options.palletScheme) {
                    case 'schemeCategory10':
                    case 'schemeAccent':
                    case 'schemeDark2':
                    case 'schemePaired':
                    case 'schemePastel1':
                    case 'schemePastel2':
                    case 'schemeSet1':
                    case 'schemeSet2':
                    case 'schemeSet3': {
                        options.colors = d3[options.palletScheme];
                        break;
                    }
                    case 'blackWhite': {
                        options.colors = ['#FFF', '#000'];
                        break;
                    }
                    case 'pico8': {
                        options.colors = pico8pallet;
                        break;
                    }
                    case 'battery24': {
                        options.colors = battery24pallet;
                        break;
                    }
                    case 'nes': {
                        options.colors = nesPallet;
                        break;
                    }
                    default:
                }
                break;
            }
            default:
        }

        onChangeOptions(options);
    };

    renderColorSettings() {
        const { options } = this.props;

        switch (options.palletMode) {
            case 'colorScale': {
                return (
                    <DatGui data={options} onUpdate={this.handleChangeOptions}>
                        <DatColor key="fromColor" path="fromColor" label="Color from" />
                        <DatColor key="toColor" path="toColor" label="Color to" />
                        <DatSelect
                            key="colorScaleMode"
                            path="colorScaleMode"
                            label="Color scale mode"
                            options={['hsl', 'hsv', 'lab', 'lch']}
                        />
                        <DatNumber
                            key="totalColors"
                            path="totalColors"
                            label="Total colors"
                            min={2}
                            max={32}
                            step={1}
                        />
                    </DatGui>
                );
            }
            case 'fullColor': {
                return (
                    <DatGui data={options} onUpdate={this.handleChangeOptions}>
                        <DatSelect
                            key="palletScheme"
                            path="palletScheme"
                            label="Pallet scheme"
                            options={[
                                'blackWhite',
                                'pico8',
                                'battery24',
                                'nes',
                                'schemeCategory10',
                                'schemeAccent',
                                'schemeDark2',
                                'schemePaired',
                                'schemePastel1',
                                'schemePastel2',
                                'schemeSet1',
                                'schemeSet2',
                                'schemeSet3',
                            ]}
                        />
                    </DatGui>
                );
            }
            default:
        }
    }

    render() {
        const { options } = this.props;

        return (
            <div>
                <DatGui data={options} onUpdate={this.handleChangeOptions}>
                    <DatNumber key="pixelSize" path="pixelSize" min={1} max={20} step={1} label="Pixel size" />
                    <DatBoolean key="accurateColors" path="accurateColors" label="Accurate colors" />
                    <DatSelect
                        key="palletMode"
                        path="palletMode"
                        label="Pallet mode"
                        options={['colorScale', 'fullColor']}
                    />
                </DatGui>
                {this.renderColorSettings()}
                <ColorsPallet colors={options.colors} />
            </div>
        );
    }
}
