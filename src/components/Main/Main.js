import React from 'react';
import { connect } from 'react-redux';
import cn from 'clsx';
import imageProcessor from '../../common/imageProcessor';
import styles from './styles.module.scss';

export class Main extends React.Component {
    state = {
        imgContent: null,
    };

    componentDidMount() {
        imageProcessor.addEventListener('updateImage', e => {
            this.setState({
                imgContent: imageProcessor.imgContent,
            });
        });
    }

    render() {
        const { className } = this.props;
        const { imgContent } = this.state;

        return (
            <div className={cn(className, styles.root)}>
                <div className={styles.imageContainer}>
                    {imgContent ? (
                        <img src={imgContent} alt="" />
                    ) : (
                        <div className={styles.noImage}>No image selected!</div>
                    )}
                </div>
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
)(Main);
