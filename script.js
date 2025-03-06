// Departman Seçimi ve Ana Sayfa Yükleme
function selectDepartment(dept) {
    document.getElementById('departmentModal').classList.add('hidden');
    document.getElementById('mainContent').classList.remove('hidden');
    loadDepartmentHomepage(dept);
}

function loadDepartmentHomepage(dept) {
    const deptName = getDepartmentName(dept);
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <button class="back-button" onclick="returnToDepartmentSelection()">
            <i class="fas fa-arrow-left"></i>
            Geri Dön
        </button>
        <div class="department-homepage">
            <div class="department-header">
                <div class="dept-logo-header">
                    <img src="images/logos/${dept}-logo.svg" alt="${deptName.short} Logo">
                </div>
                <div class="header-text">
                    <h1>${deptName.short}</h1>
                    <p>${deptName.long}</p>
                </div>
            </div>
            
            <nav class="menu-bar">
                ${getDepartmentMenus(dept)}
            </nav>

            <div class="content-area" id="contentArea">
                <!-- İçerik buraya gelecek -->
            </div>
        </div>
    `;

    initializeMenuInteractions();
}

function returnToDepartmentSelection() {
    document.getElementById('departmentModal').classList.remove('hidden');
    document.getElementById('mainContent').classList.add('hidden');
}

// Departman Bilgileri
function getDepartmentName(dept) {
    const names = {
        lspd: {
            short: 'LSPD',
            long: 'Los Santos Police Department'
        },
        lssd: {
            short: 'LSSD',
            long: 'Los Santos Sheriff Department'
        },
        lsfmd: {
            short: 'LSFMD',
            long: 'Los Santos Fire & Medical Department'
        },
        fib: {
            short: 'FIB',
            long: 'Federal Investigation Bureau'
        },
        doj: {
            short: 'DOJ',
            long: 'Department of Justice'
        }
    };
    return names[dept] || { short: dept.toUpperCase(), long: '' };
}

// Form ve Şablon Yönetimi
async function loadFormTemplate(dept, formType) {
    try {
        const response = await fetch(`templates/forms/${dept}/${formType}.json`);
        if (!response.ok) throw new Error('Form şablonu bulunamadı');
        const formData = await response.json();
        
        // Form tipini ve departmanı sakla
        window.currentFormType = formType;
        window.currentDepartment = dept;
        
        buildForm(formData);
    } catch (error) {
        console.error('Form şablonu yüklenemedi:', error);
        document.querySelector('.content-area').innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                Form şablonu yüklenemedi. Lütfen daha sonra tekrar deneyin.
            </div>
        `;
    }
}

function buildForm(formData) {
    const contentArea = document.getElementById('contentArea');
    let formHTML = `
        <div class="form-page">
            <div class="report-form">
                <h2>${formData.title}</h2>
                <form id="incidentForm" onsubmit="return false;">
    `;

    formData.fields.forEach(field => {
        formHTML += createFormField(field);
    });

    formHTML += `
                    <div class="form-buttons">
                        <button type="button" class="clear-button" onclick="clearForm()">
                            <i class="fas fa-trash"></i>
                            Formu Temizle
                        </button>
                        <button type="button" class="preview-button" onclick="previewBBCode()">
                            <i class="fas fa-eye"></i>
                            Önizle
                        </button>
                    </div>
                </form>
            </div>
            
            <div class="preview-section">
                <h2>BBCode Önizleme</h2>
                <textarea id="bbcodePreview" readonly></textarea>
                <button class="copy-button" onclick="copyBBCode()">
                    <i class="fas fa-copy"></i>
                    Kopyala
                </button>
            </div>
        </div>
    `;

    contentArea.innerHTML = formHTML;
}

