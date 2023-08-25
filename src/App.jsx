import { useState } from "react";

// passing in a value that will be used as a property in the props is done using curry braces and
// the name can be anything for as long as it is the one reffered to in the production
function Square(props) {
  // const [value, setValue] = useState(null);
  // function handleClick() {
  //   setValue("X");
  // }
  // removed the individual state on the buttons and added it to their parent
  // so as to keep track of all the states of the sqaures. this is called lifting state up
  return (
    <button className="square" onClick={props.onSquareClick}>
      {props.value}
    </button>
  );
}

function App({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }
  // declaring the winner
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `The winner: ${winner}`;
  } else {
    console.log(squares.includes(null));
    if (squares.includes(null)) {
      status = `Next Player: ${xIsNext ? "X" : "O"}`;
    } else {
      status = `Game over`;
    }
  }
  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}
// the game function
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  // const [xIsNext, setXIsNext] = useState(true);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }
  // function to jump to next move
  function jumpTo(nextMove) {
    // TODO:
    setCurrentMove(nextMove);
  }
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Jump to move #" + move;
    } else {
      description = "Jump to game Start";
    }
    console.log(squares);
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });
  return (
    <div className="game">
      <div className="game-board">
        <App xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

// function to calculate winner
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
