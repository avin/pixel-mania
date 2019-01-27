import React from 'react';
import { connect } from 'react-redux';
import cn from 'clsx';
import imageProcessor from '../../common/imageProcessor';
import styles from './styles.module.scss';

export class Main extends React.Component {
    state = {
        imageSrc: null,
    };

    handleUpdateImage = () => {
        this.setState({
            imageSrc: imageProcessor.imageSrc,
        });
    };

    handleImageProcessed = () => {
        if (imageProcessor.processedImageData) {
            this.processedImageCanvas.width = imageProcessor.width;
            this.processedImageCanvas.height = imageProcessor.height;
            const ctx = this.processedImageCanvas.getContext('2d');

            ctx.putImageData(imageProcessor.processedImageData, 0, 0);
        } else {
            this.processedImageCanvas.width = 0;
            this.processedImageCanvas.height = 0;
        }
    };

    componentDidMount() {
        imageProcessor.addEventListener('updateImage', this.handleUpdateImage);
        imageProcessor.addEventListener('imageProcessed', this.handleImageProcessed);
    }

    componentWillUnmount() {
        imageProcessor.removeEventListener('updateImage', this.handleUpdateImage);
        imageProcessor.removeEventListener('imageProcessed', this.handleImageProcessed);
    }

    render() {
        const { className } = this.props;
        const { imageSrc } = this.state;

        return (
            <div className={cn(className, styles.root)}>
                <div className={styles.layersContainer}>
                    <div className={styles.originalLayer}>
                        {imageSrc ? (
                            <img src={imageSrc} alt="" className={styles.image} />
                        ) : (
                            <div className={styles.noImage}>No image selected!</div>
                        )}
                    </div>
                    <div className={styles.processedLayer}>
                        <canvas
                            className={styles.processedImage}
                            ref={i => {
                                this.processedImageCanvas = i;
                            }}
                        />
                    </div>
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
