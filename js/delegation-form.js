    // mouse effect code 
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let particles = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

document.addEventListener('mousemove', (e) => {
    for (let i = 0; i < 3; i++) {
        particles.push({
            x: e.clientX,
            y: e.clientY,
            size: Math.random() * 1 + 0.3, // → size between 0.3 and 1.3
            speedX: (Math.random() - 0.5) * 1,
            speedY: (Math.random() - 0.5) * 1,
            life: 1
        });
    }
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.life -= 0.015;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        ctx.fillStyle = `rgba(255,255,255,${p.life})`;

        // ✨ Add glow effect
        ctx.shadowColor = 'rgba(255,255,255,0.7)';
        ctx.shadowBlur = 10;

        ctx.fill();

        if (p.life <= 0) {
            particles.splice(i, 1);
        }
    });

    requestAnimationFrame(animate);
}

animate();







// const scriptURL = 'https://script.google.com/macros/s/AKfycbyFSwEQtqOHlefXILOahe1YmNlkPVtOYBY2hGvspdjEOdlBCjHYLMByYGovbfM1Qd0jVA/exec';
// document.getElementById('contactForm').addEventListener('submit', e => {
//   e.preventDefault();
//   fetch(scriptURL, { method: 'POST', body: new FormData(e.target) })
//     .then(res => alert('Success'))
//     .catch(err => alert('Error'));
// });


// linking code between the form and the excel sheet 

const scriptURL = 'https://script.google.com/macros/s/AKfycbyFSwEQtqOHlefXILOahe1YmNlkPVtOYBY2hGvspdjEOdlBCjHYLMByYGovbfM1Qd0jVA/exec';
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submit-btn');

// Create and append success message element
const messageDiv = document.createElement('div');
messageDiv.style.marginTop = '15px';
messageDiv.style.color = 'green';
messageDiv.style.fontWeight = '600';
form.appendChild(messageDiv);

form.addEventListener('submit', e => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.textContent = 'Submitting...';

    fetch(scriptURL, {
        method: 'POST',
        body: new FormData(form),
    })
        .then(response => {
            const messageDiv = document.createElement('div');
            messageDiv.id = 'form-message';
            messageDiv.textContent = "Form submitted successfully!";
            document.getElementById('submit-btn').insertAdjacentElement('afterend', messageDiv);

            const submitBtn = document.getElementById('submit-btn');
            submitBtn.textContent = "Submitted";

            submitBtn.disabled = true;

            form.querySelectorAll('input, textarea, select').forEach(field => {
                field.value = '';
            });
        })

        .catch(error => {
            messageDiv.style.color = 'red';
            messageDiv.textContent = "✖ Error submitting the form. Please try again.";
            console.error('Error!', error.message);
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit';
        });


    // Clear localStorage for textareas
    const textareas = form.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        localStorage.removeItem(textarea.name);
    });
});

// Restore textarea values
const textareas = form.querySelectorAll('textarea');
window.addEventListener('load', () => {
    textareas.forEach(textarea => {
        const saved = localStorage.getItem(textarea.name);
        if (saved) {
            textarea.value = saved;
        }
    });
});

// Save textarea input to localStorage
textareas.forEach(textarea => {
    textarea.addEventListener('input', () => {
        localStorage.setItem(textarea.name, textarea.value);
    });
});