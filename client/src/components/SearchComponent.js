import React, {Component} from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";



class SearchComponent extends Component{

    constructor(props){
    super(props);
    this.state={
        data: this.props.data
    }

    }

render(){

         return (
            <InputGroup className="w-100">
            <InputGroup.Prepend>
            <InputGroup.Text className="bg-info text-white"><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Search contest by name..."
              onChange={this.props.nameChange}
            >
            </FormControl>    
            </InputGroup>    
             
         );   
        
}

}

export default SearchComponent;