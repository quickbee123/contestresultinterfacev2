import React, {Component} from 'react';
import { Row } from 'react-bootstrap';
import NavbarComponent from './Navbar';
import SearchComponent from './SearchComponent';
import FilterComponent from './FilterComponent';
import SubgovDropdown from './SubgovDropdown';



class Header extends Component{

    constructor(props){
    super(props);

    }



 

render(){

         return (
             <>
             <NavbarComponent/>
            <h1 className="mt-5 d-sm-none">FREE TON RESULTS</h1> 
            <Row className="mx-0 justify-content-between mt-sm-5">
            <SearchComponent nameChange={this.props.nameChange}/>
            </Row>
            <Row className="mx-0 justify-content-between my-3">
            <SubgovDropdown subgovChange={this.props.subgovChange}/>
            <FilterComponent status={this.props.status} statusChange={this.props.statusChange}/>
            </Row>
            </>
             
         );   
        
}

}

export default Header;