// Departman menülerini tanımla
const departmentMenus = {
    lspd: {
        menus: [
            {
                title: 'Formlar',
                items: [
                    { id: 'incident-report', icon: 'fa-pen', title: 'Olay Raporu' },
                    { id: 'arrest-report', icon: 'fa-handcuffs', title: 'Tutuklama Raporu' },
                    { id: 'patrol-log', icon: 'fa-car', title: 'Devriye Logu' },
                    { id: 'search-warrant', icon: 'fa-magnifying-glass', title: 'Arama Emri' },
                    { id: 'vehicle-report', icon: 'fa-car-burst', title: 'Araç Raporu' }
                ]
            },
            {
                title: 'Veri Tabanı',
                items: [
                    { id: 'criminal-search', icon: 'fa-user-check', title: 'Sabıka Sorgula' },
                    { id: 'vehicle-search', icon: 'fa-car', title: 'Araç Sorgula' },
                    { id: 'warrant-search', icon: 'fa-gavel', title: 'Arama Emri Sorgula' }
                ]
            }
        ]
    },
    lssd: {
        menus: [
            {
                title: 'Formlar',
                items: [
                    { id: 'incident-report', icon: 'fa-pen', title: 'Olay Raporu' },
                    { id: 'arrest-report', icon: 'fa-handcuffs', title: 'Tutuklama Raporu' },
                    { id: 'patrol-log', icon: 'fa-car', title: 'Devriye Logu' },
                    { id: 'property-seizure', icon: 'fa-box', title: 'Mülk Müsadere' }
                ]
            },
            {
                title: 'Veri Tabanı',
                items: [
                    { id: 'criminal-search', icon: 'fa-user-check', title: 'Sabıka Sorgula' },
                    { id: 'vehicle-search', icon: 'fa-car', title: 'Araç Sorgula' },
                    { id: 'property-search', icon: 'fa-house', title: 'Mülk Sorgula' }
                ]
            }
        ]
    },
    lsfmd: {
        menus: [
            {
                title: 'Formlar',
                items: [
                    { id: 'medical-report', icon: 'fa-notes-medical', title: 'Tıbbi Rapor' },
                    { id: 'incident-report', icon: 'fa-pen', title: 'Olay Raporu' },
                    { id: 'treatment-log', icon: 'fa-hospital', title: 'Tedavi Kaydı' },
                    { id: 'fire-report', icon: 'fa-fire', title: 'Yangın Raporu' }
                ]
            },
            {
                title: 'Veri Tabanı',
                items: [
                    { id: 'patient-search', icon: 'fa-user', title: 'Hasta Sorgula' },
                    { id: 'medical-history', icon: 'fa-file-medical', title: 'Tıbbi Geçmiş' }
                ]
            }
        ]
    },
    fib: {
        menus: [
            {
                title: 'Formlar',
                items: [
                    { id: 'investigation-report', icon: 'fa-magnifying-glass', title: 'Soruşturma Raporu' },
                    { id: 'surveillance-log', icon: 'fa-eye', title: 'Gözetim Logu' },
                    { id: 'operation-report', icon: 'fa-shield', title: 'Operasyon Raporu' }
                ]
            },
            {
                title: 'Veri Tabanı',
                items: [
                    { id: 'case-search', icon: 'fa-folder', title: 'Dosya Sorgula' },
                    { id: 'criminal-record', icon: 'fa-user-secret', title: 'Suç Kaydı' },
                    { id: 'intel-database', icon: 'fa-database', title: 'İstihbarat Veritabanı' }
                ]
            }
        ]
    },
    doj: {
        menus: [
            {
                title: 'İstihdam',
                items: [
                    { id: 'court-order', icon: 'fa-gavel', title: 'Mahkeme Kararı' },
                    { id: 'warrant-request', icon: 'fa-file-signature', title: 'Arama Emri Talebi' },
                    { id: 'hearing-schedule', icon: 'fa-calendar', title: 'Duruşma Takvimi' }
                ]
            },
            {
                title: 'Davalar',
                items: [
                    { id: 'davayanit', icon: 'fa-gavel', title: 'Dava Yanıtı' },
                    { id: 'davakisayanit', icon: 'fa-file-signature', title: 'Kısa Dava Yanıtı' },
                ]
            },
            {
                title: 'Dilekçeler',
                items: [
                    { id: 'dilekceyanit', icon: 'fa-gavel', title: 'Dilekçe Yanıtı' },
                    { id: 'dilekcekisayanit', icon: 'fa-file-signature', title: 'Kısa Dilekçe Yanıtı' },
                ]
            },
            {
                title: 'Ruhsatlandırma',
                items: [
                    { id: 'case-search', icon: 'fa-scale-balanced', title: 'Dava Sorgula' },
                    { id: 'criminal-record', icon: 'fa-user', title: 'Sabıka Kaydı' },
                    { id: 'lawyer-registry', icon: 'fa-user-tie', title: 'Avukat Sicili' }
                ]
            }
        ]
    }
};

