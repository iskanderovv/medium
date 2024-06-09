const loginForm = document.querySelector('.login__form');
const signBtn = document.querySelector('.signup-btn');


const loginUser = (e) => {
    e.preventDefault();

    const User = {
        email: loginForm["login-email"].value,
        password: loginForm["login-password"].value,
    }

    signBtn.setAttribute("disabled", true);
    signBtn.textContent = "Log In...";

    fetch("https://blogpost-server-production-d92d.up.railway.app/api/v1/user/login", {
        method: "POST",
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(User)
    })
        .then(res => res.json())
        .then(data => {
            if (data.status == "success") {
                localStorage.setItem('token', JSON.stringify(data.data.token));
                localStorage.setItem('email', JSON.stringify(data.data.user.email));
                signBtn.textContent = "Success";
                location.replace(location.origin + "/pages/dashboard.html");
            } else {
                signBtn.textContent = "Log In";
                alert("Nimadir xato !!!")
            }
        })
}

loginForm.addEventListener('submit', loginUser)