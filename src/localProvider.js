import React, { Component } from 'react';

const localProvider = (ComposedComponent) => {
    return class Provider extends Component {
        constructor(props) {
            super(props);
            this.saveToLocalUndo = this.saveToLocalUndo.bind(this);
            this.getLastState = this.getLastState.bind(this);
            this.states = [];
        }

        saveToLocalUndo(state) {
            if(this.states.length < 5) {
                this.states.unshift(state);
            } else {
                this.states.unshift(state);
                this.states.pop();
            }
        }

        getLastState() {
            const lastState = this.states[0];
            this.states.splice(0, 1);
            return lastState ;
        }

        render() {
            return (
                <ComposedComponent
                    {...this.props}
                    getLastState={this.getLastState}
                    saveToLocalUndo={this.saveToLocalUndo}
                />
            )
        }
    }
};



export default localProvider;
