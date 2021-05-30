import React, {Component} from 'react';
import { Button,Row } from 'react-bootstrap';


class ContestHeader extends Component{

    constructor(props){
    super(props);
    this.state={
        title: this.props.title
    }
    }

    componentDidMount(){
     
     
    }

render(){


   return (
       
       <div>
           <h3 className="mt-4">{this.props.title}</h3>
           <Row className="justify-content-end mt-3 mr-1">
           <Button onClick={this.props.export} variant="success">Export Table</Button>
           </Row>
       </div>   
   );

}

}

export default ContestHeader;