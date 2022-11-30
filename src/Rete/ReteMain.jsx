import React from "react";
import init from "./Editor";

const ReteMain = () => {
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
			<button type="button" onclick="alert('Hi user!')">Press me!</button>
			<div style={{ height: "100%" }}>
				<div ref={(el) => init(el)} />
			</div>
		</div>
	);
};

export default ReteMain;
