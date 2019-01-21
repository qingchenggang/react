import React,{ Component } from 'react';
import PropTypes from 'prop-types';
class TodoItem extends Component{
    
    constructor(props){
        super(props);
        this.handleItemDelete=this.handleItemDelete.bind(this)
    }
    shouldComponentUpdate(nextProps,nextState){
        if(nextProps.content!==this.props.content){
            return true;
        }else{
            return false;
        }
        
    }
    render(){
        const { content,test } = this.props;
        return (
            <div className='div' onClick={this.handleItemDelete}>
               {test}- { content }
                {/* {this.props.content}*/}
            </div>
        )
    }
    handleItemDelete(){
        const { deleteItem,index }=this.props;
        deleteItem(index)
        //this.props.deleteItem(this.props.index)
        //alert(this.props.index)
    }
}
TodoItem.propTypes= {
    test:PropTypes.string.isRequired,
    content: PropTypes.oneOfType([PropTypes.number,PropTypes.string]),
    deleteItem:PropTypes.func,
    index:PropTypes.number
}
TodoItem.defaultProps={
    test:'hello world'
}
export default TodoItem;