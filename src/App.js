import "./App.css";
import ReteMain from "./Rete/ReteMain";
import Grid from "./Grid/Grid";
import { createContext, useContext, useEffect, useState } from "react";
import { Droplet } from "./class";

export const AppContext = createContext();

function App() {
	const [droplets, setDroplets] = useState([]);
	const [editor, setEditor] = useState(null);

	useEffect(() => {}, []);

	const process = () => editor.trigger("process");

	return (
		<AppContext.Provider value={{ droplets, setDroplets, editor, setEditor }}>
			<div className="App">
				<div
					style={{
						display: "flex",
						justifyContent: "space-between",
					}}
				>
					{/* <ReteMain editor={editor} setEditor={setEditor}></ReteMain> */}
					<ReteMain></ReteMain>
					{editor != null && <button onClick={process}>Process</button>}
					<Grid size={13} droplets={droplets} setDroplets={setDroplets}></Grid>
				</div>
			</div>
		</AppContext.Provider>
	);
}

export default App;
