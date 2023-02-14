import { React } from "react";
import "./Toast.css";
import icon_info from "../../assets/icon_info.svg";
import icon_error from "../../assets/icon_error.svg";
import icon_success from "../../assets/icon_success.svg";
import icon_warning from "../../assets/icon_warning.svg";

// las props traen valores por defecto por si el usuario solo quiere cambiar algunas
const Toast = ({
	message = "",
	type = "info", // info, error, success, warning
	position = "top_center", // top_center, top_left, top_right, bottom_center, bottom_left, bottom_right
	duration = 3000,
	width = "w-sm", // w-sm, w-md, w-lg, w-xl
	textSize = "t-md", // t-sm, t-md, t-lg, t-xl
	autoClose = true,
	theme = "light",
	setActive,
}) => {
	let icon;
	switch (type) {
		case "info":
			icon = icon_info;
			break;
		case "error":
			icon = icon_error;
			break;
		case "success":
			icon = icon_success;
			break;
		case "warning":
			icon = icon_warning;
			break;
	}

	if (autoClose) {
		setTimeout(() => {
			setActive(false);
		}, duration);
	}

	const closeToast = () => {
		setActive(false);
	};

	return (
		<>
			{message != "" ? (
				<div
					className={`toast_container ${type} ${position} ${width} ${theme}`}
					onClick={() => closeToast()}
				>
					<img src={icon} alt={`Icono de toast de tipo ${icon}`} className="toast_img_icon" />
					<p className={`toast_message ${textSize}`}>{message}</p>
				</div>
			) : null}
		</>
	);
};

export default Toast;
