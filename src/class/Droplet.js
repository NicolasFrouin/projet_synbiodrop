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
		this.x = coords.x;
		this.y = coords.y;
	}
}
