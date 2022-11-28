import "./App.css";
import ReteMain from "./Rete/ReteMain";
import Grid from "./Grid/Grid";
import Play from "./Play/Play";

function App() {
	return (
		<div className="App">
      <div
				style={{
					display: "flex",
					justifyContent: "space-between",
				}}
			>
				<ReteMain></ReteMain>
        <Play/>
				<Grid size={13}></Grid>
			</div>
		</div>
	);
}

export default App;
