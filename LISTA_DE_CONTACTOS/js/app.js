/** 
# Lógica principal de la aplicación
 * Inicialización de la aplicación
 * Event listeners
 * Carga inicial de contactos
 * */ 

function initializeApp(params) {
    contacts = loadFromLocalStorage()

    if(contacts = null || 0){
        contacts = []
    }
    renderContactTable()

    setupEventListeners()
    console.log('App de Contactos iniciada');
    
}

