/* ============================================================
   AgroHarvest — Shared Dashboard JS
   Session-based Login
   Sidebar Toggle
   Module Switching
   Reveal Animation
   Logout
   Toast
============================================================ */

/*==================================
        CURRENT USER
==================================*/

const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

if (!currentUser) {

    window.location.href = "login.html";

}

/*==================================
        USER HELPERS
==================================*/

function getRole() {

    return currentUser.role;

}

function getEmail() {

    return currentUser.email;

}

function getInitials(name) {

    return name.charAt(0).toUpperCase();

}

/*==================================
        PROFILE DETAILS
==================================*/

function fillUserInfo() {

    document.querySelectorAll(".profileName").forEach(name => {

        name.textContent = currentUser.name;

    });

    document.querySelectorAll(".profileRole").forEach(role => {

        role.textContent =
            currentUser.role.charAt(0).toUpperCase() +
            currentUser.role.slice(1);

    });

    document.querySelectorAll(".profileAvatar").forEach(avatar => {

        avatar.textContent =
            currentUser.name.charAt(0).toUpperCase();

    });

    // Topbar User

    const avatars = document.querySelectorAll(".tu-avatar");

    avatars.forEach(a => {

        a.textContent =
            getInitials(currentUser.name);

    });

    const names = document.querySelectorAll(".tu-info strong");

    names.forEach(n => {

        n.textContent =
            currentUser.name;

    });

}

/*==================================
        SIDEBAR TOGGLE
==================================*/

function initSidebarToggle() {

    const toggle = document.querySelector(".sidebar-toggle");

    const sidebar = document.querySelector(".sidebar");

    const overlay = document.querySelector(".sidebar-overlay");

    if (!toggle || !sidebar) return;

    function openSidebar() {

        sidebar.classList.add("open");

        toggle.classList.add("active");

        if (overlay) {

            overlay.classList.add("show");

        }

        document.body.style.overflow = "hidden";

    }

    function closeSidebar() {

        sidebar.classList.remove("open");

        toggle.classList.remove("active");

        if (overlay) {

            overlay.classList.remove("show");

        }

        document.body.style.overflow = "";

    }

    toggle.addEventListener("click", () => {

        sidebar.classList.contains("open")
            ? closeSidebar()
            : openSidebar();

    });

    if (overlay) {

        overlay.addEventListener("click", closeSidebar);

    }

    sidebar.querySelectorAll(".nav-item").forEach(item => {

        item.addEventListener("click", () => {

            if (window.innerWidth <= 900) {

                closeSidebar();

            }

        });

    });

}

/*==================================
        MODULE SWITCHING
==================================*/

function initModuleSwitching() {

    const navItems = document.querySelectorAll(".nav-item");

    const modules = document.querySelectorAll(".module");

    if (!navItems.length) return;

    navItems.forEach(item => {

        item.addEventListener("click", () => {

            const target = item.dataset.module;

            navItems.forEach(i => {

                i.classList.remove("active");

            });

            modules.forEach(m => {

                m.classList.remove("active");

            });

            item.classList.add("active");

            const module = document.querySelector(
                `.module[data-module="${target}"]`
            );

            if (module) {

                module.classList.add("active");

                module.querySelectorAll(".reveal").forEach(el => {

                    el.classList.remove("visible");

                    requestAnimationFrame(() => {

                        el.classList.add("visible");

                    });

                });

            }

            const title = document.querySelector(".topbar-title");

            if (title) {

                const label = item.querySelector(".ni-label");

                if (label) {

                    title.textContent = label.textContent;

                }

            }

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    });

}

/*==================================
        REVEAL ANIMATION
==================================*/

function initReveal() {

    const elements = document.querySelectorAll(".reveal");

    if (!elements.length) return;

    const observer = new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    }, {

        threshold: 0.1

    });

    elements.forEach(el => {

        observer.observe(el);

    });

}

/*==================================
            LOGOUT
==================================*/

function initLogout() {

    document.querySelectorAll(".btn-logout").forEach(btn => {

        btn.addEventListener("click", () => {

            sessionStorage.clear();

            window.location.href = "login.html";

        });

    });

}

/*==================================
            TOAST
==================================*/

function showToast(message) {

    let toast = document.querySelector(".toast");

    if (!toast) {

        toast = document.createElement("div");

        toast.className = "toast";

        document.body.appendChild(toast);

    }

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toast._timer);

    toast._timer = setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}

window.showToast = showToast;

/*==================================
        INIT
==================================*/

document.addEventListener("DOMContentLoaded", () => {

    fillUserInfo();

    initSidebarToggle();

    initModuleSwitching();

    initReveal();

    initLogout();

});