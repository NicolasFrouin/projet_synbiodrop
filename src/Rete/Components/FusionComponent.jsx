import Rete from "rete";
import { Common } from "../../class";
import findPath from "../../Grid/Astar/Astar";
import { FusionControl, MoveControl } from "../Controls";
import { dropletSocket,groupDroplet } from "../Sockets";
import { DropletGroup } from "../../class";
export class FusionComponent extends Rete.Component {
	constructor(context) {
		super("Fusion");
		this.context = context;
	}

	builder(node) {
		var input1 = new Rete.Input("dropIn1", "Goutte 1", dropletSocket);
		var input2 = new Rete.Input("dropIn2", "Goutte 2", dropletSocket);
		//var ctrl = new FusionControl(this.editor, "position", this.context);
		var out = new Rete.Output("GroupdropOut", "Grouppe de Goutte", groupDroplet);
		this.context.setEditor(this.editor);
		return node.addInput(input1).addInput(input2).addOutput(out);
	}

	async worker(node, inputs, outputs) {
		const drop1 = inputs.dropIn1[0];
		const drop2 = inputs.dropIn2[0];
		const groupDropletElement = new DropletGroup();
		console.log(drop1, drop2);
		const path = findPath(this.context.gridArray, [drop1.x,drop1.y], [drop2.x,drop2.y], false);
		console.log(path);
		 for (const cell of path) {
			drop1.move({ x: cell[0] + 1, y: cell[1] + 1 }, this.context.gridArray);
			 await Common.delay(200);
		 }
		console.log("Drop 1",drop1,"Drop2",drop2);
		groupDropletElement.add([drop1, drop2]);
		outputs["dropOut"] = groupDropletElement;
		groupDropletElement.recolor();
		console.log(groupDropletElement);
		console.log("hey");
	}
}
