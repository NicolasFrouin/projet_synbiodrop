import React, { useContext, useEffect, useState } from "react";
import Rete from "rete";
import { Droplet } from "../class";
import $ from "jquery";
import "./Grid.css";
import { GridDropletMenu } from "./GridDropletMenu";
import { AppContext } from "../App";
import { ContextDropletMenu } from "./ContextDropletMenu";
// import Heat from "../HeatOld/Heat";

const Grid = ({ style = {}, utils, setUtils }) => {

	useEffect(() => {
		const subArray = Array.from({ length: size }, () => 0);
		const gridArraytmp = Array.from({ length: size }, (_, n) => n + 1).map(() => [...subArray]);
		setGridArray(gridArraytmp);
	}, []);

	const { droplets, setDroplets, size, setGridArray } = useContext(AppContext);
	const cellClick = (cellObj, option) => {
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
			setGridArray((state) => {
				state[size - coords.y][coords.x - 1] = 1;
				console.log(size - coords.x, size - coords.y, state);
				return state;
			});
			if ((coordsPre[1] === 12 || coordsPre[1] === 13) && coordsPre[0] <= 4) {
				alert("Impossible de placer une goutte dans la zone chauffante ")
			}else{
				dataCell.append(droplet.draw());
			}
		}
	};
	return (
		<div className="grid-container" style={style}>
			<table id="droplet-grid">
				<tbody>
					{Array.from({ length: size }, (_, n) => size - n).map((trv, tri) => {
						return (
							<tr id={`tr_${trv}`} key={`tr_${trv}`}>
								{Array.from({ length: size }, (_, n) => n + 1).map((tdv) => {
									var a = <td id={`td_${tdv}_${trv}`} key={`td_${tdv}_${trv}`}
									style={{
										backgroundColor: (trv === 12 || trv === 13) && tdv <= 4
										? "salmon" : "white"
									}}></td>
									return a
									})}
							</tr>
						);
					})}
				</tbody>
			</table>
			<GridDropletMenu
				targetId={"droplet-grid"}
				options={[
					{ name: "Bleu", color: "blue" },
					{ name: "Jaune", color: "yellow" },
					{ name: "Rouge", color: "red" },
					{ name: "Vert", color: "green" },
					{ name: "Violet", color: "purple" },
					{ name: "Marron", color: "brown" },
					{ name: "Noir", color: "black" },
				]}
				itemClick={cellClick}
			/>
			<ContextDropletMenu targetId={"droplet-grid"} />
			

		</div>
	);
};

export default Grid;
