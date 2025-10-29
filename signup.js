// signup.js
import { auth, createUserWithEmailAndPassword } from "./auth.js";

document.getElementById("signup-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("Signup successful!");
      window.location.href = "index.html"; // or dashboard.html
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
});
