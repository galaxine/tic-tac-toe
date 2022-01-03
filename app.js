/**
 * A tic-tac-toe game has
 * two players
 * a 3 by 3 gamefield
 * rules to play it
 * a eventcontroller
 *
 * We can use a factory pattern if we need several copies of a class
 * We can use module pattern if we need only one copy of a class
 *
 * Not sure yet how much of it I will have to rewrite soon enough, we will see.
 */
/**
 *
 * @param {string} name Name of the player
 * @returns getPoints, gainPoints
 */
const Player = (name) => {
    let points = 0;
    let identity = "";
    let arrayIdentity = "";
    const getPoints = () => points;
    const gainPoints = () => points++;
    const getName = () => name;
    const setIdentity = (url) => {
        identity = url;
    };
    const setArrayIdentity = (sign) => {
        arrayIdentity = sign;
    };
    const getArrayIdentity = () => arrayIdentity;
    const getIdentity = () => identity;
    return { getName, getPoints, gainPoints, setIdentity, getIdentity, setArrayIdentity, getArrayIdentity };
};
/**
 * The gamefield shows us the tic-tac-toe field
 * it does the following:
 * contain the field
 * allow getting the field
 * allow setting the field
 * not allow to change the size of the field
 */
const gameField = (() => {
    let ticTacToeField = [["", "", ""], ["", "", ""], ["", "", ""]];
    function getTicTacToeField() {
        return ticTacToeField;
    }
    function setTicTacToeField(aTicTacToeField) {
        ticTacToeField = aTicTacToeField;
    }
    return { getTicTacToeField, setTicTacToeField };
})();
/**
 * This is all the scenes
 */
const scenes = (() => {
    const getMainMenu = () => {
        let main = document.getElementsByClassName("main")[0];
        /*
        menu-items are the same, can we do that? assign the same one? I think not
        */
        let menu = document.createElement("div");
        let menuItem1 = document.createElement("div");
        let menuTitle = document.createElement("div");
        let head = document.createElement("h1");
        let buttons = document.createElement("div");
        let menuItem2 = document.createElement("div");
        let menuBtn1 = document.createElement("div");
        let button1 = document.createElement("button");
        let menuItem3 = document.createElement("div");
        let menuBtn2 = document.createElement("div");
        let button2 = document.createElement("button");
        //add classes and populate the elements 
        menu.classList.add("menu");
        menuItem1.classList.add("menu-item");
        menuTitle.classList.add("menu-title");
        head.textContent = "Menu";
        buttons.classList.add("buttons");
        menuItem2.classList.add("menu-item");
        menuBtn1.classList.add("menu-button");
        button1.textContent = "One Player";
        menuItem3.classList.add("menu-item");
        menuBtn2.classList.add("menu-button");
        button2.textContent = "Two Players";
        //append the elements together
        menu.append(menuItem1, buttons);
        menuItem1.append(menuTitle);
        menuTitle.append(head);
        buttons.append(menuItem2, menuItem3);
        menuItem2.append(menuBtn1);
        menuBtn1.append(button1);
        menuItem3.append(menuBtn2);
        menuBtn2.append(button2);
        main.appendChild(menu);
    };
    //get Game field and then add th
    const getGameField = () => {
        let main = document.getElementsByClassName("main")[0];
        let gridMenu = document.createElement("div");
        gridMenu.classList.add("gridmenu");
        //god, if I actually did this manually, I would have shot myself :)
        for (let index = 0; index < 9; index++) {
            let gridItem = document.createElement("div");
            gridItem.classList.add("gridbox");
            gridItem.dataset.nr = index.toString();
            gridItem.dataset.sign = "";
            gridMenu.appendChild(gridItem);
        }
        main.appendChild(gridMenu);
    };
    //GameOver, easy access
    const getGameOver = () => {
        let GameOver = {
            g: "./img/G.png",
            a: "./img/A.png",
            m: "./img/M.png",
            e: "./img/E.png",
            o: "./img/Ov.png",
            v: "./img/V.png",
            r: "./img/R.png",
            whitespace: "./img/whitespace.png"
        };
        let main = document.getElementsByClassName("main")[0];
        // can't I just use the getGameField function and then re-arrange
        // the letters by the data attribute with a switch case?
        let gridMenu = document.createElement("div");
        gridMenu.classList.add("gridmenu");
        // I need to do this here as well, there needs to be some way to 
        // abstract it into a function.
        for (let index = 0; index < 9; index++) {
            let gridItem = document.createElement("div");
            gridItem.classList.add("gridboxGE");
            gridItem.dataset.nr = index.toString();
            gridMenu.appendChild(gridItem);
        }
        // I am now doing a second for loop and use the dataset.nr 
        // as the value to assign the pngs into each grid item
        for (let index = 0; index < 9; index++) {
            let gridItem = gridMenu.children[index];
            switch (gridItem.dataset.nr) {
                case "0":
                    gridItem.style.backgroundImage = `url(${GameOver.g})`;
                    break;
                case "1":
                    gridItem.style.backgroundImage = `url(${GameOver.a})`;
                    break;
                case "2":
                    gridItem.style.backgroundImage = `url(${GameOver.m})`;
                    break;
                case "3":
                    gridItem.style.backgroundImage = `url(${GameOver.e})`;
                    break;
                case "4":
                    gridItem.style.backgroundImage = `url(${GameOver.whitespace})`;
                    break;
                case "5":
                    gridItem.style.backgroundImage = `url(${GameOver.o})`;
                    break;
                case "6":
                    gridItem.style.backgroundImage = `url(${GameOver.v})`;
                    break;
                case "7":
                    gridItem.style.backgroundImage = `url(${GameOver.e})`;
                    break;
                case "8":
                    gridItem.style.backgroundImage = `url(${GameOver.r})`;
                    break;
                default:
                    console.log("something broke");
                    break;
            }
            main.appendChild(gridMenu);
        }
    };
    //sets the game after the player has chosen.
    const setGameField = (aTicTacToeField) => {
    };
    return { getMainMenu, getGameField, getGameOver, setGameField };
})();
/**
 * Logic, should probably get two players and a gamefield passed to determine what happens
 * There are at most, two players that are human.
 *
 * Depending what the player choose, the gamefield will be updated.
 * It gets players, the gamefield, the scenes that are manipulated and the eventcontroller
 *
 */
