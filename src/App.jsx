import { useState, useEffect } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import "./App.css";

import SplashScreen from "./components/SplashScreen/SplashScreen";
import Game from "./components/Game/Game";
import Toast from "./components/Toast/Toast";
import logo from "../src/assets/logo.webp";

function App() {
	const [splashScreen, setSplashScreen] = useState(true);
	const [ready, setReady] = useState(false);
	const [emojis, setEmojis] = useState([]);
	const [enableToastError, setEnableToastError] = useState(false);

	// SplashScreen
	setTimeout(function () {
		setSplashScreen(false);
	}, 6000);

	useEffect(() => {
		if (emojis.length == 8) {
			setReady(true);
		}
	}, [emojis]);

	const handleSelectEmoji = (emoji) => {
		// las imagenes de los emojis vienen en "native"
		if (emojis.includes(emoji.native)) {
			setEnableToastError(true);
		} else {
			// recordar usar el prevState para mantener el contenido previo
			setEmojis((prevEmojis) => [...prevEmojis, emoji.native]);
		}
	};

	return (
		<>
			{splashScreen ? (
				<SplashScreen />
			) : ready ? (
				<Game emojiList={emojis} />
			) : (
				<main className="app_container">
					<h1>
						<img src={logo} alt="Logo videojuego memojis" className="logo" />
					</h1>
					<p className="app_text">Seleccione {8 - emojis.length} emojis para comenzar el juego</p>
					<Picker data={data} onEmojiSelect={(emoji) => handleSelectEmoji(emoji)} />
					{enableToastError && (
						<Toast
							message="Ya elegiste ese emoji"
							type="error"
							position="top_center"
							width="w-md"
							textSize="t-lg"
							autoClose={true}
							setActive={setEnableToastError}
						/>
					)}
				</main>
			)}
		</>
	);
}

export default App;
