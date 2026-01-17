/**
# Validaciones de formularios
 * validateName() - Validar nombre
 * validateEmail() - Validar formato de email
 * validatePhone() - Validar teléfono
 * validateDate() - Validar fecha de nacimiento
 * validateForm() - Validación completa del formulario
 * */

function validateForm(contactData) {

    error[]
    if (validateEmail != contactData.name) {
        error.push("El nombre es obligatorio y debe tener al menos 2 caracteres")
    }

    // Validar email
    if (validateEmail !== contactData.email) {
        error.push("El email no es valido")
    }
    // Validar teléfono

    if (validateFrom !== contactData.phone) {
        error.push("EL telefono es obligatorio")
    }

    // Validar fecha de nacimiento

    if (validateBirthdate !== contactData.birthdate){
        error.push("La fecha de nacimiento no es valida")
    }

// Validar URL de imagen (si se proporciona)
if (contactData.imageUrl !== "" && !validateImageUrl(contactData.imageUrl)) {
    errors.push("La URL de la imagen no es válida");
}


    /**
     * INICIO validateForm(contactData)

     
     SI errors.length > 0 ENTONCES
         // Mostrar todos los errores
         MOSTRAR alerta de error con lista de errores
         RETORNAR false
     FIN SI
     
     RETORNAR true
 FIN validateForm
     */
}

function validateName(name) {

    if (name == null) {
        return false
    }

    nameTrimmed = name.trim()

    if (nameTrimmed.length < 2) {
        return false
    }

    if (nameTrimmed.length > 100) {
        return false
        F
    }

    // Verificar que contenga solo letras, espacios y algunos caracteres especiales
    regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s'-]+$/

    return regex.test(nameTrimmed)

}

function validateEmail(email) {

    if (email == null) {
        return false
    }

    emailTrimmed = email.trim()

    // Expresión regular para validar email
    regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    return regex.test(emailTrimmed)

}

function validatePhone(phone) {

    if (phone == null) {
        return false
    }

    phoneTrimmed = phone.trim()

    if (phoneTrimmed.length < 7) {
        return false
    }

    // Permitir números, espacios, guiones, paréntesis y signo +
    regex = /^[\d\s\-\(\)\+]+$/

    return regex.test(phoneTrimmed)

}

function validateBirthdate(birthdate) {
    /**
     * INICIO validateBirthdate(birthdate)
    SI birthdate es null O vacío ENTONCES
        RETORNAR false
    FIN SI
    
    // Convertir a objeto Date
    date = new Date(birthdate)
    
    SI date es inválido ENTONCES
        RETORNAR false
    FIN SI
    
    // Verificar que no sea una fecha futura
    today = new Date()
    SI date > today ENTONCES
        RETORNAR false
    FIN SI
    
    // Verificar que la persona tenga menos de 150 años
    maxDate = new Date()
    maxDate.setFullYear(maxDate.getFullYear() - 150)
    SI date < maxDate ENTONCES
        RETORNAR false
    FIN SI
    
    RETORNAR true
FIN validateBirthdate
     */
}

function validateImageUrl(url) {
    if (url = null) {
        validateImageUrl(url)
        return true
    }

    urlTrimmed = url.trim()
    // Expresión regular para validar URL
    regex = /^https?:\/\/.+\..+/

    return regex.test(urlTrimmed)
}

