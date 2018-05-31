function getImageWidthAndHeight(imageUrl) {
    return new Promise(function (resolve) {
        var IMG = new Image();
        IMG.src = imageUrl;
        IMG.onload = function () {
            var imageSize = {
                width: this.width,
                height: this.height
            };
            resolve(imageSize);
        };
    });
}

function convertToDueToneToMatrixString(color1, color2) {
    var value = [];
    value = value.concat([color1[0] / 256 - color2[0] / 256,0,0,0,color2[0] / 256]);
    value = value.concat([color1[1] / 256 - color2[1] / 256,0,0,0,color2[1] / 256]);
    value = value.concat([color1[2] / 256 - color2[2] / 256,0,0,0,color2[2] / 256]);
    value = value.concat([0,0,0,1,0]);
    return value.join(' ');
}

function makeDuoToneImage(ref) {
    var domNode = ref.domNode;
    var color1 = ref.color1;
    var color2 = ref.color2;
    var imageWidth = ref.imageWidth;
    var imageHeight = ref.imageHeight;
    var imageUrl = ref.imageUrl;

    var toInsertPhotoTo = document.querySelector(domNode);
    var duoToneString = convertToDueToneToMatrixString(color1, color2);
    var rarararaaaandommmmm = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);
    getImageWidthAndHeight(imageUrl).then(function (imageSize) {
        var widthFromImgNode = imageSize.width;
        var heightFromImgNode = imageSize.height;
        var width = imageWidth !== undefined ? imageWidth : widthFromImgNode;
        var height = imageHeight !== undefined ? imageHeight : heightFromImgNode;
        toInsertPhotoTo.innerHTML = "\n        <svg width=\"" + width + "\" height=\"" + height + "\" viewBox=\"0 0 " + width + " " + height + "\" id=\"duotone\" preserveAspectRatio=\"xMidYMid slice\">\n          <defs>\n            <filter id=\"" + rarararaaaandommmmm + "\">\n              <feColorMatrix type=\"matrix\" values=\"" + duoToneString + "\"/>\n            </filter>\n          </defs>\n          <image filter=\"url(#" + rarararaaaandommmmm + ")\" xlink:href=\"" + imageUrl + "\"/>\n        </svg> \n      ";
        var slidingTagLiAfterStyle = document.createElement("style");
        slidingTagLiAfterStyle.innerHTML = "\n        " + domNode + " {\n          overflow: hidden;\n          line-height: 0;\n        }\n\n        " + domNode + " svg {\n          color-interpolation-filters: sRGB;\n          width: 100%;\n          height: 100%;\n        }\n\n        " + domNode + " svg image {\n          width: 100%;\n        }\n      ";
        document.head.appendChild(slidingTagLiAfterStyle);
    });
}

export default makeDuoToneImage;
//# sourceMappingURL=index.m.js.map
