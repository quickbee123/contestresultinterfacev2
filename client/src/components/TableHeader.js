import React, {Component} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp,faSortDown } from "@fortawesome/free-solid-svg-icons";


class TableHeader extends Component{

    constructor(props){
    super(props);
    this.state={
        headers: this.props.headers
    }
    this.requestSort = this.requestSort.bind(this);
    }

    async requestSort(header){
    
        if(header.sort){
            this.props.sort(header.name);
        }
    
    }

    componentDidUpdate(prevProps) {

        if (this.props.headers !== prevProps.headers) {
          this.setState({headers:this.props.headers})

        }
      }

 

render(){

    const tableHeaders = this.state.headers.map((header,index)=>{
        return (
            <th scope="col" key={index} className={"d-table-cell " + (header.sort?(header.asc?"upArrow":"downArrow"):"")} onClick={()=>{this.requestSort(header)}}><div className="d-inline-flex"><div>{header.name}</div><FontAwesomeIcon className={"ml-2 " + (header.sort?"":"d-none")} icon={(header.asc?faSortUp:faSortDown)} /></div></th>
        );
    })

   return (
       
    <thead className="thead-dark">
    <tr>
      {tableHeaders}
    </tr>
  </thead>
   );

}

}

export default TableHeader;