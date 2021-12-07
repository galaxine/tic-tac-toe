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
    const getPoints = () => _points;
    const gainPoints = () => {
        _points++;
    }
    return {getPoints, gainPoints};
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
    let ticTacToeField = [["","",""],["","",""],["","",""]]
    return {ticTacToeField};
    
})();