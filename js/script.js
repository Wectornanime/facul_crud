const userNameComponent = document.querySelector('p#userName')
const form = document.querySelector('form')

form.addEventListener('submit', (e) => {
    e.preventDefault()
})

function teste() {
    (localStorage.getItem('isLoged')) ? (console.log('ok')) : (console.log('no'))
}

function testeLogin() {
    userData = {"user":"Tester", "email":"tester@teste.com", "pass": "123"}
    localStorage.setItem('userData', JSON.stringify(userData))
    localStorage.setItem('isLoged', 'true')
    console.log('Tester logado')
    window.alert('Logado com sucesso!')
}

function doLogout() {
    localStorage.setItem('isLoged', 'false')
    localStorage.removeItem('userData')
    window.location = 'login.html'
    window.alert('Logoff feito com sucesso!')
}

function log() {
    if (JSON.parse(localStorage.getItem('isLoged'))) {
        doLogout()
    } else {
        window.location = 'login.html'
    }
}

function viewLog() {
    if (JSON.parse(localStorage.getItem('isLoged'))) {
        let userName = JSON.parse(localStorage.getItem('userData')).user
        userNameComponent.innerText = `Logado como ${userName}`
        btn_log.innerText = "Logout"
    } else {
        window.location = 'login.html'
    }
}
