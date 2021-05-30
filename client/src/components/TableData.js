import React, {Component} from 'react';
import {Form } from 'react-bootstrap'



class TableData extends Component{

    constructor(props){
    super(props);
    this.state={
        data: this.props.data
    }

    }

    componentDidUpdate(prevProps) {

        if (this.props.data !== prevProps.data) {
          this.setState({data:this.props.data})
        }
      }

 

render(){
    const end = Object.values(this.state.data).length;
    const tableData = Object.values(this.state.data).map((value,index)=>{          

        if(index===1)
        return(
            <td key={index} data-title={value}>
               {value.substr(0,20)+"..."}
             </td>
        );

        else if(index===end-1)
        return(
          <td key={index}>
          <Form>
              <Form.Group>
              <Form.Control type="number" disabled={(this.state.data.average===null ? true: false)} value={value} onChange={(e)=>{this.props.rewardChange(this.props.index,e.target.value)}}/>
              </Form.Group>
          </Form>
          </td>
        );

         return (
             <td key={index}>
                 {value}
              </td>    
             
         );   
        
    })

   return (

    <tr  className={"" + (this.state.data.average===null ? 'table-danger': '')}>
  
      {tableData}
       
    </tr>

   );

}

}

export default TableData;