import React, { Component, Fragment } from 'react';
import TodoItem from './TodoItem';
import App from './app';
import axios from 'axios';
import './style.css';
class Todolist extends Component {

    constructor(props){
        super(props);
        this.state ={
            inputValue:'',
            list:[]
        }
        this.handleBtnClick=this.handleBtnClick.bind(this);
        this.handleInputChange=this.handleInputChange.bind(this);
        this.handleItemDelete=this.handleItemDelete.bind(this);
    }
    //在组建即将被挂载到页面的时刻自动执行
    componentWillMount(){
      //  console.log('componentWillMount');
    }

    render() {
        console.log('render')
        return (
            <Fragment>
              {/*这是注释*/}
                <div>
                    <label htmlFor="insetArea">输入内容</label>
                    <input
                     id='insetArea'
                     className='input' 
                     value={this.state.inputValue} 
                     onChange={this.handleInputChange}
                     ref={(input)=>{this.input=input}}
                    />
                    <button onClick={this.handleBtnClick}>提交</button>
                </div>
                <ul ref={(ul)=>{this.ul=ul}}>
                    {this.getTodoItem()}
                </ul>
                <App></App>
            </Fragment>
        )
    }
    //组建挂载在页面之后自动被执行   
    componentDidMount(){
       // console.log('componentDidMount')
       axios.get('http://localhost:3002/person')
       .then((res)=>{
           console.log(res.data)
           this.setState(()=>({
               list:[...res.data]
           }));
        })
       .catch(()=>{alert("error")})
    }
    //组建被更新之前，他会自动被执行
    shouldComponentUpdate(){
        // console.log('shouldComponentUpdate')
         return true;
    }
    //组建被更新之前，他会自动执行，但是他在shouldComponentUpdate之后被执行
    //如果shouldComponentUpdate返回true他才执行
    //如果返回false，这个函数就不会被执行
    componentWillUpdate(){
       // console.log('componentWillUpdate')
    }
    //组件更新完成之后，他会被执行
    componentDidUpdate(){
       // console.log('componentDidUpdate')
    }
    getTodoItem(){
        return  this.state.list.map((item,index) => {
            return (
             <div key={index} >
                <TodoItem
                  content={item}
                  index={index}
                  deleteItem={this.handleItemDelete}
                  dangerouslySetInnerHTML={{__html:item}} 
                  />
                 {/*<li
                 key={index}
                 onClick={this.handleItemDelete.bind(this,index)}
                 dangerouslySetInnerHTML={{__html:item}} 
                 >
                 </li>*/}
             </div>
            )
        })
    }

    handleInputChange(e){
        console.log(this.input)
        // const value=e.target.value
        const value=this.input.value
        this.setState(()=>({//新的react改变值得方法
            inputValue:value
        }))
        /*this.setState({ 老版react改变值得方法
            inputValue:e.target.value
        })*/
    }
    handleBtnClick(){
        this.setState((prevState)=>({ 
            list:[...prevState.list,prevState.inputValue],
            inputValue:''
        }),()=>{//setState的第二个函数，即执行完setState时才同步执行的，如果下面函数放在setState外面执行的话，可能会先执行下面的函数，再执行setState。
            console.log(this.ul.querySelectorAll('.div').length)
        })
       /*this.setState({
           list:[...this.state.list,this.state.inputValue],
           inputValue:''
       })*/
    }
    handleItemDelete(index){
       /* const list=[...this.state.list];
        console.log(list)
        list.splice(index,1)*/
        this.setState((prevState)=>{
            const list=[...prevState.list];  
            list.splice(index,1)
            return{list}
        })
       /* this.setState({
            list:list
        })*/
        console.log(index)
    }
}
export default Todolist;