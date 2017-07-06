import React from 'react';

const tableStyle = {
	border: '1px solid black',
	borderCollapse: 'collapse',
};

const tableCellStyle = {
	border: '1px solid black',
	borderCollapse: 'collapse',
}

function TicTacToeCell(props) {
	return (
		<td onClick={props.onClick} >
			{props.value}
		</td>
	);
}

function getWinner(board) {
	const lines = [
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 4, 8],
		[2, 4, 6]
	];

	for (var i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (board[a] == board[b] &&
				board[b] == board[c]) {
			return board[a];
		}
	}

	return null;
}

class TicTacToeBoard extends React.Component {
	constructor() {
		super();
		this.state = {
			values: Array(9).fill('null'),
			xIsNext: true,
			cellsLeft: 9,
		};
	}

	componentDidUpdate() {
		this.checkForWinner();
	}

	checkForWinner() {
		const winner = getWinner(this.state.values);
		console.log(winner);
		if (winner !== null) {
			// pop up dialog box
			console.log('The winner is: ', winner);
		} else {
			if (this.state.cellsLeft === 0) {
				console.log('Ended with a draw!');
			}
		}
	}

	setCell(index) {
		const values = this.state.values.slice();
		if (values[index] === 'null') {
			values[index] = this.state.xIsNext ? 'X' : 'O';
			this.setState({
				values: values,
				xIsNext: !this.state.xIsNext,
				cellsLeft: (this.state.cellsLeft - 1),
			});	
		}
	}

	renderCell(index) {
		return (
			<TicTacToeCell 
				value={this.state.values[index]}
				onClick={() => this.setCell(index)}
			/>
		);
	}

	render() {
		return (
			<div>
				<div>Player {this.state.xIsNext ? 'X' : 'O'}'s turn</div>
				<table>
					<tbody>
						<tr>
							{this.renderCell(0)}
							{this.renderCell(1)}
							{this.renderCell(2)}
						</tr>
						<tr>
							{this.renderCell(3)}
							{this.renderCell(4)}
							{this.renderCell(5)}
						</tr>
						<tr>
							{this.renderCell(6)}
							{this.renderCell(7)}
							{this.renderCell(8)}
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}

class Settings extends React.Component {
	render() {
		return (
			<div>
				<button type='button'>Restart</button>
				<button type='button'>Undo</button>
				<button type='button'>Redo</button>
			</div>
		);
	}
}

class App extends React.Component {
	render() {
		return (
			<div>
				<TicTacToeBoard />
				<Settings />
			</div>
		);
	}
}

var MARKING = [
0,0,1,
2,1,2,
1,0,0
];

export default App;