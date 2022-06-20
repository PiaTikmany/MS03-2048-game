var board;
var score = 0;
var rows = 4;
var columns = 4;

//release 2:

window.onload = function() { //states what should happen when the whole page has loaded
    setGame()
}

function setGame() {
    board = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            //creates <div id="0-0"></div>
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString() //converts row and column numbers to string and joins them with a hyphen, which becomes the id for that tile
            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").append(tile) //adds tiles to the board
        }
    }
    setTwo()
    setTwo()
}

//to start off the game:

function setTwo() { 
    if (!hasEmptyTile()) { //if there are no empty tiles, break out of setTwo()
        return; // returns true or false
    }
    let found = false //checks if an empty space is found
    while (!found) { //while found remails false
        // random num between 0 - 1 is generated, multiplied by num of rows and columns respectively and then the decimal is removed by rounding it using math.floor. This generates a random tile.
        let r = Math.floor(Math.random() * rows) 
        let c = Math.floor(Math.random() * columns)
        //if this random tile is empty, give it the value of 2
        if (board[r][c] === 0) {
            board[r][c] = 2;
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            tile.innerText = "2";
            tile.classList.add("x2");
            found = true; //to break out of while loop 
        }
    }
}

function hasEmptyTile() {
    let count = 0;
    for (let r = 0; r < rows; r++) { //loop through board
        for (let c = 0; c < columns; c++) { 
            if (board[r][c] === 0) { //at least one zero in the board
                return true;
            }
        }
    }
    return false; //board is full
}


//release 3:

function updateTile(tile, num) {
    tile.innerText = ""; //clearing the tile
    tile.classList.value = ""; //clear the class list
    tile.classList.add("tile") //gives tile the tile class
    if (num > 0) { 
        tile.innerText = num; //displays number on tile
        if (num <= 4096) {
            tile.classList.add("x"+num.toString()) //gives each tile a class based on the number it has
        } else {
            tile.classList.add("x8192") //all tiles that have the number 8192 and above have the same format so they have the same class
        }
    }
}

document.addEventListener("keyup", (e) => { //what should happen when you press on a key and then let go
    //e is keyboard event
    if (e.code == "ArrowLeft") { //if the left arrow key is pressed
        slideLeft();
        setTwo()
    } else if (e.code == "ArrowRight") { //if the right arrow key is pressed
        slideRight();
        setTwo()
    } else if (e.code == "ArrowUp") { //if the up arrow key is pressed
        slideUp();
        setTwo()
    } else if (e.code == "ArrowDown") { //if the down arrow key is pressed
        slideDown()
        setTwo()
    }
    document.getElementById("score").innerText = score;
}) 

function filterZero(row) {
    return row.filter(num => num != 0) //creates a new array without zeros for that particular row
}

function slide(row) {
    row = filterZero(row); //get rid of zeroes
    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] == row[i + 1]) { //checks two tiles to see if they're the same num. they merge into one tile with double the num.
            row[i] *= 2
            row[i + 1] = 0;
            score += row[i];
        }
    }
    row = filterZero(row) // remove zeros from the middle
    while (row.length < columns) {
        row.push(0) //add zeros to end of row
    }
    return row 
}

//arrow key movements:

function slideLeft() {
    for (let r = 0; r < rows; r++) {
        let row = board[r]; 
         row = slide(row);
         board[r] = row
        for (let c = 0; c < columns; c++) { //updates id of tile since its position is changing
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c]
            updateTile(tile, num)
        }
    }
}

function slideRight() {
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row.reverse(); //row is reversed so that code from slideLeft() can be reused
        row = slide(row);
        row.reverse(); //reversed back to display it in the correct way
        board[r] = row
        for (let c = 0; c < columns; c++) { //updates id of tile since its position is changing
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c]
            updateTile(tile, num)
        }
    }
}

function slideUp() {
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]]; 
        row = slide(row);
        //first element from each of the 4 rows make a row so that:
        // board[0][c] = row[0];
        // board[1][c] = row[1];
        // board[2][c] = row[2];
        // board[3][c] = row[3];
        for (let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

function slideDown() { //same as slideUp()
    for (let c = 0; c < columns; c++) {
        let row = [board[0][c], board[1][c], board[2][c], board[3][c]]; 
        row.reverse() //reversed to make it reuse code
        row = slide(row);
        row.reverse() //reversed back to display correct row
        for (let r = 0; r < rows; r++){
            board[r][c] = row[r];
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            let num = board[r][c];
            updateTile(tile, num);
        }
    }
}

