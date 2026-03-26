const GameBoard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];

    const getBoard = () => board;
    const player1 = createPlayer("Player1", 'X');
    const player2 = createPlayer("Player2", 'O');

    const reset = () => board = ['', '', '', '', '', '', '', '', ''];

    const placeMarker = (index, marker) => {
        if (board[index] === '') {
            board[index] = marker;
            return true;
        }

        return false;
    };

    return { getBoard, placeMarker, reset };
})();

function createPlayer(name, marker) {
    let m_name = name;
    let m_marker = marker;
    let m_score = 0;

    const getName = () => m_name;
    const setName = (name) => m_name = name;

    const getMarker = () => m_marker;
    const setMarker = (marker) => m_marker = marker;

    const getScore = () => m_score;
    const giveScore = () => ++m_score;

    return { getName, setName, getMarker, setMarker, getScore, giveScore };
};

const GameController = (() => {
    

    return { };
})();


console.log(GameBoard.getBoard());