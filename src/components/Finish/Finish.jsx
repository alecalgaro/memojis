import React from "react";
import "./Finish.css";

const Finish = ({ setCantImages, countFailures, setCountFailures }) => {
	const handlePlayAgain = () => {
		setCantImages(2);
		setCountFailures(0);
	};

	return (
		<>
			<div className="finishContainer">
				<h2 id="title" className="titleContainer">
					GANASTE
				</h2>
				<p className="countFailures">Cantidad de fallos: {countFailures}</p>
				<button className="btn_play_again" onClick={() => handlePlayAgain()}>
					Volver a jugar
				</button>
			</div>
		</>
	);
};

export default Finish;
