import React from "react";
import { Control } from "rete";

class GroupMoveComponent extends React.Component {
	state = {};
	componentDidMount() {
		this.setState({
			posX: 2,
			posY: 2,
		});
		this.props.putData("posX", 2);
		this.props.putData("posY", 2);
	}
	onChange(event, pos) {
		let value = parseInt(event.target.value);
		if (value > this.props.context.size) value = this.props.context.size;
		if (pos === "x") {
			this.setState({ posX: value });
			this.props.putData("posX", value);
		} else if (pos === "y") {
			this.setState({ posY: value });
			this.props.putData("posY", value);
		}
		this.props.context.setEditor(this.props.emitter);
	}

	render() {
		return (
			<div style={{ display: "flex", flexDirection: "column" }}>
				<label htmlFor="inputX">
					<span>X</span>
					<input
						onChange={(e) => this.onChange(e, "x")}
						value={this.state.posX}
						type={"number"}
						min={1}
						max={this.props.context.size}
						id={"inputX"}
					/>
				</label>
				<label htmlFor="inputY">
					<span>Y</span>
					<input
						onChange={(e) => this.onChange(e, "y")}
						value={this.state.posY}
						type={"number"}
						min={1}
						max={this.props.context.size}
						id={"inputY"}
					/>
				</label>
			</div>
		);
	}
}

export class GroupMoveControl extends Control {
	constructor(emitter, id, context) {
		super(id);
		this.render = "react";
		this.component = GroupMoveComponent;
		this.props = {
			emitter,
			id,
			context,
			putData: (key, value) => this.putData(key, value),
		};
	}
}
