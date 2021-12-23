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

const playerFactory = (name) => {
    let _points = 0;
    let _identity;
    const setIdentity = (identity) => {
        _identity = identity;
    }
    const getIdentity = () => _identity;
    const getPoints = () => _points;
    const gainPoints = () => {
        _points++;
    }
    return { getPoints, gainPoints, setIdentity, getIdentity };
}
/**
 * The gamefield shows us the tic-tac-toe field
 * it does the following:
 * contain the field
 * allow getting the field
 * allow setting the field
 * not allow to change the size of the field
 */
const gameField = (() => {
    let ticTacToeField = [["A", "B", "C"], ["D", "E", "F"], ["G", "H", "I"]]
    function getTicTacToeField() {
        return ticTacToeField;
    }
    function setTicTacToeField(aTicTacToeField) {
        ticTacToeField = aTicTacToeField;
    }
    return { getTicTacToeField, setTicTacToeField };

})();

/**
 * Logic, should probably get two players and a gamefield passed to determine what happens
 */
const gameLogic = (() => {
    let game = gameField;
    function testField() {
        game.getTicTacToeField().forEach(element => {
            element.forEach(el => {
                console.log(el);
            })
        });
    }
    return { testField };
})();

/**
 * 
 */
const MainDomControl = (() => {
    //the main container this all runs on.

    const getMainMenu = () => {
        let main = document.getElementsByClassName("main")[0];
        /*
        menu-items are the same, can we do that? assign the same one? I think not
        */
        let menu = document.createElement("div");
        let menuItem1 = document.createElement("div")
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
        main.appendChild(menu)
    }
    //get Game field and then add th
    const getGameField = () => {
        let main = document.getElementsByClassName("main")[0];
        
        let gridMenu = document.createElement("div");
        gridMenu.classList.add("gridmenu");
        //god, if I actually did this manually, I would have shot myself :)
        for (let index = 0; index < 9; index++) {
            let gridItem = document.createElement("div");
            gridItem.classList.add("gridbox");
            gridItem.dataset.nr = index;
            gridMenu.appendChild(gridItem);
        }
        main.appendChild(gridMenu);
    }
    //GameOver, easy access
    const getGameOver = () => {
        let GameOver = {
            g: "./img/G.png",
            a: "./img/A.png",
            m: "./img/M.png",
            e: "./img/E.png",
            o: "./img/Ov.png",
            v: "./img/V.png",
            r: "./img/R.png"
        }
        let main = document.getElementsByClassName("main")[0];
        // can't I just use the getGameField function and then re-arrange the letters by the data attribute with a switch case?
        let gridMenu = document.createElement("div");
        gridMenu.classList.add("gridmenu");

        for (let index = 0; index < 9; index++) {
            let gridItem = document.createElement("div");
            gridItem.classList.add("gridboxGE");
            gridItem.dataset.nr = index;
            switch (index) {
                case 1:
                    gridItem.
                    break;
            
                default:
                    break;
            }

            gridMenu.appendChild(gridItem);
        }

    }
    return { getMainMenu, getGameField };


})();

MainDomControl.getGameField();
