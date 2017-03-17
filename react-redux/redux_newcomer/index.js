/**
 * Created by Administrator on 2017/3/14 0014.
 */
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'


class Counter extends Component {
    render() {
        const { value, onIncrement, onDecrement } = this.props;
        return (
            <p>
                Clicked: {value} times
                <button onClick={onIncrement}>
                    +
                </button>
                <button onClick={onDecrement}>
                    -
                </button>
            </p>
        )
    }
}
Counter.propTypes = {
    value: PropTypes.number.isRequired,
    onIncrement: PropTypes.func.isRequired,
    onDecrement: PropTypes.func.isRequired
}

let counter = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT': return state + 1;
        case 'DISCREMENT': return state - 1;
        default: return state;
    }
}
const store = createStore(counter);

const render = () => {
    ReactDOM.render(
        <Counter
            value = {store.getState()}
            onIncrement = { () => store.dispatch({type: 'INCREMENT'})}
            onDecrement = { () => store.dispatch({type: 'DISCREMENT'})}
        ></Counter>,
        document.getElementById("root")
    )
};

render();
store.subscribe(render);
