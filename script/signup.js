const signupForm = document.querySelector('.signup__form');
const submitBtn = document.querySelector('.signup-btn');


const registerUser = (e) => {
    e.preventDefault();

    // const configureToast = (message, type) => {
    //     Toastify({
    //         text: message,
    //         className: type,
    //         style: {
    //             background: "linear-gradient(to right, #00b09b, #96c93d)",
    //         }
    //     }).showToast();
    // }

    const User = {
        name: signupForm["signup-firstname"].value,
        email: signupForm["signup-email"].value,
        password: signupForm["signup-password"].value
    }


    submitBtn.setAttribute("disabled", true);
    submitBtn.textContent = "Registering...";

    fetch("https://blogpost-server-production-d92d.up.railway.app/api/v1/user/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(User)

    })
        .then(res => res.json())
        .then(data => {
            submitBtn.removeAttribute("disabled");
            console.log(data);
            if (data.status == "success") {
                signupForm.textContent = "Success";
                location.replace(location.origin + "/pages/login.html");
            } else {
                signupForm.textContent = "Sign Up";
                alert("Nimadir xato !!!")
            }
        })
}


signupForm.addEventListener('submit', registerUser);