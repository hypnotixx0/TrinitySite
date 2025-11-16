// Enhanced Game Data with Christmas Theme
const gameData = {
    categories: [
        {
            name: "Bible Christmas",
            questions: [
                { question: "Which gospel tells the story of Jesus' birth?", answer: "Luke", points: 100, used: false },
                { question: "Who visited Mary to tell her she would have a baby?", answer: "The angel Gabriel", points: 200, used: false },
                { question: "Where was Jesus born?", answer: "Bethlehem", points: 300, used: false },
                { question: "What gifts did the wise men bring?", answer: "Gold, frankincense, and myrrh", points: 400, used: false },
                { question: "Who was the Roman emperor when Jesus was born?", answer: "Caesar Augustus", points: 500, used: false }
            ]
        },
        {
            name: "Christmas Carols",
            questions: [
                { question: "Which carol contains 'fa la la la la'?", answer: "Deck the Halls", points: 100, used: false },
                { question: "In 'Jingle Bells', what kind of sleigh is it?", answer: "One-horse open sleigh", points: 200, used: false },
                { question: "Which carol mentions 'figgy pudding'?", answer: "We Wish You a Merry Christmas", points: 300, used: false },
                { question: "What is the first line of 'Silent Night'?", answer: "Silent night, holy night", points: 400, used: false },
                { question: "In 'The Twelve Days of Christmas', what is given on the 5th day?", answer: "Five golden rings", points: 500, used: false }
            ]
        },
        {
            name: "Christmas Traditions",
            questions: [
                { question: "What do people traditionally hang on their fireplace?", answer: "Stockings", points: 100, used: false },
                { question: "What plant do people kiss under?", answer: "Mistletoe", points: 200, used: false },
                { question: "Which country started the tradition of Christmas trees?", answer: "Germany", points: 300, used: false },
                { question: "What is the day after Christmas called?", answer: "Boxing Day", points: 400, used: false },
                { question: "What do Jewish people celebrate around the same time as Christmas?", answer: "Hanukkah", points: 500, used: false }
            ]
        },
        {
            name: "Christmas Movies",
            questions: [
                { question: "Who tries to steal Christmas in Dr. Seuss' story?", answer: "The Grinch", points: 100, used: false },
                { question: "What is the name of the boy in 'The Polar Express'?", answer: "Hero Boy", points: 200, used: false },
                { question: "In 'Home Alone', where is the family going for Christmas?", answer: "Paris", points: 300, used: false },
                { question: "What does Buddy the Elf put on spaghetti?", answer: "Maple syrup", points: 400, used: false },
                { question: "In 'A Christmas Story', what does Ralphie want for Christmas?", answer: "A Red Ryder BB gun", points: 500, used: false }
            ]
        },
        {
            name: "Christmas Around the World",
            questions: [
                { question: "In which country is Christmas celebrated in summer?", answer: "Australia", points: 100, used: false },
                { question: "What is Santa Claus called in France?", answer: "Père Noël", points: 200, used: false },
                { question: "In Mexico, what do children break to get candy?", answer: "Piñata", points: 300, used: false },
                { question: "Which Scandinavian country gives the Christmas tree to London each year?", answer: "Norway", points: 400, used: false },
                { question: "In Italy, what does La Befana bring to children on January 6th?", answer: "Candy or coal", points: 500, used: false }
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
    document.getElementById('no-one').addEventListener('click', closeQuestion);
    
    // Add input animations
    setupInputAnimations();
}

// Add input focus animations
function setupInputAnimations() {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.parentElement.style.transform = 'translateY(-5px)';
            this.parentElement.parentElement.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
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
        pointsHeader.textContent = `$${(i + 1) * 100}`;
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
    gameState.currentQuestion.used = true;
    gameState.usedQuestions++;
    
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