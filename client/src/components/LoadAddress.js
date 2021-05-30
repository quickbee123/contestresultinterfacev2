import React, {Component} from 'react';
import { Modal , Button , Form} from 'react-bootstrap';
import { Link } from 'react-router-dom';




class LoadAddress extends Component{

    constructor(props){
    super(props);
    this.state={
        show: false,
        address: ""
    }

    this.handleModal = this.handleModal.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
  }

    async handleModal(){
      var val = !this.state.show;
      this.setState({show:val});
    }

    async handleAddressChange(e){
      this.setState({address:e.target.value});
    }



render(){

         return (
          <>
          <Button variant="info" className="float-right" onClick={this.handleModal}>
            Load Contest
          </Button>
          <Modal show={this.state.show} onHide={this.handleModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>
              Load Contest
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Enter Contest Address</Form.Label>
              <Form.Control placeholder="Contest Address" onChange={this.handleAddressChange}/>
            </Form.Group>
            
          </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleModal}>Close</Button>
            <Link to={{pathname: `/contest?address=${this.state.address}`}}>
              <Button className="px-3">Load</Button>
            </Link>
          </Modal.Footer>
          </Modal>  
          </>  
             
         );   
        
}

}

export default LoadAddress;