// Create header floating hearts
function createHeaderHearts() {
    const headerHearts = document.getElementById('headerHearts');
    const headerWidth = document.querySelector('.header').offsetWidth;
    const headerHeight = document.querySelector('.header').offsetHeight;

    for (let i = 0; i < 12; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.className = 'floating-header-heart';
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.top = `${Math.random() * 100}%`;
        heart.style.fontSize = `${Math.random() * 15 + 10}px`;
        heart.style.animationDuration = `${Math.random() * 8 + 8}s`;
        heart.style.animationDelay = `${Math.random() * 5}s`;
        headerHearts.appendChild(heart);
    }
}

// Splash screen
setTimeout(() => {
    document.getElementById('splash').style.opacity = '0';
    setTimeout(() => {
        document.getElementById('splash').style.display = 'none';
    }, 800);
}, 2500);

// Initialize after content loads
document.addEventListener('DOMContentLoaded', function() {
    createHeaderHearts();
});

// Create floating hearts
function createHearts() {
    const heartEmojis = ['❤️', '💖', '💕', '💗', '💓'];
    
    for (let i = 0; i < 25; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            heart.style.position = 'fixed';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.top = '100vh';
            heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
            heart.style.zIndex = '999';
            heart.style.transition = 'transform 4s, opacity 4s';
            heart.style.opacity = '0.7';
            heart.style.transform = `translateY(0) rotate(${Math.random() * 30 - 15}deg)`;
            document.getElementById('hearts').appendChild(heart);

            requestAnimationFrame(() => {
                heart.style.transform = `translateY(-120vh) rotate(${Math.random() * 250}deg)`;
                heart.style.opacity = '0';
            });

            setTimeout(() => {
                heart.remove();
            }, 4000);
        }, i * 150);
    }
    
    // Show sweet message with animation
    const messageBox = document.createElement('div');
    messageBox.style.position = 'fixed';
    messageBox.style.top = '50%';
    messageBox.style.left = '50%';
    messageBox.style.transform = 'translate(-50%, -50%)';
    messageBox.style.background = 'rgba(255, 255, 255, 0.95)';
    messageBox.style.padding = '20px 30px';
    messageBox.style.borderRadius = '15px';
    messageBox.style.boxShadow = '0 10px 30px rgba(188, 143, 143, 0.2)';
    messageBox.style.zIndex = '1002';
    messageBox.style.maxWidth = '80%';
    messageBox.style.textAlign = 'center';
    messageBox.className = 'animate__animated animate__zoomIn';
    messageBox.innerHTML = `
        <h3 style="color: #b78393; margin-bottom: 10px;">Message for You</h3>
        <p style="color: #4a3636; line-height: 1.6;"> Aku Sayang Kamu, Wulan! ❤️</p>
        <button style="background: #c39ea9; color: #4a3636; border: none; padding: 8px 15px; border-radius: 20px; margin-top: 15px; cursor: pointer;">OK</button>
    `;
    document.body.appendChild(messageBox);
    
    // Remove the message when button is clicked
    messageBox.querySelector('button').addEventListener('click', () => {
        messageBox.className = 'animate__animated animate__zoomOut';
        setTimeout(() => {
            messageBox.remove();
        }, 300);
    });
}

// Photo modal functionality
function openModal(src, caption) {
    const modal = document.getElementById('photoModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    
    modalImg.src = src;
    modalCaption.textContent = caption;
    modal.classList.add('active');
    
    // Add animation class
    modalImg.className = 'modal-image animate__animated animate__zoomIn';
}

function closeModal() {
    const modal = document.getElementById('photoModal');
    const modalImg = document.getElementById('modalImage');
    
    // Add fade out animation
    modalImg.className = 'modal-image animate__animated animate__zoomOut';
    
    setTimeout(() => {
        modal.classList.remove('active');
    }, 300);
}

// Close modal if clicked outside the content
document.getElementById('photoModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Music player functionality
let isPlaying = false;
let audio;

function toggleMusic() {
    if (!audio) {
        audio = new Audio('https://cdnjs.cloudflare.com/ajax/libs/Manakin/0.5.2/js/vendor/jquery.min.js');
        // Note: This is just a placeholder. In a real implementation, you'd use an actual music URL
    }
    
    if (isPlaying) {
        audio.pause();
        document.getElementById('musicControl').classList.remove('active');
    } else {
        audio.play().catch(e => {
            // Handle any autoplay restrictions
            console.log("Couldn't play audio automatically");
        });
        document.getElementById('musicControl').classList.add('active');
    }
    
    isPlaying = !isPlaying;
    
    // Animate the music icon
    const musicIcon = document.querySelector('.music-icon');
    musicIcon.classList.add('animate__animated', 'animate__rubberBand');
    setTimeout(() => {
        musicIcon.classList.remove('animate__animated', 'animate__rubberBand');
    }, 1000);
    
    // Show toast message
    const toast = document.createElement('div');
    toast.style.position = 'fixed';
    toast.style.bottom = '80px';
    toast.style.right = '20px';
    toast.style.background = 'rgba(255, 255, 255, 0.95)';
    toast.style.color = '#b78393';
    toast.style.padding = '8px 15px';
    toast.style.borderRadius = '20px';
    toast.style.boxShadow = '0 4px 15px rgba(0,0,0,0.07)';
    toast.style.zIndex = '100';
    toast.className = 'animate__animated animate__fadeIn';
    toast.textContent = isPlaying ? "♫ Lagu Cinta Diputar" : "Musik Dihentikan";
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.className = 'animate__animated animate__fadeOut';
        setTimeout(() => {
            toast.remove();
        }, 1000);
    }, 2000);
}