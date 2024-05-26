document.addEventListener("DOMContentLoaded", ()=> {
    const authForm = document.getElementById("auth-form");
    const snackbar = document.querySelector(".snackbar");
    const snackbarText = document.querySelector(".snackbar h1");
    const password = document.getElementById("password");
    const iconPassword = document.getElementById("icon-password");
    const iconImage = document.querySelector("#icon-password img")

    const showSnackbar = (message, type) => {
        snackbar.classList.remove('success', 'error');
        snackbar.classList.add(type);
        snackbarText.textContent = message
        snackbar.classList.add("show");
        setTimeout(() => {
            snackbar.classList.remove("show");
        }, 2000)
    }

    authForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const username = document.getElementById("username");
        const password = document.getElementById("password");

        if(username.value && password.value){
            localStorage.setItem("user", JSON.stringify({username}))
            window.location.href = "pages/dashboard.html";
            localStorage.setItem('selectedMenu', "Merchant Group");
        } else {
            showSnackbar("Form must be completed!", "error")
        }
    })

    iconPassword.addEventListener("click", () => {
        console.log('cek jalan');
        if (password.type === "password") {
            password.type = "text";
            iconImage.src = "image/eye-close.svg";
        } else {
            password.type = "password";
            iconImage.src = "image/eye-show.svg";
        }
    });
})