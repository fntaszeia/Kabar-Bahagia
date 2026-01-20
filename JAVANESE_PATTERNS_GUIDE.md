# Javanese Cultural Patterns Guide

## Overview

The wedding invitation now features authentic Javanese cultural patterns (batik motifs) as decorative backgrounds for each section. These patterns are subtle, elegant, and automatically match your wedding color theme.

## Implemented Patterns

### 1. **Invitation Section - Batik Floral Motif**
- **Pattern**: Traditional batik-inspired floral design
- **Symbolism**: Beauty, growth, and new beginnings
- **Style**: Small circular flowers with dots in corners
- **Opacity**: Subtle and delicate

### 2. **Event Details Section - Kawung Pattern**
- **Pattern**: Kawung (椭圆形图案) - Four ellipses around a center circle
- **Symbolism**: Represents purity, longevity, and righteousness
- **Origin**: One of the oldest batik patterns, historically worn by Javanese royalty
- **Style**: Symmetrical circular motifs

### 3. **Gallery Section - Parang Pattern**
- **Pattern**: Parang (diagonal wave pattern)
- **Symbolism**: Power, strength, and the ocean waves
- **Origin**: Classic Javanese pattern representing continuous effort
- **Style**: Flowing diagonal lines with decorative dots

### 4. **Greetings Section - Truntum Pattern**
- **Pattern**: Truntum (small stars and dots)
- **Symbolism**: Eternal love that blossoms again
- **Tradition**: Often given by parents to newlyweds
- **Style**: Delicate stars scattered with small dots

## Features

✨ **Authentic Javanese Motifs** - Traditional batik patterns with cultural significance
🎨 **Auto Color Matching** - Patterns automatically use your primary theme color
👁️ **Subtle & Elegant** - Low opacity for sophisticated background effect
📱 **Fully Responsive** - Patterns scale beautifully on all devices
⚡ **SVG Technology** - Crisp patterns that never pixelate
🎯 **Cultural Heritage** - Honoring Indonesian wedding traditions

## Customization

### Change Pattern Opacity

To make patterns more or less visible, edit [style.css](style.css):

**Make Patterns Lighter (Less Visible):**
```css
.invitation::before {
    opacity: 0.2;  /* Change from 0.4 to 0.2 */
}

.event-details::before {
    opacity: 0.3;  /* Change from 0.5 to 0.3 */
}
```

**Make Patterns Darker (More Visible):**
```css
.invitation::before {
    opacity: 0.6;  /* Change from 0.4 to 0.6 */
}

.event-details::before {
    opacity: 0.7;  /* Change from 0.5 to 0.7 */
}
```

### Change Pattern Size

To adjust pattern scale:

```css
.invitation::before {
    background-size: 150px 150px;  /* Larger patterns */
    /* or */
    background-size: 80px 80px;    /* Smaller patterns */
}
```

### Change Pattern Color

Patterns automatically use your primary color from [config.js](config.js). To change:

```javascript
colors: {
    primary: "#2d6a4f",  // Patterns will use this color
}
```

The color code in the SVG (`%232d6a4f`) is the hex code URL-encoded.

### Remove Patterns (Solid Background)

If you prefer solid color backgrounds without patterns:

**Option 1: Set opacity to 0**
```css
.invitation::before {
    opacity: 0;  /* Makes pattern invisible */
}
```

**Option 2: Remove ::before completely**
Delete or comment out the entire `::before` block:
```css
/* .invitation::before {
    ... all the code ...
} */
```

## Using Custom Javanese Pattern Images

If you have your own batik or Javanese pattern images:

### Step 1: Prepare Your Pattern Image
- **Format**: PNG with transparent background (preferred)
- **Size**: 500x500 pixels recommended
- **Style**: Seamless/tileable pattern for best results
- **File size**: Keep under 100KB

### Step 2: Add to Project
Save your pattern image in the `images/` folder:
```
images/
  ├── batik-pattern.png
  ├── kawung-pattern.png
  └── parang-pattern.png
```

### Step 3: Update CSS
Edit [style.css](style.css):

```css
.invitation::before {
    background-image: url('images/batik-pattern.png');
    background-size: 200px 200px;
    background-repeat: repeat;
    opacity: 0.3;
}
```

## Traditional Javanese Batik Patterns

Here are more authentic patterns you can implement:

### 1. **Sekar Jagad** (Universe of Flowers)
- Meaning: Diversity and harmony
- Use: Perfect for multicultural weddings
- Style: Complex mix of various motifs

