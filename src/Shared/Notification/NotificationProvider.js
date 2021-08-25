import React from "react";
import { FiCheck } from "react-icons/fi";
import { SnackbarProvider } from "notistack";

import { makeStyles } from "@material-ui/core";

const useStyle = makeStyles({
	// default variant
	contentRoot: {
		backgroundColor: "#FFF",
		padding: 0,
		borderRadius: 9,
		"& #notistack-snackbar": {
			padding: 0,
			width: 350,
		},
	},
	action: {
		padding: 0,
		margin: 0,
		width: 30,
		height: 30,
		position: "absolute",
		right: 0,
	},
	variantSuccess: {
		backgroundColor: "#115ef6",
		padding: 0,
	},
	variantError: {
		backgroundColor: "#fff",
	},
	variantInfo: {
		backgroundColor: "#fff",
	},
	variantWarning: {
		backgroundColor: "#fff",
	},
});

const SnackbarIcon = ({ Icon, type }) => {
	return (
		<div
			style={{
				color: "#fff",
				marginRight: 12,
			}}
		>
			<Icon style={{ height: 24, width: 24 }} />
		</div>
	);
};
const NotificationProvider = ({ children }) => {
	const styles = useStyle();

	return (
		<SnackbarProvider
			maxSnack={3}
			preventDuplicate
			dense
			anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
			iconVariant={{
				success: <SnackbarIcon Icon={FiCheck} type="success" />,
				warning: <SnackbarIcon Icon={FiCheck} type="warning" />,
				error: <SnackbarIcon Icon={FiCheck} type="error" />,
				info: <SnackbarIcon Icon={FiCheck} type="info" />,
			}}
			classes={styles}
		>
			{children}
		</SnackbarProvider>
	);
};

export default NotificationProvider;
