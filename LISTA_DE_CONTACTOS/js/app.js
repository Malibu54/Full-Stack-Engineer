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
