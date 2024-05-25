document.addEventListener("DOMContentLoaded", () => {
    const menuSlider = document.getElementById('menu-slider');
    const sidebarBackdrop = document.querySelector('.sidebar-backdrop');
    const snackbar = document.querySelector(".snackbar");

    menuSlider.addEventListener("click", (event) => {
        const dashboard = document.querySelector('.sidebar');
        const sidebarBackdrop = document.querySelector('.sidebar-backdrop');
        dashboard.style.display = "block";
        sidebarBackdrop.style.display = "block";
    })

    sidebarBackdrop.addEventListener("click", () => {
        const dashboard = document.querySelector('.sidebar');
        const sidebarBackdrop = document.querySelector('.sidebar-backdrop');
        dashboard.style.display = "none";
        sidebarBackdrop.style.display = "none";
    })
} )