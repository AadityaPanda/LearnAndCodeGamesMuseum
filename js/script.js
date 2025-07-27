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
/*   GAME LOGIC (Updated)       */
/* ============================ */

// Global variables to track game state
let secretNumber; // The number the computer is thinking of
let attempts; // How many guesses the player has made
let gameActive; // Whether a game is currently in progress

// Function to start a new game
function startGame() {
    // Generate a random number between 1 and 100 (inclusive)
    secretNumber = Math.floor(Math.random() * 100) + 1;
    
    // Reset the attempt counter
    attempts = 0;
    
    // Set game as active
    gameActive = true;
    
    // Show the game interface in the feedback area
    showGameInterface();
    
    console.log(`Debug: Secret number is ${secretNumber}`); // Remove this in production
}

// Function to display the game interface
function showGameInterface() {
    const feedbackDiv = document.getElementById('gameFeedback');
    feedbackDiv.innerHTML = `
        <div style="text-align: center; margin: 20px 0;">
            <h3>🎯 I'm thinking of a number between 1 and 100!</h3>
            <div id="gameStats" style="margin: 10px 0; font-weight: bold;">Attempts: ${attempts}</div>
            <div id="gameMessages" style="margin: 15px 0; min-height: 30px; font-size: 1.1em;"></div>
            <div style="margin: 15px 0;">
                <input type="number" id="guessInput" min="1" max="100" placeholder="Enter your guess (1-100)" 
                       style="padding: 8px; font-size: 16px; width: 200px; text-align: center; border: 2px solid #ddd; border-radius: 5px;">
            </div>
            <div style="margin: 10px 0;">
                <button onclick="makeGuess()" style="padding: 10px 20px; font-size: 16px; background-color: #007bff; color: white; border: none; border-radius: 5px; cursor: pointer; margin-right: 10px;">Submit Guess</button>
                <button onclick="startGame()" style="padding: 10px 20px; font-size: 16px; background-color: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer;">New Game</button>
            </div>
        </div>
    `;
    
    // Focus on the input field for better user experience
    const guessInput = document.getElementById('guessInput');
    guessInput.focus();
    
    // Allow Enter key to submit guess
    guessInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            makeGuess();
        }
    });
    
    // Initial message
    document.getElementById('gameMessages').innerHTML = '<span style="color: #007bff;">Ready for your first guess!</span>';
}

// Function to handle a guess submission
function makeGuess() {
    if (!gameActive) return; // Don't process guesses if game is not active
    
    const guessInput = document.getElementById('guessInput');
    const userGuess = parseInt(guessInput.value);
    
    // Validate the input
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        showGameMessage("❌ Please enter a valid number between 1 and 100!", "error");
        return;
    }
    
    // Increment attempts counter
    attempts++;
    
    // Update attempts display
    document.getElementById('gameStats').textContent = `Attempts: ${attempts}`;
    
    // Clear the input field for next guess
    guessInput.value = '';
    guessInput.focus();
    
    // Check the guess and provide feedback
    if (userGuess === secretNumber) {
        // Correct guess - end the game
        gameActive = false;
        showVictoryMessage();
    } else {
        // Wrong guess - provide dynamic feedback based on how close they are
        const difference = Math.abs(userGuess - secretNumber);
        const message = getDynamicMessage(userGuess, secretNumber, difference);
        showGameMessage(message, "hint");
    }
}

// Function to generate dynamic messages based on how close the guess is
function getDynamicMessage(guess, target, difference) {
    let proximityMessage;
    let directionMessage;
    
    // Determine direction (higher or lower)
    if (guess < target) {
        directionMessage = "📈 Go higher!";
    } else {
        directionMessage = "📉 Go lower!";
    }
    
    // Generate proximity message based on how close they are
    if (difference === 1) {
        proximityMessage = "🔥 SO CLOSE! You're just 1 away!";
    } else if (difference <= 3) {
        proximityMessage = "🔥 Very hot! You're super close!";
    } else if (difference <= 5) {
        proximityMessage = "🌡️ Hot! You're getting close!";
    } else if (difference <= 10) {
        proximityMessage = "🔸 Warm! You're in the right area!";
    } else if (difference <= 15) {
        proximityMessage = "❄️ Cool. You're somewhat close.";
    } else if (difference <= 25) {
        proximityMessage = "🧊 Cold. You're getting further away.";
    } else if (difference <= 35) {
        proximityMessage = "🥶 Very cold! You're quite far.";
    } else {
        proximityMessage = "❄️ Freezing! You're very far away!";
    }
    
    return `${proximityMessage} ${directionMessage}`;
}

// Function to display game messages
function showGameMessage(message, type) {
    const messagesDiv = document.getElementById('gameMessages');
    
    // Set color based on message type
    let color;
    switch(type) {
        case 'error':
            color = '#dc3545';
            break;
        case 'hint':
            color = '#6f42c1';
            break;
        case 'success':
            color = '#28a745';
            break;
        default:
            color = '#007bff';
    }
    
    messagesDiv.innerHTML = `<span style="color: ${color}; font-weight: bold;">${message}</span>`;
}

// Function to show victory message
function showVictoryMessage() {
    const messagesDiv = document.getElementById('gameMessages');
    
    // Create a congratulatory message with attempt-based commentary
    let attemptMessage;
    if (attempts === 1) {
        attemptMessage = "🤯 INCREDIBLE! You got it in just 1 try! Are you psychic?";
    } else if (attempts <= 3) {
        attemptMessage = `🏆 AMAZING! You got it in only ${attempts} attempts! You're a natural!`;
    } else if (attempts <= 6) {
        attemptMessage = `🎉 GREAT JOB! You got it in ${attempts} attempts! Well done!`;
    } else if (attempts <= 10) {
        attemptMessage = `👏 NICE WORK! You got it in ${attempts} attempts! Good guessing!`;
    } else {
        attemptMessage = `🎯 CONGRATULATIONS! You got it in ${attempts} attempts! Persistence pays off!`;
    }
    
    messagesDiv.innerHTML = `
        <div style="color: #28a745; font-weight: bold; font-size: 1.3em; line-height: 1.4;">
            ${attemptMessage}<br>
            <span style="font-size: 1.1em;">The number was: ${secretNumber}</span>
        </div>
    `;
    
    // Disable the input field
    document.getElementById('guessInput').disabled = true;
    
    // Update the feedback div to show final results
    const finalStats = document.getElementById('gameFeedback');
    // You can add celebration effects here if needed
}