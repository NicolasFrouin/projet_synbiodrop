import React, { useContext, useState } from "react";
import { AppContext } from "../App";
import init from "./Editor";
import "./ReteMain.css";
import { MdUndo,MdRedo } from "react-icons/md";
import logo from "../image/logo/logo.jpg";
import user from "../image/user/user.jpeg";
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
		editor.trigger("undo");
	};
	const redo = () => {
		editor.trigger("redo");
	};

	return (
		<div className="vs-container" style={style}>
			<div style={{display:"flex",padding:"20px",width:"100%",alignItems: "center",}}>
			<div style={{display:"flex",}}>
			<img src={logo} alt="Logo" style={{width:"50px",borderRadius:"18%",}} />
			<img src={user} alt="user" style={{width:"50px",borderRadius:"50%",margin: "0 25px 0 25px",}} />
			<div style={{display:"grid",justifyItems: "left",}}>
			<span className="vs-title" style={{whiteSpace: "nowrap",}}>Visual scripting</span>
			<span className="vs-subtitle" style={{color:"#7f89a5"}}>http://localhost/ashd12/</span>
			</div>
			</div>	
			<div className="button-container" style={{width: "100%",justifyContent: "flex-end",display: "flex",height: "fit-content",}}>
					<MdUndo className="undo" onClick={undo} style={{marginRight: "20px",fontSize: "30px",color:"#7f89a5"}}></MdUndo>
					<MdRedo className="redo" onClick={redo} style={{fontSize: "30px",color:"#7f89a5"}}></MdRedo>
			</div>
			</div>
			<div
				style={{
					height: "100%",
				}}
			>
				<div id={"rete-env"} ref={(el) => reteInit(el)} />
			</div>
			{/* <div class="dock"></div> */}
		</div>
	);
};

export default ReteMain;
