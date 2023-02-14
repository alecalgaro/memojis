import MemoBlock from "../MemoBlock/MemoBlock";
import "./Board.css";

const Board = ({ animating, handleMemoClick, memoBlocks, countFailures }) => {
	return (
		<div className="containerBoard">
			<p className="countFailures">Cantidad de fallos: {countFailures}</p>
			<div className="board">
				{memoBlocks.map((memoBlock, index) => {
					return (
						<MemoBlock
							key={index}
							animating={animating}
							handleMemoClick={handleMemoClick}
							memoBlock={memoBlock}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default Board;
