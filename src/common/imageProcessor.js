class ImageProcessor extends EventTarget {
    setImage(imgContent) {
        this.imgContent = imgContent;
        this.dispatchEvent(new Event('updateImage'));
    }
}

const imageProcessor = new ImageProcessor();
export default imageProcessor;
