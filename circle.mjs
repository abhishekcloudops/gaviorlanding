import sharp from 'sharp';

async function run() {
  // Let's create a circular mask for the icon
  const size = 512;
  const circleSvg = Buffer.from(
    `<svg width="${size}" height="${size}">
      <circle cx="${size/2}" cy="${size/2}" r="${size/2}" />
    </svg>`
  );

  await sharp('public/brand/gavicon.png')
    .resize(size, size, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
    .composite([{ input: circleSvg, blend: 'dest-in' }])
    .toFile('src/app/icon.png');
    
  console.log("Saved circular src/app/icon.png");
}
run();
