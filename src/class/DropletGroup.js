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

	add(droplets) {
		if (!Array.isArray(droplets)) droplets = [droplets];
		this.droplets.concat(droplets);
	}

	remove(droplet) {
		const rm = this.droplets.findIndex((d) => d.x === droplet.x && d.y === droplet.y);
		return this.droplets.splice(rm, 1)[0];
	}
}
