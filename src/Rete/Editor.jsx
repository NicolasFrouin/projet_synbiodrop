import Rete from "rete";
import ReactRenderPlugin from "rete-react-render-plugin";
import ConnectionPlugin from "rete-connection-plugin";
import ContextMenuPlugin from "rete-context-menu-plugin";
import AreaPlugin from "rete-area-plugin";
import { FusionComponent, MoveComponent, SelectorComponent } from "./Components";
import { MyNode } from "./Nodes";
import HistoryPlugin from "rete-history-plugin";

export default async function (container, context) {
	var components = [new SelectorComponent(context), new MoveComponent(context), new FusionComponent(context)];

	var editor = new Rete.NodeEditor("demo@0.1.0", container);

	editor.use(HistoryPlugin, { keyboard: true });
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
	});

	editor.view.resize();
	AreaPlugin.zoomAt(editor);
	return { edit: editor, engi: engine };
}
