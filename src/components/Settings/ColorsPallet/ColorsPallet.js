import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

export default class ColorsPallet extends React.Component {
    static propTypes = {
        colors: PropTypes.arrayOf(PropTypes.string),
    };

    render() {
        const { colors } = this.props;

        return (
            <div className={styles.root}>
                {colors.map(color => (
                    <div key={color} className={styles.cell} style={{ backgroundColor: color }} />
                ))}
            </div>
        );
    }
}
