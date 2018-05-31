# Create duotone images

> This is a first attempt, I really appriciate feedback!

> [Demo]: https://werk.noudadrichem.com/trainingen/duotone-image/

### Preview
![screen shot 2018-05-31 at 17 46 11](https://user-images.githubusercontent.com/16288476/40792791-15351b50-64fb-11e8-95a7-29677ea862f1.png)

### Install:

```bash
npm install duotone-image --save
```

### How to use
```javascript
import makeDuoToneImage from 'duotone-image'

makeDuoToneImage({
  domNode: '.image',
  imageUrl: 'https://images.unsplash.com/photo-1505881502353-a1986add3762',
  color1: [24, 192, 102],
  color2: [0, 0, 30]
})
```

### Options

| options (key) | type         | required  |
| ------------- |:-------------:| -----:|
| domNode       | String | yes |
| imageUrl       | String | yes |
| color1       | Array [rgb] | yes |
| color2       | Array [rgb] | yes |
