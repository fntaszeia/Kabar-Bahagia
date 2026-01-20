# Ornament Icon Guide

## Overview

The wedding invitation includes decorative ornament icons (ring icons) that appear in the invitation section. You can use the default SVG ring design or upload your own custom ring image.

## Default Ring Icon

The template now includes a beautiful SVG ring icon design by default:
- Double ring circles (elegant wedding ring style)
- Diamond/gem on top
- Automatically matches your primary color theme
- Scalable vector graphics (always sharp on any screen)

## Using Custom Ring Image

If you want to use your own ring icon image instead of the default SVG:

### Step 1: Prepare Your Image

**Recommended specifications:**
- **Format**: PNG with transparent background (preferred) or JPG
- **Size**: 200x200 pixels minimum, 500x500 pixels recommended
- **File size**: Keep under 50KB for fast loading
- **Style**: Simple, clear icon that looks good at small sizes
- **Color**: Can be any color, but consider matching your theme

### Step 2: Add Image to Project

Place your ring icon image in the `images/` folder:
```
images/
  ├── ring-icon.png       ← Your custom ring icon
  ├── hero-bg.jpg
  ├── bride.jpg
  └── groom.jpg
```

### Step 3: Configure in config.js

Edit [config.js](config.js) and set the `customImage` path:

```javascript
ornament: {
    customImage: "images/ring-icon.png"  // Your custom ring image
}
```

**To use default SVG ring:**
```javascript
ornament: {
    customImage: ""  // Leave empty for default SVG ring
}
```

## Finding Ring Icon Images

### Free Icon Resources:

1. **Flaticon** (https://www.flaticon.com/)
   - Search: "wedding ring", "diamond ring", "engagement ring"
   - Download PNG format with transparent background
   - Free with attribution (or premium without)

2. **Icons8** (https://icons8.com/)
   - Search: "wedding ring", "rings"
   - Download PNG format
   - Choose color that matches your theme

3. **Freepik** (https://www.freepik.com/)
   - Search: "wedding ring icon png"
   - Many free options available
   - High quality vector icons

4. **Noun Project** (https://thenounproject.com/)
   - Search: "wedding ring"
   - Simple, elegant icon designs
   - Free with attribution

5. **PNG Wing** (https://www.pngwing.com/)
   - Search: "wedding ring icon"
   - Many transparent PNG options
   - Free to use

### Creating Your Own:

- Use **Canva** (https://canva.com/) - Easy online design tool
- Use **Figma** (https://figma.com/) - Professional design tool
- Hire a designer on **Fiverr** for custom icon

## Customization Examples

### Example 1: Gold Ring with Diamond
```javascript
ornament: {
    customImage: "images/gold-ring.png"
}
```

### Example 2: Interlocked Wedding Rings
```javascript
ornament: {
    customImage: "images/double-rings.png"
}
```

### Example 3: Simple Band Ring
```javascript
ornament: {
    customImage: "images/simple-ring.png"
}
```

### Example 4: Use Default SVG (No Configuration Needed)
```javascript
ornament: {
    customImage: ""  // Default SVG ring will be used
}
```

## Changing Default SVG Ring Color

The default SVG ring automatically matches your primary theme color. To change it:

Edit the `primary` color in [config.js](config.js):
```javascript
colors: {
    primary: "#d4af37",  // Gold - ring will be gold
    // or
    primary: "#c0c0c0",  // Silver - ring will be silver
    // or
    primary: "#b87333",  // Rose gold - ring will be rose gold
}
```

## Advanced: Customize SVG Ring Design

If you want to modify the default SVG ring design, edit [style.css](style.css):

Find the `.ornament` class (around line 236) and modify the SVG code:

```css
.ornament {
    background-image: url('data:image/svg+xml,<svg>...</svg>');
}
```

**Note:** SVG editing requires knowledge of SVG syntax. Use an online SVG editor like:
- https://svgedit.netlify.app/
- https://boxy-svg.com/app

## Responsive Sizing

The ornament automatically adjusts size on different devices:
- **Desktop**: 100x100 pixels
- **Tablet**: 80x80 pixels
- **Mobile**: 60x60 pixels

These sizes are defined in the responsive CSS sections.

## Troubleshooting

### Image not showing?
- Check the file path is correct (case-sensitive)
- Verify the image file exists in the `images/` folder
- Check browser console (F12) for errors
- Make sure the image format is supported (PNG, JPG)

### Image looks blurry?
- Use a higher resolution image (at least 500x500 pixels)
- Make sure you're using PNG format, not heavily compressed JPG
- Consider using the default SVG (always sharp)

### Image too large/small?
The CSS automatically sizes the ornament. If you need custom sizing:

Edit [style.css](style.css):
```css
.ornament {
    width: 120px;   /* Change this */
    height: 120px;  /* Change this */
}
```

### Wrong aspect ratio?
Make sure your image is square (same width and height). If not:

```css
.ornament {
    background-size: cover;  /* Fill the space */
    /* or */
    background-size: contain;  /* Fit inside space */
}
```

## Multiple Ornaments

The invitation template has two ornament instances:
- **Top ornament** - Above the couple's names
- **Bottom ornament** - Below the couple photos

Both will use the same icon/image. If you want different icons for each, you'll need to edit the HTML and CSS directly.

## Tips

✅ **Do:**
- Use PNG with transparent background
- Keep file size small (< 50KB)
- Use simple, recognizable designs
- Match icon style to your theme
- Test on mobile devices

❌ **Don't:**
- Use overly complex or detailed images
- Use very large file sizes
- Mix multiple icon styles
- Forget to optimize images
- Use low-resolution images

## Image Optimization Tools

Before adding your image, optimize it:

1. **TinyPNG** (https://tinypng.com/)
   - Compress PNG files
   - Reduces file size by 50-80%
   - Maintains quality

2. **Squoosh** (https://squoosh.app/)
   - Google's image optimizer
   - Compare before/after
   - Multiple format options

3. **ImageOptim** (Mac only)
   - Desktop app for optimization
   - Batch processing

## Color Variants

If using a custom image, you might want versions in different colors:

**Option 1:** Use a colored PNG that matches your theme
**Option 2:** Use a grayscale PNG and apply CSS filter:

```css
.ornament {
    filter: hue-rotate(45deg) saturate(1.5);
}
```

## Support

For questions about ornament customization:
- See [README.md](README.md) for general setup
- See [EVENT_ICONS_GUIDE.md](EVENT_ICONS_GUIDE.md) for similar icon customization

---

**Pro Tip:** The default SVG ring icon looks great and automatically matches your theme colors. Only use a custom image if you have a specific design requirement!
