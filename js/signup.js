document.addEventListener("DOMContentLoaded", () => {

    /*==================================
            ELEMENTS
    ==================================*/

    const form = document.getElementById("signupForm");

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");

    const emailLabel = document.getElementById("emailLabel");

    const togglePassword = document.getElementById("togglePassword");
    const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");

    const submitBtn = document.querySelector(".signup-submit");

    const messageBox = document.getElementById("signupMessage");

    const terms = document.querySelector(".remember input");

    const roleBtns = document.querySelectorAll(".role-btn");

    const strengthFill = document.getElementById("strengthFill");
    const strengthText = document.getElementById("strengthText");

    /*==================================
            CURRENT ROLE
    ==================================*/

    let currentRole = "member";

    /*==================================
            ROLE SELECTOR
    ==================================*/

    const labels = {
        member: {
            label: "Email Address",
            placeholder: "you@email.com"
        },
        farmer: {
            label: "Farm Email or Partner ID",
            placeholder: "farmer@agroharvest.com"
        },
        admin: {
            label: "Admin Username",
            placeholder: "admin username"
        }
    };

    roleBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            roleBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            currentRole = btn.dataset.role;
            emailLabel.textContent = labels[currentRole].label;
            email.placeholder = labels[currentRole].placeholder;
        });
    });

    /*==================================
        PASSWORD TOGGLE
    ==================================*/

    function toggle(input, button) {
        const icon = button.querySelector("i");
        if (input.type === "password") {
            input.type = "text";
            icon.classList.remove("fa-eye");
            icon.classList.add("fa-eye-slash");
        } else {
            input.type = "password";
            icon.classList.remove("fa-eye-slash");
            icon.classList.add("fa-eye");
        }
    }

    togglePassword.addEventListener("click", () => {
        toggle(password, togglePassword);
    });

    toggleConfirmPassword.addEventListener("click", () => {
        toggle(confirmPassword, toggleConfirmPassword);
    });

    /*==================================
        PASSWORD STRENGTH METER
    ==================================*/

    function updateStrength(value) {
        strengthFill.className = "strength-fill";
        if (!value) {
            strengthText.textContent = "Enter a password";
            return;
        }
        let score = 0;
        if (value.length >= 8) score++;
        if (/[a-z]/.test(value)) score++;
        if (/[A-Z]/.test(value)) score++;
        if (/\d/.test(value)) score++;
        if (/[@$!%*?&^#()_\-+=]/.test(value)) score++;

        if (score <= 2) {
            strengthFill.classList.add("weak");
            strengthText.textContent = "Weak password";
        } else if (score <= 4) {
            strengthFill.classList.add("fair");
            strengthText.textContent = "Fair password";
        } else {
            strengthFill.classList.add("strong");
            strengthText.textContent = "Strong password";
        }
    }

    password.addEventListener("input", () => {
        updateStrength(password.value);
    });

    /*==================================
        SOCIAL BUTTONS
    ==================================*/

    document.querySelectorAll(".social-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            showMessage("Social signup is not available in this demo.");
        });
    });

    /*==================================
        VALIDATION
    ==================================*/

    function validateEmail(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    function validatePassword(value) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_\-+=])[A-Za-z\d@$!%*?&^#()_\-+=]{8,}$/.test(value);
    }

    /*==================================
        MESSAGE
    ==================================*/

    function showMessage(text, success = false) {
        messageBox.hidden = false;
        messageBox.classList.add("show");
        messageBox.textContent = text;
        if (success) {
            messageBox.style.background = "#DCFCE7";
            messageBox.style.color = "#166534";
            messageBox.style.border = "1px solid #86EFAC";
        } else {
            messageBox.style.background = "#FEE2E2";
            messageBox.style.color = "#991B1B";
            messageBox.style.border = "1px solid #FCA5A5";
        }
    }

    /*==================================
        REMOVE MESSAGE
    ==================================*/

    [name, email, password, confirmPassword].forEach(input => {
        input.addEventListener("input", () => {
            messageBox.hidden = true;
        });
    });

    /*==================================
            SUBMIT
    ==================================*/

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        messageBox.hidden = true;

        if (name.value.trim().length < 3) {
            showMessage("Please enter your full name.");
            name.focus();
            return;
        }

        if (!validateEmail(email.value.trim())) {
            showMessage("Please enter a valid email address.");
            email.focus();
            return;
        }

        if (!validatePassword(password.value)) {
            showMessage(
                "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character."
            );
            password.focus();
            return;
        }

        if (password.value !== confirmPassword.value) {
            showMessage("Passwords do not match.");
            confirmPassword.focus();
            return;
        }

        if (!terms.checked) {
            showMessage("Please accept the Terms & Privacy Policy.");
            return;
        }

        /*==============================
            BUTTON LOADING
        ==============================*/

        submitBtn.disabled = true;

        const originalText = submitBtn.textContent;

        submitBtn.textContent = "Creating Account...";

        setTimeout(() => {

            const newUser = {
                name: name.value.trim(),
                email: email.value.trim(),
                role: currentRole
            };

            sessionStorage.setItem(
                "registeredUser",
                JSON.stringify(newUser)
            );

            // Show success message
            showMessage(
                "✓ Account created successfully! Redirecting to Login...",
                true
            );

            // Reset form
            form.reset();

            // Reset strength meter
            strengthFill.className = "strength-fill";
            strengthText.textContent = "Enter a password";

            // Restore button
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;

            // Redirect after 2 seconds
            setTimeout(() => {
                window.location.href = "login.html";
            }, 2000);

        }, 1500);

    });

});
