import Rete from "rete";
import { Common } from "../../class";
import findPath from "../../Grid/Astar/Astar";
import { MoveControl } from "../Controls";
import { dropletSocket } from "../Sockets";
import { heatSocket } from "../Sockets";

export class MoveComponent extends Rete.Component {
	constructor(context) {
		super("Déplacer");
		this.context = context;
	}

	builder(node) {
		var input = new Rete.Input("dropletMoveIn", "Goutte", dropletSocket);
		var ctrl = new MoveControl(this.editor, "position", this.context);
		var out = new Rete.Output("dropletMoveOut", "Goutte", dropletSocket);
		return node.addInput(input).addControl(ctrl).addOutput(out);
	}

	async worker(node, inputs, outputs) {
		console.log(arguments);
		const drop = inputs["dropletMoveIn"][0];
		const pathStart = [drop.x - 1, drop.y - 1];
		const pathEnd = [node.data.posX - 1, node.data.posY - 1];
		const path = findPath(this.context.gridArray, pathStart, pathEnd);
		for (const cell of path) {
			drop.move({ x: cell[0] + 1, y: cell[1] + 1 }, this.context.gridArray);
			await Common.delay(200);
		}
		outputs["dropletMoveOut"] = drop;
	}
}
