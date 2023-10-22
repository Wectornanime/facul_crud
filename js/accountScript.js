const user = document.querySelector('#user')
const email = document.querySelector('#email')
const oldpass = document.querySelector('#oldpass')
const newpass = document.querySelector('#newpass')
const repass = document.querySelector('#repass')
const accoutList = document.querySelector('#accountList')

const btn_name = document.querySelector('#btn_name')
const btn_email = document.querySelector('#btn_email')
const btn_pass = document.querySelector('#btn_pass')

const userData = JSON.parse(localStorage.getItem('userData'))
const users = JSON.parse(localStorage.getItem('userList'))

function getData() {
    user.value = userData.user
    email.value = userData.email
}

function getIndex() {
    for (i in users) {
        if (users[i].email === email){
            return i
        }
    }
}


function updateName() {
    userData.user = user.value
    localStorage.setItem('userData', JSON.stringify(userData))    
    
    users.splice(getIndex(userData.email), 1, userData)
    localStorage.setItem("userList", JSON.stringify(users))

    window.alert('Nome atualizado!')
    location.reload()
    btn_name.disabled = (user.value === userData.user)
}

function updateEmail() {
    let emailList = []
    users.map(item => {
        emailList.push(item.email)
    })

    if (emailList.includes(email.value)) {
        window.alert('O email já foi cadastrado!')
    } else {
        
        userData.email = email.value
        localStorage.setItem('userData', JSON.stringify(userData))
        
        users.splice(getIndex(userData.email), 1, userData)
        localStorage.setItem("userList", JSON.stringify(users))
        
        window.alert('Email atualizado!')
        location.reload()
        btn_email.disabled = (email.value === userData.email)
    }
}

function updatePass() {
    userData.pass = newpass.value
    localStorage.setItem('userData', JSON.stringify(userData))
    
    users.splice(getIndex(userData.email), 1, userData)
    localStorage.setItem("userList", JSON.stringify(users))
    
    location.reload()
    viewPass()
    window.alert('Senha atualizada!')
}



function viewPass() {
    if (oldpass.value === userData.pass && newpass.value === repass.value && oldpass.value !== newpass.value && newpass.value.length > 0) {
        btn_pass.disabled = false
    } else {
        btn_pass.disabled = true
    }
}

function deleteAccount() {
    if (window.confirm('Sua conta será deletada!')) {
        users.splice(getIndex(userData.email), 1)
        localStorage.setItem('userList', JSON.stringify(users))
        console.log('Conta deletada!')
        localStorage.removeItem('userData')
        localStorage.setItem('isLoged', 'false')
        window.location = 'index.html'
    } else {
        window.alert('Conta mantida!')
    }
}



function getUsers() {
    for(let index in users) {
        const {user, email} = users[index]
        accoutList.innerHTML += `
        <tr>
            <td contenteditable="${userData.email !== email}">${user}</td>
            <td class="td_email" contenteditable="${userData.email !== email}">${email}</td>
            <td><button onclick="deleteUser(${index})">Deletar</button></td>
            <td><button onclick="updateUser(${index})">Atualizar</button></td>
        </tr>
        `
    }
}


function deleteUser(index) {
    users.splice(index, 1)
    localStorage.setItem('userList', JSON.stringify(users))
    accoutList.innerHTML = ''
    location.reload()
}

function updateUser(index) {
    const iten = accoutList.children[index]
    const newData = {"user": iten.children[0].innerText, "email":iten.children[1].innerText,"pass": users[index].pass}
    users.splice(index, 1, newData)
    localStorage.setItem('userList', JSON.stringify(users))
    accoutList.innerHTML = ''
    location.reload()
}


user.addEventListener('keyup', () => {
    btn_name.disabled = (user.value === userData.user)
})

email.addEventListener('keyup', () => {
    btn_email.disabled = (email.value === userData.email)
})

oldpass.addEventListener('keyup', () => {
    viewPass()
})

newpass.addEventListener('keyup', () => {
    viewPass()
})

repass.addEventListener('keyup', () => {
    viewPass()
})



viewLog()
getData()
getUsers()
