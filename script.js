// Enhanced Game Data with Christmas Theme - Jeopardy Style
const gameData = {
    categories: [
        {
            name: "Bible Christmas",
            questions: [
                { question: "This Gospel contains the most detailed account of Jesus' birth narrative", answer: "The Gospel of Luke", points: 200, used: false },
                { question: "This angel told Mary she would give birth to Jesus", answer: "Gabriel", points: 400, used: false },
                { question: "This Old Testament prophet foretold the Messiah's birth in Bethlehem", answer: "Micah", points: 600, used: false },
                { question: "These visitors from the East brought gifts to the newborn king", answer: "The Magi or Wise Men", points: 800, used: false },
                { question: "This decree by Caesar Augustus required Joseph & Mary to travel to Bethlehem", answer: "The census", points: 1000, used: false }
            ]
        },
        {
            name: "Christmas Carols",
            questions: [
                { question: "This carol mentions 'figgy pudding' & demands 'we won't go until we get some'", answer: "We Wish You a Merry Christmas", points: 200, used: false },
                { question: "In this carol, the singer brings 'tidings of comfort and joy'", answer: "God Rest Ye Merry, Gentlemen", points: 400, used: false },
                { question: "This French carol translates to 'The Midnight Christians' in English", answer: "O Holy Night", points: 600, used: false },
                { question: "This carol was originally written for Thanksgiving, not Christmas", answer: "Jingle Bells", points: 800, used: false },
                { question: "This carol mentions 'angels bending near the earth' in its refrain", answer: "It Came Upon the Midnight Clear", points: 1000, used: false }
            ]
        },
        {
            name: "Santa's Workshop",
            questions: [
                { question: "According to tradition, Santa checks this list twice to see who's naughty or nice", answer: "The Naughty and Nice List", points: 200, used: false },
                { question: "This number of reindeer pull Santa's sleigh, not counting Rudolph", answer: "Eight", points: 400, used: false },
                { question: "Santa enters homes through this household feature when there's no chimney", answer: "The keyhole", points: 600, used: false },
                { question: "In some traditions, Santa leaves these for naughty children instead of presents", answer: "Lumps of coal", points: 800, used: false },
                { question: "This is Santa's zip code at the North Pole according to Canada Post", answer: "H0H 0H0", points: 1000, used: false }
            ]
        },
        {
            name: "Christmas Foods",
            questions: [
                { question: "This spiced holiday drink is also called 'milk punch'", answer: "Eggnog", points: 200, used: false },
                { question: "These colorful striped candies are often hung on Christmas trees", answer: "Candy canes", points: 400, used: false },
                { question: "This dried fruit is traditionally placed in Christmas stockings", answer: "Oranges", points: 600, used: false },
                { question: "This British Christmas dessert contains dried fruits and is soaked in alcohol", answer: "Christmas pudding", points: 800, used: false },
                { question: "In Mexico, this fruit salad is a traditional Christmas Eve dish", answer: "Ensalada de Nochebuena", points: 1000, used: false }
            ]
        },
        {
            name: "Christmas Around World",
            questions: [
                { question: "In this country, Christmas is celebrated with beach barbecues & surfing", answer: "Australia", points: 200, used: false },
                { question: "In Sweden, this straw goat figure is a popular Christmas decoration", answer: "The Gävle goat", points: 400, used: false },
                { question: "In Venezuela, people travel to church services on these on Christmas morning", answer: "Roller skates", points: 600, used: false },
                { question: "In Ukraine, finding this in your Christmas pudding means good luck", answer: "A spider web", points: 800, used: false },
                { question: "In this country, KFC has become a popular Christmas Eve meal tradition", answer: "Japan", points: 1000, used: false }
            ]
        },
        {
            name: "Christmas Movies",
            questions: [
                { question: "In this 1946 film, an angel shows what life would be like if he'd never been born", answer: "It's a Wonderful Life", points: 200, used: false },
                { question: "This 2004 animated film features a train ride to the North Pole", answer: "The Polar Express", points: 400, used: false },
                { question: "Will Ferrell plays a human raised by elves in this 2003 Christmas comedy", answer: "Elf", points: 600, used: false },
                { question: "This 1990 film features Macaulay Culkin defending his home from burglars", answer: "Home Alone", points: 800, used: false },
                { question: "Bill Murray plays a cynical TV executive in this 1988 Christmas classic", answer: "Scrooged", points: 1000, used: false }
            ]
        }
    ]
};

// Game State
let gameState = {
    teams: [],
    currentQuestion: null,
    usedQuestions: 0,
    totalQuestions: 0
};

