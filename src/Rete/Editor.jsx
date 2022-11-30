import Rete from "rete";
import ReactRenderPlugin from "rete-react-render-plugin";
import ConnectionPlugin from "rete-connection-plugin";
import ContextMenuPlugin from "rete-context-menu-plugin";
import AreaPlugin from "rete-area-plugin";
import { MyNode } from "./Node";
import { MyControl } from "./Control";
import myNodes from '../index'
import HistoryPlugin from 'rete-history-plugin';

var numSocket = new Rete.Socket("Number value");


class ColorComponent extends Rete.Component {
	constructor() {
		super("Color");
	}

	builder(node) {
		console.log("création de la node")
		var out = new Rete.Output("color", "Color", numSocket);
		var ctrl = new MyControl(this.editor, "colorName");
		console.log("node créée")
		return node.addControl(ctrl).addOutput(out);
	}
	// builder(node) {
	// 	var inp = new Rete.Input("num1", "Number", numSocket);
	// 	var out = new Rete.Output("num", "Number", numSocket);
	// 	var ctrl = new MyControl(this.editor, "greeting", "#username");
	// 	console.log('build node');
	// 	return node.addInput(inp).addOutput(out).addControl(ctrl);
	// }

	worker(node, inputs, outputs) {
		// console.log(node.data.greeting);
		// console.log(inputs);
		// console.log(outputs);
		// this.editor.removeNode(node);
		console.log("entrée de worker");
		myNodes.push(node);
		console.log(myNodes);
		console.log("sortie de worker");
		// this.editor.trigger('undo');
		// this.editor.trigger('redo');
		console.log("try");
		console.log(node.id);
		console.log(node);
		console.log('-------------------------- end --------------------------')
		// console.log(this.editor.on('nodeselect', () => { }))
	}
}

class AddComponent extends Rete.Component {
	constructor() {
		super("Add");
	}

	builder(node) {
		console.log("création de add")
		var out = new Rete.Input("add", "Add", numSocket);
		var ctrl = new MyControl(this.editor, "addName");
		console.log("add créé")
		return node.addControl(ctrl).addOutput(out);
	}
	// builder(node) {
	// 	var inp = new Rete.Input("num1", "Number", numSocket);
	// 	var out = new Rete.Output("num", "Number", numSocket);
	// 	var ctrl = new MyControl(this.editor, "greeting", "#username");
	// 	console.log('build node');
	// 	return node.addInput(inp).addOutput(out).addControl(ctrl);
	// }

	worker(node, inputs, outputs) {
		// console.log(node.data.greeting);
		// console.log(inputs);
		// console.log(outputs);
		// this.editor.removeNode(node);
		console.log("entrée de worker");
		myNodes.push(node);
		console.log(myNodes);
		console.log("sortie de worker");
		console.log("try");
		console.log(node.id);
		console.log(node);
		this.editor.selected.remove(node);
		console.log(node);
		console.log(inputs);
		console.log(outputs);
		if (node.id === 1) {
			console.log("success")
			// console.log(node);
			// console.log(this.editor.node)
			// this.editor.addNode(node)
			this.addItem('Delete', ({ node }) => {
				if (this.editor.selected.list.indexOf(node) !== -1) {
					this.editor.selected.remove(node);
				}

				this.editor.removeNode(node);
			});
		}
		console.log('-------------------------- end --------------------------')
		// console.log(this.editor.on('nodeselect', () => { }))
	}
}

export default async function (container) {
	console.log(container);
	var components = [new ColorComponent(), new AddComponent()];

	var editor = new Rete.NodeEditor("demo@0.1.0", container);
	editor.use(ConnectionPlugin);
	editor.use(ReactRenderPlugin, {
		component: MyNode,
	});
	editor.use(ContextMenuPlugin);
	editor.use(HistoryPlugin, { keyboard: true });

	var engine = new Rete.Engine("demo@0.1.0");

	components.map((c) => {
		editor.register(c);
		engine.register(c);
	});

	editor.on("process nodecreated noderemoved connectioncreated connectionremoved", async () => {
		console.log("process");
		await engine.abort();
		await engine.process(editor.toJSON());
	});

	// editor.fromJSON({
	// 	id: "demo@0.1.0",
	// 	nodes: {
	// 		1: {
	// 			id: 1,
	// 			data: {},
	// 			inputs: { num1: { connections: [] } },
	// 			outputs: {
	// 				num: { connections: [{ node: 2, input: "num1", data: {} }] },
	// 			},
	// 			position: [-285.5, -105.375],
	// 			name: "Add",
	// 		},
	// 		2: {
	// 			id: 2,
	// 			data: {},
	// 			inputs: {
	// 				num1: { connections: [{ node: 1, output: "num", data: {} }] },
	// 			},
	// 			outputs: { num: { connections: [] } },
	// 			position: [-16.5, -99.375],
	// 			name: "Add",
	// 		},
	// 	},
	// });

	editor.view.resize();
	AreaPlugin.zoomAt(editor);
	editor.trigger("process");
}
