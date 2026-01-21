/**
 * Sistema de Gestión de Contactos
 * 
# Validaciones de formularios
 * validateName() - Validar nombre
 * validateEmail() - Validar formato de email
 * validatePhone() - Validar teléfono
 * validateDate() - Validar fecha de nacimiento
 * validateForm() - Validación completa del formulario
 */

// ============================================================================
// VARIABLES GLOBALES Y CONFIGURACIÓN
// ============================================================================

let contacts = [];
let editingContactId = null;
let nextId = 1;

const CONFIG = {
    STORAGE_KEY: 'contacts_app_data',
    MIN_NAME_LENGTH: 2,
    MAX_NAME_LENGTH: 100,
    MIN_PHONE_LENGTH: 7,
    MAX_AGE_YEARS: 150,
    MIN_AGE_YEARS: 0,
    VALID_IMAGE_EXTENSIONS: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg']
};

// ============================================================================
// GESTIÓN DE DATOS Y PERSISTENCIA
// ============================================================================

/**
 * Carga los contactos desde localStorage
 */
function loadContacts() {
    try {
        const data = localStorage.getItem(CONFIG.STORAGE_KEY);
        if (data) {
            const parsed = JSON.parse(data);
            contacts = parsed.contacts || [];
            nextId = parsed.nextId || 1;
        }
    } catch (error) {
        console.error('Error al cargar contactos:', error);
        showNotification('Error al cargar los contactos', 'danger');
    }
}

/**
 * Guarda los contactos en localStorage
 */
function saveContacts() {
    try {
        const data = {
            contacts: contacts,
            nextId: nextId
        };
        localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
        console.error('Error al guardar contactos:', error);
        showNotification('Error al guardar los contactos', 'danger');
    }
}

/**
 * Obtiene un contacto por su ID
 * @param {number} id - ID del contacto
 * @returns {Object|null} - Contacto encontrado o null
 */
function getContactById(id) {
    return contacts.find(contact => contact.id === id) || null;
}

/**
 * Verifica si un email ya existe (excepto para el contacto actual en edición)
 * @param {string} email - Email a verificar
 * @param {number|null} excludeId - ID del contacto a excluir de la búsqueda
 * @returns {boolean} - true si el email existe
 */
function emailExists(email, excludeId = null) {
    return contacts.some(contact => 
        contact.email.toLowerCase() === email.toLowerCase() && 
        contact.id !== excludeId
    );
}

/**
 * Agrega un nuevo contacto
 * @param {Object} contactData - Datos del contacto
 */
function addContact(contactData) {
    // Verificar email duplicado
    if (emailExists(contactData.email)) {
        showNotification('Ya existe un contacto con ese email', 'warning');
        return;
    }

    const newContact = {
        id: nextId++,
        name: contactData.name.trim(),
        email: contactData.email.trim().toLowerCase(),
        phone: contactData.phone.trim(),
        birthdate: contactData.birthdate,
        imageUrl: contactData.imageUrl.trim(),
        createdAt: new Date().toISOString()
    };

    contacts.push(newContact);
    saveContacts();
    renderContactsTable();
    clearForm();
    showNotification('Contacto agregado exitosamente', 'success');
}

/**
 * Actualiza un contacto existente
 * @param {number} id - ID del contacto a actualizar
 * @param {Object} contactData - Nuevos datos del contacto
 */
function updateContact(id, contactData) {
    const index = contacts.findIndex(contact => contact.id === id);
    
    if (index === -1) {
        showNotification('Contacto no encontrado', 'danger');
        return;
    }

    // Verificar email duplicado
    if (emailExists(contactData.email, id)) {
        showNotification('Ya existe otro contacto con ese email', 'warning');
        return;
    }

    contacts[index] = {
        ...contacts[index],
        name: contactData.name.trim(),
        email: contactData.email.trim().toLowerCase(),
        phone: contactData.phone.trim(),
        birthdate: contactData.birthdate,
        imageUrl: contactData.imageUrl.trim(),
        updatedAt: new Date().toISOString()
    };

    saveContacts();
    renderContactsTable();
    clearForm();
    showNotification('Contacto actualizado exitosamente', 'success');
}

/**
 * Elimina un contacto
 * @param {number} id - ID del contacto a eliminar
 */
