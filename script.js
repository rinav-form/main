function selectDepartment(dept) {
    document.getElementById('departmentModal').classList.add('hidden');
    document.getElementById('mainContent').classList.remove('hidden');
    loadDepartmentHomepage(dept);
}

function loadDepartmentHomepage(dept) {
    const mainContent = document.getElementById('mainContent');
    mainContent.innerHTML = `
        <button class="back-button" onclick="returnToDepartmentSelection()">
            <i class="fas fa-arrow-left"></i>
            Geri Dön
        </button>
        <div class="department-homepage">
            <div class="department-header">
                <div class="dept-logo-header">
                    <img src="images/logos/${dept}-logo.svg" alt="${dept.toUpperCase()} Logo">
                </div>
                <h1>${dept.toUpperCase()}</h1>
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
                    <a href="#" onclick="loadIncidentReportForm('lspd')"><i class="fas fa-pen"></i>Olay Raporu Oluştur</a>
                    <a href="#"><i class="fas fa-car-crash"></i>Kaza Raporu</a>
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
                    <a href="#"><i class="fas fa-id-card"></i>Ehliyet Sorgula</a>
                </div>
            </div>
            <div class="menu-item">
                <div class="main-button">
                    <i class="fas fa-shield-alt"></i>
                    Operasyonlar
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="sub-menu">
                    <a href="#"><i class="fas fa-map-marked-alt"></i>Devriye Kaydı</a>
                    <a href="#"><i class="fas fa-bullhorn"></i>Operasyon Planla</a>
                    <a href="#"><i class="fas fa-tasks"></i>Aktif Operasyonlar</a>
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
                    <a href="#"><i class="fas fa-star"></i>Rütbe İşlemleri</a>
                    <a href="#"><i class="fas fa-chart-bar"></i>İstatistikler</a>
                    <a href="#"><i class="fas fa-calendar-alt"></i>Nöbet Çizelgesi</a>
                </div>
            </div>
        `,
        lssd: `
            <div class="menu-item">
                <div class="main-button">
                    <i class="fas fa-file-alt"></i>
                    Raporlar
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="sub-menu">
                    <a href="#" onclick="loadIncidentReportForm('lssd')"><i class="fas fa-pen"></i>Olay Raporu</a>
                    <a href="#"><i class="fas fa-exclamation-triangle"></i>İhbar Kaydı</a>
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
                    <a href="#"><i class="fas fa-home"></i>Mülk Sorgula</a>
                    <a href="#"><i class="fas fa-fingerprint"></i>Sabıka Sorgula</a>
                </div>
            </div>
            <div class="menu-item">
                <div class="main-button">
                    <i class="fas fa-shield-alt"></i>
                    Operasyonlar
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="sub-menu">
                    <a href="#"><i class="fas fa-map-marked-alt"></i>Devriye Kaydı</a>
                    <a href="#"><i class="fas fa-search-location"></i>Arama Kurtarma</a>
                    <a href="#"><i class="fas fa-tasks"></i>Aktif Operasyonlar</a>
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
                    <a href="#"><i class="fas fa-star"></i>Rütbe İşlemleri</a>
                    <a href="#"><i class="fas fa-calendar-alt"></i>Nöbet Çizelgesi</a>
                </div>
            </div>
        `,
        lsfmd: `
            <div class="menu-item">
                <div class="main-button">
                    <i class="fas fa-file-alt"></i>
                    Raporlar
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="sub-menu">
                    <a href="#" onclick="loadIncidentReportForm('lsfmd')"><i class="fas fa-fire"></i>Yangın Raporu</a>
                    <a href="#"><i class="fas fa-ambulance"></i>Medikal Rapor</a>
                    <a href="#"><i class="fas fa-search"></i>Rapor Sorgula</a>
                    <a href="#"><i class="fas fa-history"></i>Geçmiş Raporlar</a>
                </div>
            </div>
            <div class="menu-item">
                <div class="main-button">
                    <i class="fas fa-heartbeat"></i>
                    Medikal
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="sub-menu">
                    <a href="#"><i class="fas fa-notes-medical"></i>Hasta Kaydı</a>
                    <a href="#"><i class="fas fa-procedures"></i>Tedavi Geçmişi</a>
                    <a href="#"><i class="fas fa-hospital"></i>Hastane Sevk</a>
                </div>
            </div>
            <div class="menu-item">
                <div class="main-button">
                    <i class="fas fa-truck"></i>
                    Operasyonlar
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="sub-menu">
                    <a href="#"><i class="fas fa-fire-extinguisher"></i>Ekip Görevlendirme</a>
                    <a href="#"><i class="fas fa-map-marked-alt"></i>Olay Yeri Haritası</a>
                    <a href="#"><i class="fas fa-tasks"></i>Aktif Çağrılar</a>
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
                    <a href="#"><i class="fas fa-truck-medical"></i>Araç Filosu</a>
                    <a href="#"><i class="fas fa-calendar-alt"></i>Nöbet Çizelgesi</a>
                </div>
            </div>
        `,
        fib: `
            <div class="menu-item">
                <div class="main-button">
                    <i class="fas fa-file-alt"></i>
                    Dosyalar
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="sub-menu">
                    <a href="#" onclick="loadIncidentReportForm('fib')"><i class="fas fa-folder-plus"></i>Yeni Soruşturma</a>
                    <a href="#"><i class="fas fa-search"></i>Dosya Sorgula</a>
                    <a href="#"><i class="fas fa-folder-open"></i>Aktif Soruşturmalar</a>
                    <a href="#"><i class="fas fa-archive"></i>Arşiv</a>
                </div>
            </div>
            <div class="menu-item">
                <div class="main-button">
                    <i class="fas fa-database"></i>
                    İstihbarat
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="sub-menu">
                    <a href="#"><i class="fas fa-user-secret"></i>Şüpheli Takibi</a>
                    <a href="#"><i class="fas fa-network-wired"></i>Organizasyon Şeması</a>
                    <a href="#"><i class="fas fa-phone"></i>İletişim Takibi</a>
                    <a href="#"><i class="fas fa-money-bill-wave"></i>Mali Takip</a>
                </div>
            </div>
            <div class="menu-item">
                <div class="main-button">
                    <i class="fas fa-shield-alt"></i>
                    Operasyonlar
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="sub-menu">
                    <a href="#"><i class="fas fa-user-shield"></i>Operasyon Planla</a>
                    <a href="#"><i class="fas fa-tasks"></i>Aktif Operasyonlar</a>
                    <a href="#"><i class="fas fa-file-signature"></i>Operasyon Raporları</a>
                </div>
            </div>
            <div class="menu-item">
                <div class="main-button">
                    <i class="fas fa-cog"></i>
                    Yönetim
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="sub-menu">
                    <a href="#"><i class="fas fa-users"></i>Ajan Yönetimi</a>
                    <a href="#"><i class="fas fa-user-tie"></i>Gizli Servis</a>
                    <a href="#"><i class="fas fa-chart-network"></i>Network Analizi</a>
                </div>
            </div>
        `,
        doj: `
            <div class="menu-item">
                <div class="main-button">
                    <i class="fas fa-gavel"></i>
                    Davalar
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="sub-menu">
                    <a href="#" onclick="loadIncidentReportForm('doj')"><i class="fas fa-plus-circle"></i>Yeni Dava</a>
                    <a href="#"><i class="fas fa-search"></i>Dava Sorgula</a>
                    <a href="#"><i class="fas fa-calendar-day"></i>Duruşma Takvimi</a>
                    <a href="#"><i class="fas fa-archive"></i>Dava Arşivi</a>
                </div>
            </div>
            <div class="menu-item">
                <div class="main-button">
                    <i class="fas fa-balance-scale"></i>
                    Hukuki İşlemler
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="sub-menu">
                    <a href="#"><i class="fas fa-file-contract"></i>Sözleşmeler</a>
                    <a href="#"><i class="fas fa-stamp"></i>Kararnameler</a>
                    <a href="#"><i class="fas fa-handcuffs"></i>Tutuklama Emirleri</a>
                    <a href="#"><i class="fas fa-scroll"></i>Yasal Belgeler</a>
                </div>
            </div>
            <div class="menu-item">
                <div class="main-button">
                    <i class="fas fa-landmark"></i>
                    Mahkeme
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="sub-menu">
                    <a href="#"><i class="fas fa-users"></i>Jüri Seçimi</a>
                    <a href="#"><i class="fas fa-microphone-alt"></i>Duruşma Kayıtları</a>
                    <a href="#"><i class="fas fa-book-open"></i>Emsal Kararlar</a>
                </div>
            </div>
            <div class="menu-item">
                <div class="main-button">
                    <i class="fas fa-cog"></i>
                    Yönetim
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="sub-menu">
                    <a href="#"><i class="fas fa-user-tie"></i>Personel Yönetimi</a>
                    <a href="#"><i class="fas fa-chart-bar"></i>İstatistikler</a>
                    <a href="#"><i class="fas fa-file-invoice-dollar"></i>Bütçe Yönetimi</a>
                </div>
            </div>
        `
    };

    return menus[dept] || '';
}

