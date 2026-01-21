/** 
# Lógica principal de la aplicación
 * Inicialización de la aplicación
 * Event listeners
 * Carga inicial de contactos
 * */

// ============================================================================
// INICIALIZACIÓN
// ============================================================================

function initializeApp() {
    console.log('🚀 Inicializando Sistema de Gestión de Contactos...');
    
    loadContacts();
    renderContactsTable();
    setupEventListeners();
    
    console.log(`✅ Aplicación iniciada. ${contacts.length} contactos cargados.`);
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}