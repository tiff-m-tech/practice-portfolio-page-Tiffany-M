// Tagline Typewritinger
const words = ["Developer...", "Designer...", "Dreamer...", ":)..."];
let wordIndex = 0, // tracks which word currently on
    charIndex = 0, // tracks how many characters of the word are visible
    deleting = false; // flag that switches between typing and deleting mode
const el = document.getElementById("typed"); // grabs element from HTML so we can update the text

// function to animate characters
if (el) {
    function tick() {
        const word = words[wordIndex]; // grabs current word we are working with based on wordIndex

        if (!deleting) {
            charIndex++; // add one more char to whats visible
            el.textContent = word.slice(0, charIndex); // update the element to show the word cut off at charIndex
            if (charIndex === word.length) {
                // if we have typed the whole word
                deleting = true; // swtich to delete mode
                setTimeout(tick, 1200); // wait 1.2 seconds so the word is fully visible before running tick() again
                return;
            }
        } else {
            // in delete mode!
            charIndex--; // remove one char from whats visible
            el.textContent = word.slice(0, charIndex); // update element to show shorter version
            if (charIndex === 0) {
                // if word fully deleted
                deleting = false; // change to typing mode
                wordIndex = (wordIndex + 1) % words.length; // move to next word in the array
            }
        }
        setTimeout(tick, deleting ? 50 : 100); // schedule the next tick(), if deleting do it faster than typing
    }

    tick();
}

// Grab info from form
const formMessage = document.getElementById("form-message"); // grabs element on page with id "form-message"

if (formMessage) {
    const params = new URLSearchParams(window.location.search); // reads info from URL query string, ex ?name=Tiffany&email=test@email.com&message=Hello
    const name = params.get("name"); // values of "name" attribute in form
    const email = params.get("email");
    const message = params.get("message");
    formMessage.innerHTML = `Message Received:<br>
    Name: ${name}<br>
    Email: ${email}<br>
    Message: ${message}`;
} // last part updates the HTML in the element we grabbed
