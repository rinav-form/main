function selectDepartment(dept) {
    document.getElementById('departmentModal').classList.add('hidden');
    document.getElementById('mainContent').classList.remove('hidden');
    loadDepartmentHomepage(dept);
}

function loadDepartmentHomepage(dept) {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <div class="department-homepage">
            <div class="department-header">
                <div class="dept-logo-header">
                    <img src="images/logos/${dept}-logo.svg" alt="${dept.toUpperCase()} Logo">
                </div>
                <h1>${dept.toUpperCase()}</h1>
            </div>
            
            <nav class="menu-bar">
                <div class="menu-item">
                    <div class="main-button">
                        <i class="fas fa-file-alt"></i>
                        Formlar
                        <i class="fas fa-chevron-down"></i>
                    </div>
                    <div class="sub-menu">
                        <a href="#"><i class="fas fa-pen"></i>Rapor Oluştur</a>
                        <a href="#"><i class="fas fa-search"></i>Rapor Sorgula</a>
                        <a href="#"><i class="fas fa-history"></i>Geçmiş Raporlar</a>
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
                <!-- İçerik buraya gelecek -->
            </div>
        </div>
    `;

    // Menü etkileşimlerini ekle
    initializeMenuInteractions();
}

function initializeMenuInteractions() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach(item => {
        const mainButton = item.querySelector('.main-button');
        const subMenu = item.querySelector('.sub-menu');
        
        mainButton.addEventListener('mouseenter', () => {
            // Diğer tüm alt menüleri kapat
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