function deleteContact(id) {
    const contact = getContactById(id);
    
    if (!contact) {
        showNotification('Contacto no encontrado', 'danger');
        return;
    }

    if (!confirm(`¿Estás seguro de eliminar a ${contact.name}?`)) {
        return;
    }

    contacts = contacts.filter(c => c.id !== id);
    saveContacts();
    renderContactsTable();
    showNotification('Contacto eliminado exitosamente', 'success');
}

// ============================================================================
// FUNCIONES DE VALIDACIÓN
// ============================================================================

/**
 * Valida todos los campos del formulario
 * @param {Object} contactData - Datos del contacto a validar
 * @returns {Object} - { isValid: boolean, errors: string[] }
 */
function validateForm(contactData) {
    const errors = [];

    if (!validateName(contactData.name)) {
        errors.push(`El nombre debe tener entre ${CONFIG.MIN_NAME_LENGTH} y ${CONFIG.MAX_NAME_LENGTH} caracteres y contener solo letras`);
    }

    if (!validateEmail(contactData.email)) {
        errors.push("El formato del email no es válido");
    }

    if (!validatePhone(contactData.phone)) {
        errors.push(`El teléfono debe tener al menos ${CONFIG.MIN_PHONE_LENGTH} caracteres`);
    }

    if (!validateBirthdate(contactData.birthdate)) {
        errors.push("La fecha de nacimiento no es válida o está fuera del rango permitido");
    }

    if (contactData.imageUrl && contactData.imageUrl.trim() !== "" && !validateImageUrl(contactData.imageUrl)) {
        errors.push("La URL de la imagen no es válida o no tiene una extensión permitida");
    }

    return { 
        isValid: errors.length === 0, 
        errors: errors 
    };
}

/**
 * Valida el nombre del contacto
 * @param {string} name - Nombre a validar
 * @returns {boolean} - true si es válido
 */
function validateName(name) {
    if (!name || typeof name !== 'string') {
        return false;
    }

    const nameTrimmed = name.trim();

    if (nameTrimmed.length < CONFIG.MIN_NAME_LENGTH || 
        nameTrimmed.length > CONFIG.MAX_NAME_LENGTH) {
        return false;
    }

    // Permitir letras (con acentos), espacios, guiones y apóstrofes
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s'-]+$/;
    return regex.test(nameTrimmed);
}

/**
 * Valida el formato del email
 * @param {string} email - Email a validar
 * @returns {boolean} - true si es válido
 */
function validateEmail(email) {
    if (!email || typeof email !== 'string') {
        return false;
    }

    const emailTrimmed = email.trim();

    if (emailTrimmed.length === 0) {
        return false;
    }

    // Regex más estricto para email
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(emailTrimmed);
}

/**
 * Valida el número de teléfono
 * @param {string} phone - Teléfono a validar
 * @returns {boolean} - true si es válido
 */
function validatePhone(phone) {
    if (!phone || typeof phone !== 'string') {
        return false;
    }

    const phoneTrimmed = phone.trim();

    if (phoneTrimmed.length < CONFIG.MIN_PHONE_LENGTH) {
        return false;
    }

    // Permitir números, espacios, guiones, paréntesis y signo +
    const regex = /^[\d\s\-\(\)\+]+$/;
    return regex.test(phoneTrimmed);
}

/**
 * Valida la fecha de nacimiento
 * @param {string} birthdate - Fecha en formato YYYY-MM-DD
 * @returns {boolean} - true si es válida
 */
function validateBirthdate(birthdate) {
    if (!birthdate || typeof birthdate !== 'string' || birthdate.trim() === "") {
        return false;
    }

    const date = new Date(birthdate + 'T00:00:00');

    // Verificar que sea una fecha válida
    if (isNaN(date.getTime())) {
        return false;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // No permitir fechas futuras
    if (date > today) {
        return false;
    }

    // Verificar rango de edad razonable
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - CONFIG.MAX_AGE_YEARS);
    
    if (date < minDate) {
        return false;
    }

    return true;
}

/**
 * Valida la URL de una imagen
 * @param {string} url - URL a validar
 * @returns {boolean} - true si es válida
 */
