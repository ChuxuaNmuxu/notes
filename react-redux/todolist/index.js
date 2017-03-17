/**
 * Created by Administrator on 2017/3/16 0016.
 */
import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App'
import todoApp from './reducers'

let store = createStore(todoApp);
let rootElement = document.getElementById('root');

render(
    <Provider store = {store}>
        <App></App>
    </Provider>
    , rootElement
)
