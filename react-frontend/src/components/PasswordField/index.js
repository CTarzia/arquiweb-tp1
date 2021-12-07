import React, { useState } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

import styles from "./styles.module.scss";

const PasswordField = ({ onChangePassword }) => {
	const [showPassword, setShowPassword] = useState(false);

	const handlePasswordDisplay = () => setShowPassword(!showPassword);

	return (
		<div className={styles.input}>
			<label className={styles.label}>Contraseña:</label>
			<input
				type={showPassword ? "text" : "password"}
				name="password"
				id="password"
				onChange={onChangePassword}
			/>
			<div onClick={handlePasswordDisplay} className={styles.iconContainer}>
				{showPassword ? (
					<VisibilityIcon className={styles.icon} />
				) : (
					<VisibilityOffIcon className={styles.icon} />
				)}
			</div>
		</div>
	);
};

export default PasswordField;
