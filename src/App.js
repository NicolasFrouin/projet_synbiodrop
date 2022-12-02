import "./App.css";
import ReteMain from "./Rete/ReteMain";
import Grid from "./Grid/Grid";
import { createContext, useEffect, useState } from "react";
import { MdPlayArrow } from "react-icons/md";

export const AppContext = createContext();

function App() {
	const [dropletsGroups, setDropletsGroups] = useState([]);
	const [droplets, setDroplets] = useState([]);
	const [editor, setEditor] = useState(null);
	const [engine, setEngine] = useState(null);
	const [size, setSize] = useState(13);
	const [gridArray, setGridArray] = useState([]);
	const [utils, setUtils] = useState([]);

	useEffect(() => {}, []);

	const process = () => {
		editor.trigger("process", { action: "process" });
	};

	const stop = () => {
		editor.trigger("process", { action: "abort" });
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
						backgroundColor: "#f3f5fa",
						height: "100vh",
					}}
				>
					<ReteMain
						style={{
							textAlign: "center",
							width: "60%",
							height: "95vh",
							display: "flex",
							flexDirection: "column",
							position: "relative",
						}}
					></ReteMain>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							backgroundColor: "white",
							width: "45%",
							boxShadow: "rgba(0, 0, 0, 0.2) 0px 20px 30px",
						}}
					>
						<div style={{ display: "grid", justifyItems: "center", margin: "auto" }}>
							{editor != null && (
								<div
									style={{
										display: "flex",
										gap: "5rem",
										justifyContent: "center",
										alignItems: "center",
										marginBlock: "3rem",
										height: "2rem",
										width: "30%",
									}}
								>
									<MdPlayArrow
										className="start"
										onClick={process}
										style={{
											backgroundColor: "green",
											height: "100%",
											flex: 1,
										}}
									></MdPlayArrow>
									{/* <Heat /> */}
								</div>
							)}
							<Grid style={{}} utils={utils} setUtils={setUtils}></Grid>
						</div>
					</div>
				</div>
			</div>
		</AppContext.Provider>
	);
}

export default App;