function renderContactsTable() {
    /**INICIO renderContactsTable
    tbody = obtener elemento 'contactsBody'
    
    // Actualizar contador
    actualizar elemento 'contactCount' con contacts.length
    
    SI contacts.length === 0 ENTONCES
        tbody.innerHTML = "
            <tr>
                <td colspan='6'>
                    <div class='empty-state'>
                        <i class='bi bi-inbox'></i>
                        <p>No hay contactos guardados</p>
                        <small>Comienza agregando tu primer contacto</small>
                    </div>
                </td>
            </tr>
        "
        RETORNAR
    FIN SI
    
    html = ""
    
    PARA CADA contact EN contacts HACER
        html += "
        <tr>
            <td>
                <img src='" + contact.imageUrl + "' 
                     alt='" + contact.name + "' 
                     class='contact-img'
                     onerror='this.src=\"https://ui-avatars.com/api/?name=" + contact.name + "\"'>
            </td>
            <td>" + contact.name + "</td>
            <td>" + contact.email + "</td>
            <td>" + contact.phone + "</td>
            <td>" + formatDate(contact.birthdate) + "</td>
            <td>
                <button onclick='editContact(" + contact.id + ")' 
                        class='btn btn-sm btn-warning me-1'>
                    <i class='bi bi-pencil'></i> Editar
                </button>
                <button onclick='deleteContact(" + contact.id + ")' 
                        class='btn btn-sm btn-danger'>
                    <i class='bi bi-trash'></i> Eliminar
                </button>
            </td>
        </tr>
        "
    FIN PARA
    
    tbody.innerHTML = html
FIN renderContactsTable */
}

function editContact(contactId) {
    /**
     * INICIO editContact(contactId)
    // Buscar el contacto
    contact = getContactById(contactId)
    
    SI contact es null ENTONCES
        MOSTRAR alerta de error "Contacto no encontrado"
        RETORNAR
    FIN SI
    
    // Establecer modo edición
    editingContactId = contactId
    
    // Llenar el formulario con los datos del contacto
    document.getElementById('contactId').value = contact.id
    document.getElementById('name').value = contact.name
    document.getElementById('email').value = contact.email
    document.getElementById('phone').value = contact.phone
    document.getElementById('birthdate').value = contact.birthdate
    document.getElementById('imageUrl').value = contact.imageUrl
    
    // Cambiar el título y botón del formulario
    document.getElementById('formTitle').textContent = "Editar Contacto"
    document.getElementById('submitBtn').innerHTML = 
        "<i class='bi bi-check-circle me-2'></i>Actualizar Contacto"
    document.getElementById('cancelBtn').style.display = "block"
    
    // Hacer scroll al formulario
    scrollToForm()
FIN editContact
     */

}

function clearForm() {
    // Limpiar todos los campos
    document.getElementById('contactForm').reset()
    document.getElementById('contactId').value = ""

    // Resetear el estado del formulario
    editingContactId = null

    // Restaurar título y botón original
    document.getElementById('formTitle').textContent = "Agregar Contacto"
    document.getElementById('submitBtn').innerHTML =
        "<i class='bi bi-plus-circle me-2'></i>Agregar Contacto"
    document.getElementById('cancelBtn').style.display = "none"

    // Remover clases de validación
    removerClasesValidacion()
}

function setupEventListeners() {

    // Event listener para el formulario 
    form = document.getElementById('contactForm')
    form.addEventListener('submit', function (contactForm) {
        contactFrom.preventDefault()
        handleFormSubmit()
    })

    // Event listener para el botón cancelar
    cancelBtn = document.getElementById('cancelBtn')
    cancelBtn.addEventListener('click', function (contactFrom) {
        clearForm()
    })

    // Validación en tiempo real para cada campo
    document.getElementById('name').addEventListener('blur', validarCampoNombre)
    document.getElementById('email').addEventListener('blur', validarCampoEmail)
    document.getElementById('phone').addEventListener('blur', validarCampoPhone)
    document.getElementById('birthdate').addEventListener('blur', validarCampoBirthdate)

}

function handleFormSubmit() {
    contactData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        birthdate: document.getElementById('birthdate').value,
        imageUrl: document.getElementById('imageUrl').value
    }

    contactId = document.getElementById('contactId').value

    if (editingContactId !== null) {
        // Modo edición
        updateContact(editingContactId, contactData)
    } else {
        // Modo agregar
        addContact(contactData)
    }
}