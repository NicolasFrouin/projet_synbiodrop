import Rete from "rete";
import { SelectorControl } from "../Controls";
import { dropletSocket } from "../Sockets";

export class SelectorComponent extends Rete.Component {
	constructor() {
		super("Sélecteur");
	}

	builder(node) {
		var out = new Rete.Output("droplet", "Goutte", dropletSocket);
		var ctrl = new SelectorControl(this.editor, "greeting", "#username");
		return node.addOutput(out).addControl(ctrl);
	}

	worker(node, inputs, outputs) {
		console.log({ greeting: node.data.greeting, node, inputs, outputs });
	}
}
