import "./App.css";
import ReteMain from "./Rete/ReteMain";
import Grid from "./Grid/Grid";

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
				<Grid size={13}></Grid>
			</div>
		</div>
	);
}

export default App;
