let peoples = JSON.parse(localStorage.getItem('peoples')) || []
let currentPep = JSON.parse(localStorage.getItem('currentPep')) || null

let applications = JSON.parse(localStorage.getItem('applications')) || []

function saveApplications() {
    localStorage.setItem('applications', JSON.stringify(applications))
}



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

function createApplicationsPage() {
    const container = document.getElementById('app-students');
    container.innerHTML = '';

    const headerContainer = document.createElement('div'); 
    const title = document.createElement('h1');
    const backButton = document.createElement('button');
    const newAppButton = document.createElement('button');
    const appsList = document.createElement('div');
    const buttonWrapper = document.createElement('div');
    
    buttonWrapper.style.textAlign = 'center';
    headerContainer.classList.add('header-with-back');
    title.classList.add('h1');
    backButton.classList.add('button', 'back-button');
    newAppButton.classList.add('button');
    appsList.classList.add('applications-list');

    title.textContent = 'Мои заявления';
    backButton.textContent = 'Выйти';
    newAppButton.textContent = 'Подать новое заявление';

    headerContainer.append(backButton);
    headerContainer.append(title);
    buttonWrapper.append(newAppButton);
    container.append(headerContainer);
    container.append(buttonWrapper);
    container.append(appsList);

    setupApplicationsPage(backButton, newAppButton, appsList);
}

function createNewApplicationForm() {
    const container = document.getElementById('app-students');
    container.innerHTML = '';

    const form = document.createElement('form');
    const title = document.createElement('h1');
    const regNumberInput = document.createElement('input');
    const descriptionInput = document.createElement('textarea');
    const submitButton = document.createElement('button');
    const cancelButton = document.createElement('button');

    form.classList.add('form');
    title.classList.add('h1');
    regNumberInput.classList.add('input');
    descriptionInput.classList.add('input');
    submitButton.classList.add('button');
    cancelButton.classList.add('button');

    title.textContent = 'Новое заявление';

    regNumberInput.type = 'text';
    regNumberInput.placeholder = 'Государственный регистрационный номер автомобиля*';

    descriptionInput.placeholder = 'Описание нарушения*';
    descriptionInput.rows = 4;

    submitButton.type = 'button';
    submitButton.textContent = 'Отправить заявление';

    cancelButton.type = 'button';
    cancelButton.textContent = 'Отмена';

    form.append(title, regNumberInput, descriptionInput, submitButton, cancelButton);
    container.append(form);

    setupNewApplicationForm(submitButton, cancelButton, regNumberInput, descriptionInput);
}

function setupNewApplicationForm(submitButton, cancelButton, regNumberInput, descriptionInput) {

    cancelButton.addEventListener('click', () => {
        createApplicationsPage();
    });

    submitButton.addEventListener('click', (e) => {
        e.preventDefault();

        const regNumber = regNumberInput.value.trim();
        const description = descriptionInput.value.trim();

        if (regNumber === '' || description === '') {
            alert('Пожалуйста, заполните все поля!');
            return;
        }

        const newApp = {
            userId: currentPep.login,
            regNumber: regNumber,
            description: description,
            status: 'Новое',
            createdAt: new Date().toISOString()
        };

        applications.push(newApp);
        saveApplications();
        alert('Заявление успешно отправлено!');
        createApplicationsPage();
    });
}

function setupApplicationsPage(backButton, newAppButton, appsList) {

    backButton.addEventListener('click', () => {
        createAuthApp();
    });
    newAppButton.addEventListener('click', createNewApplicationForm);


    const userApps = applications.filter(app => app.userId === currentPep.login);
    appsList.innerHTML = ''; 

    if (userApps.length === 0) {
        const noApps = document.createElement('p');
        noApps.textContent = 'У вас пока нет поданных заявлений.';
        appsList.append(noApps);
    } else {
        userApps.forEach(app => {
            const appItem = document.createElement('div');
            const regNum = document.createElement('p');
            const desc = document.createElement('p');
            const status = document.createElement('p');

            appItem.classList.add('application-item');

            regNum.textContent = `Гос. номер: ${app.regNumber}`;
            desc.textContent = `Описание: ${app.description}`;
            status.textContent = `Статус: ${app.status || 'Новое'}`;

            appItem.append(regNum);
            appItem.append(desc);
            appItem.append(status);
            appsList.append(appItem);
        });
    }
}

function addPeopleToArray(people) {
    peoples.push(people)
    localStorage.setItem('peoples', JSON.stringify(peoples))
    console.log(peoples)
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

        if (fio !== '' && phone !== '' && email !== '' && loginInput !== '' && passwordInput !== '') {
            if (passwordInput.length >= 6) {
                const existingUser = peoples.find(p => p.loginInput === loginInput)
                if (existingUser) {
                    alert('Пользователь с таким логином уже существует!')
                    return;
                }
                let people = {
                    fio: fio,
                    phone: phone,
                    email: email,
                    login: loginInput,
                    password: passwordInput
                }
                addPeopleToArray(people)
                currentPep = people
                localStorage.setItem('currentPep', JSON.stringify(people))
                createApplicationsPage(); 
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
        const user = peoples.find(p => p.login === loginInput && p.password === passwordInput)
        if (user) {
            currentPep = user
            localStorage.setItem('currentPep', JSON.stringify(user))
             createApplicationsPage()
        } else {
            alert('Пользователя с таким логином не существует!')
            return
        }
    })
}

document.addEventListener('DOMContentLoaded', createRegApp)