function createFormField(field) {
    let fieldHTML = `
        <div class="form-group">
            <label>${field.label}${field.required ? ' *' : ''}</label>
    `;

    switch (field.type) {
        case 'text':
        case 'datetime-local':
        case 'number':
            fieldHTML += `
                <input type="${field.type}" 
                       id="${field.id}" 
                       ${field.required ? 'required' : ''}
                       ${field.placeholder ? `placeholder="${field.placeholder}"` : ''}
                       ${field.min ? `min="${field.min}"` : ''}
                       ${field.max ? `max="${field.max}"` : ''}>
            `;
            break;

        case 'textarea':
            fieldHTML += `
                <textarea id="${field.id}"
                         ${field.required ? 'required' : ''}
                         ${field.placeholder ? `placeholder="${field.placeholder}"` : ''}></textarea>
            `;
            break;

        case 'select':
            fieldHTML += `
                <select id="${field.id}" ${field.required ? 'required' : ''}>
                    ${field.options.map(option => 
                        `<option value="${option.value}">${option.label}</option>`
                    ).join('')}
                </select>
            `;
            break;
    }

    fieldHTML += '</div>';
    return fieldHTML;
}

// Form Temizleme Fonksiyonu
function clearForm() {
    const form = document.getElementById('incidentForm');
    const confirmClear = confirm('Formdaki tüm bilgiler silinecek. Emin misiniz?');
    
    if (confirmClear) {
        form.querySelectorAll('input, select, textarea').forEach(element => {
            if (element.type === 'select-one') {
                element.selectedIndex = 0;
            } else {
                element.value = '';
            }
        });
        
        // BBCode önizlemeyi de temizle
        document.getElementById('bbcodePreview').value = '';
        
        // Başarılı temizleme mesajı
        const clearButton = form.querySelector('.clear-button');
        const originalText = clearButton.innerHTML;
        clearButton.innerHTML = '<i class="fas fa-check"></i> Temizlendi';
        
        setTimeout(() => {
            clearButton.innerHTML = originalText;
        }, 2000);
    }
}

// BBCode İşlemleri
async function previewBBCode() {
    try {
        const response = await fetch(getBBCodeTemplatePath(getCurrentDepartment(), getCurrentFormType()));
        if (!response.ok) throw new Error('BBCode şablonu bulunamadı');
        let template = await response.text();
        
        const formData = collectFormData();
        template = replacePlaceholders(template, formData);
        
        document.getElementById('bbcodePreview').value = template;
    } catch (error) {
        console.error('BBCode şablonu yüklenemedi:', error);
        document.getElementById('bbcodePreview').value = 'BBCode şablonu yüklenemedi. Lütfen daha sonra tekrar deneyin.';
    }
}

function collectFormData() {
    const form = document.getElementById('incidentForm');
    const formData = {};
    
    form.querySelectorAll('input, select, textarea').forEach(element => {
        if (element.type === 'datetime-local' && element.value) {
            formData[element.id] = new Date(element.value).toLocaleString('tr-TR');
        } else {
            formData[element.id] = element.value;
        }
    });
    
    return formData;
}

function replacePlaceholders(template, data) {
    return template.replace(/{(\w+)}/g, (match, key) => {
        return data[key] || '';
    });
}

function copyBBCode() {
    const bbcodeText = document.getElementById('bbcodePreview');
    bbcodeText.select();
    document.execCommand('copy');
    
    const copyButton = document.querySelector('.copy-button');
    const originalText = copyButton.innerHTML;
    copyButton.innerHTML = '<i class="fas fa-check"></i> Kopyalandı!';
    setTimeout(() => {
        copyButton.innerHTML = originalText;
    }, 2000);
}

// Yardımcı Fonksiyonlar
function getCurrentFormType() {
    return window.currentFormType || 'incident';
}

function getCurrentDepartment() {
    return window.currentDepartment || document.querySelector('.department-header h1').textContent.toLowerCase();
}

function getFormTemplatePath(dept, formType) {
    return `templates/forms/${dept}/${formType}.json`;
}

function getBBCodeTemplatePath(dept, formType) {
    return `templates/bbcode/${dept}/${formType}.bbcode`;
}

// Menü Yönetimi
function loadSearchForm(dept, type) {
    loadFormTemplate(dept, `search_${type}`);
}

function loadHistoryView(dept, type) {
    loadFormTemplate(dept, `history_${type}`);
}

function loadActiveOperations(dept) {
    loadFormTemplate(dept, 'active_operations');
}

