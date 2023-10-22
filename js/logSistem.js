const userList = JSON.parse(localStorage.getItem('userList')) || []

function doSignup() {
    const name = document.querySelector('#user').value
    const email = document.querySelector('#email').value
    const pass = document.querySelector('#pass').value
    const repass = document.querySelector('#repass').value

    let emailList = []
    userList.map(item => {
        emailList.push(item.email)
    })

    if (pass !== repass) {
        window.alert('Senhas diferentes!')
    } else if (emailList.includes(email)) {
        window.alert('O email já foi cadastrado!')
    } else {
        newUser = {"user":name, "pass":pass, "email":email}
        userList.push(newUser)
        localStorage.setItem('userList', JSON.stringify(userList))
        window.alert('Cadastrado com sucesso!')
        toLogin()
    }
}

function doLogin() {
    const email = document.querySelector('#email').value
    const pass = document.querySelector('#pass').value
    let index

    for (i in userList) {
        if (userList[i].email === email && userList[i].pass === pass){
            index = i
        }
    }

    if (index === undefined) {
        window.alert('Usuário ou senha inválido!')
    } else {
        const {user, email, pass} = userList[index]
        userData = {"user":user, "email":email, "pass": pass}
        localStorage.setItem('userData', JSON.stringify(userData))
        localStorage.setItem('isLoged', 'true')
        window.alert('Logado com sucesso!')
        window.location = 'index.html'
    }
}

function toSignup() {
    form.innerHTML = `
        <label for="user">Username: </label>
        <input type="text" name="user" id="user">
        <label for="email">Email: </label>
        <input type="email" name="email" id="email">
        <label for="pass">Password: </label>
        <input type="password" name="pass" id="pass">
        <label for="repass">Repeat password: </label>
        <input type="password" name="repass" id="repass">
        <div>
            <button onclick="doSignup()">Create Account</button>
            <button onclick="toLogin()">Sign-in</button>
        </div>
    `
}

function toLogin() {
    form.innerHTML = `
        <label for="email">Email: </label>
        <input type="email" name="email" id="email">
        <label for="pass">Password: </label>
        <input type="password" name="pass" id="pass">
        <div>
            <button onclick="doLogin()">Login</button>
            <button onclick="toSignup()">Signup</button>
        </div>
    `
}
