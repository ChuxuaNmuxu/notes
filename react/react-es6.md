### react component的3种写法：
-------------------------
	class Counter extends Component {
	    constructor(props) {
	        super(props);    //调用super为了创建this对象，否者下面用this回报错； 传入props为了在constructor中使用props,其他地方react会自动传入props
	        console.log(this);  //this 只想Counter
	        this.state = {red: 'red'}  //state只能在这里声明，没有getInitialState方法
	        this.toString = this.toString.bind(this);  //显示绑定this  
	    }
	
	    toString() {
	        console.log(this)  //this === null,需要显示绑定1.在constructor中 2.在组件上 3.使用箭头函数
	    }
	    render() {
	        const { value, onIncreaseClick } = this.props;  //props在constructor之外可以直接访问
	        return (
	            <div>
	                <span>{value}</span>
	                <button onClick={ this.toString }>{this.state.red}</button>
					<button onClick={ this.toString.bind(this) }>{this.state.red}</button>  //显示绑定this
					<button onClick={ ()=>{this.toString()} }>{this.state.red}</button>
	            </div>
	        )
	    }
	}

----------- 
> 无状态组件： 数据由props传入，不管理state的纯UI组件
 
		 const StatelessComponent = ({value}) => {   //value === props.value
		    return (             //需要加 return（） 
		            <div>
		                <ul>
		                    <li >{value}</li>
		                </ul>
		            </div>
		        )
		}

-------
> es5写法