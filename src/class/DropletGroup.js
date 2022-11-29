import $ from "jquery";

export class DropletGroup {
	constructor() {
		this.droplets = [];
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

	move(coords) {}

	add(droplet) {
		this.droplets.push(droplet);
	}

	remove(droplet) {
		const rm = this.droplets.findIndex((d) => d.x === droplet.x && d.y === droplet.y);
		this.droplets.splice(rm, 1);
	}
}
