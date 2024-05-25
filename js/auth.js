document.addEventListener("DOMContentLoaded", ()=> {
    const authForm = document.getElementById("auth-form");
    const snackbar = document.querySelector(".snackbar");

    authForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const username = document.getElementById("username");
        const password = document.getElementById("password");

        if(username.value && password.value){
            localStorage.setItem("user", JSON.stringify({username}))
            window.location.href = "pages/dashboard.html";
        } else {
            snackbar.classList.add("show");
            setTimeout(() => {
                snackbar.classList.remove("show");
            }, 2000)
        }
    })
})