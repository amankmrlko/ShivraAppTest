// OTP Input Navigation
const inputs = document.querySelectorAll(".otp-input");
inputs.forEach((input, index) => {
  input.addEventListener("input", (e) => {
    if (e.target.value.length === 1 && index < inputs.length - 1) {
      inputs[index + 1].focus(); // Move to next input
    }
  });
  input.addEventListener("keydown", (e) => {
    if (e.key === "Backspace" && index > 0 && !e.target.value) {
      inputs[index - 1].focus(); // Move to previous input on backspace
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("links");

  // Check if elements exist before adding event listener
  hamburger.addEventListener("click", function () {
    navLinks.classList.toggle("active");
  });
});

// Function to limit phone number input to 10 digits
function limitDigits(input) {
  input.value = input.value.slice(0, 10);
}

// Auto-filling the Amount
document.getElementById("Units").addEventListener("input", function () {
  let units = parseFloat(this.value) || 0; // Convert input to a number
  let pricePerUnit = 10; // Price per unit
  document.getElementById("amount").textContent = units * pricePerUnit; // Update amount
});

// Function to get the device ID from the URL
function getDeviceID() {
  let urlParams = new URLSearchParams(window.location.search);
  let deviceID = urlParams.keys().next().value || "No Device ID Found";
  document.getElementById("deviceID").textContent = deviceID;
}
getDeviceID();

// OTP Sending Logic
document.getElementById("sendotp").addEventListener("click", function () {
  let name = document.getElementById("name").value.trim();
  let phoneNumber = document.getElementById("mobile").value.trim();
  let units = document.getElementById("Units").value.trim();
  let deviceID = document.getElementById("deviceID").textContent.trim();

  // Basic Validation Checks
  if (!name) return alert("Please enter your Name.");
  if (!phoneNumber) return alert("Please enter your Phone Number.");
  if (!/^\d{10}$/.test(phoneNumber))
    return alert("Invalid phone number! Please enter a 10-digit number.");
  if (!units) return alert("Please enter the number of Units.");
  if (deviceID === "No Device ID Found")
    return alert(
      "Device ID not found! Please re-scan the QR code and try again."
    );

  // Add country code if missing
  if (!phoneNumber.startsWith("+91")) phoneNumber = "+91" + phoneNumber;

  sendOTP(phoneNumber);
});
