import $ from "jquery";
import c_c from "color-mixer"
// import c
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

	move(coords) {
		
	}

	add(droplet) {
		if (typeof droplet !== "array") droplet = [droplet];
		this.droplets.concat(droplet);
	}

	getColor(){
		const colors= []
		this.droplets.forEach((drop, index) => {
			console.log({drop: drop.color});
			colors.push(new c_c.Color({name: drop.color}));
        });
		const col = new c_c.Color({mix:colors});
		console.log({col});
		return col.hex();
	}

	recolor(){
		const newColor = this.getColor();
		console.log({newColor});
		this.droplets.forEach((d) => {
            d.recolor(newColor);
        });
	}

	remove(droplet) {
		const rm = this.droplets.findIndex((d) => d.x === droplet.x && d.y === droplet.y);
		this.droplets.splice(rm, 1);
	}
}
