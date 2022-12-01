import { useState, useEffect, useRef, useLayoutEffect } from "react";
import "./GridDropletMenu.css";
import React from "react";
import $ from "jquery";

export const GridDropletMenu = ({ targetId, options, itemClick }) => {
	const [contextData, setContextData] = useState({ visible: false, posX: 0, posY: 0, event: null });
	const contextRef = useRef(null);

	useEffect(() => {
		const contextMenuEventHandler = (event) => {
			const targetElement = document.getElementById(targetId);
			if (event.target.tagName === "DIV" && $(event.target).hasClass("droplet")) {
				itemClick(event, null);
				return;
			}
			if (targetElement && targetElement.contains(event.target)) {
				event.preventDefault();
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

		document.addEventListener("click", contextMenuEventHandler);
		document.addEventListener("click", offClickHandler);
		return () => {
			document.removeEventListener("click", contextMenuEventHandler);
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
				{options.map((option) => (
					<li
						key={option.name}
						className={"optionListItem dropletMenuListItem"}
						onClick={() => itemClick(contextData.event, option)}
						style={{
							backgroundColor: option.color,
						}}
					>
						{option.name}
					</li>
				))}
			</div>
		</div>
	);
};
