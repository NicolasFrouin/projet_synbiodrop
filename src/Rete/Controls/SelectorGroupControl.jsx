import React from "react";
import { Control } from "rete";

class SelectorGroupComponent extends React.Component {
	state = {};
	componentDidMount() {
		this.setState({
			id: this.props.id,
			value: 0,
		});
		this.props.putData(this.props.id, this.props.context.dropletsGroups[0]);
		// this.props.context.setEditor(this.props.emitter);
	}
	onChange(event) {
		this.props.putData(this.props.id, this.props.context.dropletsGroups[event.target?.value ?? 0]);
		this.props.context.setEditor(this.props.emitter);
		this.setState({
			value: event.target.value,
			droplet: this.props.context.dropletsGroups[event.target?.value ?? 0],
		});
	}
	render() {
		return (
			<select value={this.state.value} onChange={this.onChange.bind(this)}>
				{this.props.context.dropletsGroups.map((v, i) => {
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

export class SelectorGroupControl extends Control {
	constructor(emitter, id, context) {
		super(id);
		this.render = "react";
		this.component = SelectorGroupComponent;
		this.props = {
			emitter,
			id,
			context,
			putData: (key, value) => this.putData(key, value),
		};
	}
}
