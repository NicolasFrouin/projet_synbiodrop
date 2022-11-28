import React from "react";

const Grid = ({ size }) => {
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
