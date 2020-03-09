import React from 'react';
import { Icon } from 'antd';
// import 'antd/dist/antd.css';
import './todos.css';
import Child from './child';
export default class todos extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            todoList: [{ischecked:false, value: 'asdfaf'}],
            filterBtn: 'all'
        }
        this.handleEnter = this.handleEnter.bind(this);
        this.allSelect = this.allSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDel = this.handleDel.bind(this);
        this.allClick = this.allClick.bind(this);
        this.actClick = this.actClick.bind(this);
        this.comClick = this.comClick.bind(this);
        this.clearClick = this.clearClick.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }
    //过滤
    allClick(){
        this.setState({
            filterBtn: 'all'
        })
    }
    actClick(){
        this.setState({
            filterBtn: 'active'
        })
    }
    comClick(){
        this.setState({
            filterBtn: 'completed'
        })
    }
    //回车，增加列表数据
    handleEnter(e){
        const newList = [...this.state.todoList];
        if(e.keyCode === 13){
            newList.push({value: e.target.value, ischecked: false});
            e.target.value = '';
        }
        this.setState({
            todoList:newList,
            filterBtn: 'all'
        })
    }
    //全选
    allSelect(){
        const newList = [...this.state.todoList];
        const List = newList.map((item)=>{
            if(item.ischecked === false){
                item.ischecked = true;
                return item
            }else{
                return item
            }
        });
        this.setState({
            todoList: List
        })
    }
    //改变所选框状态
    handleChange(index){
        const newList = [...this.state.todoList];
        if(newList[index].ischecked === true){
            newList[index].ischecked = false;
        }else{
            newList[index].ischecked = true;
        }
        this.setState({
            todoList:newList        
        })

    }
    //修改数据
    handleEdit(e,index){
        const newList =[...this.state.todoList];
        newList[index].value = e.target.value;
        this.setState({
            todoList: newList
        })
    }
    //删除当前列表数据
    handleDel(index){
        const newList = [...this.state.todoList];
        newList.splice(index,1);
        this.setState({
            todoList: newList
        })
    }
    clearClick(){
        const List = [...this.state.todoList];
        const newList = [];
        List.map((item)=>{
            if(item.ischecked === false){
                newList.push(item)
            }
        })
        this.setState({
            todoList: newList
        })
        
    }
    testClick = ()=>{
        console.log('父组件的文本');
        let demo = this.refs.gh;
        console.log(demo);
    }
    render(){
        return(
            
            <div className='wrapper'>
                <div className='header'>
                <h1>todos</h1>
                <input onKeyDown={this.handleEnter} type='text' placeholder='What need to be done?'/>
                </div>
                <div className='main'>
                <label onClick ={this.allSelect}><Icon className='downImg' type="down" /></label>
                <ul>
                    {
                    this.state.todoList.map((item,i) =>{
                        let dom =(
                        <li key ={i}>
                        <div className='view'>
                        <input type='checkbox' checked ={item.ischecked}  onClick={()=>this.handleChange(i)} id='checkStyle'/>
                        <label  for="checkStyle"></label >
                        <input type = 'text'  value = {item.value} className = {item.ischecked === false?'toggle':'_toggle'} onChange = {(e)=>{this.handleEdit(e,i)}}></input>
                        {/* <label className='toggle'>{item.value}</label> */}
                        <button className='del' onClick = {()=>this.handleDel(i)}></button>
                        </div>
                        </li>);
                    if(this.state.filterBtn === 'all'){
                        return dom;
                    }else if(this.state.filterBtn === 'active'){
                        if(item.ischecked === false){
                            return dom;
                        }
                    }else if(this.state.filterBtn === 'completed'){
                        if(item.ischecked === true){
                            return dom;
                        }
                    }
                })
                    }
                </ul>
                </div>
                <div className='footer'>
                <span>{(()=>{
                    let num = 0;
                    this.state.todoList.map((item)=>{
                        if(item.ischecked === false){
                            num++;
                        }
                    })
                    return num;
                })()}</span>
                <span>item left</span>
                <div className='filter'>
                    <div className={this.state.filterBtn === 'all'?'all active': 'all'} onClick = {this.allClick}>all</div>
                    <div className={this.state.filterBtn === 'active'?'act active': 'act'} onClick = {this.actClick}>active</div>
                    <div className={this.state.filterBtn === 'completed'?'com active': 'com'} onClick = {this.comClick}>completed</div>
                </div>
                <button ref="btn3" className='clear' onClick={this.clearClick}>Clear completed</button>
                {/* <Child ref="gh"></Child> */}
                {/* <button onClick = {this.testClick}>点击</button> */}
                </div>
                
            </div>
            
        )
    }

}