document.addEventListener('DOMContentLoaded', function() {
    // Journey of a Board
    const journeySteps = document.querySelectorAll('.step');
    journeySteps.forEach(step => {
        step.addEventListener('click', function() {
            alert(`You clicked on ${this.id}. Here you can add more details about this step.`);
        });
    });

    // Virtual Tour
    const hotspots = document.querySelectorAll('.hotspot');
    hotspots.forEach(hotspot => {
        hotspot.addEventListener('click', function() {
            alert(`This is ${this.id}. You can add more information about this tool here.`);
        });
    });

    // Board Gallery
    const filterButtons = document.querySelectorAll('.filter-btn');
    const boardContainer = document.getElementById('board-container');

    const boards = [
        { type: 'shortboard', name: 'Thruster' },
        { type: 'longboard', name: 'Noserider' },
        { type: 'shortboard', name: 'Fish' },
    ];

    function displayBoards(filter = 'all') {
        boardContainer.innerHTML = '';
        boards.forEach(board => {
            if (filter === 'all' || board.type === filter) {
                const boardElement = document.createElement('div');
                boardElement.textContent = board.name;
                boardContainer.appendChild(boardElement);
            }
        });
    }

    displayBoards();

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            displayBoards(filter);
        });
    });

    // Board Customizer
    // Board Customizer
    const boardType = document.getElementById('board-type');
    const boardLength = document.getElementById('board-length');
    const boardWidth = document.getElementById('board-width');
    const boardColor = document.getElementById('board-color');
    const designColor = document.getElementById('design-color');
    const designType = document.getElementById('design-type');
    const boardPreview = document.getElementById('board-preview');
    const ctx = boardPreview.getContext('2d');

    function drawBoard() {
        ctx.clearRect(0, 0, boardPreview.width, boardPreview.height);

        // Calculate board dimensions
        const canvasRatio = boardPreview.height / boardPreview.width;
        const boardRatio = boardLength.value / (boardWidth.value / 12);
        let boardHeight, boardWidth;

        if (boardRatio > canvasRatio) {
            boardHeight = boardPreview.height * 0.9;
            boardWidth = boardHeight / boardRatio;
        } else {
            boardWidth = boardPreview.width * 0.9;
            boardHeight = boardWidth * boardRatio;
        }

        const x = (boardPreview.width - boardWidth) / 2;
        const y = (boardPreview.height - boardHeight) / 2;

        // Draw board outline
        ctx.fillStyle = boardColor.value;
        ctx.beginPath();
        ctx.moveTo(x, y + boardHeight * 0.1);
        ctx.lineTo(x + boardWidth, y + boardHeight * 0.1);
        ctx.quadraticCurveTo(x + boardWidth, y, x + boardWidth / 2, y);
        ctx.quadraticCurveTo(x, y, x, y + boardHeight * 0.1);
        ctx.lineTo(x, y + boardHeight * 0.9);
        ctx.quadraticCurveTo(x, y + boardHeight, x + boardWidth / 2, y + boardHeight);
        ctx.quadraticCurveTo(x + boardWidth, y + boardHeight, x + boardWidth, y + boardHeight * 0.9);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Draw design
        ctx.fillStyle = designColor.value;
        switch (designType.value) {
            case 'stripe':
                ctx.fillRect(x + boardWidth * 0.45, y, boardWidth * 0.1, boardHeight);
                break;
            case 'circle':
                ctx.beginPath();
                ctx.arc(x + boardWidth / 2, y + boardHeight / 2, boardWidth * 0.2, 0, Math.PI * 2);
                ctx.fill();
                break;
        }

        // Draw fin(s)
        ctx.fillStyle = '#888';
        if (boardType.value === 'shortboard') {
            // Thruster setup
            drawFin(x + boardWidth * 0.5, y + boardHeight * 0.8, boardWidth * 0.05, boardHeight * 0.15);
            drawFin(x + boardWidth * 0.35, y + boardHeight * 0.85, boardWidth * 0.05, boardHeight * 0.13);
            drawFin(x + boardWidth * 0.65, y + boardHeight * 0.85, boardWidth * 0.05, boardHeight * 0.13);
        } else if (boardType.value === 'longboard') {
            // Single fin
            drawFin(x + boardWidth * 0.5, y + boardHeight * 0.8, boardWidth * 0.08, boardHeight * 0.18);
        } else if (boardType.value === 'fish') {
            // Twin fin
            drawFin(x + boardWidth * 0.35, y + boardHeight * 0.8, boardWidth * 0.06, boardHeight * 0.15);
            drawFin(x + boardWidth * 0.65, y + boardHeight * 0.8, boardWidth * 0.06, boardHeight * 0.15);
        }
    }

    function drawFin(x, y, width, height) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + width, y);
        ctx.lineTo(x + width / 2, y - height);
        ctx.closePath();
        ctx.fill();
    }

    // Add event listeners to all input elements
    const inputs = document.querySelectorAll('#board-customizer input, #board-customizer select');
    inputs.forEach(input => {
        input.addEventListener('change', drawBoard);
    });

    // Initial draw
    drawBoard();
});