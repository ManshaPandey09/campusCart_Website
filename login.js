// login.js
import { auth, signInWithEmailAndPassword } from "./auth.js";

document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Login successful!");
      window.location.href = "index.html";
    })
    .catch((error) => {
      alert("Login failed: " + error.message);
    });
});
