document.addEventListener('DOMContentLoaded', function() {
    // Burger menu toggle
    const burger = document.getElementById('burger');
    const nav = document.querySelector('.nav');
    
    if (burger && nav) {
        burger.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }
    
    // Generate calendar days
    const calendarGrid = document.getElementById('calendarGrid');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    if (calendarGrid) {
        const rewards = [
            '100 монет',
            'Пакет Bronze',
            '150 монет',
            'Контракт',
            '200 монет',
            'Пакет Silver',
            'Летний игрок',
            '250 монет',
            'Форма',
            '300 монет',
            'Пакет Gold',
            'Эмблема',
            '350 монет',
            'Стадион',
            '400 монет',
            'Пакет Premium',
            'Редкий  стиль',
            '450 монет',
            'Бутсы',
            '500 монет',
            'Пакет Mega',
            'Лег. тренер',
            '550 монет',
            'Редкий игрок',
            '600 монет',
            'Пакет Ultimate',
            'Иконка',
            '650 монет',
            'Особый мяч',
            'Трофей'
        ];
        
        let claimedDays = JSON.parse(localStorage.getItem('fifaClaimedDays')) || [];
        
        // Create calendar days
        for (let i = 0; i < 30; i++) {
            const day = document.createElement('div');
            day.className = 'calendar-day';
            day.innerHTML = `
                <div class="calendar-day__number">${i + 1}</div>
                <div class="calendar-day__reward">${rewards[i]}</div>
                <button class="btn btn--small">Забрать</button>
            `;
            
            if (claimedDays.includes(i + 1)) {
                day.classList.add('claimed');
                day.querySelector('button').textContent = 'Получено';
                day.querySelector('button').disabled = true;
            } else if (i === 0) {
                // Первый день всегда доступен
                day.classList.remove('disabled');
                day.querySelector('button').disabled = false;
            } else if (claimedDays.includes(i)) {
                // Если предыдущий день получен, текущий разблокируется
                day.classList.remove('disabled');
                day.querySelector('button').disabled = false;
            } else {
                // Все остальные дни заблокированы
                day.classList.add('disabled');
                day.querySelector('button').disabled = true;
            }
            
            // Add click event for claiming
            const claimBtn = day.querySelector('button');
            if (claimBtn && !claimBtn.disabled) {
                claimBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    claimDay(i + 1);
                });
            }
            
            calendarGrid.appendChild(day);
        }
        
        // Update progress
        updateProgress();
        
        // Claim all button
        const claimAllBtn = document.getElementById('claimAll');
        if (claimAllBtn) {
            claimAllBtn.addEventListener('click', function() {
                const unclaimedDays = [];
                for (let i = 1; i <= 30; i++) {
                    if (!claimedDays.includes(i)) {
                        unclaimedDays.push(i);
                    }
                }
                
                if (unclaimedDays.length > 0) {
                    claimedDays = claimedDays.concat(unclaimedDays);
                    localStorage.setItem('fifaClaimedDays', JSON.stringify(claimedDays));
                    updateCalendar();
                    updateProgress();
                    alert(`Вы получили ${unclaimedDays.length} наград!`);
                } else {
                    alert('Все награды уже получены!');
                }
            });
        }
    }
    
    function claimDay(dayNumber) {
        let claimedDays = JSON.parse(localStorage.getItem('fifaClaimedDays')) || [];
        
        if (!claimedDays.includes(dayNumber)) {
            claimedDays.push(dayNumber);
            localStorage.setItem('fifaClaimedDays', JSON.stringify(claimedDays));
            updateCalendar();
            updateProgress();
            alert(`Награда за день ${dayNumber} получена!`);
        }
    }
    
    function updateCalendar() {
        const days = document.querySelectorAll('.calendar-day');
        const claimedDays = JSON.parse(localStorage.getItem('fifaClaimedDays')) || [];
        
        days.forEach((day, index) => {
            const dayNumber = index + 1;
            const claimBtn = day.querySelector('button');
            
            if (claimedDays.includes(dayNumber)) {
                day.classList.add('claimed');
                day.classList.remove('disabled');
                claimBtn.textContent = 'Получено';
                claimBtn.disabled = true;
            } else if (index === 0 || claimedDays.includes(index)) {
                // Первый день или предыдущий день получен - разблокировать
                day.classList.remove('disabled');
                claimBtn.disabled = false;
            } else {
                // Заблокировать, если предыдущий день не получен
                day.classList.add('disabled');
                claimBtn.disabled = true;
            }
        });
    }
    
    function updateProgress() {
        const claimedDays = JSON.parse(localStorage.getItem('fifaClaimedDays')) || [];
        const progress = (claimedDays.length / 30) * 100;
        
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `${claimedDays.length}/30 дней завершено`;
    }
});