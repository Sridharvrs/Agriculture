document.addEventListener("DOMContentLoaded", () => {

    /*==================================
            ELEMENTS
    ==================================*/

    const loginForm = document.getElementById("loginForm");

    const email = document.getElementById("lemail");
    const password = document.getElementById("lpass");

    const pwdToggle = document.getElementById("pwdToggle");

    const formError = document.getElementById("loginError");
    const formOk = document.getElementById("loginSuccess");

    const submitBtn = document.querySelector(".btn-signin");

    const roleBtns = document.querySelectorAll(".role-card");

    const roleLabel = document.getElementById("roleLabel");

    /*==================================
            RESET FORM
    ==================================*/

    loginForm.reset();

    let currentRole = "member";

    const roles = {
        member: {
            label: "Member",
            placeholder: "member@agroharvest.com"
        },
        farmer: {
            label: "Farmer",
            placeholder: "farmer@agroharvest.com"
        },
        admin: {
            label: "Admin",
            placeholder: "admin@agroharvest.com"
        }
    };

    /*==================================
            ROLE SELECTOR
    ==================================*/

    roleBtns.forEach(btn => {

        btn.addEventListener("click", () => {

            roleBtns.forEach(card => card.classList.remove("active"));

            btn.classList.add("active");

            currentRole = btn.dataset.role;

            roleLabel.textContent = "as " + roles[currentRole].label;

            email.placeholder = roles[currentRole].placeholder;

            submitBtn.textContent =
                "Sign In as " + roles[currentRole].label + " →";

        });

    });

    /*==================================
        PASSWORD TOGGLE
    ==================================*/


const icon = pwdToggle.querySelector("i");

pwdToggle.addEventListener("click", function () {

    if (password.type === "password") {

        password.type = "text";

        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");

    } else {

        password.type = "password";

        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");

    }

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
        HIDE ERROR WHILE TYPING
    ==================================*/

    [email, password].forEach(input => {

        input.addEventListener("input", () => {

            formError.classList.remove("show");

            formOk.classList.remove("show");

        });

    });

    /*==================================
            LOGIN
    ==================================*/

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        formError.classList.remove("show");

        formOk.classList.remove("show");

        const emailValue = email.value.trim();

        const passwordValue = password.value.trim();

        /*==============================
            EMAIL VALIDATION
        ==============================*/

        if (!validateEmail(emailValue)) {

            formError.textContent =
                "Please enter a valid email address.";

            formError.classList.add("show");

            return;

        }

        /*==============================
            PASSWORD EMPTY
        ==============================*/

        if (passwordValue === "") {

            formError.textContent =
                "Please enter your password.";

            formError.classList.add("show");

            return;

        }

        /*==============================
            PASSWORD VALIDATION
        ==============================*/

        if (!validatePassword(passwordValue)) {

            formError.textContent =
                "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character.";

            formError.classList.add("show");

            return;

        }

        /*==============================
            BUTTON LOADING
        ==============================*/

        submitBtn.disabled = true;

        const originalText = submitBtn.textContent;

        submitBtn.textContent = "Signing In...";

        setTimeout(() => {

            /*==============================
                SAVE USER
            ==============================*/

            const currentUser = {

                name: emailValue.split("@")[0],

                email: emailValue,

                role: currentRole

            };

            sessionStorage.setItem(
                "currentUser",
                JSON.stringify(currentUser)
            );

            localStorage.setItem(
                "agro_role",
                currentRole
            );

            localStorage.setItem(
                "agro_email",
                emailValue
            );

            /*==============================
                SUCCESS
            ==============================*/

            formOk.textContent =
                "✓ Login Successful! Redirecting...";

            formOk.classList.add("show");

            submitBtn.disabled = false;

            submitBtn.textContent = originalText;

            /*==============================
                REDIRECT
            ==============================*/

            setTimeout(() => {

                switch (currentRole) {

                    case "admin":

                        window.location.href = "admin.html";

                        break;

                    case "farmer":

                        window.location.href = "farmer.html";

                        break;

                    default:

                        window.location.href = "member.html";

                }

            }, 1000);

        }, 1200);

    });

});