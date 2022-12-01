import Rete from "rete";
import { Common } from "../../class";
import findPath from "../../Grid/Astar/Astar";
import { GroupMoveControl } from "../Controls";
import { groupDroplet } from "../Sockets";

export class GroupMoveComponent extends Rete.Component {
	constructor(context) {
		super("Déplacer Groupe");
		this.context = context;
	}

	builder(node) {
		var input = new Rete.Input("groupMoveIn", "Groupe", groupDroplet);
		var ctrl = new GroupMoveControl(this.editor, "position", this.context);
		var out = new Rete.Output("groupMoveOut", "Groupe", groupDroplet);
		return node.addInput(input).addControl(ctrl).addOutput(out);
	}

	async worker(node, inputs, outputs) {
		console.log(arguments);
		const group = inputs["groupMoveIn"][0];
		const pathStart = [group.x - 1, group.y - 1];
		const pathEnd = [node.data.posX - 1, node.data.posY - 1];
		const path = findPath(this.context.gridArray, pathStart, pathEnd, false);
		console.log({ path });
		for (const cell of path) {
			group.move({ x: cell[0] + 1, y: cell[1] + 1 }, this.context.gridArray);
			await Common.delay(200);
		}
		outputs["groupMoveOut"] = group;
	}
}
