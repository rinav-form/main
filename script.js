function loadDepartmentContent(dept) {
    const mainContent = document.getElementById('mainContent');
    
    if (dept === 'lspd') {
        mainContent.innerHTML = `
            <div class="department-container">
                <header class="department-header">
                    <h1>Los Santos Polis Departmanı</h1>
                    <button onclick="showDepartmentModal()" class="back-button">
                        <i class="fas fa-arrow-left"></i> Geri
                    </button>
                </header>
                
                <div class="divisions-grid">
                    <div class="division-card" onclick="selectDivision('patrol')">
                        <div class="division-icon">
                            <i class="fas fa-car-side"></i>
                        </div>
                        <h2>Patrol Division</h2>
                        <div class="division-content">
                            <ul>
                                <li>Devriye Raporu</li>
                                <li>Olay Raporu</li>
                                <li>Tutuklama Raporu</li>
                            </ul>
                        </div>
                    </div>

                    <div class="division-card" onclick="selectDivision('detective')">
                        <div class="division-icon">
                            <i class="fas fa-search"></i>
                        </div>
                        <h2>Detective Bureau</h2>
                        <div class="division-content">
                            <ul>
                                <li>Soruşturma Raporu</li>
                                <li>Delil Raporu</li>
                                <li>Vaka Takip Formu</li>
                            </ul>
                        </div>
                    </div>

                    <div class="division-card" onclick="selectDivision('metropolitan')">
                        <div class="division-icon">
                            <i class="fas fa-building-shield"></i>
                        </div>
                        <h2>Metropolitan Division</h2>
                        <div class="division-content">
                            <ul>
                                <li>Operasyon Raporu</li>
                                <li>Taktik Müdahale Raporu</li>
                                <li>Özel Birim Raporu</li>
                            </ul>
                        </div>
                    </div>

                    <div class="division-card" onclick="selectDivision('traffic')">
                        <div class="division-icon">
                            <i class="fas fa-traffic-light"></i>
                        </div>
                        <h2>Traffic Division</h2>
                        <div class="division-content">
                            <ul>
                                <li>Trafik Raporu</li>
                                <li>Kaza Raporu</li>
                                <li>Ceza Makbuzu</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}

function showDepartmentModal() {
    document.getElementById('departmentModal').classList.remove('hidden');
    document.getElementById('mainContent').classList.add('hidden');
}

function selectDivision(division) {
    // Divizyon seçildiğinde form sayfasına yönlendirecek
    loadDivisionForms(division);
}
