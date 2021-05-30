import React, {Component} from 'react';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";



class FilterComponent extends Component{

    constructor(props){
    super(props);
    this.state={
        status:this.props.status
    }



    }

 

render(){

         return (
          <Form className="align-self-center my-2">
              <div>
              <Form.Check className="mx-2" inline label="Active" name="status" type="checkbox" id="checkbox1" defaultChecked onChange={this.props.statusChange}/>
              <Form.Check className="mx-2" inline label="Voting" name="status" type="checkbox" id="checkbox2" defaultChecked  onChange={this.props.statusChange}/>
              <Form.Check className="mx-2" inline label="Ended" name="status" type="checkbox" id="checkbox3" defaultChecked  onChange={this.props.statusChange}/>
              </div>
          </Form>   
             
         );   
        
}

}

export default FilterComponent;