function loadManagementView(dept, type) {
    loadFormTemplate(dept, `manage_${type}`);
}

function initializeMenuInteractions() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        const mainButton = item.querySelector('.main-button');
        const subMenu = item.querySelector('.sub-menu');
        
        mainButton.addEventListener('mouseenter', () => {
            document.querySelectorAll('.sub-menu').forEach(menu => {
                if (menu !== subMenu) menu.classList.remove('active');
            });
            subMenu.classList.add('active');
        });

        item.addEventListener('mouseleave', () => {
            subMenu.classList.remove('active');
        });
    });
}

// Departman Menüleri
function getDepartmentMenus(dept) {
    const menus = {
        lspd: `
            <div class="menu-item">
                <div class="main-button">
                    <i class="fas fa-file-alt"></i>
                    Raporlar
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="sub-menu">
                    <a href="#" onclick="loadFormTemplate('lspd', 'incident')"><i class="fas fa-pen"></i>Olay Raporu Oluştur</a>
                    <a href="#" onclick="loadFormTemplate('lspd', 'accident')"><i class="fas fa-car-crash"></i>Kaza Raporu</a>
                    <a href="#" onclick="loadFormTemplate('lspd', 'complaint')"><i class="fas fa-exclamation-circle"></i>Şikayet Kaydı</a>
                    <a href="#" onclick="loadFormTemplate('lspd', 'arrest')"><i class="fas fa-handcuffs"></i>Tutuklama Raporu</a>
                    <a href="#" onclick="loadSearchForm('lspd', 'reports')"><i class="fas fa-search"></i>Rapor Sorgula</a>
                    <a href="#" onclick="loadHistoryView('lspd', 'reports')"><i class="fas fa-history"></i>Geçmiş Raporlar</a>
                </div>
            </div>
            <div class="menu-item">
                <div class="main-button">
                    <i class="fas fa-database"></i>
                    Veri Tabanı
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="sub-menu">
                    <a href="#" onclick="loadSearchForm('lspd', 'personnel')"><i class="fas fa-user-check"></i>Personel Sorgula</a>
                    <a href="#" onclick="loadSearchForm('lspd', 'vehicle')"><i class="fas fa-car"></i>Araç Sorgula</a>
                    <a href="#" onclick="loadSearchForm('lspd', 'criminal')"><i class="fas fa-fingerprint"></i>Sabıka Sorgula</a>
                    <a href="#" onclick="loadSearchForm('lspd', 'license')"><i class="fas fa-id-card"></i>Ehliyet Sorgula</a>
                </div>
            </div>
            <div class="menu-item">
                <div class="main-button">
                    <i class="fas fa-shield-alt"></i>
                    Operasyonlar
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="sub-menu">
                    <a href="#" onclick="loadFormTemplate('lspd', 'patrol')"><i class="fas fa-map-marked-alt"></i>Devriye Kaydı</a>
                    <a href="#" onclick="loadFormTemplate('lspd', 'operation')"><i class="fas fa-bullhorn"></i>Operasyon Planla</a>
                    <a href="#" onclick="loadActiveOperations('lspd')"><i class="fas fa-tasks"></i>Aktif Operasyonlar</a>
                </div>
            </div>
            <div class="menu-item">
                <div class="main-button">
                    <i class="fas fa-cog"></i>
                    Yönetim
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="sub-menu">
                    <a href="#" onclick="loadManagementView('lspd', 'personnel')"><i class="fas fa-users"></i>Personel Yönetimi</a>
                    <a href="#" onclick="loadManagementView('lspd', 'ranks')"><i class="fas fa-star"></i>Rütbe İşlemleri</a>
                    <a href="#" onclick="loadManagementView('lspd', 'stats')"><i class="fas fa-chart-bar"></i>İstatistikler</a>
                    <a href="#" onclick="loadManagementView('lspd', 'schedule')"><i class="fas fa-calendar-alt"></i>Nöbet Çizelgesi</a>
                </div>
            </div>
        `
        // Diğer departmanların menüleri buraya eklenecek
    };

    return menus[dept] || '';
}
