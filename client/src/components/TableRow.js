import React, {Component} from 'react';
import TableData from './TableData'



class TableRow extends Component{

    constructor(props){
    super(props);
    this.state={
        dataArray: this.props.dataArray
    }

    }

    componentDidUpdate(prevProps) {

        if (this.props.dataArray !== prevProps.dataArray) {
          this.setState({dataArray:this.props.dataArray})
        }
      }



 

render(){

    const tableRows = this.state.dataArray.map((data,index)=>{          

         return (
                 <TableData data={data} key={index} index={index} rewardChange={this.props.rewardChange}/>           
         );   
        
    })

   return (
       
    <tbody>
      {tableRows}
   </tbody>
   );

}

}

export default TableRow;