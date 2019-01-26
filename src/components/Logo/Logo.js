import React from 'react';
import cn from 'clsx';
import styles from './styles.module.scss';
import Icon from './Icon/Icon';

export default class Logo extends React.Component {
    render() {
        const { className } = this.props;

        return (
            <div className={cn(className, styles.root)}>
                <Icon className={styles.icon} />
                <div className={styles.title}>Pixel Mania</div>
            </div>
        );
    }
}
