function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    // Hardcoded credentials for the example (you can replace with actual logic)
    const validUsername = "admin";
    const validPassword = "password123";

    if (username === validUsername && password === validPassword) {
        // Redirect to the admin dashboard (replace `admin-dashboard.html` with actual dashboard URL)
        window.location.href = "index.html";
    } else {
        errorMessage.textContent = "Invalid username or password";
    }
}
