// imports the useState hook from the react library that will allow us to change the state of the component on the DOM
import { useState } from 'react';

// functional component named square that takes in two props: value and onSquareClick
function Square({value, onSquareClick}) {
  return (
    // When the button is clicked, it will invoke the onSquareClick function passed as a prop.
    <button className="square" onClick={onSquareClick}>
      {/* the value prop will be the value of the square, either X or O */}
      {value}
    </button>
  );
}

// defining the Board component as the main functional component
// this function will represent the gameboard
export default function Board() {
  // xIsNext is the initialized variable using the useState hook. 
  // the function setXIsNext is used to update the value of the state
  const [xIsNext, setXIsNext] = useState(true);
  // initializes a state variable called squares and the initial value of squares is set to an array with null values
  const [squares, setSquares] = useState(Array(9).fill(null));

  // i is being used so that the square can be updated with "x" or "o" accordingly.
  function handleClick(i) {

    // This line checks if there is a winner or if the square at index i already has a value. 
    // If either condition is true, the function returns early and does nothing.
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    // This line creates a copy of the squares array using the slice() method. 
    // This is done to avoid directly modifying the original array.
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    // This line updates the squares state with the modified nextSquares array.
    setSquares(nextSquares);

    // This line toggles the value of xIsNext by negating its current value using the logical NOT operator (!).
     // It ensures that the next turn will be played by the opposite player.
    setXIsNext(!xIsNext);
  }
// This line invokes the calculateWinner function, passing the squares array as an argument, 
// and assigns the result to the winner variable. 
// The calculateWinner function determines if there is a winner in the game.
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
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

// checks if there is a winner by checking the value of the squares
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
