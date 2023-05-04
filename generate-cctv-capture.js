const Jimp = require('jimp');
const moment = require('moment');

const TiME_STAMP_POSITON_COORD = {
  x: 16,
  y: 16,
};

async function textOverlay(srcImage, destImage, text = '') {
  // Reading image
  const image = await Jimp.read(`./images/${srcImage}`);
  // Defining the text font
  const font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);
  image.print(
    font,
    TiME_STAMP_POSITON_COORD.x,
    TiME_STAMP_POSITON_COORD.y,
    text
  );
  // Writing image after processing
  await image.writeAsync(`./out/${destImage}`);
}

for (let i = 0; i < 24; i++) {
  const streamId = '8e44da44-6605-4d66-8d3e-ca435cb74ce7';
  const time = moment().startOf('D').add(i, 'h');
  const timestamp = time.format('YYYYMMDDHHmmSSSSSS');
  const text = time.format('DD MMM YYYY HH:mm:ss');
  const event = 'API';
  const filename = `${streamId}_${timestamp}_${event}`;
  textOverlay('กลางวัน.png', `${filename}.png`, text);
}
console.log('Image is processed succesfully');
