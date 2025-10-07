const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');
const stats = document.getElementById('stats');

const image = new Image();
image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAeAAAAKACAYAAABEyKtSAAAAAXNSR0IArs4c6QAAAARzQklUCAgI='                                                                          AABJRU5ErkJggg==';

image.onload = () => {
    if (ctx) {
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0);
        if (stats) {
            stats.innerText = `Resolution: ${image.width}x${image.height}`;
        }
    }
};
