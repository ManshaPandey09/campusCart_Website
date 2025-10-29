/* coupon copy */
function copyCode(button) {
  var code = button.parentNode.querySelector('.code').innerHTML;
  navigator.clipboard.writeText(code).then(function() {
    alert("Code copied to clipboard: " + code);
  }, function(err) {
    alert("Failed to copy code: ", err);
  });
}

/* side bar mobile view */
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
  bar.addEventListener('click', () => {
    nav.classList.add('active');
  });
}

if (close) {
  close.addEventListener('click', () => {
    nav.classList.remove('active');
  });
}

function openModal(id) {
  document.getElementById(id).style.display = "block";
}
function closeModal(id) {
  document.getElementById(id).style.display = "none";
}
function switchToSignup() {
  closeModal('loginModal');
  openModal('signupModal');
}
function switchToLogin() {
  closeModal('signupModal');
  openModal('loginModal');
}



