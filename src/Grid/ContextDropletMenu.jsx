import { useState, useEffect, useRef, useLayoutEffect, useContext } from "react";
import "./ContextDropletMenu.css";
import React from "react";
import { AppContext } from "../App";
import { DropletGroup } from "../class/DropletGroup";

export const ContextDropletMenu = ({ targetId }) => {
	const [contextData, setContextData] = useState({ visible: false, posX: 0, posY: 0, event: null });
	const contextRef = useRef(null);
	const [dropletClicked, setDropletClicked] = useState(null);
	const [selectedDroplet, setSelectedDroplet] = useState(null);

	const { droplets } = useContext(AppContext);

	useEffect(() => {
		const contextMenuEventHandler = (event) => {
			const targetElement = document.getElementById(targetId);
			console.log(event.target);
			if (event.target.tagName !== "DIV") return;
			if (targetElement && targetElement.contains(event.target)) {
				event.preventDefault();
				let coords = event.target.id
					.slice(8)
					.split("_")
					.map((v) => parseInt(v));
				setDropletClicked(droplets[droplets.findIndex((d) => d.x === coords[0] && d.y === coords[1])]);
				setContextData({ visible: true, posX: event.clientX, posY: event.clientY, event });
			} else if (contextRef.current && !contextRef.current.contains(event.target)) {
				setContextData({ ...contextData, visible: false });
			}
		};

		const offClickHandler = (event) => {
			if (contextRef.current && !contextRef.current.contains(event.target)) {
				setContextData({ ...contextData, visible: false });
			}
		};

		document.addEventListener("contextmenu", contextMenuEventHandler);
		document.addEventListener("click", offClickHandler);
		return () => {
			document.removeEventListener("contextmenu", contextMenuEventHandler);
			document.removeEventListener("click", offClickHandler);
		};
	}, [contextData, targetId]);

	useLayoutEffect(() => {
		if (contextData.posX + contextRef.current?.offsetWidth > window.innerWidth) {
			setContextData({ ...contextData, posX: contextData.posX - contextRef.current?.offsetWidth });
		}
		if (contextData.posY + contextRef.current?.offsetHeight > window.innerHeight) {
			setContextData({ ...contextData, posY: contextData.posY - contextRef.current?.offsetHeight });
		}
	}, [contextData]);

	const fusionDroplets = () => {
		setContextData({ ...contextData, visible: false });
		const group = dropletClicked.group ?? new DropletGroup();
		// group.add();
		console.log(selectedDroplet);
	};

	return (
		<div
			ref={contextRef}
			className="contextMenu"
			style={{
				display: `${contextData.visible ? "block" : "none"}`,
				left: contextData.posX,
				top: contextData.posY,
			}}
		>
			<div className={"optionsList dropletMenuListWrapper"}>
				<div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: "1rem" }}>
					<select id="dropletSelect" onChange={(e) => setSelectedDroplet(e.target.value)}>
						{dropletClicked != null &&
							droplets
								.filter((d) => d.x !== dropletClicked.x || d.y !== dropletClicked.y)
								.map((d, i) => (
									<option value={i} key={i} style={{ backgroundColor: d.color }}>
										{d.color}
									</option>
								))}
					</select>
					<button onClick={fusionDroplets}>Fusionner</button>
				</div>
			</div>
		</div>
	);
};
