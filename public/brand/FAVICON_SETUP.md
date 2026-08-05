# Gavior Favicon Setup Guide

This guide explains the favicon system and how to generate/update favicon files.

## Current Favicon

The Gavior favicon features a modern blue "G" logo with:
- **Color**: Electric Blue (#0066ff) background
- **Style**: Geometric, modern design
- **Shape**: Rounded square with white letter G
- **Design file**: `gavicon.svg`

## Files Structure

```
public/brand/
├── gavicon.svg              # Source SVG (edit this)
├── gavicon.png              # PNG version (512x512)
├── favicon.ico              # Windows/browser tab icon
└── apple-touch-icon.png     # iOS home screen icon
```

## How It's Used

The favicon is configured in `src/app/layout.tsx`:

```typescript
icons: {
  icon: [{ url: "/brand/gavicon.png", type: "image/png", sizes: "512x512" }],
  shortcut: "/brand/gavicon.png",
  apple: "/brand/gavicon.png",
}
```

This serves the PNG favicon for all platforms.

## Generating Favicon Files

### Option 1: Automatic Script (Recommended)

```bash
# From project root
bash scripts/generate-favicon.sh

# This automatically:
# 1. Converts SVG to PNG (512x512)
# 2. Generates favicon.ico
# 3. Creates apple-touch-icon.png
# 4. Places all files in public/brand/
```

**Requirements**:
- ImageMagick: `brew install imagemagick` (macOS) or `apt install imagemagick` (Linux)
- Or Inkscape: `brew install inkscape` (macOS)

### Option 2: Online Converter

If you don't have ImageMagick/Inkscape installed:

#### Step 1: Convert SVG to PNG
1. Visit: https://convertio.co/svg-png/
2. Upload: `public/brand/gavicon.svg`
3. Convert to PNG with 512x512 resolution
4. Download and save as: `public/brand/gavicon.png`

#### Step 2: Convert PNG to ICO
1. Visit: https://convertio.co/png-ico/
2. Upload: `gavicon.png` (from previous step)
3. Set favicon size (48x48 or 64x64 recommended)
4. Download and save as: `public/brand/favicon.ico`

#### Step 3: Copy Apple Touch Icon
```bash
# Create iOS home screen icon (same as PNG)
cp public/brand/gavicon.png public/brand/apple-touch-icon.png
```

### Option 3: Using ImageMagick Directly

```bash
# PNG from SVG
convert -background none \
  -density 72 \
  -units PixelsPerInch \
  public/brand/gavicon.svg \
  -quality 95 \
  public/brand/gavicon.png

# Favicon.ico
convert public/brand/gavicon.png \
  -resize 64x64 \
  public/brand/favicon.ico

# Apple touch icon
cp public/brand/gavicon.png public/brand/apple-touch-icon.png
```

## Customizing the Favicon

### Edit the SVG

The source file is `public/brand/gavicon.svg`. You can:

1. **Edit in any text editor**:
   - Change colors (look for `#0066ff`)
   - Modify strokes and fills
   - Adjust paths

2. **Edit in design tools**:
   - Figma (import SVG)
   - Adobe XD
   - Inkscape (free, open-source)
   - VS Code (with SVG extensions)

### Common Customizations

#### Change Background Color

Find this line:
```xml
<rect width="512" height="512" fill="#0066ff" rx="96"/>
```

Change `#0066ff` to your color:
```xml
<rect width="512" height="512" fill="#FF6B00" rx="96"/>  <!-- Orange -->
```

#### Change Letter G Color

Find this line:
```xml
<line x1="150" y1="120" x2="150" y2="390" stroke="white" stroke-width="28" stroke-linecap="round"/>
```

Change `white` to your color:
```xml
<line x1="150" y1="120" x2="150" y2="390" stroke="#FFD700" stroke-width="28" stroke-linecap="round"/>  <!-- Gold -->
```

#### Change Corners Roundness

Find this in the background rect:
```xml
<rect width="512" height="512" fill="url(#gGradient)" rx="96"/>
```

Adjust `rx="96"` (0-256):
- `rx="0"` - Square corners
- `rx="128"` - Circle
- `rx="64"` - Medium rounded

## Browser Compatibility

The favicon system supports:

| Platform | File | Size | Format |
|----------|------|------|--------|
| Browser Tabs | favicon.ico | 16x16-256x256 | ICO |
| Apple iOS | apple-touch-icon.png | 180x180 | PNG |
| Android | gavicon.png | 512x512 | PNG |
| Windows Tiles | mstile-150x150.png | 150x150 | PNG (optional) |

## Testing

### View in Browser

1. **Hard refresh** to clear cache:
   - Chrome/Edge: `Ctrl+Shift+R` or `Cmd+Shift+R`
   - Firefox: `Ctrl+F5` or `Cmd+Shift+R`
   - Safari: `Cmd+Option+R`

2. **Check browser tab** - favicon should appear

3. **Clear browser cache** if icon doesn't update:
   - Settings → Clear browsing data
   - Select "Images and files"
   - Click Clear

### Test on iOS

1. Open Safari
2. Navigate to https://gavior.in
3. Tap Share button
4. Tap "Add to Home Screen"
5. Confirm icon appears on home screen

### Test on Android

1. Open Chrome
2. Navigate to https://gavior.in
3. Tap menu (three dots)
4. Tap "Add to Home screen"
5. Confirm icon appears on home screen

## Favicon Formats Explained

### ICO (favicon.ico)
- **Purpose**: Browser tabs, bookmarks, address bar
- **Formats**: Windows icon format
- **Best sizes**: 16x16, 32x32, 48x48, 64x64, 256x256

### PNG (gavicon.png)
- **Purpose**: Web browsers, Android, general use
- **Format**: Portable Network Graphics
- **Size**: 512x512 for high DPI
- **Advantage**: Supports transparency, better quality

### Apple Touch Icon
- **Purpose**: iOS home screen icon
- **Filename**: apple-touch-icon.png
- **Size**: 180x180 recommended
- **Advantage**: Works offline on home screen

## Deployment

### Local Development

```bash
# No special steps needed
# Next.js automatically serves from public/
npm run dev

# Visit http://localhost:3000
# Should see favicon in browser tab
```

### Production Deployment

```bash
# 1. Generate favicon files
bash scripts/generate-favicon.sh

# 2. Commit to git
git add public/brand/gavicon.* public/brand/favicon.*
git commit -m "feat: update Gavior favicon"

# 3. Push to main (triggers deployment)
git push origin main

# 4. GitHub Actions automatically deploys
# 5. Deployed to production server
# 6. Next.js serves static files from public/
```

## Favicon Caching

Favicons are cached aggressively. If you update the favicon:

1. **Browser cache**:
   - Hard refresh: `Cmd+Shift+R` or `Ctrl+Shift+R`
   - Clear cookies: Settings → Clear browsing data

2. **CDN/Server cache**:
   - Add version query param (automatic in Next.js)
   - Can take up to 24 hours for full propagation

3. **Force refresh**:
   ```html
   <!-- Add to layout.tsx if needed -->
   <link rel="icon" href="/favicon.ico?v=1" />
   ```

## Advanced: Multiple Favicon Sizes

For optimal display on all devices, Next.js can serve multiple favicon formats:

```typescript
// src/app/layout.tsx
icons: {
  icon: [
    { url: "/brand/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    { url: "/brand/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    { url: "/brand/favicon-192x192.png", sizes: "192x192", type: "image/png" },
    { url: "/brand/gavicon.png", sizes: "512x512", type: "image/png" },
  ],
  shortcut: "/brand/favicon.ico",
  apple: "/brand/apple-touch-icon.png",
}
```

To generate these sizes:

```bash
convert public/brand/gavicon.png -resize 16x16 public/brand/favicon-16x16.png
convert public/brand/gavicon.png -resize 32x32 public/brand/favicon-32x32.png
convert public/brand/gavicon.png -resize 192x192 public/brand/favicon-192x192.png
```

## Troubleshooting

### Favicon Not Showing

**Solution 1**: Hard refresh browser
```bash
# Windows/Linux
Ctrl+Shift+R

# macOS
Cmd+Shift+R
```

**Solution 2**: Clear cache and cookies
- Settings → Clear browsing data → Select all → Clear

**Solution 3**: Check file exists
```bash
ls -la public/brand/gavicon.png
```

**Solution 4**: Check metadata in layout.tsx
```typescript
// Should have correct paths
icons: {
  icon: [{ url: "/brand/gavicon.png", ... }],
}
```

### Wrong Icon Size on Mobile

**Solution**: Ensure apple-touch-icon.png exists
```bash
ls -la public/brand/apple-touch-icon.png
```

If not, copy:
```bash
cp public/brand/gavicon.png public/brand/apple-touch-icon.png
```

### Icon Looks Blurry

**Solution**: Check source is 512x512 PNG
```bash
file public/brand/gavicon.png
# Should show: "512 x 512" resolution
```

If not, regenerate using `scripts/generate-favicon.sh`

## SEO Best Practices

Favicons improve:
- **Visual recognition**: Users identify your site in tabs
- **Trust**: Professional appearance
- **Mobile**: Home screen icons
- **Bookmarks**: Visual distinction

## Related Files

- [src/app/layout.tsx](../../src/app/layout.tsx) - Favicon configuration
- [public/brand/](../../public/brand/) - Brand assets directory
- [scripts/generate-favicon.sh](../../scripts/generate-favicon.sh) - Generation script

## Quick Reference

```bash
# Generate all favicon files
bash scripts/generate-favicon.sh

# View favicon file
file public/brand/gavicon.png

# Test favicon locally
npm run dev
# Visit http://localhost:3000
# Look for icon in browser tab

# Deploy to production
git add public/brand/
git commit -m "feat: update favicon"
git push origin main
```

---

**Version**: 1.0  
**Last Updated**: 2024-01-15  
**Favicon Color**: #0066ff (Electric Blue)  
**Logo**: Letter G in geometric style
