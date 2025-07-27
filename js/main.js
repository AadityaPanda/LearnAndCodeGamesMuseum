document.addEventListener('DOMContentLoaded', () => {
    const gameGrid = document.querySelector('.game-grid');

    if (!gameGrid) {
        console.error("Game grid container not found!");
        return;
    }
    
    // Check if the games list is empty
    if (GAMES_CONFIG.length === 0) {
        gameGrid.innerHTML = '<p>No games have been added yet. Stay tuned!</p>';
        return;
    }

    // Build the HTML for all game cards
    const gameCardsHTML = GAMES_CONFIG.map(game => {
        // This creates an HTML string for a single game card
        return `
            <a href="${game.path}" class="game-card">
                <div class="game-card-thumbnail" style="background-image: url('${game.thumbnail}');"></div>
                <div class="game-card-body">
                    <h3 class="game-card-title">${game.title}</h3>
                    <p class="game-card-description">${game.description}</p>
                </div>
            </a>
        `;
    }).join(''); // Join all the individual card strings into one big string

    // Replace the "Loading games..." message with the actual game cards
    gameGrid.innerHTML = gameCardsHTML;
});