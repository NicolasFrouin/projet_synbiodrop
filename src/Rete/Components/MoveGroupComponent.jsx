import Rete from "rete";
import { Common } from "../../class";
import findPath from "../../Grid/Astar/Astar";
import { MoveControl } from "../Controls";
import { groupDroplet } from "../Sockets";

export class MoveGroupComponent extends Rete.Component {
	constructor(context) {
		super("Déplacer Groupe");
		this.context = context;
		this.id = Math.random();
	}

	builder(node) {
		var input = new Rete.Input(this.id + "_dropletMoveIn", "Groupe de goutte", groupDroplet);
		var ctrl = new MoveControl(this.editor, this.id + "_position", this.context);
		return node.addInput(input).addControl(ctrl);
	}

	async worker(node, inputs, outputs) {
		console.log(arguments);
		const drop = inputs[this.id + "_dropletMoveIn"][0];
		const pathStart = [drop.x - 1, drop.y - 1];
		const pathEnd = [node.data.posX - 1, node.data.posY - 1];
		const path = findPath(this.context.gridArray, pathStart, pathEnd);
		for (const cell of path) {
			drop.move({ x: cell[0] + 1, y: cell[1] + 1 }, this.context.gridArray);
			await Common.delay(200);
		}
		outputs[this.id + "_dropletMoveOut"] = drop;
	}
}
