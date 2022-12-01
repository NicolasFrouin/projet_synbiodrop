import React from "react";
import { Control } from "rete";

class FusionComponent extends React.Component {
	state = {};
	componentDidMount() {}
	onChange(event) {}
	render() {
		return <div></div>;
	}
}

export class FusionControl extends Control {
	constructor(emitter, id, context) {
		super(id);
		this.render = "react";
		this.component = FusionComponent;
		this.props = {
			emitter,
			id,
			context,
			putData: (key, value) => this.putData(key, value),
		};
	}
}
