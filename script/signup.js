const signupForm = document.querySelector('.signup__form');
const submitBtn = document.querySelector('.signup-btn');

const registerUser = (e) => {
    e.preventDefault();

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
        submitBtn.textContent = "Sign Up";
        if (data.status === "success") {
            signupForm.textContent = "Success";
            location.replace(location.origin + "/pages/login.html");
        } else if (data.status === "error") {
            alert(data.message || "An error occurred during registration.");
        } else {
            signupForm.textContent = "Sign Up";
        }
    })
    .catch(error => {
        submitBtn.removeAttribute("disabled");
        submitBtn.textContent = "Sign Up";
        alert("An error occurred: " + error.message);
    });
}

signupForm.addEventListener('submit', registerUser);
