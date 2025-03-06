// Departman menülerinin tanımlanması
const departmentMenus = {
    lspd: {
        forms: [
            { name: "Tutuklama Raporu", id: "arrest-report" },
            { name: "Olay Raporu", id: "incident-report" },
            { name: "Trafik Cezası", id: "traffic-ticket" },
            { name: "Arama Emri", id: "search-warrant" }
        ],
        queries: [
            { name: "Sabıka Kaydı Sorgula", id: "criminal-record" },
            { name: "Araç Sorgula", id: "vehicle-query" },
            { name: "Silah Ruhsatı Sorgula", id: "weapon-license" }
        ]
    },
    lssd: {
        forms: [
            { name: "Tutuklama Raporu", id: "arrest-report" },
            { name: "Olay Raporu", id: "incident-report" },
            { name: "Trafik Cezası", id: "traffic-ticket" },
            { name: "Arama Emri", id: "search-warrant" }
        ],
        queries: [
            { name: "Sabıka Kaydı Sorgula", id: "criminal-record" },
            { name: "Araç Sorgula", id: "vehicle-query" },
            { name: "Silah Ruhsatı Sorgula", id: "weapon-license" }
        ]
    },
    lsfmd: {
        forms: [
            { name: "Tedavi Raporu", id: "treatment-report" },
            { name: "Otopsi Raporu", id: "autopsy-report" },
            { name: "Psikolojik Değerlendirme", id: "psych-eval" }
        ],
        queries: [
            { name: "Hasta Kaydı Sorgula", id: "patient-record" },
            { name: "İlaç Geçmişi", id: "medication-history" }
        ]
    },
    fib: {
        forms: [
            { name: "Operasyon Raporu", id: "operation-report" },
            { name: "İstihbarat Raporu", id: "intelligence-report" },
            { name: "Soruşturma Dosyası", id: "investigation-file" }
        ],
        queries: [
            { name: "Federal Suç Kaydı", id: "federal-record" },
            { name: "Örgüt Bilgisi Sorgula", id: "organization-query" },
            { name: "Güvenlik Seviyesi", id: "security-level" }
        ]
    },
    doj: {
        forms: [
            { name: "Dava Dosyası", id: "case-file" },
            { name: "Mahkeme Kararı", id: "court-decision" },
            { name: "Celp Kağıdı", id: "subpoena" }
        ],
        queries: [
            { name: "Dava Geçmişi", id: "case-history" },
            { name: "Sabıka Kaydı", id: "criminal-record" },
            { name: "Avukat Sicili", id: "lawyer-record" }
        ]
    }
};

// Departman seçimi fonksiyonu
function selectDepartment(department) {
    const modal = document.querySelector('.fullscreen-modal');
    modal.classList.add('hidden');
    loadDepartmentHomepage(department);
}

// Departman anasayfasını yükleme fonksiyonu
function loadDepartmentHomepage(department) {
    const deptInfo = getDepartmentInfo(department);
    const mainContent = document.getElementById('main-content');
    mainContent.classList.remove('hidden');

    // Header oluşturma
    const headerHtml = `
        <div class="department-header">
            <div class="header-left">
                <div class="dept-logo-header">
                    <img src="images/logos/${department}-logo.png" alt="${deptInfo.name} Logo">
                </div>
                <div class="dept-info">
                    <h1>${deptInfo.name}</h1>
                    <p>${deptInfo.description}</p>
                </div>
            </div>
            <button class="mobile-menu-toggle">
                <i class="fas fa-bars"></i>
            </button>
        </div>
    `;

    // Menü oluşturma
    const menuHtml = `
        <div class="menu-bar">
            <div class="menu-item">
                <button class="main-button">
                    <div class="button-content">
                        <i class="fas fa-file-alt"></i>
                        <span>Formlar</span>
                    </div>
                    <i class="fas fa-chevron-right"></i>
                </button>
                <div class="sub-menu">
                    ${departmentMenus[department].forms.map(form => `
                        <a href="#" onclick="loadForm('${form.id}', '${department}')">
                            <i class="fas fa-file-alt"></i>
                            <span>${form.name}</span>
                        </a>
                    `).join('')}
                </div>
            </div>
            <div class="menu-item">
                <button class="main-button">
                    <div class="button-content">
                        <i class="fas fa-database"></i>
                        <span>Sorgular</span>
                    </div>
                    <i class="fas fa-chevron-right"></i>
                </button>
                <div class="sub-menu">
                    ${departmentMenus[department].queries.map(query => `
                        <a href="#" onclick="loadForm('${query.id}', '${department}')">
                            <i class="fas fa-search"></i>
                            <span>${query.name}</span>
                        </a>
                    `).join('')}
                </div>
            </div>
        </div>
    `;

    // İçerik alanı oluşturma
    const contentHtml = `
        <div class="content-area">
            <div class="form-container">
                <h2>Form</h2>
                <div id="form-content"></div>
            </div>
            <div class="preview-container">
                <h2>BBCode Önizleme</h2>
                <div id="preview-content"></div>
            </div>
        </div>
    `;

    mainContent.innerHTML = headerHtml + menuHtml + contentHtml;
    initializeMenuInteractions();
}

