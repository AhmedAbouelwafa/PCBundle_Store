window.onload = function() {

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const currentEmail = localStorage.getItem("currentUser");


   if (!currentEmail || users.length === 0) {
    alert("يجب تسجيل الدخول أولاً");
    window.location.href = "login.html";
    return;
  }

const user = users.find(u => u.email === currentEmail);

  if (!user) {
    alert("حدث خطأ: المستخدم غير موجود.");
    window.location.href = "login.html";
    return;
  }

  document.getElementById("profile-name").textContent = user.firstName + " " + user.lastName;
  document.getElementById("profile-email").textContent = user.email;
  document.getElementById("password").textContent = "********"; // Hide password for security

};


function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
}