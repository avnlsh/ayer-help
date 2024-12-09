document.getElementById("login-form").addEventListener("submit", function(event) {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const age = document.getElementById("age").value;
    const gender = document.getElementById("gender").value;
  
    if (!name || !email || !password || !age || !gender) {
      alert("Please fill out all fields.");
      event.preventDefault();
    } else if (age < 0) {
      alert("Age must be a positive number.");
      event.preventDefault();
    }
  });
  