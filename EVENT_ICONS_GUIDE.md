# Event Icons Guide

## Overview

You can now use either **emoji icons** or **custom image icons** for your event cards. This gives you flexibility to match your wedding theme perfectly.

## How to Use

### Option 1: Emoji Icons (Default)

Keep using emoji icons as before. Just set the `icon` property and leave `iconImage` empty:

```javascript
events: {
    ceremony: {
        name: "Akad Nikah",
        icon: "💒",
        iconImage: ""  // Leave empty for emoji
    }
}
```

### Option 2: Custom Image Icons

Use your own image files for event icons:

```javascript
events: {
    ceremony: {
        name: "Akad Nikah",
        icon: "💒",  // Fallback emoji (optional)
        iconImage: "images/ceremony-icon.png"  // Your custom image
    },
    reception: {
        name: "Resepsi",
        icon: "🎉",  // Fallback emoji (optional)
        iconImage: "images/reception-icon.png"  // Your custom image
    }
}
```

**Note:** If `iconImage` is provided, it will be used instead of the emoji `icon`.

## Image Requirements

### Recommended Specifications:
- **Format**: PNG with transparent background (or JPG/SVG)
- **Size**: 200x200 pixels minimum
- **File size**: Keep under 100KB for fast loading
- **Style**: Simple, clean icons work best
- **Color**: Match your wedding color theme

### Where to Place Images:
Put your icon images in the `images/` folder:
```
images/
  ├── ceremony-icon.png
  ├── reception-icon.png
  ├── hero-bg.jpg
  ├── bride.jpg
  └── groom.jpg
```

## Finding Icon Images

### Free Icon Resources:
1. **Flaticon** (https://www.flaticon.com/)
   - Search: "wedding ceremony", "wedding ring", "party"
   - Download PNG format

2. **Icons8** (https://icons8.com/)
   - Search: "wedding", "celebration"
   - Download PNG format

3. **Noun Project** (https://thenounproject.com/)
   - High-quality simple icons
   - Free with attribution

4. **Freepik** (https://www.freepik.com/)
   - Search: "wedding icon"
   - Many free options

### Creating Custom Icons:
- Use **Canva** (https://canva.com/) to create simple icons
- Use **Figma** (https://figma.com/) for vector designs
- Hire a designer on Fiverr for custom wedding icons

## Icon Size Configuration

The default icon sizes are:
- **Desktop**: 80x80 pixels
- **Tablet**: 60x60 pixels
- **Mobile**: 50x50 pixels

These are automatically responsive and adjust based on screen size.

## Examples

### Example 1: Traditional Wedding
```javascript
events: {
    ceremony: {
        name: "Wedding Ceremony",
        icon: "💒",
        iconImage: "images/church-icon.png"
    },
    reception: {
        name: "Reception",
        icon: "🎊",
        iconImage: "images/party-icon.png"
    }
}
```

### Example 2: Islamic Wedding
```javascript
events: {
    ceremony: {
        name: "Akad Nikah",
        icon: "📿",
        iconImage: "images/mosque-icon.png"
    },
    reception: {
        name: "Walimah",
        icon: "🎉",
        iconImage: "images/celebration-icon.png"
    }
}
```

### Example 3: Beach Wedding
```javascript
events: {
    ceremony: {
        name: "Beach Ceremony",
        icon: "🏖️",
        iconImage: "images/beach-icon.png"
    },
    reception: {
        name: "Sunset Reception",
        icon: "🌅",
        iconImage: "images/sunset-icon.png"
    }
}
```

## Switching Between Emoji and Image

To switch from emoji to image:
1. Add your image file to the `images/` folder
2. Update the `iconImage` property in [config.js](config.js)
3. Reload the page

To switch back to emoji:
1. Set `iconImage: ""` (empty string)
2. The emoji from `icon` will be used automatically

## Troubleshooting

### Image not showing?
- Check the file path is correct (case-sensitive)
- Verify the image file exists in the `images/` folder
- Check browser console (F12) for errors
- Make sure the image format is supported (PNG, JPG, SVG)

### Image too large or small?
The CSS automatically sizes images to fit. If you need custom sizing, you can adjust the CSS in [style.css](style.css):

```css
.event-icon-image {
    width: 100px;  /* Change this */
    height: 100px; /* Change this */
    object-fit: contain;
}
```

### Image looks pixelated?
- Use a higher resolution image (at least 200x200 pixels)
- Try using SVG format for perfect scaling

## Tips

✅ **Do:**
- Use consistent style for both icons
- Keep icons simple and recognizable
- Use transparent backgrounds for PNG icons
- Match icon colors to your wedding theme

❌ **Don't:**
- Use overly complex or detailed images
- Mix different icon styles (flat + 3D)
- Use very large file sizes (slows page loading)
- Forget to test on mobile devices

---

**Need Help?**
If you have questions about implementing custom event icons, feel free to ask!
