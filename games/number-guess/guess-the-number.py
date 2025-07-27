"""
Guess the Number Game - Python Version
A simple number guessing game where the computer thinks of a number
between 1 and 100, and the player tries to guess it.
"""

import random  # Import random module to generate random numbers

def start_game():
    """
    Main function to start and run a new guessing game.
    This function handles the entire game flow from start to finish.
    """
    
    # Generate a random number between 1 and 100 (inclusive)
    secret_number = random.randint(1, 100)
    
    # Initialize the attempt counter
    attempts = 0
    
    # Set game as active (will continue until player guesses correctly)
    game_active = True
    
    # Welcome message and game instructions
    print("🎯 Welcome to the Guess the Number Game!")
    print("I'm thinking of a number between 1 and 100.")
    print("Can you guess what it is?")
    print("-" * 40)  # Print a separator line for better readability
    
    # Main game loop - continues until the player guesses correctly
    while game_active:
        try:
            # Get the user's guess using input() function
            user_input = input(f"\nEnter your guess (1-100) [Attempts: {attempts}]: ")
            
            # Convert the user's input string to an integer
            user_guess = int(user_input)
            
            # Validate the input - check if it's within the valid range (1-100)
            if user_guess < 1 or user_guess > 100:
                print("⚠️  Please enter a number between 1 and 100!")
                continue  # Skip the rest of the loop and ask for input again
            
            # Increment the attempt counter since we have a valid guess
            attempts += 1
            
            # Check if the guess is correct
            if user_guess == secret_number:
                # Player guessed correctly! Celebrate and end the game
                print("\n" + "=" * 50)
                print("🎉 CONGRATULATIONS! YOU GUESSED IT! 🎉")
                print(f"The number was: {secret_number}")
                print(f"You got it in {attempts} attempts!")
                print("=" * 50)
                
                # Set game_active to False to exit the while loop
                game_active = False
                
            elif user_guess < secret_number:
                # Guess is too low - give hint to go higher
                print(f"📈 Too low! Try a higher number. (Attempts: {attempts})")
                
            else:  # user_guess > secret_number
                # Guess is too high - give hint to go lower
                print(f"📉 Too high! Try a lower number. (Attempts: {attempts})")
                
        except ValueError:
            # Handle the case where user enters something that's not a number
            print("❌ Invalid input! Please enter a valid number.")
            # Note: We don't increment attempts for invalid input
            continue
        
        except KeyboardInterrupt:
            # Handle the case where user presses Ctrl+C to quit
            print("\n\n👋 Game cancelled. Thanks for playing!")
            game_active = False
            return  # Exit the function early

def play_again():
    """
    Function to ask the player if they want to play again.
    Returns True if they want to play again, False otherwise.
    """
    while True:
        # Ask if the player wants to play another round
        choice = input("\nWould you like to play again? (y/n): ").lower().strip()
        
        if choice in ['y', 'yes']:
            return True  # Player wants to play again
        elif choice in ['n', 'no']:
            return False  # Player doesn't want to play again
        else:
            print("Please enter 'y' for yes or 'n' for no.")

def main():
    """
    Main function that handles the overall program flow.
    This allows for multiple games in a row if the player wants.
    """
    print("Welcome to the Number Guessing Game!")
    print("=" * 40)
    
    # Keep playing games until the player chooses to quit
    while True:
        # Start a new game
        start_game()
        
        # Ask if they want to play again
        if not play_again():
            # Player doesn't want to play again, so exit
            print("\n👋 Thanks for playing! Goodbye!")
            break
        else:
            # Player wants to play again, so continue the loop
            print("\n" + "🔄 Starting a new game..." + "\n")

# This block ensures the game only runs when the script is executed directly
# (not when it's imported as a module)
if __name__ == "__main__":
    main()