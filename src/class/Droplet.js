import $ from "jquery";

export class Droplet {
	constructor(coords = { x: 0, y: 0 }, color = "#000000", size = 1) {
		this.x = coords.x;
		this.y = coords.y;
		this.color = color;
		this.temperature = null;
		this.size = size;
		this.group = null;
	}

	group(dropletGroup) {
		this.group = dropletGroup;
	}

	draw() {
		return `<div className='droplet' id='droplet_${this.x + "_" + this.y}' style='height:100%;width:100%;${
			this.color ? "background-color:" + this.color : ""
		}'></div>`;
	}

	move(coords) {
		if (!this.canMove(coords)) return false;
		const oldCoords = { x: this.x, y: this.y };
		const oldDataCell = $(`#td_${oldCoords.x + "_" + oldCoords.y}`);
		const newDataCell = $(`#td_${coords.x + "_" + coords.y}`);
		this.x = coords.x;
		this.y = coords.y;
		oldDataCell.empty();
		newDataCell.append(this.draw());
	}

	canMove(coords) {
		return $(`#td_${coords.x + "_" + coords.y}`).children().length == 0;
	}

	fusion(droplet) {}
}