const gameLogic = (() => {
    //start of the game
    // turn true = player1, false = player2
    let turn = true;
    let choice = "";
    let start = () => {
        scenes.getMainMenu();
        let buttons = document.querySelectorAll("button");
        let toBeRemovedMenu = document.querySelector(".menu");
        buttons[0].addEventListener("click", () => {
            choice = "1";
            if (toBeRemovedMenu != null) {
                toBeRemovedMenu.remove();
            }
            else {
                console.log("menu not found, check the start function");
            }
            game();
        });
        buttons[1].addEventListener("click", () => {
            choice = "2";
            if (toBeRemovedMenu != null) {
                toBeRemovedMenu.remove();
            }
            else {
                console.log("menu not found, check the start function");
            }
            game();
        });
    };
    const getChoice = () => choice;
    //the turn is by the turn variable.
    //the gamefield coordinates are filled with the player's choice
    let game = () => {
        // these are the player objects created from the player factory. Not sure what to call these for Typescript to understand
        let player1;
        let player2;
        if (choice == "1") {
            player1 = Player("player");
            player1.setIdentity("./img/X.png");
            player1.setArrayIdentity("X");
            player2 = Player("computer");
            player2.setIdentity("./img/O.png");
            player2.setArrayIdentity("O");
        }
        else if (choice == "2") {
            player1 = Player("player");
            player1.setIdentity("./img/X.png");
            player1.setArrayIdentity("X");
            player2 = Player("player");
            player2.setIdentity("./img/O.png");
            player2.setArrayIdentity("O");
        }
        scenes.getGameField();
        let gridMenu = document.querySelector(".gridmenu");
        if (gridMenu != null) {
            gridMenu.addEventListener("click", (e) => {
                let gamefield = gameField.getTicTacToeField();
                let target = e.target;
                //the gamefield first, then the page update. So we can check BASED on the gamefield.
                switch (target.dataset.nr) {
                    case "0":
                        if (gamefield[0][0] == "" && turn == true) {
                            gamefield[0][0] = player1.getArrayIdentity();
                            target.style.backgroundImage = `url(${player1.getIdentity()})`;
                            gameField.setTicTacToeField(gamefield);
                            checkRules();
                            turn = !turn;
                        }
                        else if (gamefield[0][0] == "" && turn == false) {
                            gamefield[0][0] = player2.getArrayIdentity();
                            target.style.backgroundImage = `url(${player2.getIdentity()})`;
                            gameField.setTicTacToeField(gamefield);
                            checkRules();
                            turn = !turn;
                        }
                        else {
                            console.log("already taken");
                        }
                        break;
                    case "1":
                        if (gamefield[0][1] == "" && turn == true) {
                            gamefield[0][1] = player1.getArrayIdentity();
                            target.style.backgroundImage = `url(${player1.getIdentity()})`;
                            gameField.setTicTacToeField(gamefield);
                            checkRules();
                            turn = !turn;
                        }
                        else if (gamefield[0][1] == "" && turn == false) {
                            gamefield[0][1] = player2.getArrayIdentity();
                            target.style.backgroundImage = `url(${player2.getIdentity()})`;
                            gameField.setTicTacToeField(gamefield);
                            checkRules();
                            turn = !turn;
                        }
                        else {
                            console.log("already taken");
                        }
                        break;
                    case "2":
                        if (gamefield[0][2] == "" && turn == true) {
                            gamefield[0][2] = player1.getArrayIdentity();
                            target.style.backgroundImage = `url(${player1.getIdentity()})`;
                            gameField.setTicTacToeField(gamefield);
                            checkRules();
                            turn = !turn;
                        }
                        else if (gamefield[0][2] == "" && turn == false) {
                            gamefield[0][2] = player2.getArrayIdentity();
                            target.style.backgroundImage = `url(${player2.getIdentity()})`;
                            gameField.setTicTacToeField(gamefield);
                            checkRules();
                            turn = !turn;
                        }
                        else {
                            console.log("already taken");
                        }
                        break;
                    case "3":
                        if (gamefield[1][0] == "" && turn == true) {
                            gamefield[1][0] = player1.getArrayIdentity();
                            target.style.backgroundImage = `url(${player1.getIdentity()})`;
                            gameField.setTicTacToeField(gamefield);
                            checkRules();
                            turn = !turn;
                        }
                        else if (gamefield[1][0] == "" && turn == false) {
                            gamefield[1][0] = player2.getArrayIdentity();
                            target.style.backgroundImage = `url(${player2.getIdentity()})`;
                            gameField.setTicTacToeField(gamefield);
                            checkRules();
                            turn = !turn;
                        }
                        else {
                            console.log("already taken");
                        }
                        break;
                    case "4":
                        if (gamefield[1][1] == "" && turn == true) {
                            gamefield[1][1] = player1.getArrayIdentity();
                            target.style.backgroundImage = `url(${player1.getIdentity()})`;
                            gameField.setTicTacToeField(gamefield);
                            checkRules();
                            turn = !turn;
                        }
                        else if (gamefield[1][1] == "" && turn == false) {
                            gamefield[1][1] = player2.getArrayIdentity();
                            target.style.backgroundImage = `url(${player2.getIdentity()})`;
                            gameField.setTicTacToeField(gamefield);
                            checkRules();
                            turn = !turn;
                        }
                        else {
                            console.log("already taken");
                        }
                        break;
                    case "5":
                        if (gamefield[1][2] == "" && turn == true) {
                            gamefield[1][2] = player1.getArrayIdentity();
                            target.style.backgroundImage = `url(${player1.getIdentity()})`;
                            gameField.setTicTacToeField(gamefield);
                            checkRules();
                            turn = !turn;
                        }
                        else if (gamefield[1][2] == "" && turn == false) {
                            gamefield[1][2] = player2.getArrayIdentity();
                            target.style.backgroundImage = `url(${player2.getIdentity()})`;
                            gameField.setTicTacToeField(gamefield);
                            checkRules();
                            turn = !turn;
                        }
                        else {
                            console.log("already taken");
                        }
                        break;
                    case "6":
                        if (gamefield[2][0] == "" && turn == true) {
                            gamefield[2][0] = player1.getArrayIdentity();
                            target.style.backgroundImage = `url(${player1.getIdentity()})`;
                            gameField.setTicTacToeField(gamefield);
                            checkRules();
                            turn = !turn;
                        }
                        else if (gamefield[2][0] == "" && turn == false) {
                            gamefield[2][0] = player2.getArrayIdentity();
                            target.style.backgroundImage = `url(${player2.getIdentity()})`;
                            gameField.setTicTacToeField(gamefield);
                            checkRules();
                            turn = !turn;
                        }
                        else {
                            console.log("already taken");
                        }
                        break;
                    case "7":
                        if (gamefield[2][1] == "" && turn == true) {
                            gamefield[2][1] = player1.getArrayIdentity();
                            target.style.backgroundImage = `url(${player1.getIdentity()})`;
                            gameField.setTicTacToeField(gamefield);
                            checkRules();
                            turn = !turn;
                        }
                        else if (gamefield[2][1] == "" && turn == false) {
                            gamefield[2][1] = player2.getArrayIdentity();
                            target.style.backgroundImage = `url(${player2.getIdentity()})`;
                            gameField.setTicTacToeField(gamefield);
                            checkRules();
                            turn = !turn;
                        }
                        else {
                            console.log("already taken");
                        }
                        break;
                    case "8":
                        if (gamefield[2][2] == "" && turn == true) {
                            gamefield[2][2] = player1.getArrayIdentity();
                            target.style.backgroundImage = `url(${player1.getIdentity()})`;
                            gameField.setTicTacToeField(gamefield);
                            checkRules();
                            turn = !turn;
                        }
                        else if (gamefield[2][2] == "" && turn == false) {
                            gamefield[2][2] = player2.getArrayIdentity();
                            target.style.backgroundImage = `url(${player2.getIdentity()})`;
                            gameField.setTicTacToeField(gamefield);
                            checkRules();
                            turn = !turn;
                        }
                        else {
                            console.log("already taken");
                        }
                        break;
                    default:
                        console.log("there is an uncaught error in this game");
                        break;
                }
            });
        }
        else {
            console.log("gridMenu is not defined");
        }
    };
    const checkRules = () => {
        let gamefield = gameField.getTicTacToeField();
        // check if the game is over and who won
        //check 00, 01, 02
        // check 10, 11, 12
        // check 20, 21, 22
        // check 00, 10, 20
        // check 01, 11, 21
        // check 02, 12, 22
        // check 00, 11, 22
        // check 20, 11, 02
        if (gamefield[0][0] == "X" && gamefield[0][1] == "X" && gamefield[0][2] == "X" ||
            gamefield[0][0] == "O" && gamefield[0][1] == "O" && gamefield[0][2] == "O" ||
            gamefield[1][0] == "X" && gamefield[1][1] == "X" && gamefield[1][2] == "X" ||
            gamefield[1][0] == "O" && gamefield[1][1] == "O" && gamefield[1][2] == "O" ||
            gamefield[2][0] == "X" && gamefield[2][1] == "X" && gamefield[2][2] == "X" ||
            gamefield[2][0] == "O" && gamefield[2][1] == "O" && gamefield[2][2] == "O" ||
            gamefield[0][0] == "X" && gamefield[1][0] == "X" && gamefield[2][0] == "X" ||
            gamefield[0][0] == "O" && gamefield[1][0] == "O" && gamefield[2][0] == "O" ||
            gamefield[0][1] == "X" && gamefield[1][1] == "X" && gamefield[2][1] == "X" ||
            gamefield[0][1] == "O" && gamefield[1][1] == "O" && gamefield[2][1] == "O" ||
            gamefield[0][2] == "X" && gamefield[1][2] == "X" && gamefield[2][2] == "X" ||
            gamefield[0][2] == "O" && gamefield[1][2] == "O" && gamefield[2][2] == "O" ||
            gamefield[0][0] == "X" && gamefield[1][1] == "X" && gamefield[2][2] == "X" ||
            gamefield[0][0] == "O" && gamefield[1][1] == "O" && gamefield[2][2] == "O" ||
            gamefield[0][2] == "X" && gamefield[1][1] == "X" && gamefield[2][0] == "X" ||
            gamefield[0][2] == "O" && gamefield[1][1] == "O" && gamefield[2][0] == "O") {
            if (turn == true) {
                setTimeout(() => alert("Player1 won"), 500);
                let m = document.querySelector(".gridmenu");
                if (m != null) {
                    m.remove();
                    scenes.getGameOver();
                }
            }
            else {
                setTimeout(() => alert("Player2 won"), 500);
                let m = document.querySelector(".gridmenu");
                if (m != null) {
                    m.remove();
                    scenes.getGameOver();
                }
            }
        }
        else {
            let count = 0;
            for (let i = 0; i < gamefield.length; i++) {
                for (let j = 0; j < gamefield[i].length; j++) {
                    if (gamefield[i][j] == "") {
                        count++;
                    }
                }
            }
            if (count == 0) {
                setTimeout(() => alert("It's a draw"), 500);
                let m = document.querySelector(".gridmenu");
                if (m != null) {
                    m.remove();
                    scenes.getGameOver();
                }
            }
        }
    };
    return { start, game, turn, getChoice };
})();
gameLogic.start();
let players = gameLogic.getChoice();
console.log(players);
