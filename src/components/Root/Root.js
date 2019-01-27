import React from 'react';
import { Provider } from 'react-redux';
import styles from './styles.module.scss';
import Settings from '../Settings/Settings';
import Logo from '../Logo/Logo';
import { Header } from '../Header/Header';
import Main from '../Main/Main';
import GitHubLink from '../GitHubLink/GitHubLink';

export default class Root extends React.Component {
    render() {
        const { store } = this.props;

        return (
            <Provider store={store}>
                <div className={styles.root}>
                    <div className={styles.sidebar}>
                        <Logo className={styles.logo} />
                        <Settings className={styles.settings} />
                        <GitHubLink />
                    </div>
                    <div className={styles.content}>
                        <Header className={styles.header} />
                        <Main className={styles.main} />
                    </div>
                </div>
            </Provider>
        );
    }
}
