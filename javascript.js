// Toggle the visibility of the "Add New Document" form
function toggleAddDocumentForm() {
    const form = document.getElementById('addDocumentForm');
    const button = document.getElementById('toggleAddDocumentBtn');
    
    if (form.style.display === 'none' || !form.style.display) {
        form.style.display = 'block';
        button.textContent = 'Hide Create New Document';  // Change button text
    } else {
        form.style.display = 'none';
        button.textContent = 'Create New Document';  // Change button text back
    }
}

// Toggle support information visibility
function toggleSupport() {
    const supportInfo = document.getElementById('supportInfo');
    const supportToggle = document.getElementById('supportToggle');

    if (supportInfo.style.display === 'none' || !supportInfo.style.display) {
        supportInfo.style.display = 'block';
        supportToggle.textContent = 'Hide Support Info';
    } else {
        supportInfo.style.display = 'none';
        supportToggle.textContent = 'Show Support Info';
    }
}
