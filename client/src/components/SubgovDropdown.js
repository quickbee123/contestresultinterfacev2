import React, {Component} from 'react';
import { Form } from 'react-bootstrap';
import contestAPI from '../api/contestAPI';
import helpers from '../helpers';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";



class SubgovDropdown extends Component{

    constructor(props){
    super(props);
    this.state={
        subgov: []
    }
    this.getSubgov = this.getSubgov.bind(this);
    }

    componentDidMount(){
     
        this.getSubgov();
     
    }

    async getSubgov(){
        
        var result = await contestAPI.getAllSubgov();
        result = await helpers.sortSubgov(result);
        this.setState({subgov:result});
    }

render(){

         const subgovList = this.state.subgov.map((sub)=>{
             return (
                <option key={sub.Id} value={sub.Id}>{sub.name}</option>
             );
         })

         return (
            <Form className="my-2">
            <Form.Group className="m-0">
                <Form.Control as="select" onChange={this.props.subgovChange}>
                <option value={0}>-----ALL-----</option>
                {subgovList}
                </Form.Control>
            </Form.Group>
            </Form>    
             
         );   
        
}

}

export default SubgovDropdown;