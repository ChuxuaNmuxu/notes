import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'


const StatelessComponent = ({value}) => {
    return (
            <div>
                <ul>
                    <li >{value}</li>
                </ul>
            </div>
        )

}

// React component
class Counter extends Component {
    constructor(props) {
        super(props);
        console.log(this);
        this.state = {red: 'red'}
        // this.toString = this.toString.bind(this);
    }

    onFocus() {
        this.refs.myInput.getDOMNode().focus();
    }
    render() {
        const { value, onIncreaseClick } = this.props;
        return (
            <div>
                <input type="text" ref="myInput"/>
                <button onClick={() => this.onFocus()}>{this.state.red}</button>
                <StatelessComponent value={this.state.red} title="statelessComponent"></StatelessComponent>
            </div>
        )
    }
}



Counter.propTypes = {
    value: PropTypes.number.isRequired,
    onIncreaseClick: PropTypes.func.isRequired
}

// Action
const increaseAction = { type: 'increase' }

// Reducer
function counter(state = { count: 0 }, action) {
    const count = state.count
    switch (action.type) {
        case 'increase':
            return { count: count + 1 }
        default:
            return state
    }
}

// Store
const store = createStore(counter)

// Map Redux state to component props
function mapStateToProps(state) {
    return {
        value: state.count
    }
}

// Map Redux actions to component props
// function mapDispatchToProps(dispatch) {
//     return {
//         onIncreaseClick: () => dispatch(increaseAction)
//     }
// }

// Connected Component
const App = connect(
    mapStateToProps
)(Counter)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)