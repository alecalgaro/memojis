import { useEffect, useState } from "react";
import Board from "../Board/Board";
import Finish from "../Finish/Finish";

// imports de audios
import win from "../../sounds/win.wav";
import lose from "../../sounds/lose.wav";

// audios
const audioWin = new Audio(win);
const audioLose = new Audio(lose);

const Game = ({ emojiList }) => {
	// state para desordenar el array
	const [shuffledMemoBlocks, setShuffledMemoBlocks] = useState([]);
	// state para guardar el bloque seleccionado cuando el usuario presiona sobre un bloque
	const [selectedMemoBlock, setselectedMemoBlock] = useState(null);
	// state para saber si aun se esta ejecutando la animacion de giro de un bloque para que el
	// usuario no pueda presionar de nuevo sobre el bloque si aun se est girando.
	const [animating, setAnimating] = useState(false);

	// cantidad de imagenes segun el nivel, se van sumando de a 2
	const [cantImages, setCantImages] = useState(2);
	// contador para saber cuando se encontraron todas las parejas y aumentar la cantidad de imagenes
	const [count, setCount] = useState(1);
	// contador de intentos fallidos
	const [countFailures, setCountFailures] = useState(0);

	useEffect(() => {
		// con slice me quedo con un nuevo array con cantImages para ir sumando en cada nivel
		const shuffledEmojiList = shuffleArray([
			...emojiList.slice(0, cantImages),
			...emojiList.slice(0, cantImages),
		]);
		// seteo las imagenes mezcladas y todas cara abajo (flipped = false)
		setShuffledMemoBlocks(
			shuffledEmojiList.map((emoji, i) => ({ index: i, emoji, flipped: false }))
		);
		setCount(1); // reinicio el contador
	}, [cantImages]); // cuando cambia cantImages (pasa de nivel) ejecuto el useEffect para agregar mas imagenes

	// metodo para mezclar el array
	const shuffleArray = (a) => {
		a.sort(() => Math.random() - 0.5);
		return a;
	};

	// metodo para los click en los MemoBlock
	const handleMemoClick = (memoBlock) => {
		const flippedMemoBlock = { ...memoBlock, flipped: true };
		let shuffledMemoBlocksCopy = [...shuffledMemoBlocks];
		shuffledMemoBlocksCopy.splice(memoBlock.index, 1, flippedMemoBlock);
		setShuffledMemoBlocks(shuffledMemoBlocksCopy);
		if (selectedMemoBlock === null) {
			setselectedMemoBlock(memoBlock);
		} else if (selectedMemoBlock.emoji === memoBlock.emoji) {
			setCount(count + 1);
			audioWin.play();
			setselectedMemoBlock(null);
			// si se encontraron todas las parejas, se espera un segundo y se aumenta la cant de imagenes
			if (count === cantImages) {
				setTimeout(() => {
					setCantImages(cantImages + 2);
				}, 1000);
			}
		} else {
			audioLose.play();
			setAnimating(true);
			setCountFailures(countFailures + 1);
			setTimeout(() => {
				shuffledMemoBlocksCopy.splice(memoBlock.index, 1, memoBlock);
				shuffledMemoBlocksCopy.splice(selectedMemoBlock.index, 1, selectedMemoBlock);
				setShuffledMemoBlocks(shuffledMemoBlocksCopy);
				setselectedMemoBlock(null);
				setAnimating(false);
			}, 1000);
		}
	};

	// Renderizamos el tablero (Board) pasando los bloques y los state para
	// la animacion y el click sobre los bloques.
	return (
		<main className="appContainer">
			<Board
				memoBlocks={shuffledMemoBlocks}
				animating={animating}
				handleMemoClick={handleMemoClick}
				countFailures={countFailures}
			/>

			{cantImages > 8 ? (
				<Finish
					setCantImages={setCantImages}
					countFailures={countFailures}
					setCountFailures={setCountFailures}
				/>
			) : null}
		</main>
	);
};

export default Game;
