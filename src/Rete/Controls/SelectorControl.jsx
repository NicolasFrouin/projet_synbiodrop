import React, { useContext, useEffect, useState } from "react";
import { Control } from "rete";

class SelectorComponent extends React.Component {
	state = {};
	componentDidMount() {
		this.setState({
			context: this.props.context,
			id: this.props.id,
			value: 0,
			droplet: this.props.context.droplets,
		});
		this.props.putData(this.props.id, this.props.context.droplets[0]);
	}
	onChange(event) {
		// console.log(this.props.id, this.props.context.droplets[event.target?.value ?? 0]);
		this.props.putData(this.props.id, this.props.context.droplets[event.target?.value ?? 0]);
		this.props.emitter.trigger("process");
		// console.log({ event: event.target.value });
		this.setState({
			value: event.target.value,
			droplet: this.props.context.droplets[event.target?.value ?? 0],
		});
	}

	render() {
		// return <input onChange={this.onChange.bind(this)} />;
		// console.log({ state: this.state });
		return (
			<select value={this.state.value} onChange={this.onChange.bind(this)}>
				{this.props.context.droplets.map((v, i) => {
					return <option value={i}>{v.color}</option>;
				})}
			</select>
		);
	}
}

export class SelectorControl extends Control {
	constructor(emitter, id, context) {
		super(id);
		this.render = "react";
		this.component = SelectorComponent;
		this.props = {
			emitter,
			id,
			// value,
			context,
			putData: (key, value) => this.putData(key, value),
		};
	}
}
