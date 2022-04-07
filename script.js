const inputs = document.querySelectorAll("[required]")

function fieldValidation(field) {
    function verifyErrors() {
        let foundError = false;

        for(let error in field.validity) {
            if (field.validity[error] && !field.validity.valid ) {
                foundError = error;
                console.log(field.validity);
            }
        }
        return foundError;
    }

    function createErrorMessage(typeError) {
        const messages = {
            text: {
                valueMissing: "Por favor, preencha este campo"
            },
            email: {
                valueMissing: "Email é obrigatório",
                typeMismatch: "Por favor, preencha um email válido"
            },
            number: {
                valueMissing: "Por favor, preencha um número válido"
            }
        }

        return messages[field.type][typeError]
    }

    function setErrorMessage(message) {
        const spanError = field.parentNode.querySelector("span.error")

        if (message) {
            spanError.classList.add("error-text")
            spanError.innerHTML = message
        } else {
            spanError.classList.remove("error-text")
            spanError.innerHTML = ""
        }
    }

    return function() {
        const error = verifyErrors()

        if(error) {
            const message = createErrorMessage(error)

            field.style.borderColor = "red"
            setErrorMessage(message)
        } else {
            field.style.borderColor = "green"
            setErrorMessage()
        }
    }
}

function validation(event) {

    const field = event.target
    const goValidate = fieldValidation(field)

    goValidate()
}

for( field of inputs ){
    field.addEventListener("invalid", event => {
        event.preventDefault()

        validation(event)
    })
    field.addEventListener("blur", validation)
}


document.querySelector("form")
.addEventListener("submit", event => {
    console.log("Campos validados e formulário enviado !")

    event.preventDefault()
})
