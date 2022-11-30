import Rete from "rete";
import { Common } from "../../class";
import findPath from "../../Grid/Astar/Astar";
import { FusionControl, MoveControl } from "../Controls";
import { dropletSocket } from "../Sockets";

export class FusionComponent extends Rete.Component {
	constructor(context) {
		super("Fusion");
		this.context = context;
	}

	builder(node) {
		var input1 = new Rete.Input("dropIn1", "Goutte 1", dropletSocket);
		var input2 = new Rete.Input("dropIn2", "Goutte 2", dropletSocket);
		var ctrl = new FusionControl(this.editor, "position", this.context);
		var out = new Rete.Output("dropOut", "Goutte", dropletSocket);
		return node.addInput(input1).addInput(input2).addOutput(out);
	}

	async worker(node, inputs, outputs) {
		outputs["dropOut"] = inputs["dropIn2"][0];
		console.log(arguments);
	}
}
