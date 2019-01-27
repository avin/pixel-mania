import pixelizator from './pixelizator';

class ImageProcessor extends EventTarget {
    width = 0;
    height = 0;

    image = null;
    imageSrc = null;
    imageData = null;

    processedImageData = null;

    filter = null;
    filterOptions = {};

    setImage(imageSrc) {
        return new Promise((resolve, reject) => {
            this.imageSrc = imageSrc;

            this.image = new Image();
            this.image.src = this.imageSrc;

            this.image.onload = () => {
                this.height = this.image.height;
                this.width = this.image.width;

                const canvas = document.createElement('canvas');
                canvas.width = this.width;
                canvas.height = this.height;

                const context = canvas.getContext('2d');
                context.drawImage(this.image, 0, 0);
                this.imageData = context.getImageData(0, 0, this.width, this.height);

                this.processImage();

                this.dispatchEvent(new Event('updateImage'));
            };
        });
    }

    setFilter(filter, options) {
        this.filter = filter;
        this.filterOptions = options;

        this.processImage();
    }

    processImage() {
        if (!this.image) {
            return;
        }
        switch (this.filter) {
            case 'Pixelizator': {
                const { colors, pixelSize, accurateColors } = this.filterOptions;
                this.processedImageData = pixelizator({ imageData: this.imageData, colors, pixelSize, accurateColors });
                break;
            }
            case 'None': {
                this.processedImageData = null;
                break;
            }
            default:
                return;
        }

        this.dispatchEvent(new Event('imageProcessed'));
    }
}

const imageProcessor = new ImageProcessor();
export default imageProcessor;
