import Rete from "rete";
import { SelectorControl } from "../Controls";
import { dropletSocket } from "../Sockets";

export class DividerDropletComponent extends Rete.Component {
	constructor(context) {
		super("Diviser");
		this.context = context;
	}

	builder(node) {
		var input1 = new Rete.Input("droplet1","Goutte",dropletSocket);
		return node.addInput(input1);
	}

	worker(node, inputs, outputs) {
		// console.log({ node, inputs, outputs, context: this.context.droplets });
	}
}
