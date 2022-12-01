import $ from "jquery";
import c_c from "color-mixer";

export class DropletGroup {
	constructor() {
		this.droplets = [];
		this.color = "";
	}

	get x() {
		return Math.min(...this.droplets.map((d) => d.x));
	}

	get y() {
		return Math.max(...this.droplets.map((d) => d.y));
	}

	getCoords() {
		this.droplets.sort((a, b) => {
			if (a.x == b.x) {
				return a.y - b.y;
			} else {
				return a.x - b.x;
			}
		});
		return this.droplets.map((d) => [d.x, d.y]);
	}

	move(coords, gridArray) {
		this.droplets.forEach((d) => {
			let moveY = coords.y;
			if (d.x !== this.x || d.y !== this.y) {
				moveY -= 1;
			}
			d.move({ x: coords.x, y: moveY }, gridArray);
		});
	}

	add(droplet) {
		if (!Array.isArray(droplet)) droplet = [droplet];
		this.droplets = this.droplets.concat(droplet);
	}

	getColor() {
		const colors = [];
		this.droplets.forEach((drop, index) => {
			colors.push(new c_c.Color({ name: drop.color }));
		});
		return new c_c.Color({ mix: colors }).hex();
	}

	recolor() {
		const newColor = this.getColor();
		this.color = newColor;
		this.droplets.forEach((d) => {
			d.group(this);
			d.changeColor(this.color);
		});
	}

	remove(droplet) {
		const rm = this.droplets.findIndex((d) => d.x === droplet.x && d.y === droplet.y);
		return this.droplets.splice(rm, 1)[0];
	}
}
