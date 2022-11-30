import React from "react";
import { Control } from "rete";

class SelectorComponent extends React.Component {
	state = {};
	componentDidMount() {
		this.setState({
			id: this.props.id,
			value: 0,
		});
		this.props.putData(this.props.id, this.props.context.droplets[0]);
		// this.props.context.setEditor(this.props.emitter);
	}
	onChange(event) {
		this.props.putData(this.props.id, this.props.context.droplets[event.target?.value ?? 0]);
		this.props.context.setEditor(this.props.emitter);
		this.setState({
			value: event.target.value,
			droplet: this.props.context.droplets[event.target?.value ?? 0],
		});
	}
	render() {
		return (
			<select value={this.state.value} onChange={this.onChange.bind(this)}>
				{this.props.context.droplets.map((v, i) => {
					return (
						<option value={i} key={i}>
							{v.color}
						</option>
					);
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
			context,
			putData: (key, value) => this.putData(key, value),
		};
	}
}
