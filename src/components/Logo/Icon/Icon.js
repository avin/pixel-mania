import React from 'react';
import cn from 'clsx';
import styles from './styles.module.scss';

export default class Icon extends React.Component {
    render() {
        const { className } = this.props;

        return (
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className={cn(className, styles.root)}>
                <rect width="32" height="32" fill="#137CBD" className="cell first" />
                <rect x="32" y="32" width="32" height="32" fill="#DB2C6F" className="cell second" />
            </svg>
        );
    }
}
