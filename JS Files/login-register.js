

//    register frm

function register() {
  
  const registerfname = document.getElementById("register-firstname").value;
  const registerlname = document.getElementById("register-lastname").value;
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;
  const confirmPassword = document.getElementById("register-confirm-password").value;


    if (registerfname === "" || registerlname === "" || email === "" || password === "" || confirmPassword === "") {
    alert("Please fill in all fields.");
    // showalert("Please fill in all fields.");
    return; 
    }

    if (password !== confirmPassword) {
    alert("passwords do not match!");
    return;
    }

   let users = JSON.parse(localStorage.getItem("users")) || [];

     const newUser = {
    firstName: registerfname,
    lastName: registerlname,
    email: email,
    password: password
     };

    users.push(newUser);

      localStorage.setItem("users", JSON.stringify(users));


  alert("successfully registered!");
  window.location.href = "../HTML Files/login.html";

}

// login frm

function login() {

  var profile = document.getElementById("profile");
  var login = document.getElementById("logintxt");

  const loginEmail = document.getElementById("login-email").value;
  const loginPassword = document.getElementById("login-password").value;


  if (loginEmail === "" || loginPassword === "") {
    alert("Please fill in all fields.");
    return;
  }

    const users = JSON.parse(localStorage.getItem("users")) || [];

  const matchedUser = users.find(user => user.email === loginEmail && user.password === loginPassword);

  if (matchedUser) {
    alert("successfully logged in!");
      localStorage.setItem("isLoggedIn", "true");
    window.location.href = "../HTML Files/Home.html";
    

  }
   else 
   {
    alert("Invalid email or password. Please try again");
  }
}

// Toggle password visibility

function togglePassword(inputId, iconElement) {

      const input = document.getElementById(inputId);
      const isPassword = input.type === "password";

      input.type = isPassword ? "text" : "password";

      iconElement.classList.toggle("fa-eye");
      iconElement.classList.toggle("fa-eye-slash");
    }


    // profile 

  //  document.addEventListener("DOMContentLoaded", function () {
  //   const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  //   const profile = document.getElementById("profile");
  //   const login = document.getElementById("logintxt");

  //   if (isLoggedIn) {
  //     profile.style.display = "flex";
  //     login.style.display = "none";
  //   } else {
  //     profile.style.display = "none";
  //     login.style.display = "flex";
  //   }
  // });

 


