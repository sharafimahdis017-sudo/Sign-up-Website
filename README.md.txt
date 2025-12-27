# 🌊 SimpleFlow Authentication

A modern, responsive, and interactive authentication interface (Login/Sign Up) built with pure HTML, CSS, and JavaScript. This project features real-time form validation, a persistent Dark/Light mode, and engaging UI effects.

## ✨ Features

- **🎨 Dark & Light Mode:**
  - Includes a smooth theme toggle button (Sun/Moon).
  - User preference is saved in `localStorage`, so the selected theme persists across page reloads.

- **🔐 Smart Validation:**
  - Real-time password strength checker (Length, Symbols, Complexity).
  - **Privacy Shield:** Prevents users from using their name or email within the password.
  - Email restriction: Only allows `gmail.com` or `yahoo.com` domains.

- **📱 Modern UI:**
  - Fully responsive design using **CSS Variables** for easy theming.
  - Smooth transitions and animations for tabs and input fields.

- **🎉 User Experience (UX):**
  - Confetti celebration effect upon successful account creation.
  - Clear and immediate error feedback.
  - Creative and humorous code comments in the source files.

## 🚀 How to Use

1. **Clone or Download** the repository.
2. Open `index.html` in your web browser.
3. **Test the Sign Up flow:**
   - Enter a username and full name.
   - Enter a valid email (must be `@gmail.com` or `@yahoo.com`).
   - Create a strong password (8+ characters, must include a number/symbol, and cannot contain your name).
4. **Toggle the Theme:** Click the Sun/Moon icon in the header to switch between Dark and Light modes.
5. **Reload the page** to see your theme preference saved!

## 🛠 Tech Stack

- **HTML5:** Semantic structure.
- **CSS3:** Advanced styling with Flexbox and CSS Variables.
- **JavaScript (Vanilla):** Logic for validation, theme toggling, and DOM manipulation.
- **Canvas Confetti:** External library for the celebration effect.

---
*Developed with ❤️ and a touch of magic.*