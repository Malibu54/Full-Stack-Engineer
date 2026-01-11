/**
# Gestión del CRUD de contactos
 * addContact() - Agregar nuevo contacto
 * updateContact() - Actualizar contacto existente
 * deleteContact() - Eliminar contacto
 * getContacts() - Obtener todos los contactos
 * getContactById() - Obtener un contacto específico
 * saveToLocalStorage() - Persistir datos
 * loadFromLocalStorage() - Cargar datos
 * */


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

    Swal.fire({
        title: "¿Estás seguro?",
        text: "¿Deseas eliminar a " + contact.name + "?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminart!"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Eliminar",
                text: "Esta acción no se puede deshacer",
                icon: "success"
            });
        }
    });
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
    for (let i = 0; i < contacts.length; i++) {
        let contact = contacts[i];

        // Si el id coincide, retorna el contacto
        if (contact.id === contactId) {
            return contact;
        }
    }

    // Si no se encontró ningún contacto, retorna null
    return null;
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

    Swal.fire({
        title: "Advertencia",
        text: "¿Eliminar TODOS los contactos?!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: "Eliminado",
                text: "Esta acción borrará toda tu lista",
                icon: "success"
            });
        }
    });

    if (user = true) {
        localStorage.removeItem('contacts')
        contacts = []
        renderContactsTable()
        console.alert("Todos los contactos han sido eliminados")
    }
}
