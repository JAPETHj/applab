function signup() {
    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;
  
    if (username && password) {
      localStorage.setItem("user_" + username, JSON.stringify({ password, lastLogin: null }));
      alert("Signup successful! You can now login.");
    } else {
      alert("Please fill in both fields.");
    }
  }
  
  function login() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
  
    const storedUser = JSON.parse(localStorage.getItem("user_" + username));
  
    if (storedUser && storedUser.password === password) {
      const lastLoginTime = storedUser.lastLogin;
  
      // Update last login
      const currentTime = new Date().toLocaleString();
      storedUser.lastLogin = currentTime;
      localStorage.setItem("user_" + username, JSON.stringify(storedUser));
  
      // Show welcome
      document.getElementById("form-section").style.display = "none";
      document.getElementById("welcome-section").style.display = "block";
      document.getElementById("welcome-user").innerText = `Hello, ${username}!`;
  
      document.getElementById("last-login").innerText = lastLoginTime
        ? `Last login: ${lastLoginTime}`
        : "This is your first login!";
      
      localStorage.setItem("currentUser", username);
    } else {
      alert("Invalid username or password.");
    }
  }
  
  function logout() {
    localStorage.removeItem("currentUser");
    document.getElementById("form-section").style.display = "block";
    document.getElementById("welcome-section").style.display = "none";
  }
  
  // Auto login if user is still in session
  window.onload = function() {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      const user = JSON.parse(localStorage.getItem("user_" + currentUser));
      document.getElementById("form-section").style.display = "none";
      document.getElementById("welcome-section").style.display = "block";
      document.getElementById("welcome-user").innerText = `Hello, ${currentUser}!`;
      document.getElementById("last-login").innerText = user.lastLogin
        ? `Last login: ${user.lastLogin}`
        : "This is your first login!";
    }
  };
  