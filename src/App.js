import React, { Component, Fragment } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './style.css';
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            list: []
        }
        this.handleToggole = this.handleToggole.bind(this)
        this.handleAddItem = this.handleAddItem.bind(this)
    }
    render() {
        return (
            <Fragment>
                {/*单个元素的css变化*/}
                <CSSTransition
                    in={this.state.show}
                    timeout={2000}
                    unmountOnExit
                    classNames="fade"
                    onEntered={(el) => { el.style.color = 'blue' }}//利用js来改变css样式
                    appear={true}//初始化的时候页面也执行样式的变化
                >
                    <div>hello-----world</div>
                </CSSTransition>
                <button onClick={this.handleToggole}>Toggole</button>
                <TransitionGroup>
                    {/*多个元素的css变化*/}
                    {
                        this.state.list.map((item, index) => {
                            return (
                                <CSSTransition
                                    in={this.state.show}
                                    timeout={2000}
                                    unmountOnExit
                                    classNames="fade"
                                    onEntered={(el) => { el.style.color = 'blue' }}//利用js来改变css样式
                                    appear={true}//初始化的时候页面也执行样式的变化
                                    key={index}
                                >
                                    <div>hello-----world</div>
                                </CSSTransition>
                            )
                        })
                    }

                </TransitionGroup>
                <button onClick={this.handleAddItem}>Add</button>
            </Fragment>
        )
    }
    handleToggole() {
        this.setState({
            show: this.state.show ? false : true
        })
    }
    handleAddItem() {
        this.setState((prevState) => {
            return {
                list: [...prevState.list, 'item']
            }
        })
    }
}
export default App;