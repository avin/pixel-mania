import React from 'react';
import { connect } from 'react-redux';
import cn from 'clsx';
import styles from './styles.module.scss';
import imageProcessor from '../../common/imageProcessor';

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

    render() {
        const { className } = this.props;
        return (
            <div className={cn(className, styles.root)}>
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
