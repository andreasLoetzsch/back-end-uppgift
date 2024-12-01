const content = document.getElementById('content')

document.getElementById('login-btn').addEventListener('click', function(e) {
    e.preventDefault()

    const token = localStorage.getItem('user')

    axios.post('http://localhost:3000/api/getHtml/sign-in',{}, { headers: {Authorization: token} })
        .then(response => {
            while (content.firstChild) {
                content.removeChild(content.firstChild);
            }
            console.log(response)
            content.innerHTML = response.data
            const loginForm = document.getElementById('loginForm')
            console.log(loginForm)
            if(loginForm){
                loginForm.addEventListener('submit', function (e) {
                    e.preventDefault(); 
                
                    const username = document.getElementById('username').value;
                    const password = document.getElementById('password').value;
                
                    axios.post('http://localhost:3000/api/user/login', { username, password })
                        .then(response => {
                            const token = response.data.token;
                            console.log(response)
                            localStorage.setItem('user', token); 
                        })
                        .catch(error => {
                            console.error('Error logging in:', error);
                            alert('Login failed. Please try again.');
                        });
                });
            }
            
        })
        .catch(error => {
            console.error('Error logging in:', error);
            alert('Login failed. Please try again.');
        });
})

