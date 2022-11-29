import React, { useContext, useState } from "react";
import { AppContext } from "../App";
import init from "./Editor";

const ReteMain = () => {
	const context = useContext(AppContext);
	const { editor, setEditor, engine, setEngine } = context;
	const reteInit = async (ref) => {
		const { edit, engi } = await init(ref, context);
		if (editor == null) setEditor(edit);
		if (engine == null) setEngine(engi);
	};

	return (
		<div
			className="vs-container"
			style={{
				textAlign: "center",
				width: "50vw",
				height: "95vh",
				border: "solid #6c0277 1px",
				margin: "1rem",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<h1 className="vs-title">Visual scripting</h1>
			<div style={{ height: "100%" }}>
				<div ref={(el) => reteInit(el)} />
			</div>
		</div>
	);
};

export default ReteMain;
