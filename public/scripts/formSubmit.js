
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault(); 

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    axios.post('http://localhost:3000/api/user/login', { username, password })
        .then(response => {
            const token = response.data.token;
            console.log(response)
            localStorage.setItem('user', token); 
            alert('Login successful!');
        })
        .catch(error => {
            console.error('Error logging in:', error);
            alert('Login failed. Please try again.');
        });
});