### 2. **Sido Mukti**
- Meaning: Continuous good fortune
- Use: Traditional wedding pattern
- Style: Floral with intricate details

### 3. **Semen Romo**
- Meaning: Sprouting seeds (fertility)
- Use: Wedding and fertility blessing
- Style: Plant and seed motifs

### 4. **Udan Liris** (Light Rain)
- Meaning: Gentle rain bringing fertility
- Use: Blessing for abundance
- Style: Diagonal lines like falling rain

## Finding Javanese Pattern Images

### Free Resources:

1. **Pixabay** (https://pixabay.com/)
   - Search: "batik pattern", "javanese pattern"
   - Free for commercial use

2. **Freepik** (https://www.freepik.com/)
   - Search: "batik seamless pattern"
   - Many free options available

3. **Vecteezy** (https://www.vecteezy.com/)
   - Search: "indonesian batik pattern"
   - Vector patterns available

4. **PNG Wing** (https://www.pngwing.com/)
   - Search: "batik pattern transparent"
   - PNG with transparency

### Creating Custom Patterns:

- Use **Adobe Illustrator** - Professional batik pattern design
- Use **Inkscape** (Free) - Open-source vector editor
- Hire Indonesian designer on **Fiverr** for authentic patterns

## Cultural Significance

### Batik in Javanese Weddings

Batik patterns hold deep meaning in Javanese culture:

1. **Sido Luhur** - Worn by groom, means "noble character"
2. **Sido Asih** - Worn by bride, means "everlasting love"
3. **Truntum** - Given by parents, represents "blooming love"
4. **Parang** - Symbol of continuous effort in marriage

### Pattern Etiquette

Traditionally:
- **Certain patterns** (like Parang Barong) were reserved for royalty
- **Wedding batik** should be chosen carefully for its meaning
- **Colors matter** - Different colors for different life stages

In modern weddings:
- All patterns are acceptable for decoration
- Choose patterns that resonate with your style
- Mixing traditional and modern is encouraged

## Technical Details

### SVG Pattern Structure

The patterns use inline SVG for:
- **Zero HTTP requests** - No external files needed
- **Perfect scaling** - Vector graphics never pixelate
- **Easy customization** - Change colors via CSS
- **Small file size** - Minimal impact on load time

### URL Encoding

Color codes in SVG use URL encoding:
- `#2d6a4f` becomes `%232d6a4f`
- This allows the SVG to work in CSS

### Browser Compatibility

Patterns work on:
- ✅ Chrome/Edge (all versions)
- ✅ Firefox (all versions)
- ✅ Safari (all versions)
- ✅ Mobile browsers (iOS/Android)

## Troubleshooting

### Patterns not showing?
- Check browser console (F12) for errors
- Verify CSS has `position: relative` on parent
- Ensure `::before` has `position: absolute`

### Patterns too visible/invisible?
- Adjust the `opacity` property
- Check the SVG `opacity` attribute inside the `<g>` tag

### Patterns not matching theme color?
- Verify the color code is URL-encoded (`%23` instead of `#`)
- Check your primary color in [config.js](config.js)

### Patterns look pixelated?
- Increase `background-size` for larger patterns
- SVG patterns should never pixelate - check if you're using PNG

## Best Practices

✅ **Do:**
- Keep patterns subtle (opacity 0.3-0.6)
- Use authentic Javanese motifs
- Match pattern style to your theme
- Test on mobile devices
- Consider cultural significance

❌ **Don't:**
- Make patterns too bold (distracting)
- Mix too many different pattern styles
- Use very large file sizes
- Forget cultural meanings
- Override with random patterns

## Examples

### Subtle Elegance (Current Default)
```css
.invitation::before {
    opacity: 0.4;
    background-size: 120px 120px;
}
```

### Bold Traditional
```css
.invitation::before {
    opacity: 0.7;
    background-size: 180px 180px;
}
```

### Minimalist Modern
```css
.invitation::before {
    opacity: 0.2;
    background-size: 80px 80px;
}
```

## Support

For questions about Javanese patterns:
- See [README.md](README.md) for general setup
- See [ORNAMENT_GUIDE.md](ORNAMENT_GUIDE.md) for ornament icons

---

**Cultural Note:** These patterns honor Indonesian heritage and add meaningful cultural depth to your wedding invitation. Each pattern tells a story of love, prosperity, and tradition. 🇮🇩💕
