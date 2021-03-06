const registerButton = document.querySelector('#register');

const name = document.querySelector('#name');
const username = document.querySelector('#username');
const email = document.querySelector('#email');

const isNullOrBlank = (value) => {
    return value === undefined || value === null || value.trim().length === 0;
}
const setError = (field, message) => {
    if (!field.parentNode.querySelector('.form__error')) {
        const errorElement = document.createElement("div")
        errorElement.classList.add('form__error')
        errorElement.textContent = message;
        field.parentNode.appendChild(errorElement);
    } else {
        field.parentNode.querySelector('.form__error').textContent = message;
    }
}

const clearError = (field) => {
    const errorMessage = field.parentNode.querySelector('.form__error');
    if (errorMessage) errorMessage.remove();
};

name.addEventListener('input', () => {
    clearError(name);
});
username.addEventListener('input', () => {
    clearError(username);
});
email.addEventListener('input', () => {
    clearError(email);
});

registerButton.addEventListener('click', e => {
    e.preventDefault();

    let isError = false;
    if (isNullOrBlank(name.value)) {
        setError(name, "Name field is empty!")
        isError = true
    }

    if (isNullOrBlank(username.value)) {
        setError(username, "Username field is empty!")
        isError = true
    }

    if (isNullOrBlank(email.value)) {
        setError(email, "Email field is empty!")
        isError = true
    } else if (!email.value.includes("@")) {
        setError(email, "Email is invalid!")
        isError = true
    }

    if (!isError) {
        const payload = {
            name: name.value,
            username: username.value,
            email: email.value,
        }
        fetch('/users', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        })
            .then(response => response.json())
            .then(data => {
                if (!data.success) {
                    return setError(email, data.message);
                }

                window.location = '/success';
            })
            .catch(err => {
                console.error(err);
                alert(error.message);
            });
    }
});
