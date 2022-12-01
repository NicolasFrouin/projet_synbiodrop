import Rete from "rete";
import ReactRenderPlugin from "rete-react-render-plugin";
import ConnectionPlugin from "rete-connection-plugin";
import ContextMenuPlugin from "rete-context-menu-plugin";
import AreaPlugin from "rete-area-plugin";
import { AddComponent, MoveComponent, SelectorComponent,HeatComponent } from "./Components";
import { MyNode } from "./Nodes";

export default async function (container, context) {
	var components = [new AddComponent(), new SelectorComponent(context), new MoveComponent(context),new HeatComponent(context)];

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

	editor.on("process", async () => {
		await engine.abort();
		await engine.process(editor.toJSON());
		console.log("process", editor.toJSON());
	});

	// editor.fromJSON({
	// 	id: "demo@0.1.0",
	// 	nodes: {
	// 1: {
	// 	id: 1,
	// 	data: {},
	// 	inputs: { num1: { connections: [] } },
	// 	outputs: {
	// 		num: { connections: [{ node: 2, input: "num1", data: {} }] },
	// 	},
	// 	position: [-285.5, -105.375],
	// 	name: "Add",
	// },
	// 2: {
	// 	id: 2,
	// 	data: {},
	// 	inputs: {
	// 		num1: { connections: [{ node: 1, output: "num", data: {} }] },
	// 	},
	// 	outputs: { num: { connections: [] } },
	// 	position: [-16.5, -99.375],
	// 	name: "Add",
	// },
	// 	},
	// });

	editor.view.resize();
	AreaPlugin.zoomAt(editor);
	return { edit: editor, engi: engine };
}