// DOM Elements
const teamSetupScreen = document.getElementById('team-setup');
const gameBoardScreen = document.getElementById('game-board');
const gameOverScreen = document.getElementById('game-over');
const questionModal = document.getElementById('question-modal');
const questionsRemainingEl = document.getElementById('questions-remaining');

// Initialize the game
function initGame() {
    // Calculate total questions
    gameState.totalQuestions = gameData.categories.reduce((total, category) => total + category.questions.length, 0);
    
    // Show team setup screen
    showScreen('team-setup');
    
    // Set up event listeners
    document.getElementById('start-game').addEventListener('click', startGame);
    document.getElementById('reset-game').addEventListener('click', resetGame);
    document.getElementById('play-again').addEventListener('click', resetGame);
    document.getElementById('show-answer').addEventListener('click', showAnswer);
    document.getElementById('no-one').addEventListener('click', markQuestionAsUsed);
    
    // Add input animations
    setupInputAnimations();
}

// Add input focus animations
function setupInputAnimations() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.parentElement.style.transform = 'translateY(-5px)';
            this.parentElement.parentElement.style.boxShadow = '0 15px 40px rgba(30, 58, 138, 0.15)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.parentElement.style.transform = '';
            this.parentElement.parentElement.style.boxShadow = '';
        });
    });
}

// Show specific screen
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// Start the game with teams
function startGame() {
    // Get team names
    const team1Name = document.getElementById('team1-name').value || 'Team 1';
    const team2Name = document.getElementById('team2-name').value || 'Team 2';
    const team3Name = document.getElementById('team3-name').value;
    const team4Name = document.getElementById('team4-name').value;
    
    // Create teams
    gameState.teams = [
        { name: team1Name, score: 0 },
        { name: team2Name, score: 0 }
    ];
    
    if (team3Name) {
        gameState.teams.push({ name: team3Name, score: 0 });
    }
    
    if (team4Name) {
        gameState.teams.push({ name: team4Name, score: 0 });
    }
    
    // Initialize game board
    createGameBoard();
    updateScoreboard();
    updateQuestionsRemaining();
    
    // Show game board
    showScreen('game-board');
}

// Create the Jeopardy board
function createGameBoard() {
    const categoriesRow = document.querySelector('.categories-row');
    const questionsGrid = document.querySelector('.questions-grid');
    
    // Clear existing content
    categoriesRow.innerHTML = '<div class="category-placeholder"></div>';
    questionsGrid.innerHTML = '';
    
    // Create category headers
    gameData.categories.forEach(category => {
        const categoryCard = document.createElement('div');
        categoryCard.className = 'category-card';
        categoryCard.textContent = category.name;
        categoriesRow.appendChild(categoryCard);
    });
    
    // Create points headers (vertical)
    for (let i = 0; i < 5; i++) {
        const pointsHeader = document.createElement('div');
        pointsHeader.className = 'points-header';
        pointsHeader.textContent = `$${(i + 1) * 200}`;
        questionsGrid.appendChild(pointsHeader);
        
        // Create question cells for each category
        gameData.categories.forEach(category => {
            const questionCell = document.createElement('div');
            const question = category.questions[i];
            
            if (question && !question.used) {
                questionCell.className = 'question-cell';
                questionCell.textContent = `$${question.points}`;
                questionCell.dataset.category = category.name;
                questionCell.dataset.points = question.points;
                questionCell.dataset.questionIndex = i;
                
                questionCell.addEventListener('click', () => showQuestion(category.name, i));
            } else {
                questionCell.className = 'question-cell used';
                questionCell.textContent = '';
            }
            
            questionsGrid.appendChild(questionCell);
        });
    }
}

// Show question in modal
function showQuestion(categoryName, questionIndex) {
    const category = gameData.categories.find(cat => cat.name === categoryName);
    const question = category.questions[questionIndex];
    
    if (question.used) return;
    
    gameState.currentQuestion = question;
    
    // Update modal content
    document.getElementById('question-category').textContent = categoryName;
    document.getElementById('question-points').textContent = `$${question.points}`;
    document.getElementById('question-text').textContent = question.question;
    document.getElementById('answer-text').textContent = question.answer;
    
    // Reset modal state
    document.getElementById('answer-section').classList.add('hidden');
    document.getElementById('score-controls').classList.add('hidden');
    document.getElementById('show-answer').style.display = 'flex';
    
    // Create team buttons
    const teamsButtons = document.querySelector('.teams-buttons');
    teamsButtons.innerHTML = '';
    
    gameState.teams.forEach((team, index) => {
        const button = document.createElement('button');
        button.className = 'team-btn';
        button.innerHTML = `<i class="fas fa-users"></i> ${team.name}`;
        button.addEventListener('click', () => awardPoints(index));
        teamsButtons.appendChild(button);
    });
    
    // Show modal
    questionModal.classList.add('active');
}

