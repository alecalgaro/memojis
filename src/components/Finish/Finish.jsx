import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import "./Finish.css";

const Finish = ({ setCantImages, countFailures, setCountFailures }) => {
	const handlePlayAgain = () => {
		setCantImages(2);
		setCountFailures(0);
	};

	const launchConfetti = () => {
		const duration = 3000; // duracion del efecto de confetti en milisegundos

		confetti({
			particleCount: 200, // numero de confettis
			spread: 160, // angulo de dispersion de los confettis
			origin: { y: 0.6 }, // Origen de lanzamiento (0,0 es la esquina superior izquierda)
			colors: ["#8cc8dc", "#f36767"], // colores de los confettis
			startVelocity: 30, // velocidad inicial de los confettis
			gravity: 0.8, // gravedad que afecta a los confettis
			ticks: duration / 16, // duracion total dividida en ticks (cada tick es aproximadamente 16ms)
			zIndex: 1000, // indice z para mostrar encima de otros elementos
			disableForReducedMotion: true, // para mejorar la accesibilidad en dispositivos con reduccion de movimiento
		});
	};

	useEffect(() => {
		launchConfetti();
	}, []);

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
