#!/bin/bash
# Generate favicon files from SVG source

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
BRAND_DIR="$PROJECT_DIR/public/brand"
SVG_SOURCE="$BRAND_DIR/gavicon.svg"

echo "🎨 Generating favicon files..."

# Check if SVG exists
if [ ! -f "$SVG_SOURCE" ]; then
  echo "❌ SVG file not found: $SVG_SOURCE"
  exit 1
fi

# Create brand directory if it doesn't exist
mkdir -p "$BRAND_DIR"

# Method 1: Using ImageMagick (if installed)
if command -v convert >/dev/null 2>&1; then
  echo "📦 Using ImageMagick to generate favicon formats..."

  # Generate PNG (512x512)
  convert -background none \
    -density 72 \
    -units PixelsPerInch \
    "$SVG_SOURCE" \
    -quality 95 \
    "$BRAND_DIR/gavicon.png"
  echo "✅ Generated: gavicon.png (512x512)"

  # Generate favicon.ico
  convert -background none \
    -density 72 \
    -units PixelsPerInch \
    "$SVG_SOURCE" \
    -resize 256x256 \
    -define icon:auto-resize="256,128,96,64,48,32,16" \
    "$BRAND_DIR/favicon.ico"
  echo "✅ Generated: favicon.ico"

  # Generate Apple touch icon
  convert -background '#0066ff' \
    -density 72 \
    -units PixelsPerInch \
    "$SVG_SOURCE" \
    -quality 95 \
    "$BRAND_DIR/apple-touch-icon.png"
  echo "✅ Generated: apple-touch-icon.png"

# Method 2: Using Inkscape (if ImageMagick not available)
elif command -v inkscape >/dev/null 2>&1; then
  echo "📦 Using Inkscape to generate favicon formats..."

  # Export PNG from SVG
  inkscape \
    --export-type="png" \
    --export-filename="$BRAND_DIR/gavicon.png" \
    "$SVG_SOURCE"
  echo "✅ Generated: gavicon.png (512x512)"

# Method 3: Manual instructions if no tools available
else
  echo "⚠️  ImageMagick or Inkscape not found."
  echo ""
  echo "Install one of these tools to generate favicons automatically:"
  echo ""
  echo "macOS (Homebrew):"
  echo "  brew install imagemagick"
  echo ""
  echo "Ubuntu/Debian:"
  echo "  sudo apt-get install imagemagick"
  echo ""
  echo "Or use an online converter:"
  echo "  1. Go to https://convertio.co/svg-png/"
  echo "  2. Upload public/brand/gavicon.svg"
  echo "  3. Convert to PNG (512x512)"
  echo "  4. Download and save to public/brand/gavicon.png"
  echo ""
  echo "  For favicon.ico:"
  echo "  1. Go to https://convertio.co/png-ico/"
  echo "  2. Upload the PNG from previous step"
  echo "  3. Download and save to public/brand/favicon.ico"
  echo ""
  exit 1
fi

echo ""
echo "✨ Favicon generation complete!"
echo ""
echo "Generated files:"
ls -lh "$BRAND_DIR"/gavicon.* "$BRAND_DIR"/favicon.* 2>/dev/null || echo "  (Check $BRAND_DIR for files)"
echo ""
echo "Next steps:"
echo "1. Commit the generated files:"
echo "   git add public/brand/favic*"
echo "   git commit -m 'feat: add Gavion site favicon'"
echo ""
echo "2. Deploy to production"
echo ""
