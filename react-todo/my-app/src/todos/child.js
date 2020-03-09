import React,{Component} from 'react';
export default class child extends Component{
    constructor(props){
        super(props);
        this.state={
            name: 123
        }
    }
    childClick = ()=>{
        console.log('子组件的文本')
    }
    render(){
        return (
            <div>
                这是child{this.state.name}
            </div>
        )
    }
}