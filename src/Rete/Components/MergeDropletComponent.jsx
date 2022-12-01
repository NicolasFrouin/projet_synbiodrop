import Rete from "rete";
import { SelectorControl } from "../Controls";
import { dropletSocket } from "../Sockets";

export class MergeDropletComponent extends Rete.Component {
	constructor(context) {
		super("Fusionner");
		this.context = context;
	}

	builder(node) {
		var input1 = new Rete.Input("droplet1","Goutte",dropletSocket);
		var input2 = new Rete.Input("droplet2","Goutte",dropletSocket);
		return node.addInput(input1).addInput(input2);
	}

	worker(node, inputs, outputs) {
		// console.log({ node, inputs, outputs, context: this.context.droplets });
		const drop1 =  inputs.droplet1[0];
		const drop2 =  inputs.droplet2[0];
		console.log("Contenu de drop1",drop1);
		console.log("Contenu de drop2",drop2);
		drop1.move({ x: drop2.x + 1, y: drop2.y + 1 });

	}
}
