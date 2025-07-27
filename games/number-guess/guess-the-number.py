#!/usr/bin/env python3
"""
Guess the Number Game - Python Version
A simple number guessing game where the computer thinks of a number
between 1 and 100, and the player tries to guess it.
"""

import random  # Import random module to generate random numbers

def get_dynamic_message(guess, target, difference):
    """
    Generate dynamic messages based on how close the guess is to the target.
    
    Args:
        guess (int): The user's guess
        target (int): The secret number
        difference (int): Absolute difference between guess and target
    
    Returns:
        str: A message indicating proximity and direction
    """
    # Determine direction (higher or lower)
    if guess < target:
        direction_message = "📈 Go higher!"
    else:
        direction_message = "📉 Go lower!"
    
    # Generate proximity message based on how close they are
    if difference == 1:
        proximity_message = "🔥 SO CLOSE! You're just 1 away!"
    elif difference <= 3:
        proximity_message = "🔥 Very hot! You're super close!"
    elif difference <= 5:
        proximity_message = "🌡️ Hot! You're getting close!"
    elif difference <= 10:
        proximity_message = "🔸 Warm! You're in the right area!"
    elif difference <= 15:
        proximity_message = "❄️ Cool. You're somewhat close."
    elif difference <= 25:
        proximity_message = "🧊 Cold. You're getting further away."
    elif difference <= 35:
        proximity_message = "🥶 Very cold! You're quite far."
    else:
        proximity_message = "❄️ Freezing! You're very far away!"
    
    return f"{proximity_message} {direction_message}"

def get_victory_message(attempts):
    """
    Generate a victory message based on the number of attempts.
    
    Args:
        attempts (int): Number of attempts it took to guess correctly
    
    Returns:
        str: A congratulatory message tailored to performance
    """
    if attempts == 1:
        return "🤯 INCREDIBLE! You got it in just 1 try! Are you psychic?"
    elif attempts <= 3:
        return f"🏆 AMAZING! You got it in only {attempts} attempts! You're a natural!"
    elif attempts <= 6:
        return f"🎉 GREAT JOB! You got it in {attempts} attempts! Well done!"
    elif attempts <= 10:
        return f"👏 NICE WORK! You got it in {attempts} attempts! Good guessing!"
    else:
        return f"🎯 CONGRATULATIONS! You got it in {attempts} attempts! Persistence pays off!"

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
                victory_message = get_victory_message(attempts)
                print("\n" + "=" * 50)
                print("🎉 CONGRATULATIONS! YOU GUESSED IT! 🎉")
                print(victory_message)
                print(f"The number was: {secret_number}")
                print("=" * 50)
                
                # Set game_active to False to exit the while loop
                game_active = False
                
            else:
                # Wrong guess - provide dynamic feedback based on how close they are
                difference = abs(user_guess - secret_number)
                message = get_dynamic_message(user_guess, secret_number, difference)
                print(f"{message} (Attempts: {attempts})")
                
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