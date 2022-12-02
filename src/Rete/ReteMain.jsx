import React, { useContext, useState } from "react";
import { AppContext } from "../App";
import init from "./Editor";
import "./ReteMain.css";
import { MdUndo,MdRedo,MdContentPaste,MdDelete } from "react-icons/md";
import logo from "../image/logo/logo.jpg";
import user from "../image/user/user.jpeg";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import $ from "jquery";
const ReteMain = ({ style = {} }) => {
	const context = useContext(AppContext);

	const { editor, setEditor, engine, setEngine } = context;

	const reteInit = async (ref) => {
		const container = document.getElementById("rete-env");
		const { edit, engi } = await init(container, context);
		if (editor == null) setEditor(edit);
		if (engine == null) setEngine(engi);
	};
	const deleteAll = () =>{
		editor.clear();
		toast.info('✨ La zone de travail a été nettoyée !', {
			position: "top-center",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "colored",
			});
	};
	
	const undo = () => {
		editor.trigger("undo");
	};
	const redo = () => {
		editor.trigger("redo");
	};
	const paste = () => {
		navigator.clipboard.writeText($('.vs-link').text()).then(function () {
			toast.success('👍 Lien copié!', {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "colored",
				});
		}, function () {
			alert('Failure to copy. Check permissions for clipboard')
		});
		};

	return (
		<div className="vs-container" style={style}>
			<div style={{display:"flex",padding:"20px",width:"100%",alignItems: "center",}}>
			<div style={{display:"flex",}}>
				<a href="/">
			<img src={logo} alt="Logo" style={{width:"50px",borderRadius:"18%",}} />
			</a>
			<img src={user} alt="user" style={{width:"50px",borderRadius:"50%",margin: "0 25px 0 25px",}} />
			<div style={{display:"grid",justifyItems: "left",}}>
			<span className="vs-title" style={{whiteSpace: "nowrap",}}>Microfluidics COV-19 #1689</span>
			<div style={{display:'inline-flex'}}>
			<span className="vs-link" style={{color:"#7f89a5"}}>http://localhost/ashd12/</span>
			<MdContentPaste onClick={paste} style={{color:"#7f89a5",marginLeft:"12px",cursor:"pointer"}}></MdContentPaste>
			</div>
			</div>
			</div>	
			<div className="button-container" style={{width: "100%",justifyContent: "flex-end",display: "flex",height: "fit-content",cursor:"pointer",}}>
				<MdDelete className="delete" onClick={deleteAll} style={{marginRight: "20px",fontSize: "30px",color:"#7f89a5",cursor:"pointer",}}></MdDelete>
					<MdUndo className="undo" onClick={undo} style={{marginRight: "20px",fontSize: "30px",color:"#7f89a5",cursor:"pointer",}}></MdUndo>
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
			<ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="colored"
/>
		</div>
	);
};

export default ReteMain;
