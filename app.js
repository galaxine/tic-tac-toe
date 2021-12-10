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
    const setIdentity = (identity) =>{
        _identity = identity;
    }
    const getIdentity = () => _identity;
    const getPoints = () => _points;
    const gainPoints = () => {
        _points++;
    }
    return {getPoints, gainPoints, setIdentity, getIdentity};
}
/**
 * The gamefield shows us the tic-tac-toe field
 * it does the following:
 * contain the field
 * allow getting the field
 * allow setting the field
 * not allow to change the size of the field
 */
const gameField =(() => {
    let ticTacToeField = [["A","B","C"],["D","E","F"],["G","H","I"]]
    function getTicTacToeField() {
        return ticTacToeField;
    }
    function setTicTacToeField(aTicTacToeField) {
        ticTacToeField = aTicTacToeField;
    }
    return {getTicTacToeField, setTicTacToeField};
    
})();

/**
 * Logic, should probably get two players and a gamefield passed to determine what happens
 */
const gameLogic =(()=> {
    let game = gameField();
    function testField() {
        game.getTicTacToeField().forEach(element => {
            element.forEach( el => {
                console.log(el);
            })
        });
    }
    return {testField};
})();

/**
 * Then we need to make sure it displays it on the web.
 * Then we need to make sure it catches the interaction from the web.
 * + We need a function that catches the elements from the dom
 * + We need a function that listents to the users touch
 * + 
 * + We need a function that 
 * 
 */
const DomControl = (() => {

})()
