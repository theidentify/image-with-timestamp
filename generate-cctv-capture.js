const Jimp = require('jimp') ;
const moment = require('moment');

async function textOverlay(srcImage, destImage, text='') {
   // Reading image
   const image = await Jimp.read(`./images/${srcImage}`);
   // Defining the text font
   const font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
   image.print(font, 380, 470, text);
   // Writing image after processing
   await image.writeAsync(`./out/${destImage}`);
}

for (let i = 0; i < 24; i++ ) {
  const stationCode = 'simulator';
  const serial = '000000';
  const time = moment().startOf('D').add(i, 'h')
  const timestamp = time.format('YYYYMMDDHHmmSSSSSS');
  const text = time.format('HH:mm:ss');
  const event = 'TIMING';
  const filename = `${stationCode}_${serial}_${timestamp}_${event}`;
  textOverlay('raw-image.png', `${filename}.png`, text);
}
console.log("Image is processed succesfully");