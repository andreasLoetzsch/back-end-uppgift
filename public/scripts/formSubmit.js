const content = document.getElementById('content')
const userHeader = document.getElementById('userHeader');
let  userId = null
let accessToken = ''

document.addEventListener('DOMContentLoaded', function () {
    console.log('Document is fully loaded and parsed');
    const userData = JSON.parse(localStorage.getItem('user'))
    if(userData !== null){
         accessToken = userData.token 
    console.log(userData)
    userId = userData.userId 
    }
    loadPage(accessToken)
});


function initRegister() {
    const loginBtn = document.getElementById('login-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function (e) {
            e.preventDefault();
            axios
                .get('http://localhost:3000/api/getHtml/sign-in')
                .then((response) => {
                    content.innerHTML = response.data;


                    initLogin();
                })
                .catch((error) => {
                    console.error('Error loading sign-in page:', error);
                });
        });
    }
}

function initLogin() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            axios
                .post('http://localhost:3000/api/user/login', { username, password })
                .then((response) => {
                    const token = response.data.token;
                    const loginUserId = response.data.userId
                    localStorage.setItem('user', JSON.stringify({token, userId: loginUserId}));
                    accessToken = token
                    userId = loginUserId
                    loadPage(token)
                })
                .catch((error) => {
                    console.error('Error logging in:', error);
                });
        });
    }
}

function editUser(body) {
    console.log(body)
    axios.patch('http://localhost:3000/api/user', body , { headers: {Authorization: accessToken} })
    .then(response => {
        const userLocalStorage = JSON.parse(localStorage.getItem('user'))
        userLocalStorage.token = response.data.token
        const updatedLocalStorage = JSON.stringify(userLocalStorage)
        localStorage.setItem('user', updatedLocalStorage)
    })
    .catch(error => {
        console.error('Error logging in:', error);
        alert('Error init page');
    });
}

function initUserProfile() {
    axios.get(`http://localhost:3000/api/user/`, { headers: {Authorization: accessToken} })
        .then(response => {
         const data = response.data.user
         addListItem(data, editUser, deleteUser)
        })
        .catch(error => {
            console.error('Error logging in:', error);
            alert('Error init page');
        });
}

function deleteUser() {
    axios.delete(`http://localhost:3000/api/user/`, { headers: {Authorization: accessToken} })
        .then(response => {
            localStorage.removeItem('user')
            location.reload(true)
        })
        .catch(error => {
            console.error('Error logging in:', error);
            alert('Error init page');
        });
}

