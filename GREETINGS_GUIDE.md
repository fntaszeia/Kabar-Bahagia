# Guest Greetings System Guide

## Overview

The wedding invitation now features a **Guest Greetings System** where visitors can leave wishes and prayers for the couple. When guests submit their greetings, a beautiful popup appears, and their message is displayed on the page for everyone to see.

## Features

✨ **Beautiful Popup Notification** - Animated popup appears after submission
💝 **Real-time Display** - Greetings appear immediately on the page
🎨 **Avatar Initials** - Each greeting shows a colorful avatar with the guest's initial
⏰ **Timestamps** - Shows when each greeting was posted (e.g., "2 jam yang lalu")
📱 **Fully Responsive** - Works perfectly on all devices
🔒 **Client-side Storage** - Uses localStorage (no backend required for basic setup)

## How It Works

### For Guests:
1. Guest scrolls to the "Ucapan & Doa" section
2. Fills in their name and greeting message
3. Clicks "Kirim Ucapan" button
4. Beautiful popup appears confirming submission
5. Their greeting appears in the list below the form

### For You (Couple):
- All greetings are stored in the browser's localStorage
- Greetings persist across page reloads
- They appear in reverse chronological order (newest first)

## Configuration

Edit the greetings settings in [config.js](config.js):

```javascript
greetings: {
    enabled: true,                    // Enable/disable greetings section
    title: "Ucapan & Doa",           // Section title
    submitButtonText: "Kirim Ucapan", // Submit button text
    storageKey: "wedding_greetings"   // localStorage key name
}
```

## Customization Options

### Change Section Title
```javascript
greetings: {
    title: "Wishes & Prayers",  // English version
    // or
    title: "留言祝福",          // Chinese version
}
```

### Change Button Text
```javascript
greetings: {
    submitButtonText: "Send Wishes",  // English
    // or
    submitButtonText: "送出祝福",     // Chinese
}
```

### Disable Greetings Section
```javascript
greetings: {
    enabled: false  // This will hide the entire section
}
```

## Integrating with Backend (Optional)

The current implementation uses localStorage (client-side storage). For production use with multiple guests, you should integrate with a backend API.

### Steps to Integrate:

1. **Uncomment the backend integration code** in [script.js](script.js) (around line 290):

```javascript
// You can integrate with backend API here:
fetch('YOUR_API_ENDPOINT', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(greeting)
}).then(response => {
    if (response.ok) {
        console.log('Greeting saved to backend');
    }
}).catch(error => {
    console.error('Error saving greeting:', error);
});
```

2. **Replace `YOUR_API_ENDPOINT`** with your actual API URL

### Backend Service Options:

#### Option 1: Firebase Firestore (FREE)
```javascript
// Add Firebase to your project
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = { /* your config */ };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Save greeting
await addDoc(collection(db, 'greetings'), greeting);
```

**Pros:** Free tier available, real-time updates, easy setup
**Tutorial:** https://firebase.google.com/docs/firestore/quickstart

#### Option 2: Supabase (FREE)
```javascript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('YOUR_URL', 'YOUR_ANON_KEY');

await supabase
    .from('greetings')
    .insert([greeting]);
```

**Pros:** PostgreSQL database, free tier, easy auth
**Tutorial:** https://supabase.com/docs/guides/getting-started

#### Option 3: Formspree (FREE)
```javascript
fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    body: JSON.stringify(greeting),
    headers: {
        'Content-Type': 'application/json'
    }
});
```

**Pros:** Very simple, no coding required
**Tutorial:** https://formspree.io/

#### Option 4: Your Own Backend
Create a simple Express.js server or use any backend framework:
- Node.js + Express + MongoDB
- PHP + MySQL
- Python + Flask + PostgreSQL
- Any other stack you prefer

## Managing Greetings

### View All Greetings (LocalStorage)
Open browser console (F12) and run:
```javascript
console.log(JSON.parse(localStorage.getItem('wedding_greetings')));
```

