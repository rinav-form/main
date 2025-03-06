// Departman menülerini tanımla
const departmentMenus = {
    lspd: {
        forms: [
            { id: 'incident-report', icon: 'fa-pen', title: 'Olay Raporu' },
            { id: 'arrest-report', icon: 'fa-handcuffs', title: 'Tutuklama Raporu' },
            { id: 'patrol-log', icon: 'fa-car', title: 'Devriye Logu' },
            { id: 'search-warrant', icon: 'fa-magnifying-glass', title: 'Arama Emri' },
            { id: 'vehicle-report', icon: 'fa-car-burst', title: 'Araç Raporu' }
        ],
        database: [
            { id: 'criminal-search', icon: 'fa-user-check', title: 'Sabıka Sorgula' },
            { id: 'vehicle-search', icon: 'fa-car', title: 'Araç Sorgula' },
            { id: 'warrant-search', icon: 'fa-gavel', title: 'Arama Emri Sorgula' }
        ]
    },
    lssd: {
        forms: [
            { id: 'incident-report', icon: 'fa-pen', title: 'Olay Raporu' },
            { id: 'arrest-report', icon: 'fa-handcuffs', title: 'Tutuklama Raporu' },
            { id: 'patrol-log', icon: 'fa-car', title: 'Devriye Logu' },
            { id: 'property-seizure', icon: 'fa-box', title: 'Mülk Müsadere' }
        ],
        database: [
            { id: 'criminal-search', icon: 'fa-user-check', title: 'Sabıka Sorgula' },
            { id: 'vehicle-search', icon: 'fa-car', title: 'Araç Sorgula' },
            { id: 'property-search', icon: 'fa-house', title: 'Mülk Sorgula' }
        ]
    },
    lsfmd: {
        forms: [
            { id: 'medical-report', icon: 'fa-notes-medical', title: 'Tıbbi Rapor' },
            { id: 'incident-report', icon: 'fa-pen', title: 'Olay Raporu' },
            { id: 'treatment-log', icon: 'fa-hospital', title: 'Tedavi Kaydı' },
            { id: 'fire-report', icon: 'fa-fire', title: 'Yangın Raporu' }
        ],
        database: [
            { id: 'patient-search', icon: 'fa-user', title: 'Hasta Sorgula' },
            { id: 'medical-history', icon: 'fa-file-medical', title: 'Tıbbi Geçmiş' }
        ]
    },
    fib: {
        forms: [
            { id: 'investigation-report', icon: 'fa-magnifying-glass', title: 'Soruşturma Raporu' },
            { id: 'surveillance-log', icon: 'fa-eye', title: 'Gözetim Logu' },
            { id: 'operation-report', icon: 'fa-shield', title: 'Operasyon Raporu' }
        ],
        database: [
            { id: 'case-search', icon: 'fa-folder', title: 'Dosya Sorgula' },
            { id: 'criminal-record', icon: 'fa-user-secret', title: 'Suç Kaydı' },
            { id: 'intel-database', icon: 'fa-database', title: 'İstihbarat Veritabanı' }
        ]
    },
    doj: {
        forms: [
            { id: 'court-order', icon: 'fa-gavel', title: 'Mahkeme Kararı' },
            { id: 'warrant-request', icon: 'fa-file-signature', title: 'Arama Emri Talebi' },
            { id: 'hearing-schedule', icon: 'fa-calendar', title: 'Duruşma Takvimi' }
        ],
        database: [
            { id: 'case-search', icon: 'fa-scale-balanced', title: 'Dava Sorgula' },
            { id: 'criminal-record', icon: 'fa-user', title: 'Sabıka Kaydı' },
            { id: 'lawyer-registry', icon: 'fa-user-tie', title: 'Avukat Sicili' }
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
                    <div class="dept-logo-header">
                        <img src="images/logos/${dept}-logo.svg" alt="${dept.toUpperCase()} Logo">
                    </div>
                    <div class="dept-info">
                        <h1>${dept.toUpperCase()}</h1>
                        <p>${deptNames[dept]}</p>
                    </div>
                </div>
                
                <nav class="menu-bar">
                    <div class="menu-item">
                        <div class="main-button">
                            <i class="fas fa-file-alt"></i>
                            Formlar
                            <i class="fas fa-chevron-down"></i>
                        </div>
                        <div class="sub-menu">
                            ${departmentMenus[dept].forms.map(form => `
                                <a href="#" data-form="${form.id}">
                                    <i class="fas ${form.icon}"></i>${form.title}
                                </a>
                            `).join('')}
                        </div>
                    </div>

                    <div class="menu-item">
                        <div class="main-button">
                            <i class="fas fa-database"></i>
                            Veri Tabanı
                            <i class="fas fa-chevron-down"></i>
                        </div>
                        <div class="sub-menu">
                            ${departmentMenus[dept].database.map(item => `
                                <a href="#" data-form="${item.id}">
                                    <i class="fas ${item.icon}"></i>${item.title}
                                </a>
                            `).join('')}
                        </div>
                    </div>
                </nav>

                <a href="#" class="back-button" onclick="goBack()">
                    <i class="fas fa-arrow-left"></i>
                    Geri Dön
                </a>
            </div>

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
        const formResponse = await fetch(`forms/${dept}/${formName}.html`);
        const formHtml = await formResponse.text();
        
        // BBCode şablonunu yükle
        const bbcodeResponse = await fetch(`bbcodes/${dept}/${formName}.txt`);
        const bbcodeTemplate = await bbcodeResponse.text();
        
        contentArea.innerHTML = `
            <div class="form-container">
                <div class="form-content">
                    ${formHtml}
                </div>
                <button class="preview-button" onclick="generatePreview('${formName}', '${dept}')">
                    <i class="fas fa-eye"></i> Önizleme Yap
                </button>
            </div>
            <div class="preview-container">
                <div class="preview-content"></div>
            </div>
        `;
        
        // Form verilerini localStorage'a kaydet
        document.querySelector('form').addEventListener('input', (e) => {
            const formData = new FormData(e.target.form);
            const formObject = Object.fromEntries(formData);
            localStorage.setItem(`${dept}_${formName}_data`, JSON.stringify(formObject));
        });
        
    } catch (error) {
        console.error('Form yüklenirken hata:', error);
        contentArea.innerHTML = '<p>Form yüklenirken bir hata oluştu.</p>';
    }
}

async function generatePreview(formName, dept) {
    try {
        // BBCode şablonunu yükle
        const bbcodeResponse = await fetch(`bbcodes/${dept}/${formName}.txt`);
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
        
        // Alt menü öğelerine tıklama işleyicisi ekle
        const subMenuItems = subMenu.querySelectorAll('a');
        subMenuItems.forEach(subMenuItem => {
            subMenuItem.addEventListener('click', (e) => {
                e.preventDefault();
                const formName = subMenuItem.getAttribute('data-form');
                const dept = document.querySelector('.department-header h1').textContent.toLowerCase();
                if (formName) {
                    loadForm(formName, dept);
                }
            });
        });
    });
}
