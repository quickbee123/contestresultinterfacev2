import React, {Component} from 'react';
import { Table } from 'react-bootstrap';
import TableHeader from './TableHeader';
import TableRow from './TableRow';
import contestAPI from '../api/contestAPI';


class JuryTable extends Component{

    constructor(props){
    super(props);
    this.state={
        jurors: this.props.jurors,
        ascending:{
            No:true,
            Submission:false,
            Votes:false,
            Accepted:false,
            Abstained:false,
            Rejected:false
        }
    }
    this.reqSortJurors = this.reqSortJurors.bind(this);
    }


    componentDidUpdate(prevProps) {

        if (this.props.jurors !== prevProps.jurors) {
          this.setState({jurors:this.props.jurors})

        }
      }

      async reqSortJurors(name){
        var asc = this.state.ascending;
        asc[name] = !asc[name];
        this.setState({ascending:asc});
        this.props.sort(name.toLowerCase(),asc[name]);
       }

render(){
    
    const headers=[{name:"No",sort:true,asc:this.state.ascending.No},{name:"Address",sort:false,asc:false},{name:"Votes",sort:true,asc:this.state.ascending.Votes},{name:"Accepted",sort:true,asc:this.state.ascending.Accepted},{name:"Abstained",sort:true,asc:this.state.ascending.Abstained},{name:"Rejected",sort:true,asc:this.state.ascending.Rejected},{name:"Reward",sort:false,asc:false}];

    

   return (
    <Table responsive>
       <TableHeader headers={headers} sort={this.reqSortJurors}/>
       <TableRow dataArray={this.state.jurors} rewardChange={this.props.rewardChange}/>
    </Table>   
   );

}

}

export default JuryTable;