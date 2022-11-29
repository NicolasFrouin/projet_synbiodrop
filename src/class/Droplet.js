import $ from "jquery";

export class Droplet {
	constructor(coords = { x: 0, y: 0 }, color = "#000000", size = 1) {
		this.x = coords.x;
		this.y = coords.y;
		this.color = color;
		this.temperature = null;
		this.size = size;
	}

	draw() {
		return `<div className='droplet' id='droplet_${this.x + "_" + this.y}' style='height:100%;width:100%;${
			this.color ? "background-color:" + this.color : ""
		}'></div>`;
	}

	getColor() {
		return this.color.substring(1);
	}

	move(coords) {
		if (!this.canMove(coords)) return false;
		const oldCoords = { x: this.x, y: this.y };
		const oldDataCell = $(`#td_${oldCoords.x + "_" + oldCoords.y}`);
		const newDataCell = $(`#td_${coords.x + "_" + coords.y}`);
		console.log({ oldDataCell, newDataCell });
		this.x = coords.x;
		this.y = coords.y;
		oldDataCell.empty();
		newDataCell.append(this.draw());
	}

	canMove(coords) {
		const dataCellToMove = $(`#td_${coords.x + "_" + coords.y}`);
		return dataCellToMove.children().length == 0;
	}
}
