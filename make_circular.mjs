import sharp from 'sharp';

async function run() {
  const size = 512;
  const padding = 120; // Padding inside the circle
  const innerSize = size - padding;
  
  // 1. Create a pure white circle
  const circleSvg = Buffer.from(
    `<svg width="${size}" height="${size}">
      <circle cx="${size/2}" cy="${size/2}" r="${size/2}" fill="#ffffff" />
    </svg>`
  );

  // 2. Read the G cutout (which has transparent background)
  const gBuffer = await sharp('public/brand/g-cutout.png')
    .trim()
    .resize(innerSize, innerSize, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .toBuffer();

  // 3. Composite the G onto the white circle
  await sharp(circleSvg)
    .composite([{ input: gBuffer }])
    .png()
    .toFile('src/app/icon.png');
    
  console.log("Saved circular G favicon to src/app/icon.png");
}
run();