// Show answer in modal
function showAnswer() {
    document.getElementById('answer-section').classList.remove('hidden');
    document.getElementById('score-controls').classList.remove('hidden');
    document.getElementById('show-answer').style.display = 'none';
}

// Award points to a team
function awardPoints(teamIndex) {
    const points = gameState.currentQuestion.points;
    gameState.teams[teamIndex].score += points;
    
    // Mark question as used
    markQuestionAsUsed();
    
    // Update UI
    updateScoreboard();
    updateGameBoard();
    updateQuestionsRemaining();
    closeQuestion();
    
    // Check if game is over
    if (gameState.usedQuestions >= gameState.totalQuestions) {
        setTimeout(endGame, 500);
    }
}

// Mark question as used (for "No One Got It" case)
function markQuestionAsUsed() {
    if (gameState.currentQuestion) {
        gameState.currentQuestion.used = true;
        gameState.usedQuestions++;
        
        // Update UI
        updateGameBoard();
        updateQuestionsRemaining();
        closeQuestion();
        
        // Check if game is over
        if (gameState.usedQuestions >= gameState.totalQuestions) {
            setTimeout(endGame, 500);
        }
    }
}

// Close question modal
function closeQuestion() {
    questionModal.classList.remove('active');
    gameState.currentQuestion = null;
}

// Update scoreboard
function updateScoreboard() {
    const teamsDisplay = document.getElementById('teams-display');
    teamsDisplay.innerHTML = '';
    
    // Sort teams by score (descending)
    const sortedTeams = [...gameState.teams].sort((a, b) => b.score - a.score);
    
    sortedTeams.forEach(team => {
        const teamElement = document.createElement('div');
        teamElement.className = 'team-score-item';
        teamElement.innerHTML = `
            <span class="team-name">${team.name}</span>
            <span class="team-points">${team.score}</span>
        `;
        teamsDisplay.appendChild(teamElement);
    });
}

// Update questions remaining
function updateQuestionsRemaining() {
    const remaining = gameState.totalQuestions - gameState.usedQuestions;
    questionsRemainingEl.textContent = `${remaining} question${remaining !== 1 ? 's' : ''} remaining`;
}

// Update game board after question is used
function updateGameBoard() {
    const cells = document.querySelectorAll('.question-cell');
    
    cells.forEach(cell => {
        if (cell.dataset.category && cell.dataset.questionIndex !== undefined) {
            const category = gameData.categories.find(cat => cat.name === cell.dataset.category);
            const questionIndex = parseInt(cell.dataset.questionIndex);
            const question = category.questions[questionIndex];
            
            if (question.used) {
                cell.textContent = '';
                cell.classList.add('used');
                cell.removeEventListener('click', () => {});
            }
        }
    });
}

// End the game
function endGame() {
    // Determine winner
    let maxScore = -1;
    let winners = [];
    
    gameState.teams.forEach(team => {
        if (team.score > maxScore) {
            maxScore = team.score;
            winners = [team];
        } else if (team.score === maxScore) {
            winners.push(team);
        }
    });
    
    // Display final scores
    const finalScores = document.getElementById('final-scores');
    finalScores.innerHTML = '';
    
    // Sort teams by score (descending)
    const sortedTeams = [...gameState.teams].sort((a, b) => b.score - a.score);
    
    sortedTeams.forEach(team => {
        const teamElement = document.createElement('div');
        const isWinner = winners.includes(team);
        teamElement.className = `final-team ${isWinner ? 'winner' : ''}`;
        teamElement.innerHTML = `
            <span>${team.name}</span>
            <span>${team.score} points</span>
        `;
        finalScores.appendChild(teamElement);
    });
    
    showScreen('game-over');
}

// Reset the game
function resetGame() {
    // Reset game data
    gameData.categories.forEach(category => {
        category.questions.forEach(question => {
            question.used = false;
        });
    });
    
    // Reset game state
    gameState = {
        teams: [],
        currentQuestion: null,
        usedQuestions: 0,
        totalQuestions: gameData.categories.reduce((total, category) => total + category.questions.length, 0)
    };
    
    // Clear team name inputs
    document.getElementById('team1-name').value = 'Team 1';
    document.getElementById('team2-name').value = 'Team 2';
    document.getElementById('team3-name').value = '';
    document.getElementById('team4-name').value = '';
    
    // Show team setup screen
    showScreen('team-setup');
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', initGame);
