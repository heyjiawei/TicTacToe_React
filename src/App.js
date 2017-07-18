import React from 'react';

const tableStyle = {
	border: '1px solid black',
	borderCollapse: 'collapse'
};

const tableCellStyle = {
	border: '1px solid #999',
	fontSize: '24px',
	fontWeight: 'bold',
	height: '34px',
	marginRight: '-1px',
	marginTop: '-1px',
	padding: '0',
	textAlign: 'center',
	width: '34px'
};

function TicTacToeCell (props) {
	return (
		<td onClick={props.onClick} style={tableCellStyle}>
			{props.value}
		</td>
	);
}

function getWinner (board) {
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
		if (board[a] !== null &&
				board[a] === board[b] &&
				board[b] === board[c]) {
			return board[a];
		}
	}

	return false;
}

class TicTacToeBoard extends React.Component {
	renderCell (index) {
		return (
			<TicTacToeCell value={this.props.values[index]}
				onClick={() => this.props.onClick(index)}
			/>
		);
	}

	render () {
		return (
			<div>
				<table style={tableStyle}>
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

class App extends React.Component {
	constructor () {
		super();
		this.state = {
			history: [{
				values: Array(9).fill(null)
			}],
			stepNumber: 0,
			xIsNext: true
		};
	}

	handleClick (index) {
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1];
		const values = current.values.slice();

		if (getWinner(values)) {
			return;
		}

		values[index] = this.state.xIsNext ? 'X' : 'O';

		this.setState({
			history: history.concat([{
				values: values
			}]),
			stepNumber: history.length,
			xIsNext: !this.state.xIsNext
		});
	}

	restart () {
		this.setState({
			history: [{
				values: Array(9).fill(null)
			}],
			xIsNext: true
		});
	}

	jumpTo (index) {
		this.setState({
			stepNumber: index,
			xIsNext: (index % 2) === 0
		});
	}

	render () {
		const history = this.state.history;
		const current = history[this.state.stepNumber];
		const winner = getWinner(current.values);

		const moves = history.map((currentValue, index) => {
			const description = index ? 'Move #' + index : 'Game start';
			return (
				<li key={index}>
					<a href="#" onClick={() => this.jumpTo(index)} >{description}</a>
				</li>
			);
		});

		let status;
		if (winner) {
			status = 'Player ' + winner + ' Won!';
		} else {
			status = 'Player ' + (this.state.xIsNext ? 'X' : 'O') + ' turn';
		}

		return (
			<div>
				<div>{status}</div>
				<TicTacToeBoard values={current.values}
					onClick={(index) => this.handleClick(index)}
				/>
				<div>
					<button type="button" onClick={this.restart.bind(this)} >Restart</button>
				</div>
				<div>
					<ol>{moves}</ol>
				</div>
			</div>
		);
	}
}

export default App;
