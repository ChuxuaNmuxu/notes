/**
 * Created by Administrator on 2017/3/15 0015.
 */
import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'

const bindEach  = (state = [], action) => {
    debugger
    switch (action.type) {
        case 'bind':
            return action.value;
            break;
        default:
            return state;
    }
};



const store = createStore(bindEach);

class Bind extends Component {
    onChangeHandle(e) {
        debugger
        let action = {
            type: 'bind',
            value: e.target.value
        };
        store.dispatch(action);
    }
    render() {
        return <div>
            <input type="text" onChange={this.onChangeHandle}/>
            <p>{store.getState()}</p>
        </div>
    }
};

const render = () => {
    ReactDOM.render(<Bind></Bind>, document.getElementById('root'));
};
render();
store.subscribe(render);



