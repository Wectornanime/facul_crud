let btnEnvFunc = 'add'
let indexBookUpdate = ''

const btn_log = document.querySelector('#btn_log')
const bookList = document.querySelector('tbody#bookList')

function envLivro() {
    if (JSON.parse(localStorage.getItem('isLoged'))) {
        const books = JSON.parse(localStorage.getItem('books')) || []
        
        const name = document.querySelector('input#name').value
        const author = document.querySelector('input#author').value
        const year = document.querySelector('input#year').value

        const newBook = {"name": name, "author": author, "year": year}
        if (btnEnvFunc === 'add') {
            books.push(newBook)

        } else {
            books.splice(indexBookUpdate, 1, newBook)

            btnEnvFunc = 'add'
            indexBookUpdate = ''
        }
        
        localStorage.setItem('books', JSON.stringify(books))
        updateList()

        document.querySelector('input#name').value = ''
        document.querySelector('input#author').value = ''
        document.querySelector('input#year').value = ''

    } else {
        window.alert('no loging')
    }
}

function getLivros() {
    const books = JSON.parse(localStorage.getItem('books')) || []
    for(let index in books) {
        const {name, author, year} = books[index];
        bookList.innerHTML += `
        <tr>
            <td>${name}</td>
            <td>${author}</td>
            <td>${year}</td>
            <td><button onclick='atualizarLivro(${index})'>Atualizar</button></td>
            <td><button onclick='deleteLivro(${index})'>Deletar</button></td>
        </tr>
        `
    }
}

function atualizarLivro(id) {
    if (JSON.parse(localStorage.getItem('isLoged'))) {
        const books = JSON.parse(localStorage.getItem('books')) || []
    
        const {name, author, year} = books[id]
        
        document.querySelector('input#name').value = name
        document.querySelector('input#author').value = author
        document.querySelector('input#year').value = year
        
        btnEnvFunc = 'update'
        indexBookUpdate = id
    } else {
        window.alert('no loging')
    }
}

function deleteLivro(id) {
    if (JSON.parse(localStorage.getItem('isLoged'))) {
        const books = JSON.parse(localStorage.getItem('books')) || []
    
        books.splice(id, 1);
    
        localStorage.setItem('books', JSON.stringify(books))
    
        updateList()    
    } else {
        window.alert('no loging')
    }
}

function updateList() {
    bookList.innerHTML = ''
    getLivros()
}

viewLog()
getLivros()
