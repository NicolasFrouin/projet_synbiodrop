import Rete from "rete";
import findPath from "../../Grid/Astar/Astar";
import { MoveControl, SelectorControl } from "../Controls";
import { dropletSocket } from "../Sockets";

export class MoveComponent extends Rete.Component {
	constructor(context) {
		super("Déplacer");
		this.context = context;
	}

	builder(node) {
		var input = new Rete.Input("dropletIn", "Goutte", dropletSocket);
		var ctrl = new MoveControl(this.editor, "position", this.context);
		console.log({ node });
		return node.addInput(input).addControl(ctrl);
	}

	worker(node, inputs, outputs) {
		const drop = inputs.dropletIn[0];
		const pathStart = [drop.x - 1, drop.y - 1];
		const pathEnd = [node.data.posX - 1, node.data.posY - 1];
		const path = findPath(this.context.gridArray, pathStart, pathEnd);
		let time = 200;
		path.forEach((element) => {
			setTimeout(() => {
				drop.move({ x: element[0] + 1, y: element[1] + 1 }, this.context.gridArray);
			}, time);
			time += 200;
		});
	}
}
