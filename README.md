# Wedding Invitation Template 💍

A beautiful, responsive wedding invitation website template with countdown timer, RSVP form, photo gallery, and more!

## Features

- 📱 Fully responsive design (works on all devices)
- ⏰ Live countdown timer to wedding day
- 💝 Guest greetings system with popup notifications
- 🖼️ Photo gallery section
- 🎵 Background music player (optional)
- 🎨 Elegant animations and transitions
- 🗺️ Google Maps integration
- ⚡ Fast loading with smooth animations
- 🎯 Customizable event icons (emoji or custom images)
- 🇮🇩 Authentic Javanese batik patterns (cultural backgrounds)

## Setup Instructions

### 1. Customize Your Wedding Information (EASY!)

Edit [config.js](config.js) - This is the ONLY file you need to edit for all your wedding details:

```javascript
const weddingConfig = {
    couple: {
        groomName: "Your Name",           // Change this
        groomParents: "Your Parents",      // Change this
        brideName: "Partner Name",         // Change this
        brideParents: "Partner's Parents", // Change this
        hashtag: "#YourHashtag2026"       // Change this
    },
    wedding: {
        date: "June 15, 2026",                    // Display date
        countdownDate: "2026-06-15T14:00:00"      // Countdown timer date
    },
    events: {
        ceremony: {
            name: "Wedding Ceremony",
            time: "2:00 PM",
            venue: "Your Church/Venue",
            address: "Full Address",
            icon: "💒"
        },
        reception: {
            name: "Reception",
            time: "5:00 PM",
            venue: "Your Reception Venue",
            address: "Full Address",
            icon: "🎉"
        }
    },
    // ... and more settings
};
```

All your wedding details are now in ONE file for easy maintenance!

### 2. Add Your Photos

Place your wedding photos in the `images/` folder:
- `hero-bg.jpg` - Main background image
- `bride.jpg` - Bride's photo (square format)
- `groom.jpg` - Groom's photo (square format)
- `photo1.jpg` to `photo4.jpg` - Gallery photos
- `ceremony-icon.png` - (Optional) Custom icon for ceremony event
- `reception-icon.png` - (Optional) Custom icon for reception event
- `ring-icon.png` - (Optional) Custom ring ornament icon

See [EVENT_ICONS_GUIDE.md](EVENT_ICONS_GUIDE.md) for event icon customization.
See [ORNAMENT_GUIDE.md](ORNAMENT_GUIDE.md) for ring ornament customization.

### 3. Add Background Music (Optional)

Place your wedding song in the `music/` folder:
- `wedding-song.mp3` - Background music

### 4. Customize Colors (Easy!)

Now you can change colors directly in [config.js](config.js):
```javascript
colors: {
    primary: "#d4af37",      // Gold - main accent color (buttons, borders)
    secondary: "#8b7355",    // Brown - secondary accent
    textDark: "#2c2c2c",     // Dark text color
    textLight: "#666666",    // Light text color
    background: "#faf9f7",   // Light background sections
    white: "#ffffff",        // White background
    accent: "#c9a961"        // Accent gold (countdown, highlights)
}
```

Popular color schemes:
- **Romantic Pink**: primary: "#ff6b9d", accent: "#ffa8d5"
- **Navy Blue**: primary: "#1e3a8a", accent: "#3b82f6"
- **Forest Green**: primary: "#065f46", accent: "#10b981"
- **Burgundy**: primary: "#7f1d1d", accent: "#dc2626"

### 5. Customize Fonts (Easy!)

You can also change fonts directly in [config.js](config.js):
```javascript
fonts: {
    decorative: "Great Vibes",    // For couple names and decorative text
    serif: "Playfair Display",    // For titles and formal text
    sansSerif: "Raleway",         // For body text
    arabic: "Amiri"               // For Quran verse (Arabic text)
}
```

Popular font combinations:
- **Classic Elegant**: decorative: "Great Vibes", serif: "Playfair Display", sansSerif: "Raleway"
- **Modern Minimal**: decorative: "Dancing Script", serif: "Lora", sansSerif: "Open Sans"
- **Romantic**: decorative: "Allura", serif: "Cormorant", sansSerif: "Montserrat"
- **Traditional**: decorative: "Pinyon Script", serif: "Crimson Text", sansSerif: "Lato"

**Note:** When changing fonts, make sure to update the Google Fonts link in [index.html](index.html) to include your chosen fonts.

No need to edit CSS files!

## Deployment Options

### Option 1: Netlify (Recommended - FREE)

1. Go to [Netlify](https://www.netlify.com/)
2. Sign up for a free account
3. Click "Add new site" → "Deploy manually"
4. Drag and drop your project folder
5. Your site will be live in seconds!
6. You can also connect to GitHub for automatic deployments

**OR use Netlify CLI:**
```bash
npm install -g netlify-cli
netlify deploy
```

### Option 2: Vercel (FREE)

1. Go to [Vercel](https://vercel.com/)
2. Sign up for a free account
3. Click "Add New" → "Project"
4. Import from GitHub or upload your files
5. Deploy!

**OR use Vercel CLI:**
```bash
npm install -g vercel
vercel
```

### Option 3: GitHub Pages (FREE)

1. Create a GitHub account
2. Create a new repository
3. Upload all files to the repository
4. Go to Settings → Pages
5. Select "main" branch and save
6. Your site will be live at `https://yourusername.github.io/repository-name`

### Option 4: Traditional Web Hosting

Upload all files to any web hosting service:
- Hostinger
- Bluehost
- SiteGround
- GoDaddy
- Or any hosting provider

## Guest Greetings System

The greetings system allows guests to leave wishes and prayers for the couple. Messages are displayed in real-time with a beautiful popup notification.

**Features:**
- Real-time display of guest greetings
- Animated popup on submission
- Avatar with guest initials
- Timestamp (e.g., "2 jam yang lalu")
- Stored in localStorage (client-side)

**For Production:** Integrate with backend services like Firebase, Supabase, or your own API. See [GREETINGS_GUIDE.md](GREETINGS_GUIDE.md) for detailed integration instructions.

## RSVP/Contact Form Integration (Optional)

If you need a traditional RSVP form instead of greetings, you can integrate with:

1. **Formspree** (easiest):
   - Sign up at [formspree.io](https://formspree.io/)
   - Update the form action in script.js

2. **EmailJS**:
   - Sign up at [emailjs.com](https://www.emailjs.com/)
   - Follow their integration guide

3. **Google Forms**:
   - Create a Google Form
   - Use form submission API

## Customization Tips

- Update fonts in the Google Fonts link in [index.html](index.html)
- Adjust colors in [style.css](style.css) CSS variables
- Add more sections by copying existing section structure
- Change animations by modifying CSS keyframes

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Credits

Built with:
- HTML5
- CSS3
- Vanilla JavaScript
- Google Fonts

## License

Free to use for personal wedding invitations. Enjoy your special day! 💕

## Need Help?

If you need help customizing or deploying, feel free to ask!

---

**Made with ❤️ for your special day**
