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
    
    // Claim reward button
    const claimBtn = document.getElementById('claimReward');
    
    if (claimBtn) {
        claimBtn.addEventListener('click', function() {
            const hasClaimed = localStorage.getItem('fifaSecretReward');
            
            if (!hasClaimed) {
                localStorage.setItem('fifaSecretReward', 'claimed');
                this.textContent = 'Награда получена!';
                this.disabled = true;
                alert('Поздравляем! Вы получили эксклюзивную карту легендарного игрока!');
            } else {
                alert('Вы уже получили эту награду!');
            }
        });
        
        // Check if already claimed
        if (localStorage.getItem('fifaSecretReward')) {
            claimBtn.textContent = 'Награда получена!';
            claimBtn.disabled = true;
        }
    }
});