import React, { useContext, useState } from "react";
import { AppContext } from "../App";
import init from "./Editor";
import "./ReteMain.css"

const ReteMain = ({ style = {} }) => {
	const context = useContext(AppContext);

	const { editor, setEditor, engine, setEngine } = context;

	const reteInit = async (ref) => {
		const container = document.getElementById("rete-env");
		const { edit, engi } = await init(container, context);
		if (editor == null) setEditor(edit);
		if (engine == null) setEngine(engi);
	};
	const undo = () => {
		console.log("undo");
		editor.trigger("undo");
	};

	const undo = () => {
		editor.trigger("undo");
	};
	const redo = () => {
		editor.trigger("redo");
	};

	return (
		<div className="vs-container" style={style}>
			<h1 className="vs-title">Visual scripting</h1>
			<div className="button-container">
				<button className="undo" onClick={undo}>Retour</button>
				<button className="redo" onClick={redo}>Revenir</button>
			</div>
			<div style={{
				height: "100%",
				backgroundImage: 'radial-gradient(#c2cad9 1px, transparent 3px)',
				backgroundSize: '20px 20px'
			}}>
				<div id={"rete-env"} ref={(el) => reteInit(el)} />
			</div>
			{/* <div class="dock"></div> */}
		</div>

	);
};

export default ReteMain;