function validateImageUrl(url) {
    if (!url || typeof url !== 'string') {
        return false;
    }

    const urlTrimmed = url.trim();

    if (urlTrimmed === "") {
        return true; // Campo opcional
    }

    // Validar formato URL
    const urlRegex = /^https?:\/\/.+\..+/;
    if (!urlRegex.test(urlTrimmed)) {
        return false;
    }

    // Validar extensión de imagen
    try {
        const urlObj = new URL(urlTrimmed);
        const pathname = urlObj.pathname.toLowerCase();
        const hasValidExtension = CONFIG.VALID_IMAGE_EXTENSIONS.some(ext => 
            pathname.endsWith(`.${ext}`)
        );
        
        return hasValidExtension;
    } catch (e) {
        return false;
    }
}

// ============================================================================
// FUNCIONES DE UI Y RENDERIZADO
// ============================================================================

/**
 * Formatea una fecha para mostrarla
 * @param {string} dateString - Fecha en formato YYYY-MM-DD
 * @returns {string} - Fecha formateada
 */
function formatDate(dateString) {
    const date = new Date(dateString + 'T00:00:00');
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
}

/**
 * Calcula la edad a partir de una fecha de nacimiento
 * @param {string} birthdate - Fecha de nacimiento
 * @returns {number} - Edad en años
 */
function calculateAge(birthdate) {
    const birth = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    
    return age;
}

/**
 * Renderiza la tabla de contactos
 */
