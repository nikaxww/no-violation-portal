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