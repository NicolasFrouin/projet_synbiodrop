import Rete from "rete";
import { SelectorControl } from "../Controls";
import { dropletSocket } from "../Sockets";

export class SelectorComponent extends Rete.Component {
	constructor(context) {
		super("Sélecteur");
		this.context = context;
	}

	builder(node) {
		var out = new Rete.Output("droplet", "Goutte", dropletSocket);
		var ctrl = new SelectorControl(this.editor, "greeting", "", this.context);
		return node.addOutput(out).addControl(ctrl);
	}

	worker(node, inputs, outputs) {
		console.log("Test de val nodes ",node.data);
		outputs[0]=node.data.greeting;
		console.log({ greeting: node.data.greeting, node, inputs, outputs, context: this.context.droplets });
	}
}
