import React from 'react';
import { connect } from 'react-redux';
import DatGui, { DatSelect } from 'react-dat-gui';
import chroma from 'chroma-js';
import imageProcessor from '../../common/imageProcessor';
import PixelizatorOptions from './PixelizatorOptions/PixelizatorOptions';

const defaultFilterOptions = {
    Pixelizator: {
        fromColor: '#fafa6e',
        toColor: '#2A4858',
        colorScaleMode: 'lch',
        totalColors: 6,
        pixelSize: 5,
        accurateColors: true,
        colors: [],
    },
    None: {},
};
defaultFilterOptions.Pixelizator.colors = chroma
    .scale([defaultFilterOptions.Pixelizator.fromColor, defaultFilterOptions.Pixelizator.toColor])
    .mode(defaultFilterOptions.Pixelizator.colorScaleMode)
    .colors(defaultFilterOptions.Pixelizator.totalColors);

export class Settings extends React.Component {
    state = {
        filter: 'None',
        filterOptions: {},
    };

    handleChangeFilterOptions = filterOptions => {
        this.setState({ filterOptions }, () => {
            const { filter, filterOptions } = this.state;
            imageProcessor.setFilter(filter, filterOptions);
        });
    };

    handleChangeFilter = ({ filter }) => {
        this.setState({ filter, filterOptions: defaultFilterOptions[filter] }, () => {
            const { filter, filterOptions } = this.state;
            imageProcessor.setFilter(filter, filterOptions);
        });
    };

    componentDidMount() {
        this.handleChangeFilter({ filter: 'Pixelizator' });
    }

    renderFilterOptions() {
        const { filter, filterOptions } = this.state;

        switch (filter) {
            case 'Pixelizator': {
                return <PixelizatorOptions options={filterOptions} onChangeOptions={this.handleChangeFilterOptions} />;
            }
            default:
        }

        return <div />;
    }

    render() {
        const { className } = this.props;

        return (
            <div className={className}>
                <DatGui data={this.state} onUpdate={this.handleChangeFilter}>
                    <DatSelect key="filter" path="filter" label="Filter" options={['None', 'Pixelizator']} />
                </DatGui>

                {this.renderFilterOptions()}
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {};
}

export default connect(
    mapStateToProps,
    {},
)(Settings);
