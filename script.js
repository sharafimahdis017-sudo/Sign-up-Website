document.addEventListener('DOMContentLoaded', () => {
    
    // 🎭 Stage Elements: Calling the actors to the stage
    const mainApp = document.getElementById("main-app");
    const welcomeScreen = document.getElementById("welcome-screen");
    const displayName = document.getElementById("display-name");

    // 📜 The Scrolls (Inputs)
    const form = document.getElementById("authForm");
    const usernameInput = document.getElementById("username");
    const fullNameInput = document.getElementById("fullName");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    
    // 🕹️ The Controls
    const submitBtn = document.getElementById("submitBtn");
    const forgotPassLink = document.getElementById("forgotPassLink");
    const tabs = document.querySelectorAll(".tab");
    const themeToggleBtn = document.getElementById("theme-toggle");
    
    // 🚧 Zones
    const usernameField = document.getElementById("field-username");
    const fullNameField = document.getElementById("field-fullname");
    const passwordFeedback = document.getElementById("passwordFeedback");

    // 🛡️ The Validators UI
    const reqName = document.getElementById("req-name");
    const reqLength = document.getElementById("req-length");
    const reqSymbol = document.getElementById("req-symbol");
    const strengthText = document.getElementById("strengthText");

    let isSignUp = true;

    // --- 🌓 Dark Mode Logic (The Magic Switch) ---
    // 🧙‍♂️ Wizardry: Check if the user has visited this realm before
    const currentTheme = localStorage.getItem("theme");
    const iconSpan = themeToggleBtn.querySelector(".icon");

    if (currentTheme === "dark") {
        document.body.classList.add("dark-mode");
        iconSpan.textContent = "🌙"; // Moon for dark mode
    } else {
        iconSpan.textContent = "☀️"; // Sun for light mode
    }

    themeToggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        
        let theme = "light";
        if (document.body.classList.contains("dark-mode")) {
            theme = "dark";
            iconSpan.textContent = "🌙";
        } else {
            iconSpan.textContent = "☀️";
        }
        // 💾 Save the spell (preference) for the next visit
        localStorage.setItem("theme", theme);
    });
    
    // --- 🛠 Helper Functions (The Toolkit) ---

    function setStatus(input, isValid, errorMessage = "") {
        const group = input.closest(".input-group");
        const errorEl = group.querySelector(".error-msg");
        
        if (isValid) {
            input.classList.remove("invalid");
            input.classList.add("valid");
            errorEl.textContent = "";
            return true;
        } else {
            input.classList.remove("valid");
            input.classList.add("invalid");
            errorEl.textContent = errorMessage;
            return false;
        }
    }

    function clearStatus(input) {
        input.classList.remove("valid", "invalid");
        const group = input.closest(".input-group");
        if(group.querySelector(".error-msg")) {
            group.querySelector(".error-msg").textContent = "";
        }
    }

    // --- 🕵️‍♀️ Validation Logic (The Gatekeepers) ---

    function validateUsername() {
        if (!isSignUp) return true; 
        const val = usernameInput.value.trim();
        const length = val.length;
        const alphanumericRegex = /^[a-zA-Z0-9]+$/;
        
        // 🚫 Guard: Is it empty?
        if (length === 0) return setStatus(usernameInput, false, "Username is required");
        // 📏 Guard: Is it too short/long?
        if (length < 3 || length > 15) return setStatus(usernameInput, false, "Username must be 3-15 chars");
        // 🔣 Guard: Weird characters?
        if (!alphanumericRegex.test(val)) return setStatus(usernameInput, false, "Letters and numbers only");
        
        return setStatus(usernameInput, true);
    }

    function validateFullName() {
        if (!isSignUp) return true;
        const val = fullNameInput.value.trim();
        const lettersSpaceRegex = /^[a-zA-Z\s]+$/;
        
        if (val.length === 0) return setStatus(fullNameInput, false, "Please enter your Full Name");
        if (!lettersSpaceRegex.test(val)) return setStatus(fullNameInput, false, "Letters only");
        // 🧐 Check: Did they provide both names?
        if (!val.includes(" ") || val.split(" ").length < 2) return setStatus(fullNameInput, false, "Enter First and Last name");
        
        return setStatus(fullNameInput, true);
    }

    function validateEmail() {
        const val = emailInput.value.trim();
        // 📧 Regex Spell for Gmail/Yahoo
        const emailRegex = /^[^\s@]+@(gmail|yahoo)\.com$/;
        
        if (val === "") return setStatus(emailInput, false, "Email is required");
        if (!emailRegex.test(val)) return setStatus(emailInput, false, "Valid gmail or yahoo required");
        
        return setStatus(emailInput, true);
    }

    function validatePassword() {
        const val = passwordInput.value;
        const nameVal = fullNameInput.value.toLowerCase().trim();
        const emailVal = emailInput.value.toLowerCase().trim();
        
        // 📏 Rule 1: Length
        let isLengthValid = val.length >= 8;
        // 🧮 Rule 2: Complexity
        let isSymbolOrNumberValid = /[0-9]/.test(val) || /[^a-zA-Z0-9]/.test(val);
        
        // Update UI Indicators
        if (isLengthValid) reqLength.classList.add("valid"); else reqLength.classList.remove("valid");
        if (isSymbolOrNumberValid) reqSymbol.classList.add("valid"); else reqSymbol.classList.remove("valid");

        // 🕵️ Rule 3: No personal info (Privacy Shield)
        let containsPersonalInfo = false;
        if (isSignUp && nameVal.length > 0) {
            const nameParts = nameVal.split(" ");
            for (let part of nameParts) {
                if (part.length > 2 && val.toLowerCase().includes(part)) containsPersonalInfo = true;
            }
        }
        if (emailVal.length > 0 && emailVal.includes("@")) {
            const emailPart = emailVal.split("@")[0];
            if (emailPart.length > 3 && val.toLowerCase().includes(emailPart)) containsPersonalInfo = true;
        }

        let isContentValid = !containsPersonalInfo && val.length > 0;
        if (isContentValid) reqName.classList.add("valid"); else reqName.classList.remove("valid");

        // 💪 Strength Calculation
        let strengthCount = 0;
        if (isLengthValid) strengthCount++;
        if (isSymbolOrNumberValid) strengthCount++;
        if (isContentValid) strengthCount++;

        const strengthColor = strengthCount === 3 ? "#465FF1" : (strengthCount === 2 ? "#f39c12" : (document.body.classList.contains('dark-mode') ? "#EAEAEA" : "#26203B"));
        
        if (strengthCount === 3) {
            strengthText.textContent = "Password Strength: Strong";
            strengthText.style.color = "#465FF1";
        } else if (strengthCount === 2) {
            strengthText.textContent = "Password Strength: Medium";
            strengthText.style.color = "#f39c12";
        } else {
            strengthText.textContent = "Password Strength: Weak";
            // Adaptive color for weak text based on theme is tricky in JS, sticking to default class logic or CSS var is better, but here is a simple fix:
            strengthText.style.color = "var(--text-primary)"; 
        }

        if (isSignUp) {
            const isValid = isLengthValid && isSymbolOrNumberValid && isContentValid;
            let errorMsg = "";
            if (!isLengthValid) errorMsg = "At least 8 chars required";
            else if (!isSymbolOrNumberValid) errorMsg = "Number or symbol required";
            else if (containsPersonalInfo) errorMsg = "No name or email in password";
            return setStatus(passwordInput, isValid, isValid ? "" : errorMsg);
        } else {
            if (val.length === 0) return setStatus(passwordInput, false, "Password is required");
            return setStatus(passwordInput, true);
        }
    }

    function updateButtonState() {
        const isUsernameValid = validateUsername();
        const isFullNameValid = validateFullName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();

        if (isUsernameValid && isFullNameValid && isEmailValid && isPasswordValid) {
            submitBtn.disabled = false;
            submitBtn.style.opacity = "1";
            submitBtn.style.cursor = "pointer";
        } else {
            submitBtn.disabled = true;
            submitBtn.style.opacity = "0.6";
            submitBtn.style.cursor = "not-allowed";
        }
    }

    // --- ✨ Special Effects: Confetti Cannon ---
    function fireConfetti() {
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 2000 };

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            // 🚀 Fire from left and right!
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
    }

    // --- 👂 Event Listeners (The Ears) ---

    forgotPassLink.addEventListener("click", (e) => {
        e.preventDefault();
        const emailVal = emailInput.value.trim();
        if (!emailVal || emailInput.classList.contains("invalid")) {
            setStatus(emailInput, false, "Enter a valid email first to reset password");
            emailInput.focus();
        } else {
            setStatus(emailInput, true);
            alert(`📨 A password reset owl has been sent to: ${emailVal}`);
        }
    });

    [usernameInput, fullNameInput, emailInput, passwordInput].forEach(input => {
        input.addEventListener("input", () => {
            if(input === usernameInput) validateUsername();
            if(input === fullNameInput) validateFullName();
            if(input === emailInput) validateEmail();
            if(input === passwordInput) validatePassword();
            updateButtonState();
        });
    });

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            // 🔄 Switch context
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");
            const target = tab.getAttribute("data-target");
            
            // 🧹 Clean up the form
            form.reset();
            document.querySelectorAll("input").forEach(clearStatus);
            document.querySelectorAll(".requirements-list li").forEach(li => li.classList.remove("valid"));
            strengthText.textContent = "Password Strength: Weak";
            strengthText.style.color = "var(--text-primary)";

            if (target === "signin") {
                isSignUp = false;
                usernameField.style.display = "none";
                fullNameField.style.display = "none";
                passwordFeedback.style.display = "none"; 
                submitBtn.textContent = "Sign In";
            } else {
                isSignUp = true;
                usernameField.style.display = "flex";
                fullNameField.style.display = "flex";
                passwordFeedback.style.display = "block";
                submitBtn.textContent = "Create Account";
            }
            updateButtonState();
        });
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (!submitBtn.disabled) {
            let finalName = isSignUp ? (usernameInput.value.trim() || fullNameInput.value.trim()) : emailInput.value.split("@")[0];

            displayName.textContent = finalName;
            mainApp.classList.add("hidden");
            welcomeScreen.classList.remove("hidden");
            
            // 🎆 BOOM! Confetti!
            fireConfetti();
        }
    });
});