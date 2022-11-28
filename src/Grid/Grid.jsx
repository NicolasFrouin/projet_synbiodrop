import React from "react";
import { Droplet } from "../class";
import $ from "jquery";

const Grid = ({ size, droplets, setDroplets }) => {
	const createDroplet = (td) => {
		console.warn($(".grid-container"));
		setDroplets((state) => {
			state.push(new Droplet());
			return state;
		});
		console.warn({ droplets });
	};

	return (
		<div
			className="grid-container"
			style={{
				margin: "1rem",
			}}
		>
			<table
				style={{
					borderSpacing: 0,
					borderCollapse: "collapse",
				}}
			>
				<tbody>
					{Array.from({ length: size }).map(() => (
						<tr style={{}}>
							{Array.from({ length: size }).map(() => (
								<td
									style={{
										height: "2.5rem",
										width: "2.5rem",
										border: "solid 1px #16161d",
										padding: 0,
										margin: 0,
									}}
									onClick={() => createDroplet(this)}
								></td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Grid;
