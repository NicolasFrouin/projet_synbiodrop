import "./App.css";
import ReteMain from "./Rete/ReteMain";
import Grid from "./Grid/Grid";
import { createContext, useContext, useEffect, useState } from "react";
import { Droplet } from "./class";

export const AppContext = createContext();

function App() {
	const [dropletsGroups, setDropletsGroups] = useState([]);
	const [droplets, setDroplets] = useState([]);
	const [editor, setEditor] = useState(null);
	const [engine, setEngine] = useState(null);
	const [size, setSize] = useState(13);
	const [gridArray, setGridArray] = useState([]);

	useEffect(() => {}, []);

	const process = () => {
		editor.trigger("process");
		console.log(editor.toJSON().nodes);
	};

	const stop = () => {
		engine.abort();
	};

	return (
		<AppContext.Provider
			value={{
				dropletsGroups,
				setDropletsGroups,
				droplets,
				setDroplets,
				editor,
				setEditor,
				engine,
				setEngine,
				size,
				setSize,
				gridArray,
				setGridArray,
			}}
		>
			<div className="App">
				<div
					style={{
						display: "flex",
						// justifyContent: "space-between",
						gap: "2rem",
					}}
				>
					<ReteMain
						style={{
							textAlign: "center",
							width: "60%",
							height: "95vh",
							border: "solid #6c0277 1px",
							margin: "1rem",
							display: "flex",
							flexDirection: "column",
						}}
					></ReteMain>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						{editor != null && (
							<div
								style={{
									// border: "solid yellow 1px",
									display: "flex",
									gap: "5rem",
									justifyContent: "center",
									alignItems: "center",
									marginBlock: "3rem",
									height: "3rem",
									width: "75%",
								}}
							>
								<button
									onClick={process}
									style={{
										backgroundColor: "green",
										height: "100%",
										flex: 1,
									}}
								>
									Exécuter
								</button>
								<button
									onClick={stop}
									style={{
										backgroundColor: "red",
										height: "100%",
										flex: 1,
									}}
								>
									Stop
								</button>
							</div>
						)}
						<Grid style={{}}></Grid>
					</div>
				</div>
			</div>
		</AppContext.Provider>
	);
}

export default App;
