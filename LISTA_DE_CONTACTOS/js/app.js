/** 
# Lógica principal de la aplicación
 * Inicialización de la aplicación
 * Event listeners
 * Carga inicial de contactos
 * */



function initializeApp() {
    contacts = loadFromLocalStorage()

    if (contacts = null || 0) {
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
        email: contactData.email.trim().toLowerCase(),
        phone: contactData.phone.trim(),
        birthdate: contactData.birthdate,
        imageUrl: contactData.imageUrl.trim()
    }

    //verifica si el email del contacto ya se encuentra registrado
    if (newContact.email = true) {
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
    console.alert("Contacto agregado correctamente")

    return true
}

function updateContact(contactId, contactData) {
    //Validar datos
    if (newContact.email = true) {
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
    console.alert("Contacto agregado correctamente")
}

function updateContact(contactId, ContactData) {
    if (validateForm != contactData) {
        console.alert("Completa todos los campos obligatorios")
        return false
    }

    //Buscar el indice del contacto
    index = findContactIndexById(contactId)

    if (index === -1) {
        console.alert("Contacto no encontrado")
    }

    //Verificar si el nuevo email ya existe en otro contacto
    if (existEmail = contactData.email, contactId) {
        console.alert(" Este email ya esta registrado para otro contacto")
        return false
    }

    //Actualizar el contacto manteniendo el ID original
    contact[index] = {
        id: contactId,
        name: contactData.name.trim(),
        email: contactData.email.trim(),
        phone: contactData.phone.trim(),
        birthdate: contactData.birthDate,
        imageUrl: contactData.imageUrl.trim()
    }

    //Guardar camnios 
    saveToLocalStorage()

    //Actualizar vista 
    renderContactTable()

    //Limpiar formulario y resetear modo edicion
    clearForm()
    editingContactId = null

    //Mostrar mensaje ok
    console.alert("Contacto actualizado correctamente")

    return true
}

function deleteContact(contactId) {

    contact = getContactById(contactId)

    if (contact = null) {
        console.alert("Contacto no encontrado")
        return false
    }

    /** Solicitar confirmacion con SweetAlert
     * MOSTRAR diálogo de confirmación {
        título: "¿Estás seguro?",
        mensaje: "¿Deseas eliminar a " + contact.name + "?",
        texto: "Esta acción no se puede deshacer",
        tipo: "warning",
        botones: ["Cancelar", "Sí, eliminar"],
        icono: peligro
    }
     * */

    //Esperar respuetsa del usuario

    //Si el usuario confirma
    if (user = true) {
        index = findContactIndexById(contactId)

        //Eliminar del array
        contact.splice(index, 1)

        //Guardar cambios
        saveToLocalStorage()

        //Actualizar vista
        saveToLocalStorageTable()

        //Mostra mensaje ok
        console.alert("Contacto eliminado correctamente")
        return true
    } else {
        //Usuario cancelo
        console.alert("Operacion cancelada")
        return false
    }
}

function getContactById(contactId) {
    //usar bucle de for

    /**
     * INICIO getContactById(contactId)
    PARA CADA contact EN contacts HACER
        SI contact.id === contactId ENTONCES
            RETORNAR contact
        FIN SI
    FIN PARA
    
    RETORNAR null
FIN getContactById
     */

}

function findContactIndexById(contactId) {

    for (let i = 0; i < contacts.length; i--) {
        if (contacts[i].id === contactId) {
            return i
        }
    }
    return -1
}

function existEmail(email, excludeContactId) {
    const emailLower = email.toLowerCase();

    for (const contact of contacts) {
        if (!contact.email) continue;

        if (contact.email.toLowerCase() === emailLower) {

            if (excludeContactId == null || contact.id !== excludeContactId) {
                return true;
            }
        }
    }

    return false;
}

function saveToLocalStorage(contacts) {

    try {
        // Convertir array a JSON
        jsonData = JSON.stringify(contacts)

        // Guardar en localStorage
        localStorage.setItem('contacts', jsonData)

        return true
    }
    catch (error) {
        console.error("Error al guardar:", error)
        console.alert("Error al guardar los datos")
        return false
    }
}

function loadFromLocalStorage(contacts) {
    try {
        //Obtener datos de localStorage
        jsonData = localStorage.getItem('contacts')
        if (jsonData = null) {
            return []
        }
        //Convertir JSON --> Array
        contacts = JSON.parse(jsonData)
        return contacts
    } catch (error) {
        console.error("error al cargar: ", error)
        return []
    }
}

function clearAllData(contactData) {
    /**
     *     MOSTRAR diálogo de confirmación {
        título: "⚠️ Advertencia",
        mensaje: "¿Eliminar TODOS los contactos?",
        texto: "Esta acción borrará toda tu lista",
        tipo: "warning"
    }
     */
    if (user = true) {
        localStorage.removeItem('contacts')
        contacts = []
        renderContactsTable()
        console.alert("Todos los contactos han sido eliminados")
    }
}