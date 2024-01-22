function checkLogin() {
  // Dummy check for demonstration purposes
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  if (username === "user@gmail.com" && password === "user") {
    alert("Login successful!"); // Replace with your actual login logic
    window.location.href = "../home";
  } else {
    document.getElementById("popup").classList.remove("hidden");
    document.getElementById("overlay").style.display = "block";
  }
}

function closePopup() {
  document.getElementById("popup").classList.add("hidden");
  document.getElementById("overlay").style.display = "none";
}
