function signup() {
    const username = document.getElementById("signup-username").value.trim();
    const password = document.getElementById("signup-password").value.trim();
  
    if (username && password) {
      const userExists = localStorage.getItem("user_" + username);
      if (userExists) {
        alert("Username already exists!");
        return;
      }
  
      const newUser = {
        password: password,
        totalLogins: 0,
        successfulLogins: 0
      };
  
      localStorage.setItem("user_" + username, JSON.stringify(newUser));
      alert("Signup successful! You can now log in.");
    } else {
      alert("Please fill in both fields.");
    }
  }
  
  function login() {
    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value.trim();
  
    const storedUser = JSON.parse(localStorage.getItem("user_" + username));
  
    if (storedUser) {
      storedUser.totalLogins += 1;
  
      if (storedUser.password === password) {
        storedUser.successfulLogins += 1;
        localStorage.setItem("user_" + username, JSON.stringify(storedUser));
  
        document.getElementById("form-section").style.display = "none";
        document.getElementById("welcome-section").style.display = "block";
        document.getElementById("welcome-user").innerText = `Hello, ${username}!`;
        document.getElementById("login-stats").innerText =
          `Total login attempts: ${storedUser.totalLogins}, Successful logins: ${storedUser.successfulLogins}`;
        
        localStorage.setItem("currentUser", username);
      } else {
        localStorage.setItem("user_" + username, JSON.stringify(storedUser));
        alert("Incorrect password.");
      }
    } else {
      alert("User not found.");
    }
  }
  
  function logout() {
    localStorage.removeItem("currentUser");
    document.getElementById("form-section").style.display = "block";
    document.getElementById("welcome-section").style.display = "none";
  }
  
  window.onload = function () {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      const user = JSON.parse(localStorage.getItem("user_" + currentUser));
      document.getElementById("form-section").style.display = "none";
      document.getElementById("welcome-section").style.display = "block";
      document.getElementById("welcome-user").innerText = `Hello, ${currentUser}!`;
      document.getElementById("login-stats").innerText =
        `Total login attempts: ${user.totalLogins}, Successful logins: ${user.successfulLogins}`;
    }
  };
  