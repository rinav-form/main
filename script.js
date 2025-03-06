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
                <a href="#" class="back-button" onclick="goBack()">
                    <i class="fas fa-arrow-left"></i>
                    Geri Dön
                </a>
                <div class="dept-logo-header">
                    <img src="images/logos/${dept}-logo.svg" alt="${dept.toUpperCase()} Logo">
                </div>
                <div>
                    <h1>${dept.toUpperCase()}</h1>
                    <p style="opacity: 0.8; font-size: 0.9rem;">${deptNames[dept]}</p>
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
                        <a href="#" data-form="incident-report"><i class="fas fa-pen"></i>Olay Raporu</a>
                        <a href="#" data-form="arrest-report"><i class="fas fa-handcuffs"></i>Tutuklama Raporu</a>
                        <a href="#" data-form="patrol-log"><i class="fas fa-car"></i>Devriye Logu</a>
                    </div>
                </div>

                <div class="menu-item">
                    <div class="main-button">
                        <i class="fas fa-database"></i>
                        Veri Tabanı
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="sub-menu">
                        <a href="#"><i class="fas fa-user-check"></i>Personel Sorgula</a>
                        <a href="#"><i class="fas fa-car"></i>Araç Sorgula</a>
                        <a href="#"><i class="fas fa-fingerprint"></i>Sabıka Sorgula</a>
                    </div>
                </div>

                <div class="menu-item">
                    <div class="main-button">
                        <i class="fas fa-cog"></i>
                        Yönetim
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="sub-menu">
                        <a href="#"><i class="fas fa-users"></i>Personel Yönetimi</a>
                        <a href="#"><i class="fas fa-clipboard-list"></i>Görev Yönetimi</a>
                        <a href="#"><i class="fas fa-chart-bar"></i>İstatistikler</a>
                    </div>
                </div>
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
