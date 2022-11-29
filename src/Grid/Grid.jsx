import React from "react";
import { Droplet } from "../class";
import $ from "jquery";
import "./Grid.css";
import { GridDropletMenu } from "./GridDropletMenu";

const Grid = ({ size, droplets, setDroplets }) => {
	const cellClick = (cellObj, option) => {
		// const e = new NodeEditor("demo@0.1.0");
		// e.trigger("process");
		const dataCell = $(cellObj.target);
		if (dataCell[0].tagName == "DIV" || dataCell.children().length) {
			let coordsPre = dataCell[0].id
				.slice(dataCell[0].tagName == "TD" ? 3 : 8)
				.split("_")
				.map((v) => parseInt(v));
			let coords = { x: coordsPre[0], y: coordsPre[1] };
			let oldDrop = droplets.findIndex((d) => d.x === coords.x && d.y === coords.y);
			setDroplets((state) => {
				state[oldDrop].color = option.color;
				return state;
			});
			$(`#droplet_${coords.x + "_" + coords.y}`).css({ backgroundColor: option.color });
		} else {
			let coordsPre = cellObj.target.id
				.slice(3)
				.split("_")
				.map((v) => parseInt(v));
			let coords = { x: coordsPre[0], y: coordsPre[1] };
			const droplet = new Droplet(coords, option.color);
			setDroplets((state) => {
				state.push(droplet);
				return state;
			});
			dataCell.append(droplet.draw());
		}
	};

	return (
		<div className="grid-container">
			<table id="droplet-grid">
				<tbody>
					{Array.from({ length: size }, (_, n) => size - n).map((trv) => (
						<tr id={`tr_${trv}`} key={`tr_${trv}`}>
							{Array.from({ length: size }, (_, n) => n + 1).map((tdv) => (
								<td id={`td_${tdv}_${trv}`} key={`td_${tdv}_${trv}`}></td>
							))}
						</tr>
					))}
				</tbody>
			</table>
			<GridDropletMenu
				targetId={"droplet-grid"}
				options={[
					{ name: "blue", color: "blue" },
					{ name: "yellow", color: "yellow" },
					{ name: "red", color: "red" },
					{ name: "green", color: "green" },
					{ name: "purple", color: "purple" },
					{ name: "brown", color: "brown" },
					{ name: "black", color: "black" },
				]}
				itemClick={cellClick}
			/>
		</div>
	);
};

export default Grid;
