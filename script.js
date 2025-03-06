function selectDepartment(dept) {
    document.getElementById('departmentModal').classList.add('hidden');
    document.getElementById('mainContent').classList.remove('hidden');
    
    // Seçilen departmana göre içeriği yükle
    loadDepartmentContent(dept);
}

function loadDepartmentContent(dept) {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <div class="form-container">
            <h1>${dept.toUpperCase()} Formları</h1>
            <div id="formContent">
                <!-- Form içeriği buraya gelecek -->
            </div>
        </div>
    `;
    
    // Departmana özel formları yükle
    loadForms(dept);
}

function loadForms(dept) {
    // Her departman için özel formlar burada tanımlanacak
    const formContent = document.getElementById('formContent');
    // Örnek form yapısı
    formContent.innerHTML = `
        <select id="formType" onchange="updateForm()">
            <option value="">Form Seçiniz</option>
            <option value="form1">Form 1</option>
            <option value="form2">Form 2</option>
        </select>
        <div id="formFields"></div>
        <textarea id="preview" readonly></textarea>
    `;
}
