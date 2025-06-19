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
    
    // Valid user credentials
    const validUsers = {
        '111': '111',
        'user1': 'Football123',
        'moderator': 'Qatar2022'
    };
    
    // Login form handling
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const secretCode = document.getElementById('secretCode').value;
            
            // Simple validation
            if (username && password) {
                // Check for secret code
                if (secretCode === '7309') {
                    window.location.href = 'secret.html';
                    return;
                }
                
                // Check credentials
                if (validUsers[username] && validUsers[username] === password) {
                    // Save to localStorage and redirect to calendar
                    localStorage.setItem('fifaLoggedIn', 'true');
                    localStorage.setItem('fifaUsername', username);
                    window.location.href = 'calendar.html';
                } else {
                    alert('Неверный логин или пароль');
                }
            } else {
                alert('Пожалуйста, введите логин и пароль');
            }
        });
    }
    
    // Check if user is logged in when accessing calendar
    if (window.location.pathname.includes('calendar.html')) {
        const isLoggedIn = localStorage.getItem('fifaLoggedIn');
        
        if (!isLoggedIn) {
            window.location.href = 'auth.html';
        } else {
            const username = localStorage.getItem('fifaUsername');
            console.log(`Welcome back, ${username}!`);
        }
    }
});