function getImageWidthAndHeight(imageUrl) {
  return new Promise(resolve => {
    const IMG = new Image();

    IMG.src = imageUrl;
    IMG.onload = function() {

      const imageSize = {
        width: this.width,
        height: this.height
      }

      resolve(imageSize)
    }
  });
}

function convertToDueToneToMatrixString(color1, color2) {
  let value = [];
  value = value.concat(
    [color1[0] / 256 - color2[0] / 256, 0, 0, 0, color2[0] / 256]);

  value = value.concat(
    [color1[1] / 256 - color2[1] / 256, 0, 0, 0, color2[1] / 256]);

  value = value.concat(
    [color1[2] / 256 - color2[2] / 256, 0, 0, 0, color2[2] / 256]);

  value = value.concat([0, 0, 0, 1, 0]);

  return value.join(' ')
}

function makeDuoToneImage({ domNode, color1, color2, imageWidth, imageHeight, imageUrl }) {
  const toInsertPhotoTo = document.querySelector(domNode)
  const duoToneString = convertToDueToneToMatrixString(color1, color2)
  const rarararaaaandommmmm = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8);

  getImageWidthAndHeight(imageUrl)
    .then(imageSize => {
      const { width: widthFromImgNode, height: heightFromImgNode } = imageSize

      let width = imageWidth !== undefined ? imageWidth : widthFromImgNode;
      let height = imageHeight !== undefined ? imageHeight : heightFromImgNode;

      toInsertPhotoTo.innerHTML = `
        <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" id="duotone" preserveAspectRatio="xMidYMid slice">
          <defs>
            <filter id="${rarararaaaandommmmm}">
              <feColorMatrix type="matrix" values="${duoToneString}"/>
            </filter>
          </defs>
          <image filter="url(#${rarararaaaandommmmm})" width="${width}" height="${height}" xlink:href="${imageUrl}"/>
        </svg>
      `

      const slidingTagLiAfterStyle = document.createElement("style");
      slidingTagLiAfterStyle.innerHTML = `
        ${domNode} {
          overflow: hidden;
          line-height: 0;
        }

        ${domNode} svg {
          color-interpolation-filters: sRGB;
          width: 100%;
          height: 100%;
        }
      `

      document.head.appendChild(slidingTagLiAfterStyle)
    })
}

export default makeDuoToneImage
