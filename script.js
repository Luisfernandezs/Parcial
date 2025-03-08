document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const groups = document.querySelectorAll('.group-card');
    const backButton = document.getElementById('back-button');
    
    // Datos
    let researchers = JSON.parse(localStorage.getItem('researchers')) || [];
    let students = JSON.parse(localStorage.getItem('students')) || [];
    let activities = JSON.parse(localStorage.getItem('activities')) || [];
    
    // Mostrar detalles del grupo
    groups.forEach(group => {
        group.addEventListener('click', () => {
            document.getElementById('groups-list').style.display = 'none';
            document.getElementById('group-details').style.display = 'block';
        });
    });

    // Volver a la lista de grupos
    backButton.addEventListener('click', () => {
        document.getElementById('groups-list').style.display = 'block';
        document.getElementById('group-details').style.display = 'none';
    });

    // Registrar investigador
    document.getElementById('registerResearcher').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        researchers.push({
            name: formData.get('name'),
            education: formData.get('education'),
            schedule: formData.get('schedule'),
            group: formData.get('group')
        });
        
        localStorage.setItem('researchers', JSON.stringify(researchers));
        updateResearchersList();
        e.target.reset();
        bootstrap.Modal.getInstance(document.getElementById('researcherModal')).hide();
    });

    // Vincular estudiante
    document.getElementById('registerStudent').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        students.push({
            name: formData.get('name'),
            code: formData.get('code'),
            career: formData.get('career'),
            semillero: formData.get('semillero')
        });
        
        localStorage.setItem('students', JSON.stringify(students));
        updateStudentsList();
        e.target.reset();
        bootstrap.Modal.getInstance(document.getElementById('studentModal')).hide();
    });

    // Agregar actividad
    document.getElementById('addActivity').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        activities.push({
            type: formData.get('type'),
            date: formData.get('date'),
            time: formData.get('time'),
            limit: formData.get('limit'),
            summary: formData.get('summary')
        });
        
        localStorage.setItem('activities', JSON.stringify(activities));
        updateActivitiesList();
        e.target.reset();
        bootstrap.Modal.getInstance(document.getElementById('activityModal')).hide();
    });

    // Actualizar listados
    function updateResearchersList() {
        const container = document.getElementById('combad-researchers');
        container.innerHTML = researchers.map(researcher => `
            <div class="card mb-2 researcher-card">
                <div class="card-body p-3">
                    <h6 class="mb-1">${researcher.name}</h6>
                    <p class="mb-1 small">${researcher.education}</p>
                    <p class="mb-0 small text-muted">⏰ ${researcher.schedule}</p>
                </div>
            </div>
        `).join('');
    }

    function updateStudentsList() {
        const container = document.getElementById('students-list');
        container.innerHTML = students.map(student => `
            <div class="card mb-2 student-card">
                <div class="card-body p-3">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="mb-0">${student.name}</h6>
                            <small class="text-muted">${student.code} - ${student.career}</small>
                        </div>
                        <span class="badge ${student.semillero === 'Comba' ? 'bg-primary' : 'bg-info'}">
                            ${student.semillero}
                        </span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    function updateActivitiesList() {
        const container = document.getElementById('activities-list');
        container.innerHTML = activities.map(activity => `
            <div class="activity-card card mb-2">
                <div class="card-body p-3">
                    <div class="d-flex justify-content-between align-items-start">
                        <div>
                            <h6 class="mb-1">${activity.type}</h6>
                            <small class="text-muted">📅 ${new Date(activity.date).toLocaleDateString('es-ES')} ⏰ ${activity.time}</small>
                            <p class="mb-0 mt-2">${activity.summary}</p>
                        </div>
                        <span class="badge bg-secondary">
                            ${activity.limit} cupos
                        </span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Inicializar
    updateResearchersList();
    updateStudentsList();
    updateActivitiesList();
});