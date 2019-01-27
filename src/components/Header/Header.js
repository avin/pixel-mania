import React from 'react';
import { connect } from 'react-redux';
import cn from 'clsx';
import repeat from '@avinlab/repeat';
import styles from './styles.module.scss';
import imageProcessor from '../../common/imageProcessor';
import WebCam from '../../common/webcam';

export class Header extends React.Component {
    handleClickOpenFile = () => {
        this.fileUploaderRef.click();
    };

    handleChangeFile = e => {
        const file = e.target.files[0];
        if (!file) {
            return;
        }
        const reader = new FileReader();
        reader.onload = function(e) {
            const content = e.target.result;
            imageProcessor.setImage(content);
        };
        reader.readAsDataURL(file);
    };

    componentDidMount() {
        this.repeatTakeCamImage = repeat({
            action: counter => {
                const camImageSrc = this.webCam.getSnapshot();
                imageProcessor.setImage(camImageSrc);
            },
            delay: 1,
        });

        this.webCam = new WebCam();
    }

    handleChangeCamAsSource = e => {
        const value = e.currentTarget.checked;
        if (value) {
            this.webCam.start();
            this.repeatTakeCamImage.start();
        } else {
            this.webCam.stop();
            this.repeatTakeCamImage.stop();
        }
    };

    componentWillUnmount() {
        this.repeatTakeCamImage.stop();
        this.webCam.stop();
    }

    render() {
        const { className } = this.props;
        return (
            <div className={cn(className, styles.root)}>
                <div>
                    <button onClick={this.handleClickOpenFile}>Open image file...</button>

                    <input
                        type="file"
                        onChange={this.handleChangeFile}
                        ref={i => {
                            this.fileUploaderRef = i;
                        }}
                        style={{ display: 'none' }}
                    />
                </div>

                <div>
                    <input type="checkbox" id="camAsSource" onChange={this.handleChangeCamAsSource} />
                    <label htmlFor="camAsSource">WebCam as image source</label>
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
)(Header);
