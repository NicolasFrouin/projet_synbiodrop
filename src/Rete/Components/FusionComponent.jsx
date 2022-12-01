import Rete from "rete";
import { Common } from "../../class";
import findPath from "../../Grid/Astar/Astar";
import { FusionControl, MoveControl } from "../Controls";
import { dropletSocket, groupDroplet } from "../Sockets";
import { DropletGroup } from "../../class";
export class FusionComponent extends Rete.Component {
	constructor(context) {
		super("Fusion");
		this.context = context;
	}

	builder(node) {
		var input1 = new Rete.Input("dropIn1", "Goutte 1", dropletSocket);
		var input2 = new Rete.Input("dropIn2", "Goutte 2", dropletSocket);
		var ctrl = new FusionControl(this.editor, "position", this.context);
		var out = new Rete.Output("groupOut", "Groupe", groupDroplet);
		return node.addInput(input1).addInput(input2).addOutput(out).addControl(ctrl);
	}

	async worker(node, inputs, outputs) {
		const drop1 = inputs.dropIn1[0];
		const drop2 = inputs.dropIn2[0];
		const groupDropletElement = new DropletGroup();
		let path;
		if (this.context.gridArray[drop2.x - 1][drop2.y] == 0) {
			path = findPath(this.context.gridArray, [drop1.x - 1, drop1.y - 1], [drop2.x - 1, drop2.y], false);
		} else {
			path = findPath(this.context.gridArray, [drop1.x - 1, drop1.y - 1], [drop2.x - 1, drop2.y - 2], false);
		}
		for (const cell of path) {
			drop1.move({ x: cell[0] + 1, y: cell[1] + 1 }, this.context.gridArray);
			await Common.delay(200);
		}
		groupDropletElement.add([drop1, drop2]);
		groupDropletElement.recolor();
		outputs["groupOut"] = groupDropletElement;
	}
}
