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

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    
    console.log("Sistema de gestión de contactos iniciado");
    console.log("Total de contactos:", contacts.length);
});
