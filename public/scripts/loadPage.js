const loadPage = (accessToken) => {
    axios.get('http://localhost:3000/api/getHtml/page-init', { headers: {Authorization: accessToken} })
        .then(response => {
            content.innerHTML = response.data.content
            if(!response.data.isLoggedIn){
                initRegister()
            }else {
                initUserProfile()
            }
        })
        .catch(error => {
            console.error('Error logging in:', error);
            alert('Error init page');
        });
}