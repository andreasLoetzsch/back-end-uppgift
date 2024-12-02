
function addListItem(data, editFunc, deleteFunc) {
    const userData = document.getElementById('user-data')
    const userItem = document.createElement("li");
    userItem.innerHTML = `<input type="text" class="username-input" value="${data.username}" disabled>
         <input type="text" class="password-input" value="${data.password}" disabled>
         <input type="text" value="${data.email}" disabled>
         <button id="btn-edit" class="btn-edit">Redigera</button>
         <button id="btn-delete" class="btn-delete">Radera</button>`;
    userData.appendChild(userItem);
    
    const editBtn = document.getElementById('btn-edit')
    const deleteBtn = document.getElementById('btn-delete')

    editBtn.onclick = () => {
      editListItem(userItem, editFunc)
      
    }

    deleteBtn.onclick = () => {
        deleteListItem(userItem, deleteFunc)
    }

}

function editListItem(userItem, editFunc){
    const usernameInput = userItem.querySelector('.username-input')
    const passwordInput = userItem.querySelector('.password-input')
    const editBtn = userItem.querySelector(".btn-edit");

    if (usernameInput.disabled && passwordInput.disabled) {
        usernameInput.disabled = false;
        passwordInput.disabled = false;
        editBtn.textContent = "Spara";
       
    } else {
        if (usernameInput.value == "" || passwordInput.value == "") {
            return; 
        }
        usernameInput.disabled = true;
        passwordInput.disabled = true;
        editBtn.textContent = "Redigera";
        editFunc({
            username: usernameInput.value,
            password: passwordInput.value
        })
    }
} 

function deleteListItem (userItem, deleteFunc){
    userItem.remove()
    deleteFunc()
}

