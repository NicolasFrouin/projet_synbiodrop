import Rete from "rete";
import ReactRenderPlugin from "rete-react-render-plugin";
import ConnectionPlugin from "rete-connection-plugin";
import ContextMenuPlugin from "rete-context-menu-plugin";
import AreaPlugin from "rete-area-plugin";
import { MyNode } from "./Node";
import { MyControl } from "./Control";

var numSocket = new Rete.Socket("Number value");
class NumControl extends Rete.Control {
	static component = ({ value, onChange }) => (
	  <input
		type="number"
		value={value}
		ref={(ref) => {
		  ref && ref.addEventListener("pointerdown", (e) => e.stopPropagation());
		}}
		onChange={(e) => onChange(+e.target.value)}
	  />
	);
  
	constructor(emitter, key, node, readonly = false) {
	  super(key);
	  this.emitter = emitter;
	  this.key = key;
	  this.component = NumControl.component;
  
	  const initial = node.data[key] || 0;
  
	  node.data[key] = initial;
	  this.props = {
		readonly,
		value: initial,
		onChange: (v) => {
		  this.setValue(v);
		  this.emitter.trigger("process");
		}
	  };
	}
  
	setValue(val) {
	  this.props.value = val;
	  this.putData(this.key, val);
	  this.update();
	}
  }

class AddComponent extends Rete.Component {
	constructor() {
		super("Début");
	}

	builder(node) {
		var out = new Rete.Output("num", "Number", numSocket);
		var ctrl = new NumControl(this.editor, "numStart",node);
		return node.addOutput(out).addControl(ctrl);
	}

	worker(node, inputs, outputs) {
		outputs['num']=node.data.numStart;
		console.log("yes "+ node.data.numStart);
	}
}

class AddGoutte extends Rete.Component {
	constructor() {
		super("Goutte");
	}

	builder(node) {
		var out = new Rete.Output("key2", "Number", numSocket);
		//var ctrl = new MyControl(this.editor, "greeting", "Number value");
		var inp = new Rete.Input("key3", "Number", numSocket);
		return node.addInput(inp).addOutput(out);
	}
	worker(node, inputs, outputs) {
		nodeStartPosition(inputs['key3'],'red');
		console.log(inputs['key3']);
	}
}

class EndPosComponent extends Rete.Component {
	constructor() {
		super("Fin");
	}

	builder(node) {
		// var out = new Rete.Output("num", "Number", numSocket);
		// var ctrl = new MyControl(this.editor, "greeting", "#username");
		// return node.addInput(out).addControl(ctrl);
		node.addInput(new Rete.Input('key1', 'Number',numSocket));
		node.addControl(new NumControl(this.editor, "num", node));
		return node;
	}

	worker(node, inputs, outputs) {
		console.log("test" +node.data.num);
	}
}

export default async function (container) {
	console.log(container);
	var components = [new AddComponent(), 
		new EndPosComponent(),
		new AddGoutte()
	];

	var editor = new Rete.NodeEditor("demo@0.1.0", container);
	editor.use(ConnectionPlugin);
	editor.use(ReactRenderPlugin, {
		component: MyNode,
	});
	editor.use(ContextMenuPlugin);

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


// Fonction qui va set la couleut de l'element aux coordonnées saise
function nodeStartPosition(x,color){
	var cell = document.getElementsByTagName('td');
	//console.log(cell.length);
	for (var i=0; i<cell.length; i++) {
		//console.log(cell[i]);
		if(x == i){
		cell[i].style.backgroundColor = color;
		cell[i].onclick = function() {
		console.log("test node");
		}
	}
	}
}
