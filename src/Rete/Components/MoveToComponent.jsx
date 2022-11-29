import Rete from "rete";
import { MyControl } from "../Controls";
import { dropletSocket } from "../Sockets";
var numSocket = new Rete.Socket("Number value");

export class MoveToComponent extends Rete.Component {
	constructor() {
		super("Déplacer");
	}

	builder(node) {
        var inp = new Rete.Input("droplet","Goutte",dropletSocket);
		var ctrl = new MyControl(this.editor, "grenumSocketeting", "#username");
		return node.addControl(ctrl).addInput(inp);
	}

	worker(node, inputs, outputs) {
		inputs[0].move(node.data.grenumSocketeting);
		console.log({ greeting: node.data.grenumSocketeting, node, inputs, outputs });
	}
}
