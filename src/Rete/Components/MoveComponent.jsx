import Rete from "rete";
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
		// console.log({ node, inputs, outputs, context: this.context.droplets });
		console.log({ x: node.data.posX, y: node.data.posY });
		const drop = inputs.dropletIn[0];
		drop.move({ x: node.data.posX, y: node.data.posY });
	}
}
