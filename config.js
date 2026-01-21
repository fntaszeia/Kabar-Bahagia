// Wedding Invitation Configuration
// Edit this file to customize your wedding invitation

const weddingConfig = {
    // Couple Information
    couple: {
        groomName: "Fath Akbar Rahmad Baskara",
        groomShortName: "Fath",  // Short name for hero section
        groomParents: "Bapak Wardoyo Rahmad Basuki & Ibu Sri Rahayu Purwaningsih",
        brideName: "Muftikasari Ayu Raras Asih",
        brideShortName: "Raras",  // Short name for hero section
        brideParents: "Bapak Subaryanto (Alm.) & Ibu Sukemiyati",
        hashtag: "#FathRaras2026"
    },

    // Wedding Date and Time
    wedding: {
        date: "Februari 7, 2026",
        // Format: YYYY-MM-DDTHH:MM:SS
        countdownDate: "2026-02-07T14:00:00"
    },

    // Event Details
    events: {
        ceremony: {
            name: "Akad Nikah",
            time: "07:30 WIB",
            venue: "Joglo House Puspitek",
            address: "Jl. Raya Puspitek, Buaran, Kec. Serpong, Kota Tangerang Selatan, Banten 15310",
            // You can use either:
            // 1. Emoji: icon: "📍"
            // 2. Image: iconImage: "images/ceremony-icon.png"
            // If both are provided, iconImage takes priority
            icon: "📍",
            iconImage: ""  // Leave empty to use emoji, or add path like "images/ceremony-icon.png"
        },
        reception: {
            name: "Resepsi",
            time: "11:00 WIB- 13:00 WIB",
            venue: "Joglo House Puspitek",
            address: "Jl. Raya Puspitek, Buaran, Kec. Serpong, Kota Tangerang Selatan, Banten 15310",
            icon: "🎉",
            iconImage: ""  // Leave empty to use emoji, or add path like "images/reception-icon.png"
        }
    },

    // Map Configuration
    map: {
        // Direct Google Maps URL link
        // Get your map link from Google Maps: Share > Copy link
        url: "https://maps.app.goo.gl/vXWNiaFsUpE1DZTx6"
        // Example: "https://maps.app.goo.gl/ABC123xyz"
    },

    // Invitation Text
    text: {
        heroSubtitle: "We're finally tying the knot!",
        invitationMessage: "Bersama keluarga kami, dengan penuh sukacita mengundang Anda untuk merayakan pernikahan kami",
        countdownTitle: "Menghitung Hari",
        galleryTitle: "Ours",
        footerMessage: "With Love"
    },

    // Quran Verse (Az-Zumar)
    quranVerse: {
        enabled: true,
        arabic: "وَمِنْ اٰيٰتِهٖٓ اَنْ خَلَقَ لَكُمْ مِّنْ اَنْفُسِكُمْ اَزْوَاجًا لِّتَسْكُنُوْٓا اِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَّوَدَّةً وَّرَحْمَةً ۗاِنَّ فِيْ ذٰلِكَ لَاٰيٰتٍ لِّقَوْمٍ يَّتَفَكَّرُوْنَ",
        translation: "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir.",
        surah: "QS. Ar-Rum",
        ayah: "21"
    },

    // Guest Greetings Configuration
    greetings: {
        enabled: true,
        title: "Tutur Hangat",
        submitButtonText: "Kirim Ucapan",
        // Store greetings in localStorage (client-side only)
        // For production, integrate with backend API
        storageKey: "wedding_greetings"
    },

    // Music Configuration
    music: {
        enabled: true,
        autoplay: true, // Set to true for autoplay (may not work on all browsers)
        file: "music/Sal Priadi - Ikat Aku Di Tulang Belikatmu.mp3",
        volume: 0.7 // 0.0 to 1.0
    },

    // Ornament Configuration (ring icon/image)
    ornament: {
        // Leave empty to use default SVG ring icon
        // Or add custom image path: "images/ring-icon.png"
        customImage: ""
    },

    // Color Theme Configuration
    colors: {
        primary: "#2d6a4f",      // Forest Green - main accent color
        secondary: "#52796f",    // Sage Green - secondary accent
        textDark: "#1b4332",     // Deep Green text
        textLight: "#74c69d",    // Light Green text
        background: "#f1f8f4",   // Light mint background
        white: "#ffffff",        // White
        accent: "#40916c"        // Medium Green accent
    },

    // Font Configuration
    fonts: {
        // Decorative font for couple names and special headings
        decorative: "Great Vibes",
        // Serif font for section titles and formal text
        serif: "Playfair Display",
        // Sans-serif font for body text
        sansSerif: "Raleway",
        // Arabic font for Quran verse
        arabic: "Amiri"
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = weddingConfig;
}