function renderContactsTable() {
    const tbody = document.getElementById('contactsBody');
    const contactCountElement = document.getElementById('contactCount');

    if (!tbody) {
        console.error('Elemento contactsBody no encontrado');
        return;
    }

    // Actualizar contador
    if (contactCountElement) {
        contactCountElement.textContent = contacts.length;
    }

    // Si no hay contactos
    if (contacts.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan='6' class='text-center py-5'>
                    <div class='empty-state'>
                        <i class='bi bi-inbox' style='font-size: 3rem; color: #6c757d;'></i>
                        <p class='mt-3 mb-2 fw-bold'>No hay contactos guardados</p>
                        <small class='text-muted'>Comienza agregando tu primer contacto usando el formulario</small>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    // Construir HTML de la tabla
    const html = contacts.map(contact => {
        const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(contact.name)}&background=random`;
        const imageUrl = contact.imageUrl || defaultAvatar;
        const age = calculateAge(contact.birthdate);

        return `
        <tr>
            <td>
                <img src='${imageUrl}' 
                     alt='${escapeHtml(contact.name)}' 
                     class='contact-img rounded-circle'
                     style='width: 50px; height: 50px; object-fit: cover;'
                     onerror='this.src="${defaultAvatar}"'>
            </td>
            <td class='fw-semibold'>${escapeHtml(contact.name)}</td>
            <td>${escapeHtml(contact.email)}</td>
            <td>${escapeHtml(contact.phone)}</td>
            <td>
                ${formatDate(contact.birthdate)}
                <br>
                <small class='text-muted'>(${age} años)</small>
            </td>
            <td class='text-nowrap'>
                <button onclick='editContact(${contact.id})' 
                        class='btn btn-sm btn-warning me-1'
                        title='Editar contacto'>
                    <i class='bi bi-pencil'></i>
                </button>
                <button onclick='deleteContact(${contact.id})' 
                        class='btn btn-sm btn-danger'
                        title='Eliminar contacto'>
                    <i class='bi bi-trash'></i>
                </button>
            </td>
        </tr>
        `;
    }).join('');

    tbody.innerHTML = html;
}

/**
 * Escapa HTML para prevenir XSS
 * @param {string} text - Texto a escapar
 * @returns {string} - Texto escapado
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Muestra una notificación toast
 * @param {string} message - Mensaje a mostrar
 * @param {string} type - Tipo de notificación (success, danger, warning, info)
 */
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3`;
    notification.style.zIndex = '9999';
    notification.style.minWidth = '300px';
    notification.innerHTML = `
        ${message}
        <button type='button' class='btn-close' data-bs-dismiss='alert'></button>
    `;

    document.body.appendChild(notification);

    // Remover después de 3 segundos
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

/**
 * Edita un contacto existente
 * @param {number} contactId - ID del contacto a editar
 */
function editContact(contactId) {
    const contact = getContactById(contactId);

    if (!contact) {
        showNotification('Contacto no encontrado', 'danger');
        return;
    }

    editingContactId = contactId;

    // Llenar el formulario
    document.getElementById('contactId').value = contact.id;
    document.getElementById('name').value = contact.name;
    document.getElementById('email').value = contact.email;
    document.getElementById('phone').value = contact.phone;
    document.getElementById('birthdate').value = contact.birthdate;
    document.getElementById('imageUrl').value = contact.imageUrl || '';

    // Actualizar UI del formulario
    document.getElementById('formTitle').textContent = "✏️ Editar Contacto";
    document.getElementById('submitBtn').innerHTML = 
        "<i class='bi bi-check-circle me-2'></i>Actualizar Contacto";
    document.getElementById('submitBtn').className = 'btn btn-warning';
    document.getElementById('cancelBtn').style.display = "inline-block";

    scrollToForm();
}

/**
 * Limpia el formulario y resetea el estado
 */
function clearForm() {
    document.getElementById('contactForm').reset();
    document.getElementById('contactId').value = "";
    editingContactId = null;

    // Restaurar UI original
    document.getElementById('formTitle').textContent = "➕ Agregar Nuevo Contacto";
    document.getElementById('submitBtn').innerHTML =
        "<i class='bi bi-plus-circle me-2'></i>Agregar Contacto";
    document.getElementById('submitBtn').className = 'btn btn-primary';
    document.getElementById('cancelBtn').style.display = "none";

    removeValidationClasses();
}

/**
 * Maneja el envío del formulario
 */
function handleFormSubmit() {
    const contactData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        birthdate: document.getElementById('birthdate').value,
        imageUrl: document.getElementById('imageUrl').value
    };

    const validation = validateForm(contactData);

    if (!validation.isValid) {
        showNotification(
            'Por favor corrige los siguientes errores:<br>' + 
            validation.errors.join('<br>'), 
            'danger'
        );
        return;
    }

    if (editingContactId !== null) {
        updateContact(editingContactId, contactData);
    } else {
        addContact(contactData);
    }
}

/**
 * Hace scroll hacia el formulario
 */
function scrollToForm() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

/**
 * Remueve las clases de validación de todos los campos
 */
function removeValidationClasses() {
    const fields = ['name', 'email', 'phone', 'birthdate', 'imageUrl'];
    fields.forEach(field => {
        const element = document.getElementById(field);
        if (element) {
            element.classList.remove('is-valid', 'is-invalid');
        }
    });
}

// ============================================================================
// VALIDACIÓN EN TIEMPO REAL
// ============================================================================

function validateFieldName() {
    const input = document.getElementById('name');
    const isValid = validateName(input.value);
    input.classList.toggle('is-invalid', !isValid);
    input.classList.toggle('is-valid', isValid);
}

function validateFieldEmail() {
    const input = document.getElementById('email');
    const isValid = validateEmail(input.value);
    input.classList.toggle('is-invalid', !isValid);
    input.classList.toggle('is-valid', isValid);
}

function validateFieldPhone() {
    const input = document.getElementById('phone');
    const isValid = validatePhone(input.value);
    input.classList.toggle('is-invalid', !isValid);
    input.classList.toggle('is-valid', isValid);
}

function validateFieldBirthdate() {
    const input = document.getElementById('birthdate');
    const isValid = validateBirthdate(input.value);
    input.classList.toggle('is-invalid', !isValid);
    input.classList.toggle('is-valid', isValid);
}

function validateFieldImageUrl() {
    const input = document.getElementById('imageUrl');
    const value = input.value.trim();
    
    // Campo opcional: válido si está vacío
    if (value === '') {
        input.classList.remove('is-invalid', 'is-valid');
        return;
    }
    
    const isValid = validateImageUrl(value);
    input.classList.toggle('is-invalid', !isValid);
    input.classList.toggle('is-valid', isValid);
}

// ============================================================================
// CONFIGURACIÓN DE EVENT LISTENERS
// ============================================================================

/**
 * Configura todos los event listeners
 */
function setupEventListeners() {
    const form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            handleFormSubmit();
        });
    }

    const cancelBtn = document.getElementById('cancelBtn');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', clearForm);
    }

    // Validación en tiempo real
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const phoneField = document.getElementById('phone');
    const birthdateField = document.getElementById('birthdate');
    const imageUrlField = document.getElementById('imageUrl');

    if (nameField) nameField.addEventListener('blur', validateFieldName);
    if (emailField) emailField.addEventListener('blur', validateFieldEmail);
    if (phoneField) phoneField.addEventListener('blur', validateFieldPhone);
    if (birthdateField) birthdateField.addEventListener('blur', validateFieldBirthdate);
    if (imageUrlField) imageUrlField.addEventListener('blur', validateFieldImageUrl);
}d