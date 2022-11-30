export class Droplet {
	constructor(coords = { x: 0, y: 0 }, temperature = null) {
		this.x = coords.x;
		this.y = coords.y;
		this.color = "";
		this.temperature = temperature;
		this.size = 1;
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
