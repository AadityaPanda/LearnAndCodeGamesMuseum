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
    
    // Update the display to show game has started
    document.getElementById('gameInfo').innerHTML = '<p>Game started! Make your first guess.</p>';
    
    // Start the guessing loop
    playGame();
}

// Main game loop function
function playGame() {
    // Continue asking for guesses while the game is active
    while (gameActive) {
        // Get the user's guess using prompt dialog
        let userGuess = prompt(`Enter your guess (1-100):\nAttempts so far: ${attempts}`);
        
        // Check if user clicked Cancel or pressed Escape
        if (userGuess === null) {
            alert("Game cancelled. Click 'Start New Game' to play again!");
            gameActive = false;
            document.getElementById('gameInfo').innerHTML = '<p>Game cancelled. Ready for a new game?</p>';
            break;
        }
        
        // Convert the user's input to a number
        userGuess = parseInt(userGuess);
        
        // Validate the input - check if it's a valid number
        if (isNaN(userGuess)) {
            alert("Please enter a valid number!");
            continue; // Ask for input again
        }
        
        // Check if the number is within the valid range (1-100)
        if (userGuess < 1 || userGuess > 100) {
            alert("Please enter a number between 1 and 100!");
            continue; // Ask for input again
        }
        
        // Increment the attempt counter
        attempts++;
        
        // Check if the guess is correct
        if (userGuess === secretNumber) {
            // Player guessed correctly! End the game with celebration
            alert(`🎉 Congratulations! You guessed it!\n\nThe number was ${secretNumber}\nYou got it in ${attempts} attempts!`);
            gameActive = false;
            
            // Update the display with final stats
            document.getElementById('gameInfo').innerHTML = 
                `<p><strong>🎉 You won!</strong><br>
                    The number was: ${secretNumber}<br>
                    Total attempts: ${attempts}</p>`;
            
        } else if (userGuess < secretNumber) {
            // Guess is too low - give hint to go higher
            alert(`Too low! Try a higher number.\nAttempts: ${attempts}`);
            
        } else {
            // Guess is too high - give hint to go lower
            alert(`Too high! Try a lower number.\nAttempts: ${attempts}`);
        }
    }
}

// Display initial instructions when page loads
document.getElementById('gameInfo').innerHTML = '<p>Click the button above to start playing!</p>';