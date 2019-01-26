import React from 'react';
import { connect } from 'react-redux';
import DatGui, { DatBoolean, DatColor, DatNumber, DatString } from 'react-dat-gui';

export class Settings extends React.Component {
    state = {
        data: {
            package: 'react-dat-gui',
            power: 9000,
            isAwesome: true,
            feelsLike: '#2FA1D6',
        },
    };

    handleUpdate = data => this.setState({ data });

    render() {
        const { data } = this.state;
        const { className } = this.props;

        return (
            <div className={className}>
                <DatGui data={data} onUpdate={this.handleUpdate}>
                    <DatString path="package" label="Package" />
                    <DatNumber path="power" label="Power" min={9000} max={9999} step={1} />
                    <DatBoolean path="isAwesome" label="Awesome?" />
                    {data.isAwesome && <DatColor path="feelsLike" label="Feels Like" />}
                </DatGui>
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
