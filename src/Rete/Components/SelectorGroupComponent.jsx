import Rete from "rete";
import { SelectorGroupControl } from "../Controls";
import { groupDroplet } from "../Sockets";

export class SelectorGroupComponent extends Rete.Component {
	constructor(context) {
		super("Sélecteur de groupe");
		this.context = context;
	}

	builder(node) {
		var out = new Rete.Output("dropletSelectorOut", "Groupe de goutte", groupDroplet);
		var ctrl = new SelectorGroupControl(this.editor, "droplet", this.context);
		//this.context.setEditor(this.editor);
		return node.addOutput(out).addControl(ctrl);
	}

	worker(node, inputs, outputs) {
		outputs["dropletSelectorOut"] = node.data?.droplet;
		// console.log({ node, inputs, outputs, context: this.context.droplets });
	}
}
