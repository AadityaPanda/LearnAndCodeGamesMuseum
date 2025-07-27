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
    
    // Show the game interface
    showGameInterface();
    
    console.log(`Debug: Secret number is ${secretNumber}`); // Remove this in production
}

// Function to display the game interface
function showGameInterface() {
    const gameContainer = document.getElementById('gameContainer');
    gameContainer.innerHTML = `
        <h1>🎯 Guess the Number Game</h1>
        <p>I'm thinking of a number between 1 and 100. Can you guess it?</p>
        <div id="gameStats">Attempts: ${attempts}</div>
        <div id="feedback"></div>
        <input type="number" id="guessInput" min="1" max="100" placeholder="Enter your guess (1-100)">
        <button onclick="makeGuess()">Submit Guess</button>
        <button onclick="resetGame()">New Game</button>
    `;
    
    // Focus on the input field for better user experience
    document.getElementById('guessInput').focus();
    
    // Allow Enter key to submit guess
    document.getElementById('guessInput').addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            makeGuess();
        }
    });
}

// Function to handle a guess submission
function makeGuess() {
    if (!gameActive) return; // Don't process guesses if game is not active
    
    const guessInput = document.getElementById('guessInput');
    const userGuess = parseInt(guessInput.value);
    
    // Validate the input
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        showFeedback("❌ Please enter a valid number between 1 and 100!", "error");
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
        showFeedback(message, "hint");
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

// Function to display feedback messages
function showFeedback(message, type) {
    const feedbackDiv = document.getElementById('feedback');
    feedbackDiv.textContent = message;
    
    // Add CSS class based on message type for styling
    feedbackDiv.className = type;
}

// Function to show victory message
function showVictoryMessage() {
    const feedbackDiv = document.getElementById('feedback');
    
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
    
    feedbackDiv.innerHTML = `
        <div style="color: #28a745; font-weight: bold; font-size: 1.2em;">
            ${attemptMessage}<br>
            The number was: ${secretNumber}
        </div>
    `;
    
    // Disable the input field
    document.getElementById('guessInput').disabled = true;
}

// Function to reset and start a new game
function resetGame() {
    startGame();
}

// Function to initialize the game when page loads
function initGame() {
    const gameContainer = document.getElementById('gameContainer');
    gameContainer.innerHTML = `
        <h1>🎯 Guess the Number Game</h1>
        <p>I'm thinking of a number between 1 and 100. Can you guess it?</p>
        <button onclick="startGame()">Start New Game</button>
    `;
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', initGame);