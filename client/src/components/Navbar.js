import React, {Component} from 'react';
import LoadAddress from './LoadAddress';
import {Row, Navbar } from 'react-bootstrap';
import logo from '../assets/color@2x.png'
import contestAPI from '../api/contestAPI';
import helpers from '../helpers';




class NavbarComponent extends Component{
render(){

         return (
            <Navbar bg="dark" fixed="top" className="justify-content-between" >
                <Row className="align-middle">
                <img
                    src={logo}
                    width="30"
                    height="30"
                    className="ml-2 d-inline-block align-top"
                    alt="logo"
                /> 
                <h4 className="text-white d-none d-sm-block m-0 ml-2">FREE TON RESULTS</h4>
                </Row>
                <LoadAddress/>
            </Navbar>  
             
         );   
        
}

}

export default NavbarComponent;