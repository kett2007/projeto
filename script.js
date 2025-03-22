// Função para salvar o usuário no localStorage
function saveUser(username, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
}

// Função para fazer login
function loginUser(username, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username && u.password === password);
    return user;
}

// Cadastro
const formCadastro = document.getElementById('formCadastro');
if (formCadastro) {
    formCadastro.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Salva o usuário no localStorage
        saveUser(username, password);
        
        // Redireciona para a página de login após cadastro
        window.location.href = 'login.html';
    });
}

// Login
const formLogin = document.getElementById('formLogin');
if (formLogin) {
    formLogin.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        
        const user = loginUser(username, password);
        
        if (user) {
            // Salva o usuário logado no sessionStorage
            sessionStorage.setItem('loggedInUser', username);
            window.location.href = 'dashboard.html'; // Redireciona para o dashboard
        } else {
            alert('Usuário ou senha inválidos');
        }
    });
}

// Exibir nome no Dashboard
const userNameDisplay = document.getElementById('userName');
if (userNameDisplay) {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    if (loggedInUser) {
        userNameDisplay.textContent = loggedInUser;
    } else {
        window.location.href = 'login.html'; // Redireciona para login se não estiver logado
    }
}

// Logout
const logoutButton = document.getElementById('logoutButton');
if (logoutButton) {
    logoutButton.addEventListener('click', function () {
        sessionStorage.removeItem('loggedInUser');
        window.location.href = 'login.html'; // Redireciona para login
    });
}
