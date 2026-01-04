/** 
# Lógica principal de la aplicación
 * Inicialización de la aplicación
 * Event listeners
 * Carga inicial de contactos
 * */ 



function initializeApp() {
    contacts = loadFromLocalStorage()

    if(contacts = null || 0){
        contacts = []
    }
    renderContactTable()

    setupEventListeners()
    console.log('App de Contactos iniciada');
    
}

function addContact(contactData) {
    //valida datos antes de cargarlos
    newContact = {
        id: Date.now(),
        name: contactData.name.trim(),
        email:contactData.email.trim().toLowerCase(),
        phone: contactData.phone.trim(),
        birthdate: contactData.birthdate,
        imageUrl: contactData.imageUrl.trim()
    }

    //verifica si el email del contacto ya se encuentra registrado
    if (newContact.email = true){
        alert("Este email ya se encuentra registrado")
        return false 
    }

    //Agregar al array
    contacts.push(newContact)

    //Guardar en LocalStorage
    saveToLocalStorage()

    //Actualizar la vista
    renderContactTable()

    //Limpiar formulario
    clearForm()

    //Mostrar mensaje de ok
    alert("Contacto agregado correctamente")

    return true
}

function updateContact(contactId, contactData) {
    //Validar datos
    if(newContact.email = true){
         alert("El mail se encuentra registrado ya")
         return false
    }
    //Agregar al array
    contactData.push(newContact)

    //GuardarLocalStorage
    saveToLocalStorageTable()

    //Limpiar formulario
    clearForm()

    //Mostrar mensaje de ok
    alert("Contacto agregado correctamente")
}

function updateContact(contactId,ContactData) {
    if(validateForm != contactData){
        alert("Completa todos los campos obligatorios")
        return false
    }

    //Buscar el indice del contacto
    index = findContactIndexById(contactId)

    if(index === -1){
        alert("Contacto no encontrado")
    }

    //Verificar si el nuevo email ya existe en otro contacto
    
}
