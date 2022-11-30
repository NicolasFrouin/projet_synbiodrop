import React, { useContext, useEffect, useState } from "react";
import { Control } from "rete";

class SelectorComponent extends React.Component {
	state = {};
	componentDidMount() {
		this.setState({
			name: this.props.name,
			context: this.props.context,
		});
		console.log({ props: this.props });
		this.props.putData(this.props.id, this.props.name);
	}
	onChange(event) {
		this.props.putData(this.props.id, event.target.value);
		this.props.emitter.trigger("process");
		this.setState({
			name: event.target.value,
		});
		console.log(this.state.context);
	}

	render() {
		return (<>
		<input value={this.state.name} type="text" list="data" onChange={this.onChange.bind(this)} />
					<datalist id="data">
 						{this.state.data.map((item, key) =>
      						<option key={1} value={item.color} />
    					)}
					</datalist>
		</>
					)
	}
}

export class SelectorControl extends Control {
	constructor(emitter, id, name, context) {
		super(id);
		this.render = "react";
		this.component = SelectorComponent;
		this.props = {
			emitter,
			id,
			name,
			context,
			putData: () => this.putData.apply(this, arguments),
		};
	}
}
