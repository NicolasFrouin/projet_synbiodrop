import React, { useContext, useEffect, useState } from "react";
import { Control } from "rete";

class HeatComponent extends React.Component {
	state = {};
	componentDidMount() {
		this.setState({
			posX: 1,
			posY: 13,
		});
		this.props.putData("temperature", 0);
		this.props.putData("temps", 0);
		this.props.context.setEditor(this.props.emitter);
	}
	onChange(event, pos) {
		let value = parseInt(event.target.value);
		if (pos === "temperature") {
			this.setState({ temperature: value });
			this.props.putData("temperature", value);
		} else if (pos == "temps") {
			this.setState({ temps: value });
			this.props.putData("temps", value);
		}
		this.props.context.setEditor(this.props.emitter);
	}

	render() {
		return (
			<div style={{ display: "block", flexDirection: "column" }}>
				<label htmlFor="inputTemp">
					<span>Degrés</span>
					<input
						onChange={(e) => this.onChange(e, "temperature")}
						value={this.state.temperature}
						type={"number"}
						min={0}
						max={this.props.context.size}
						id={"inputTemp"}
					/>
				</label>
				<label htmlFor="inputTemps">
					<span>Temps</span>
					<input
						onChange={(e) => this.onChange(e, "temps")}
						value={this.state.temps}
						type={"number"}
						min={0}
						max={this.props.context.size}
						id={"inputTemps"}
					/>
				</label>
			</div>
		);
	}
}

export class HeatControl extends Control {
	constructor(emitter, id, context) {
		super(id);
		this.render = "react";
		this.component = HeatComponent;
		this.props = {
			emitter,
			id,
			context,
			putData: (key, value) => this.putData(key, value),
		};
	}
}
