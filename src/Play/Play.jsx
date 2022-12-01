import "./Play.css";
const Moving=()=>{
	var x = document.getElementById('fin')
	var cell = document.getElementsByTagName('td');
	//console.log(cell.length);
	for (var i=0; i<cell.length; i++) {
		//console.log(cell[i]);
		if(x === i){
		cell[i].style.backgroundColor = 'red';
		cell[i].onclick = function() {
		console.log(x);
		}
	}
	}
}
function Play() {
	return (
		<div className="Play">
			<button className="ButtonPlay" onClick={Moving}>Play</button>
		</div>
	);
}

export default Play;
