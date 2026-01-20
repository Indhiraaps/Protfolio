const typingTarget = document.getElementById('typing');
const professions = ["Indhira PS", "Full Stack Dev", "AI Researcher"];
let profIndex = 0;
let charIndex = 0;
let isDeleting = false;

// --- TYPING ANIMATION LOGIC ---
function typeEffect() {
    const currentText = professions[profIndex];
    
    // Determine the text to display based on whether we are deleting or typing
    typingTarget.textContent = isDeleting 
        ? currentText.substring(0, charIndex - 1) 
        : currentText.substring(0, charIndex + 1);

    // Update the index for the next frame
    charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
    
    // Adjust speed: deleting is faster than typing
    let speed = isDeleting ? 100 : 200;

    // Logic to switch between typing and deleting
    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        speed = 2000; // Pause at the end of the word
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        profIndex = (profIndex + 1) % professions.length; // Move to next word
        speed = 500; // Small pause before typing next word
    }

    setTimeout(typeEffect, speed);
}

// --- CARD FLIP (COIN TOSS) LOGIC ---
/**
 * Toggles the 'is-flipped' class on the card.
 * The 3D animation and "toss" effect are handled by the CSS provided.
 */
function flipCard(cardElement) {
    cardElement.classList.toggle('is-flipped');
}

// --- INITIALIZE ---
document.addEventListener('DOMContentLoaded', () => {
    typeEffect();
});

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const btn = document.getElementById('submit-btn');
    btn.innerText = 'Sending...';

    // These IDs come from your EmailJS Account
    const serviceID = 'service_itbnyel';
    const templateID = 'template_ebrdypl';

    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            btn.innerText = 'Message Sent! ✨';
            this.reset(); // Clears the form
            setTimeout(() => { btn.innerText = 'Send Message'; }, 3000);
        }, (err) => {
            btn.innerText = 'Error! Try Again';
            console.error(JSON.stringify(err));
        });
});