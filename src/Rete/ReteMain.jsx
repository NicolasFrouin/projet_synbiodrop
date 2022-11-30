import React, { useContext, useState } from "react";
import { AppContext } from "../App";
import init from "./Editor";

const ReteMain = ({ style = {} }) => {
	const context = useContext(AppContext);
	const { editor, setEditor, engine, setEngine } = context;
	const reteInit = async (ref) => {
		const { edit, engi } = await init(ref, context);
		if (editor == null) setEditor(edit);
		if (engine == null) setEngine(engi);
	};

	const undo = () => {
		console.log("undo");
		editor.trigger("undo");
	};
	const redo = () => {
		console.log("redo");
		editor.trigger("redo");
	};

	return (
		<div className="vs-container" style={style}>
			<h1 className="vs-title">Visual scripting</h1>
			<div>
				<button onClick={undo}>Retour</button>
				<button onClick={redo}>Revenir</button>
			</div>
			<div style={{ height: "100%" }}>
				<div ref={(el) => reteInit(el)} />
			</div>
		</div>
	);
};

export default ReteMain;
