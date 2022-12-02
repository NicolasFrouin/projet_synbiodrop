import Rete from "rete";
import { Common } from "../../class";
import findPath from "../../Grid/Astar/Astar";
import { HeatControl } from "../Controls";
import { dropletSocket } from "../Sockets";

export class HeatComponent extends Rete.Component {
	constructor(context) {
		super("Chauffer");
		this.context = context;
	}

	builder(node) {
		var input = new Rete.Input("dropletIn", "Goutte", dropletSocket);
		var ctrl = new HeatControl(this.editor, "chauffage", this.context);
		var out = new Rete.Output("dropletHeatOut", "Goutte", dropletSocket);
		return node.addInput(input).addControl(ctrl).addOutput(out);
	}

	async worker(node, inputs, outputs) {
		const drop = inputs.dropletIn[0];
		const dropCoords = { x: drop.x, y: drop.y };
		var path = findPath(this.context.gridArray, [drop.x - 1, drop.y - 1], [1, 12]);
		let time = 200;
		const temps = node.data["temps"];
		const temperature = node.data["temperature"];
		for (const cell of path) {
			drop.move({ x: cell[0] + 1, y: cell[1] + 1 }, this.context.gridArray);
			await Common.delay(200);
		}
		await Common.delay(temps * 1000);
		drop.temperature = temperature;
		var path = findPath(this.context.gridArray, [drop.x - 1, drop.y - 1], [dropCoords.x, dropCoords.y]);
		for (const cell of path) {
			drop.move({ x: cell[0] + 1, y: cell[1] + 1 }, this.context.gridArray);
			await Common.delay(200);
		}
		outputs["dropletHeatOut"] = drop;
	}
}
