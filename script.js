// Signup Page
const signupForm = document.getElementById("signupForm");
const signupMessage = document.getElementById("signupMessage");

signupForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Create a random 16-byte access token (for demonstration purposes only)
  const accessToken = generateAccessToken();

  // Save user details to local storage
  const user = {
    username,
    email,
    accessToken,
  };

  localStorage.setItem("user", JSON.stringify(user));
  signupForm.reset();

  // Display success message and redirect to the Profile page after a short delay
  signupMessage.innerText = "Signup successful! Redirecting to Profile...";
  setTimeout(() => {
    window.location.href = "profile.html";
  }, 1500);
});

function generateAccessToken() {
  // Generate a random 16-byte string (for demonstration purposes only)
  const randomBytes = new Uint8Array(16);
  window.crypto.getRandomValues(randomBytes);
  return Array.from(randomBytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

// Profile Page
const profileInfo = document.getElementById("profileInfo");
const logoutBtn = document.getElementById("logoutBtn");

// Check if the user is logged in
const user = JSON.parse(localStorage.getItem("user"));

if (user) {
  // Display the user's details on the Profile page
  profileInfo.innerHTML = `
    <p><strong>Username:</strong> ${user.username}</p>
    <p><strong>Email:</strong> ${user.email}</p>
  `;

  // Logout functionality
  logoutBtn.addEventListener("click", function () {
    // Clear the user data from local storage and redirect to Signup page
    localStorage.removeItem("user");
    window.location.href = "index.html";
  });
} else {
  // Redirect to Signup page if the user is not logged in
  window.location.href = "index.html";
}