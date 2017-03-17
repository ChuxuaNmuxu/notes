> Action ： {  type: 必须的, ...  }

> store.dispatch(Action): 发出action
 
> Reducer 是一个纯函数，它接受 Action 和当前 State 作为参数，返回一个新的 State.

>` const reducer = function (state, action) {
  	// ...
  	return new_state;
	};`

> const store = createStore(reducer) 

> combineReducer将多个reducer合并成一个reducer,传值给createStore