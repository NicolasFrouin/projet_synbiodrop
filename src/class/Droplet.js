export class Droplet {
	constructor(coords = { x: 0, y: 0 }, color = "#000000", size = 1) {
		this.x = coords.x;
		this.y = coords.y;
		this.color = color;
		this.temperature = null;
		this.size = size;
	}

	draw() {
		return (
			<div
				className="drolpet"
				style={{
					backgroundColor: this.getColor(),
					aspectRatio: "1/1",
				}}
			></div>
		);
	}

	getColor() {
		return this.color.substring(1);
	}

	move(coords) {
		this.x = coords.x;
		this.y = coords.y;
	}
}