### Export Greetings to JSON
```javascript
const greetings = JSON.parse(localStorage.getItem('wedding_greetings'));
console.log(JSON.stringify(greetings, null, 2));
// Copy the output
```

### Clear All Greetings (Testing)
```javascript
localStorage.removeItem('wedding_greetings');
location.reload();
```

### Add Sample Greetings (Testing)
Add this to [script.js](script.js) temporarily:
```javascript
// Sample greetings for testing
const sampleGreetings = [
    {
        id: Date.now() - 1000,
        name: "Sarah & Michael",
        message: "Congratulations on your wedding! May your love grow stronger every day. 💕",
        timestamp: Date.now() - 3600000 // 1 hour ago
    },
    {
        id: Date.now() - 2000,
        name: "David Chen",
        message: "Wishing you both a lifetime of love and happiness! 🎉",
        timestamp: Date.now() - 7200000 // 2 hours ago
    }
];
localStorage.setItem('wedding_greetings', JSON.stringify(sampleGreetings));
```

## Styling Customization

### Change Avatar Colors
Edit [style.css](style.css):
```css
.greeting-avatar {
    background: linear-gradient(135deg, #ff6b9d, #ffa8d5); /* Pink gradient */
    /* or */
    background: linear-gradient(135deg, #1e3a8a, #3b82f6); /* Blue gradient */
}
```

### Change Popup Animation
Edit [style.css](style.css):
```css
@keyframes popIn {
    from {
        opacity: 0;
        transform: scale(0.5) rotate(-45deg); /* Different animation */
    }
    to {
        opacity: 1;
        transform: scale(1) rotate(0deg);
    }
}
```

### Change Greeting Card Style
```css
.greeting-card {
    border-left: 4px solid var(--primary-color); /* Add accent border */
    /* or */
    background: linear-gradient(to right, #f8f9fa, white); /* Gradient background */
}
```

## Security Considerations

### XSS Protection
The system includes built-in XSS protection:
```javascript
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
```

This prevents malicious scripts from being injected through greeting messages.

### Spam Prevention (Backend Integration)
When using a backend, implement:
1. **Rate limiting** - Limit submissions per IP address
2. **Captcha** - Add Google reCAPTCHA
3. **Moderation** - Review greetings before displaying
4. **Profanity filter** - Filter inappropriate content

## Troubleshooting

### Greetings not appearing after submission
- Check browser console (F12) for errors
- Verify localStorage is enabled in browser settings
- Try clearing cache and reload

### Popup not showing
- Check if JavaScript is enabled
- Check browser console for errors
- Verify the popup HTML is in [index.html](index.html)

### Greetings disappear after closing browser
- This is expected behavior with localStorage
- Integrate with backend to persist data permanently
- Or use sessionStorage for temporary storage

### Time showing incorrectly
- The time is based on user's local timezone
- For consistent timestamps, use backend with server time

## Best Practices

✅ **Do:**
- Test thoroughly before wedding day
- Have backup plan (screenshot greetings regularly)
- Integrate with backend for production
- Add moderation if expecting many guests
- Keep greeting messages visible limit (e.g., show last 50)

❌ **Don't:**
- Rely solely on localStorage for important data
- Allow extremely long messages (add character limit)
- Skip XSS protection
- Forget to test on mobile devices

## Example Implementations

### With Character Limit
Edit [index.html](index.html):
```html
<textarea
    id="guest-message"
    maxlength="500"
    placeholder="Tulis ucapan & doa untuk kami (max 500 characters)..."
>
</textarea>
```

### With Required Email (for backend)
Add email field to form:
```html
<div class="form-group">
    <input type="email" id="guest-email" placeholder="Email (opsional)">
</div>
```

## Support

For questions or issues with the greetings system, check:
- Browser console for error messages
- [README.md](README.md) for general setup
- [EVENT_ICONS_GUIDE.md](EVENT_ICONS_GUIDE.md) for icon customization

---

**Happy Wedding! 💍💕**
