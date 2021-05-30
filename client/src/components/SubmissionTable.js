import React, {Component} from 'react';
import { Table } from 'react-bootstrap';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import contestAPI from '../api/contestAPI';


class SubmissionTable extends Component{

    constructor(props){
    super(props);
    this.state={
        submissions: this.props.submissions,
        ascending:{
            Place:true,
            Submission:false,
            Average:false,
            Accepted:false,
            Rejected:false
        }
    }
    this.reqSortSubmissions = this.reqSortSubmissions.bind(this);

    }

    componentDidUpdate(prevProps) {
        
        if (this.props.submissions !== prevProps.submissions) {
          this.setState({submissions:this.props.submissions});
        }
      }

      async reqSortSubmissions(name){
       var asc = this.state.ascending;
       asc[name] = !asc[name];
       this.setState({ascending:asc});
       this.props.sort(name.toLowerCase(),asc[name]);
      }

render(){
    
    const headers=[{name:"Place",sort:true,asc:this.state.ascending.Place},{name:"Address",sort:false,asc:false},{name:"Submission",sort:true,asc:this.state.ascending.Submission},{name:"Average",sort:true,asc:this.state.ascending.Average},{name:"Accepted",sort:true,asc:this.state.ascending.Accepted},{name:"Rejected",sort:true,asc:this.state.ascending.Rejected},{name:"Reward",sort:false,asc:false}];

    

   return (
    <Table responsive>
       <TableHeader headers={headers} sort={this.reqSortSubmissions}/>
       <TableRow dataArray={this.state.submissions} rewardChange={this.props.rewardChange}/>
    </Table>   
   );

}

}

export default SubmissionTable;