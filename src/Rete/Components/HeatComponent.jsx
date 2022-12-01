import Rete from "rete";
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
		return node.addInput(input).addControl(ctrl);
	}

	worker(node, inputs, outputs) {
		const drop = inputs.dropletIn[0];
        const dropCoords = {x: drop.x, y: drop.y}
		const pathStart = [drop.x - 1, drop.y - 1];
		const pathEnd = [0, 12];
		// console.log(dropCoords);
		const path = findPath(this.context.gridArray, pathStart, pathEnd);
        const retour = findPath(this.context.gridArray, pathEnd , pathStart);
		// console.log({ node, inputs, outputs, context: this.context.droplets });
        let time = 200;
        var temps = node.data.temps;
        var temperature = node.data.temperature;
		path.forEach(element => {
			setTimeout(() => {
				drop.move({ x: element[0] + 1, y: element[1] + 1 });
			}, time)
			time += 200;
		});
        inputs.dropletIn[0].temperature = node.data.temperature;
        inputs.dropletIn[0].temps = node.data.temps;
        let time2 = 200;
        var heatTime = temps*1000;

        setTimeout(() => retour.forEach(element => {
			setTimeout(() => {
				drop.move({ x: element[0] + 1, y: element[1] + 1 });
			}, time2)
			time2 += 200;
		}), heatTime);

	}
}
