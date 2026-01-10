let students = JSON.parse(localStorage.getItem('students')) || []
let currentSt = JSON.parse(localStorage.getItem('currentSt')) || null

function createRegForm() {
    const form = document.createElement('form')

    const reg = document.createElement('h1')
    const fioInput = document.createElement('input')
    const phoneInput = document.createElement('input')
    const emailInput = document.createElement('input')
    const loginInput = document.createElement('input')
    const passwordInput = document.createElement('input')

    const regButton = document.createElement('button')

    form.classList.add('form')
    reg.classList.add('h1')
    fioInput.classList.add('input')
    phoneInput.classList.add('input')
    emailInput.classList.add('input')
    loginInput.classList.add('input')
    passwordInput.classList.add('input')
    regButton.classList.add('button')

    fioInput.type = 'text'
    phoneInput.type = 'tel'
    emailInput.type = 'email' 
    loginInput.type = 'text'
    passwordInput.type = 'password'

    fioInput.placeholder = 'Введите ФИО*'
    phoneInput.placeholder = 'Введите телефон*'
    emailInput.placeholder = 'Введите email*'
    loginInput.placeholder = 'Введите логин*'
    passwordInput.placeholder = 'Введите пароль*'
    reg.textContent = 'Регистрация'

    regButton.textContent = 'Зарегестрироваться'
    regButton.type = 'button'

    form.append(reg)
    form.append(fioInput)
    form.append(phoneInput)
    form.append(emailInput)
    form.append(loginInput)
    form.append(passwordInput)
    form.append(regButton)

    return {
        form,
        reg,
        fioInput,
        phoneInput,
        emailInput,
        loginInput,
        passwordInput,
        regButton
    }
}

function createAuthForm() {
    const form = document.createElement('form')

    const auth = document.createElement('h1')
    const loginInput = document.createElement('input')
    const passwordInput = document.createElement('input')

    const authButton = document.createElement('button')

    form.classList.add('form')
    auth.classList.add('h1')
    loginInput.classList.add('input')
    passwordInput.classList.add('input')
    authButton.classList.add('button')

    loginInput.type = 'text'
    passwordInput.type = 'password'

    loginInput.placeholder = 'Введите логин*'
    passwordInput.placeholder = 'Введите пароль*'
    auth.textContent = 'Авторизация'

    authButton.textContent = 'Войти'
    authButton.type = 'button' 

    form.append(auth)
    form.append(loginInput)
    form.append(passwordInput)
    form.append(authButton)

    return {
        form,
        auth,
        loginInput,
        passwordInput,
        authButton
    }
}

function addStudentToArray(student) {
    students.push(student)
    localStorage.setItem('students', JSON.stringify(students))
    console.log(students)
}

function createRegApp() {
    const container = document.getElementById('app-students')

    const regForm = createRegForm()
    container.append(regForm.form)

    const btnAuthLink = document.createElement('button')
    btnAuthLink.classList.add('buttonAuthLink')
    btnAuthLink.textContent = 'Уже есть аккаунт? Войти'
    btnAuthLink.addEventListener('click', createAuthApp)
    regForm.form.append(btnAuthLink)

    regForm.regButton.addEventListener('click', (e) => {
        e.preventDefault()

        const fio = regForm.fioInput.value.trim()
        const phone = regForm.phoneInput.value.trim()
        const email = regForm.emailInput.value.trim()
        const loginInput = regForm.loginInput.value.trim()
        const passwordInput = regForm.passwordInput.value.trim()

        if (fio !== '' && phone !== '' && email !== '' && login !== '' && password !== '') {
            if (passwordInput.length >= 6) {
                const existingUser = students.find(s => s.loginInput === loginInput)
                if (existingUser) {
                    alert('Пользователь с таким логином уже существует!')
                    return;
                }
                let student = {
                    fio: fio,
                    phone: phone,
                    email: email,
                    login: login,
                    password: password
                }
                addStudentToArray(student)
                currentSt = student
                localStorage.setItem('currentSt', JSON.stringify(student))
                welcomeText(student.name, student.surname)
            } else {
                alert('Короткий пароль!')
            }
        } else {
            alert('Заполните все поля!')
        }
    })
}

function createAuthApp() {
    const container = document.getElementById('app-students')
    container.innerHTML = ''

    const authForm = createAuthForm()
    container.append(authForm.form)

    const btnRegLink = document.createElement('button')
    btnRegLink.classList.add('buttonRegLink')
    btnRegLink.textContent = 'Нет аккаунта? Зарегистрируйтесь'
    btnRegLink.addEventListener('click', () => {
        container.innerHTML = ''
        createRegApp()
    })
    authForm.form.append(btnRegLink)

    authForm.authButton.addEventListener('click', (e) => {
        e.preventDefault()
        const loginInput = authForm.loginInput.value.trim()
        const passwordInput = authForm.passwordInput.value.trim()

        if (loginInput === '' || passwordInput === '') {
            alert('Заполните все поля!')
            return
        }
        const user = students.find(s => s.login === loginInput && s.password === passwordInput)
        if (user) {
            currentSt = user
            localStorage.setItem('currentSt', JSON.stringify(user))
            welcomeText(user.name, user.surname)
        } else {
            alert('Пользователя с таким логином не существует!')
            return
        }
    })
}

document.addEventListener('DOMContentLoaded', createRegApp)