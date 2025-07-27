/* ============================ */
/*   PAGE INTERACTIVITY LOGIC   */
/* ============================ */
document.addEventListener('DOMContentLoaded', () => {
    // This function runs once the entire HTML page is loaded

    // Setup Tab Listeners
    const tabs = document.querySelectorAll('.tab-button');
    const codeBlocks = document.querySelectorAll('.code-block');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            codeBlocks.forEach(b => b.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(`code-${tab.dataset.lang}`).classList.add('active');
            Prism.highlightAll(); // Re-run prism to highlight the newly visible block
        });
    });
    
    // Connect the button to the startGame function
    document.getElementById('startGameBtn').addEventListener('click', startGame);

    // --- NEW: Load the code files for display ---
    // Make sure your folder structure is: games/number-guess/guess-the-number.js
    loadCodeForDisplay('js', 'games/number-guess/guess-the-number.js');
    loadCodeForDisplay('py', 'games/number-guess/guess-the-number.py');
});

// Function to fetch code from a file and put it in the correct <pre> tag
async function loadCodeForDisplay(lang, filepath) {
    try {
        const response = await fetch(filepath);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const codeText = await response.text();

        // Put the fetched text into the correct code block and highlight it
        document.querySelector(`#code-${lang} code`).textContent = codeText;
        Prism.highlightAll();
    } catch (e) {
        console.error(`Failed to load code from ${filepath}`, e);
        document.querySelector(`#code-${lang} code`).textContent = `Error: Could not load code from ${filepath}. Check file path and network connection.`;
    }
}


/* ============================ */
/*   GAME LOGIC (Standalone)    */
/* ============================ */
let secretNumber;
let attempts;

function startGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    document.getElementById('gameFeedback').innerHTML = 'Game started! Make your first guess.';
    playGame();
}

function playGame() {
    let userGuess = prompt(`Enter your guess (1-100):\nAttempts so far: ${attempts}`);

    // If user clicks "Cancel"
    if (userGuess === null) {
        alert("Game cancelled.");
        document.getElementById('gameFeedback').innerHTML = 'Game cancelled. Click "Start Game" to play again.';
        return; // End the game
    }

    let guess = parseInt(userGuess);
    
    // Handle invalid input
    if (isNaN(guess) || guess < 1 || guess > 100) {
        alert("Please enter a number between 1 and 100!");
        playGame(); // Ask again
        return;
    }
    
    attempts++;

    // Check the guess
    if (guess === secretNumber) {
        alert(`🎉 Congratulations! You guessed it in ${attempts} attempts! The number was ${secretNumber}.`);
        document.getElementById('gameFeedback').innerHTML = `<strong>You won!</strong> The number was ${secretNumber}. (${attempts} attempts)`;
    } else {
        const hint = guess < secretNumber ? 'Too low!' : 'Too high!';
        alert(`${hint} Try again.`);
        playGame(); // Ask for another guess
    }
}