// Form yükleme fonksiyonu
function loadForm(formId, department) {
    const formContent = document.getElementById('form-content');
    const formHtml = generateFormHtml(formId, department);
    formContent.innerHTML = formHtml;

    // Form verilerini local storage'dan yükleme
    loadFormData(formId);

    // Form değişikliklerini dinleme
    const form = formContent.querySelector('form');
    form.addEventListener('input', () => {
        generatePreview(formId);
        saveFormData(formId, form);
    });

    // İlk önizlemeyi oluştur
    generatePreview(formId);
}

// Form verilerini kaydetme
function saveFormData(formId, form) {
    const formData = {};
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        formData[input.id] = input.value;
    });
    localStorage.setItem(`form_${formId}`, JSON.stringify(formData));
}

// Form verilerini yükleme
function loadFormData(formId) {
    const savedData = localStorage.getItem(`form_${formId}`);
    if (savedData) {
        const formData = JSON.parse(savedData);
        const form = document.querySelector('form');
        Object.keys(formData).forEach(inputId => {
            const input = form.querySelector(`#${inputId}`);
            if (input) {
                input.value = formData[inputId];
            }
        });
    }
}

// Menü etkileşimlerini başlatma
function initializeMenuInteractions() {
    // Ana menü düğmeleri için tıklama olayları
    const mainButtons = document.querySelectorAll('.main-button');
    mainButtons.forEach(button => {
        button.addEventListener('click', () => {
            const subMenu = button.nextElementSibling;
            const isActive = subMenu.classList.contains('active');
            
            // Diğer tüm alt menüleri kapat
            document.querySelectorAll('.sub-menu').forEach(menu => {
                menu.classList.remove('active');
            });
            document.querySelectorAll('.main-button').forEach(btn => {
                btn.classList.remove('active');
            });

            // Tıklanan menüyü aç/kapat
            if (!isActive) {
                subMenu.classList.add('active');
                button.classList.add('active');
            }
        });
    });

    // Mobil menü toggle düğmesi için tıklama olayı
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const menuBar = document.querySelector('.menu-bar');
    if (mobileMenuToggle && menuBar) {
        mobileMenuToggle.addEventListener('click', () => {
            menuBar.classList.toggle('active');
        });
    }
}

// Departman bilgilerini döndürme fonksiyonu
function getDepartmentInfo(department) {
    const deptInfo = {
        lspd: {
            name: "Los Santos Polis Departmanı",
            description: "Hizmet ve Koruma"
        },
        lssd: {
            name: "Los Santos Şerif Departmanı",
            description: "Toplum için Hizmet"
        },
        lsfmd: {
            name: "Los Santos İtfaiye ve Sağlık Departmanı",
            description: "Hayat Kurtarma ve Koruma"
        },
        fib: {
            name: "Federal Soruşturma Bürosu",
            description: "Sadakat, Cesaret, Dürüstlük"
        },
        doj: {
            name: "Adalet Bakanlığı",
            description: "Adalet ve Hukuk"
        }
    };
    return deptInfo[department];
}

// Form HTML'i oluşturma fonksiyonu
function generateFormHtml(formId, department) {
    // Form şablonları burada tanımlanacak
    const templates = {
        "arrest-report": `
            <form id="arrest-form">
                <div class="form-group">
                    <label for="suspect">Şüpheli Adı:</label>
                    <input type="text" id="suspect" required>
                </div>
                <div class="form-group">
                    <label for="charges">Suçlamalar:</label>
                    <textarea id="charges" rows="4" required></textarea>
                </div>
                <div class="form-group">
                    <label for="details">Olay Detayları:</label>
                    <textarea id="details" rows="6" required></textarea>
                </div>
                <button type="button" class="preview-button" onclick="generatePreview('${formId}')">Önizle</button>
            </form>
        `,
        // Diğer form şablonları buraya eklenecek
    };

    return templates[formId] || `<p>Form şablonu bulunamadı: ${formId}</p>`;
}

// BBCode önizleme oluşturma fonksiyonu
function generatePreview(formId) {
    const previewContent = document.getElementById('preview-content');
    const form = document.querySelector('form');
    
    if (!form) return;

    let bbcode = '';
    switch (formId) {
        case 'arrest-report':
            const suspect = form.querySelector('#suspect').value;
            const charges = form.querySelector('#charges').value;
            const details = form.querySelector('#details').value;

            bbcode = `[divbox=white][center][b]TUTUKLAMA RAPORU[/b][/center]

[b]Şüpheli:[/b] ${suspect}

[b]Suçlamalar:[/b]
${charges}

[b]Olay Detayları:[/b]
${details}[/divbox]`;
            break;
        // Diğer form tipleri için önizleme şablonları buraya eklenecek
    }

    previewContent.innerHTML = `<pre class="preview-content">${bbcode}</pre>`;
}

// Sayfa yüklendiğinde
document.addEventListener('DOMContentLoaded', () => {
    // URL'den departman parametresini kontrol et
    const urlParams = new URLSearchParams(window.location.search);
    const department = urlParams.get('department');

    if (department && departmentMenus[department]) {
        // Eğer geçerli bir departman parametresi varsa, direkt o departmanın sayfasını yükle
        selectDepartment(department);
    }
});
