# Music Autoplay Guide

## Why Music Doesn't Autoplay

Modern browsers (Chrome, Safari, Firefox, Edge) **block audio autoplay by default** for these reasons:
1. Prevent unwanted noise
2. Save data/battery
3. Improve user experience
4. Security policy

## How to Enable Autoplay (For Testing)

### Chrome/Edge:
1. Open the website
2. Click the 🔒 or 🛡️ icon in the address bar
3. Find "Sound" setting
4. Change to "Allow"
5. Reload the page

### Safari:
1. Go to Safari → Preferences → Websites
2. Select "Auto-Play"
3. Find your website
4. Change to "Allow All Auto-Play"

### Firefox:
1. Type `about:config` in address bar
2. Search for `media.autoplay.default`
3. Change value to `0` (allows autoplay)
4. Reload the page

## How It Works in Your Website

Your website has **smart autoplay** that:

1. **First Attempt**: Tries to play music immediately when page loads
   - ✅ Works if browser allows autoplay
   - ❌ Fails if browser blocks autoplay

2. **Fallback**: If blocked, music will start on **first user interaction**:
   - Any click anywhere on the page
   - Any scroll
   - Any touch (mobile)
   - Any keyboard press

3. **Visual Feedback**:
   - 🔇 = Music muted (waiting for interaction)
   - 🔊 = Music playing
   - Pulsing button = Click anywhere to start music

## Best Practice for Deployment

When you deploy your website:

1. **Keep autoplay enabled in config.js** - it will try to play automatically
2. **Music button provides manual control** - guests can toggle on/off
3. **Most guests will need one click** - this is normal browser behavior
4. **Add a welcome message** (optional) - you can add text like "Click anywhere to start music"

## Testing Your Website

To test if music works:

1. Open [index.html](index.html) in your browser
2. Open browser console (F12 or Right-click → Inspect)
3. Look for these messages:
   - "Music started successfully!" = Autoplay worked! ✅
   - "Autoplay prevented. User interaction required." = Click anywhere to start
4. Try clicking anywhere on the page
5. Check console for "Music started after user interaction!"

## Important Notes

- **Deployment matters**: Some hosting services (like Netlify, Vercel) use HTTPS, which has stricter autoplay rules
- **Mobile devices**: Almost always require user interaction
- **Desktop browsers**: Sometimes allow autoplay, sometimes don't
- **User settings**: Each visitor's browser settings affect autoplay

## Current Configuration

Your music is configured in [config.js](config.js):

```javascript
music: {
    enabled: true,
    autoplay: true,  // ✅ Tries to autoplay
    file: "music/Sal Priadi - Ikat Aku Di Tulang Belikatmu.mp3",
    volume: 0.7
}
```

This is the **best possible configuration**. The behavior you're experiencing (music muted until interaction) is **normal and expected** in modern browsers.
