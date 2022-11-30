import "./App.css";
import ReteMain from "./Rete/ReteMain";
import Grid from "./Grid/Grid";
import { useEffect, useState } from "react";
import { Droplet } from "./class";

function App() {
	const [droplets, setDroplets] = useState([]);
	const [utils, setUtils] = useState([]);
	
	useEffect(() => {
		const d = new Droplet();
		console.log(d);
	}, []);

	return (
		<div className="App">
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
				}}
			>
				<ReteMain></ReteMain>
				<Grid size={13} droplets={droplets} setDroplets={setDroplets}
				utils={utils} setUtils={setUtils}
				></Grid>
			</div>
		</div>
	);
}

export default App;
