import React from "react";
import { Control } from "rete";

class NumControlRete extends Control {
	static component = ({ value, onChange }) => (
	  <input
		type="number"
		value={value}
		ref={(ref) => {
		  ref && ref.addEventListener("pointerdown", (e) => e.stopPropagation());
		}}
		onChange={(e) => onChange(+e.target.value)}
	  />
	);
  
	setValue(val) {
	  this.props.value = val;
	  this.putData(this.key, val);
	  this.update();
	}
  }

  export class NumControl extends Control {
	constructor(emitter, key, node, readonly = false) {
        super(key);
        this.emitter = emitter;
        this.key = key;
        this.component = NumControlRete.component;
    
        const initial = node.data[key] || 0;
    
        node.data[key] = initial;
        this.props = {
          readonly,
          value: initial,
          onChange: (v) => {
            this.setValue(v);
            this.emitter.trigger("process");
          }
        };
      }
}