function loadIncidentReportForm(dept) {
    const contentArea = document.getElementById('contentArea');
    const formTitle = getFormTitle(dept);
    
    contentArea.innerHTML = `
        <div class="form-page">
            <div class="report-form">
                <h2>${formTitle}</h2>
                <form id="incidentForm" onsubmit="return false;">
                    <div class="form-group">
                        <label>Tarih ve Saat</label>
                        <input type="datetime-local" id="dateTime" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Olay Yeri</label>
                        <input type="text" id="location" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Olay Türü</label>
                        <select id="incidentType" required>
                            ${getIncidentTypes(dept)}
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>Şüpheli Bilgileri</label>
                        <textarea id="suspects" placeholder="İsim, Eşkal, Diğer Detaylar"></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label>Olay Detayları</label>
                        <textarea id="details" required></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label>Alınan Önlemler</label>
                        <textarea id="actions"></textarea>
                    </div>

                    ${getDepartmentSpecificFields(dept)}
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

    // Form değişikliklerini dinle
    const form = document.getElementById('incidentForm');
    const formElements = form.elements;
    for (let element of formElements) {
        element.addEventListener('input', () => updateBBCode(dept));
    }
}

function getFormTitle(dept) {
    const titles = {
        lspd: 'Polis Olay Raporu',
        lssd: 'Şerif Olay Raporu',
        lsfmd: 'İtfaiye/Medikal Olay Raporu',
        fib: 'Soruşturma Raporu',
        doj: 'Dava Dosyası'
    };
    return titles[dept] || 'Olay Raporu';
}

function getIncidentTypes(dept) {
    const types = {
        lspd: `
            <option value="">Seçiniz</option>
            <option value="Hırsızlık">Hırsızlık</option>
            <option value="Saldırı">Saldırı</option>
            <option value="Trafik">Trafik</option>
            <option value="Uyuşturucu">Uyuşturucu</option>
            <option value="Silahlı Çatışma">Silahlı Çatışma</option>
            <option value="Diğer">Diğer</option>
        `,
        lssd: `
            <option value="">Seçiniz</option>
            <option value="İhbar">İhbar</option>
            <option value="Asayiş">Asayiş</option>
            <option value="Kaçakçılık">Kaçakçılık</option>
            <option value="Kayıp Şahıs">Kayıp Şahıs</option>
            <option value="Diğer">Diğer</option>
        `,
        lsfmd: `
            <option value="">Seçiniz</option>
            <option value="Yangın">Yangın</option>
            <option value="Trafik Kazası">Trafik Kazası</option>
            <option value="Medikal">Medikal</option>
            <option value="Arama Kurtarma">Arama Kurtarma</option>
            <option value="Diğer">Diğer</option>
        `,
        fib: `
            <option value="">Seçiniz</option>
            <option value="Organize Suç">Organize Suç</option>
            <option value="Terör">Terör</option>
            <option value="İstihbarat">İstihbarat</option>
            <option value="Yolsuzluk">Yolsuzluk</option>
            <option value="Diğer">Diğer</option>
        `,
        doj: `
            <option value="">Seçiniz</option>
            <option value="Ceza Davası">Ceza Davası</option>
            <option value="Hukuk Davası">Hukuk Davası</option>
            <option value="İdari Dava">İdari Dava</option>
            <option value="Diğer">Diğer</option>
        `
    };
    return types[dept] || '';
}

function getDepartmentSpecificFields(dept) {
    const fields = {
        lspd: `
            <div class="form-group">
                <label>Araç Plakası</label>
                <input type="text" id="vehiclePlate">
            </div>
            <div class="form-group">
                <label>Delil Bilgileri</label>
                <textarea id="evidence"></textarea>
            </div>
        `,
        lssd: `
            <div class="form-group">
                <label>İhbar Eden</label>
                <input type="text" id="reporter">
            </div>
            <div class="form-group">
                <label>Tanık İfadeleri</label>
                <textarea id="witnesses"></textarea>
            </div>
        `,
        lsfmd: `
            <div class="form-group">
                <label>Yaralı Sayısı</label>
                <input type="number" id="injuredCount" min="0">
            </div>
            <div class="form-group">
                <label>Müdahale Detayları</label>
                <textarea id="medicalDetails"></textarea>
            </div>
        `,
        fib: `
            <div class="form-group">
                <label>Operasyon Kodu</label>
                <input type="text" id="operationCode">
            </div>
            <div class="form-group">
                <label>Gizlilik Derecesi</label>
                <select id="securityLevel">
                    <option value="Düşük">Düşük</option>
                    <option value="Orta">Orta</option>
                    <option value="Yüksek">Yüksek</option>
                    <option value="Gizli">Gizli</option>
                </select>
            </div>
        `,
        doj: `
            <div class="form-group">
                <label>Dava Numarası</label>
                <input type="text" id="caseNumber">
            </div>
            <div class="form-group">
                <label>Mahkeme Salonu</label>
                <input type="text" id="courtRoom">
            </div>
        `
    };
    return fields[dept] || '';
}

function updateBBCode(dept) {
    const dateTime = document.getElementById('dateTime').value;
    const location = document.getElementById('location').value;
    const incidentType = document.getElementById('incidentType').value;
    const suspects = document.getElementById('suspects').value;
    const details = document.getElementById('details').value;
    const actions = document.getElementById('actions').value;

    let additionalInfo = '';
    
    // Departmana özel alanları kontrol et
    switch(dept) {
        case 'lspd':
            const vehiclePlate = document.getElementById('vehiclePlate').value;
            const evidence = document.getElementById('evidence').value;
            if (vehiclePlate) additionalInfo += `\n[b]Araç Plakası:[/b] ${vehiclePlate}`;
            if (evidence) additionalInfo += `\n\n[b]Delil Bilgileri:[/b]\n${evidence}`;
            break;
        case 'lssd':
            const reporter = document.getElementById('reporter').value;
            const witnesses = document.getElementById('witnesses').value;
            if (reporter) additionalInfo += `\n[b]İhbar Eden:[/b] ${reporter}`;
            if (witnesses) additionalInfo += `\n\n[b]Tanık İfadeleri:[/b]\n${witnesses}`;
            break;
        case 'lsfmd':
            const injuredCount = document.getElementById('injuredCount').value;
            const medicalDetails = document.getElementById('medicalDetails').value;
            if (injuredCount) additionalInfo += `\n[b]Yaralı Sayısı:[/b] ${injuredCount}`;
            if (medicalDetails) additionalInfo += `\n\n[b]Müdahale Detayları:[/b]\n${medicalDetails}`;
            break;
        case 'fib':
            const operationCode = document.getElementById('operationCode').value;
            const securityLevel = document.getElementById('securityLevel').value;
            if (operationCode) additionalInfo += `\n[b]Operasyon Kodu:[/b] ${operationCode}`;
            if (securityLevel) additionalInfo += `\n[b]Gizlilik Derecesi:[/b] ${securityLevel}`;
            break;
        case 'doj':
            const caseNumber = document.getElementById('caseNumber').value;
            const courtRoom = document.getElementById('courtRoom').value;
            if (caseNumber) additionalInfo += `\n[b]Dava Numarası:[/b] ${caseNumber}`;
            if (courtRoom) additionalInfo += `\n[b]Mahkeme Salonu:[/b] ${courtRoom}`;
            break;
    }

    const formattedDate = dateTime ? new Date(dateTime).toLocaleString('tr-TR') : '';

    const bbcode = `[divbox=white]
[center][b]${getFormTitle(dept).toUpperCase()}[/b][/center]

[b]Tarih ve Saat:[/b] ${formattedDate}
[b]Olay Yeri:[/b] ${location}
[b]Olay Türü:[/b] ${incidentType}${additionalInfo}

[b]Şüpheli Bilgileri:[/b]
${suspects}

[b]Olay Detayları:[/b]
${details}

[b]Alınan Önlemler:[/b]
${actions}
[/divbox]`;

    document.getElementById('bbcodePreview').value = bbcode;
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
