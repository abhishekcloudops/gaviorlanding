import sharp from 'sharp';
async function run() {
  const { info, data } = await sharp('public/brand/g-cutout.png').trim().toBuffer({ resolveWithObject: true });
  console.log("Trimmed G dimensions:", info.width, info.height);
  
  // Create a 512x512 canvas and fit the G inside it with some padding
  await sharp(data)
    .resize(400, 400, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({
      top: 56, bottom: 56, left: 56, right: 56,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .toFile('src/app/icon.png');
    
  console.log("Saved src/app/icon.png");
}
run();
