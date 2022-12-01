import Rete from "rete";
import { Common } from "../../class";
import findPath from "../../Grid/Astar/Astar";
import { HeatControl, SelectorControl } from "../Controls";
import { dropletSocket, heatSocket } from "../Sockets";

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
		// const pathStart = [drop.x - 1, drop.y - 1];
		// const pathEnd = [1, 12];
		// console.log(dropCoords);
		var path = findPath(this.context.gridArray, [drop.x - 1, drop.y - 1], [1, 12]);
		// const retour = findPath(this.context.gridArray, pathEnd, pathStart);
		// console.log({ node, inputs, outputs, context: this.context.droplets });
		let time = 200;
		const temps = node.data["temps"];
		const temperature = node.data["temperature"];
		// path.forEach((element) => {
		// 	setTimeout(() => {
		// 		drop.move({ x: element[0] + 1, y: element[1] + 1 });
		// 	}, time);
		// 	time += 200;
		// });
		for (const cell of path) {
			drop.move({ x: cell[0] + 1, y: cell[1] + 1 }, this.context.gridArray);
			await Common.delay(200);
		}
		await Common.delay(temps * 1000);
		// inputs.dropletIn[0].temperature = node.data.temperature;
		// inputs.dropletIn[0].temps = node.data.temps;
		// let time2 = 200;
		// var heatTime = temps * 1000;

		drop.temperature = temperature;

		// setTimeout(
		// 	() =>
		// 		retour.forEach((element) => {
		// 			setTimeout(() => {
		// 				drop.move({ x: element[0] + 1, y: element[1] + 1 });
		// 			}, time2);
		// 			time2 += 200;
		// 		}),
		// 	heatTime
		// );
		var path = findPath(this.context.gridArray, [drop.x - 1, drop.y - 1], [dropCoords.x, dropCoords.y]);

		for (const cell of path) {
			drop.move({ x: cell[0] + 1, y: cell[1] + 1 }, this.context.gridArray);
			await Common.delay(200);
		}
		outputs["dropletHeatOut"] = drop;
	}
}