function selectDepartment(dept) {
    document.getElementById('departmentModal').classList.add('hidden');
    document.getElementById('mainContent').classList.remove('hidden');
    loadDepartmentHomepage(dept);
}

function loadDepartmentHomepage(dept) {
    const deptNames = {
        'lspd': 'Los Santos Police Department',
        'lssd': 'Los Santos Sheriff Department',
        'lsfmd': 'Los Santos Fire & Medical Department',
        'fib': 'Federal Investigation Bureau',
        'doj': 'Department of Justice'
    };

    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <div class="department-homepage">
            <div class="department-header">
                <div class="header-left">
                    ${window.innerWidth <= 768 ? '<button class="mobile-menu-toggle"><i class="fas fa-bars"></i></button>' : ''}
                    <div class="dept-logo-header">
                        <img src="images/logos/${dept}-logo.svg" alt="${dept.toUpperCase()} Logo">
                    </div>
                    <div class="dept-info">
                        <h1>${dept.toUpperCase()}</h1>
                    </div>
                </div>

                <a href="#" class="back-button" onclick="goBack()">
                    <i class="fas fa-arrow-left"></i>
                    Geri Dön
                </a>
            </div>

            <nav class="menu-bar">
                ${departmentMenus[dept].menus.map(menu => `
                    <div class="menu-item">
                        <div class="main-button">
                            <div class="button-content">
                                <i class="fas fa-${menu.icon || 'bars'}"></i>
                                ${menu.title}
                            </div>
                            <i class="fas fa-chevron-down"></i>
                        </div>
                        <div class="sub-menu">
                            ${menu.items.map(item => `
                                <a href="#" data-form="${item.id}">
                                    <i class="fas ${item.icon}"></i>${item.title}
                                </a>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </nav>

            <div class="content-area">
                <!-- Form ve önizleme buraya yüklenecek -->
            </div>
        </div>
    `;

    initializeMenuInteractions();
}

function goBack() {
    document.getElementById('departmentModal').classList.remove('hidden');
    document.getElementById('mainContent').classList.add('hidden');
}

async function loadForm(formName, dept) {
    const contentArea = document.querySelector('.content-area');
    
    try {
        // Form şablonunu yükle
        const formResponse = await fetch(`forms/${dept}/${formName}.json`);
        const formJson = await formResponse.json();
        
        // BBCode şablonunu yükle
        const bbcodeResponse = await fetch(`bbcodes/${dept}/${formName}.bbcode`);
        const bbcodeTemplate = await bbcodeResponse.text();
        
        contentArea.innerHTML = `
            <div class="form-container">
                <button class="preview-button" onclick="generatePreview('${formName}', '${dept}')">
                        <i class="fas fa-eye"></i> Önizleme Yap
                </button>
                 <button class="reset-button" onclick="resetForm('${formName}', '${dept}')">
                        <i class="fas fa-undo"></i> Temizle
                </button>
                <form class="form-content">
                    ${generateFormHtml(formJson)}
                </form>
            </div>
            <div class="preview-container">
                 <button class="copy-button" onclick="copyPreview()">
                        <i class="fas fa-copy"></i> Kopyala
                    </button>
                    <button class="clear-preview-button" onclick="clearPreview()">
                        <i class="fas fa-trash"></i> Temizle
                    </button>
                <div class="preview-content"></div>
            </div>
        `;
        
        // Formun içeriği yüklendikten sonra event listener ekle
        const formElement = document.querySelector('.form-content');
        if (formElement) {
            formElement.addEventListener('input', (e) => {
                const formData = new FormData(e.target.form);
                const formObject = Object.fromEntries(formData);
                localStorage.setItem(`${dept}_${formName}_data`, JSON.stringify(formObject));
            });
        } else {
            console.error('Form elemanı bulunamadı.');
        }
        
    } catch (error) {
        console.error('Form yüklenirken hata:', error);
        contentArea.innerHTML = '<p>Form yüklenirken bir hata oluştu.</p>';
    }
}

function generateFormHtml(formJson) {
    return formJson.map(field => {
        switch (field.type) {
    case 'text':
        return `
            <div class="form-group">
                <label for="${field.id}">${field.label}</label>
                <input type="text" id="${field.id}" name="${field.id}" required="${field.required}" placeholder="${field.placeholder || ''}" />
            </div>
        `;
    case 'textarea':
        return `
            <div class="form-group">
                <label for="${field.id}">${field.label}</label>
                <textarea id="${field.id}" name="${field.id}" required="${field.required}" placeholder="${field.placeholder || ''}"></textarea>
            </div>
        `;
    case 'select':
        return `
            <div class="form-group">
                <label for="${field.id}">${field.label}</label>
                <select id="${field.id}" name="${field.id}" required="${field.required}">
                    ${field.options.map(option => `
                        <option value="${option.value}">${option.label}</option>
                    `).join('')}
                </select>
            </div>
        `;
    case 'date':
        return `
            <div class="form-group">
                <label for="${field.id}">${field.label}</label>
                <input type="date" id="${field.id}" name="${field.id}" required="${field.required}" />
            </div>
        `;
    case 'time':
        return `
            <div class="form-group">
                <label for="${field.id}">${field.label}</label>
                <input type="time" id="${field.id}" name="${field.id}" required="${field.required}" />
            </div>
        `;
    case 'checkbox':
        return `
            <div class="form-group">
                <label for="${field.id}">
                    <input type="checkbox" id="${field.id}" name="${field.id}" required="${field.required}" />
                    ${field.label}
                </label>
            </div>
        `;
    default:
        return '';
}
    }).join('');
}

async function generatePreview(formName, dept) {
    try {
        // BBCode şablonunu yükle
        const bbcodeResponse = await fetch(`bbcodes/${dept}/${formName}.bbcode`);
        let bbcodeTemplate = await bbcodeResponse.text();
        
        // Form verilerini al
        const formData = new FormData(document.querySelector('form'));
        const formObject = Object.fromEntries(formData);
        
        // Yer tutucuları değiştir
        for (const [key, value] of Object.entries(formObject)) {
            const placeholder = `{${key}}`;
            bbcodeTemplate = bbcodeTemplate.replace(new RegExp(placeholder, 'g'), value);
        }
        
        // Önizlemeyi göster
        const previewContent = document.querySelector('.preview-content');
        previewContent.textContent = bbcodeTemplate;
        
    } catch (error) {
        console.error('Önizleme oluşturulurken hata:', error);
        document.querySelector('.preview-content').innerHTML = 'Önizleme oluşturulurken bir hata oluştu.';
    }
}

function resetForm(formName, dept) {
    if (confirm("Formu temizlemek istediğinize emin misiniz?")) {
        const formElement = document.querySelector('.form-content');
        if (formElement) {
            formElement.reset();
            localStorage.removeItem(`${dept}_${formName}_data`);
        }
    }
}

function copyPreview() {
    const previewContent = document.querySelector('.preview-content').textContent;
    navigator.clipboard.writeText(previewContent).then(() => {
        alert("Önizleme kopyalandı!");
    }).catch((error) => {
        console.error('Kopyalama hatası:', error);
    });
}

function clearPreview() {
    const previewContent = document.querySelector('.preview-content');
    previewContent.textContent = '';
}

function initializeMenuInteractions() {
    const menuItems = document.querySelectorAll('.menu-item');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const menuBar = document.querySelector('.menu-bar');
    
    // Mobil menü toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            menuBar.classList.toggle('active');
        });
    }

    menuItems.forEach(item => {
        const mainButton = item.querySelector('.main-button');
        const subMenu = item.querySelector('.sub-menu');
        
        mainButton.addEventListener('click', (e) => {
            const isActive = subMenu.classList.contains('active');
            
            // Diğer tüm menüleri kapat
            document.querySelectorAll('.sub-menu').forEach(menu => {
                menu.classList.remove('active');
            });
            
            // Tıklanan menüyü aç/kapat
            if (!isActive) {
                subMenu.classList.add('active');
            }
        });
        
        // Alt menü öğelerine tıklama işleyicisi ekle
        const subMenuItems = subMenu.querySelectorAll('a');
        subMenuItems.forEach(subMenuItem => {
            subMenuItem.addEventListener('click', (e) => {
                e.preventDefault();
                const formName = subMenuItem.getAttribute('data-form');
                const dept = document.querySelector('.department-header h1').textContent.toLowerCase();
                if (formName) {
                    loadForm(formName, dept);
                    
                    // Mobil görünümde menüyü kapat
                    if (window.innerWidth <= 768) {
                        menuBar.classList.remove('active');
                    }
                }
            });
        });
    });

    // Sayfa dışına tıklandığında mobil menüyü kapat
    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && 
            !e.target.closest('.menu-bar') && 
            !e.target.closest('.mobile-menu-toggle')) {
            menuBar.classList.remove('active');
        }
    });
}
