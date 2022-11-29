import React, { useContext, useEffect, useState } from "react";
import { Control } from "rete";

class MoveComponent extends React.Component {
	state = {};
	componentDidMount() {
		this.setState({
			posX: 1,
			posY: 1,
		});
		this.props.putData("posX", 1);
		this.props.putData("posY", 1);
	}
	onChange(event, pos) {
		const value = parseInt(event.target.value);
		if (pos == "x") {
			this.setState({ posX: value });
			this.props.putData("posX", value);
		} else if (pos == "y") {
			this.setState({ posY: value });
			this.props.putData("posY", value);
		}
		this.props.emitter.trigger("process");
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
						id={"inputY"}
					/>
				</label>
			</div>
		);
		console.log({ state: this.state });
		return (
			<select value={this.state.value} onChange={this.onChange.bind(this)}>
				{this.props.context.droplets.map((v, i) => {
					return <option value={i}>{v.color}</option>;
				})}
			</select>
		);
	}
}

export class MoveControl extends Control {
	constructor(emitter, id, context) {
		super(id);
		this.render = "react";
		this.component = MoveComponent;
		this.props = {
			emitter,
			id,
			// value,
			context,
			putData: (key, value) => this.putData(key, value),
		};
	}
}
