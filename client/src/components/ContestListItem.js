import React, {Component} from 'react';
import '../styles/ListItem.css'
import helpers from '../helpers/index'


class ContestListItem extends Component{

constructor(props){
    super(props);
    this.state={
        contest: this.props.contest,
        date: '',
        title:''
    }
    this.setDate = this.setDate.bind(this);
    this.getTitle = this.getTitle.bind(this);
}

componentDidMount(){
 
    this.getTitle();
    this.setDate();
    
 
}

async getTitle(){

    var title = await helpers.hex2a(this.state.contest.Title);
    this.setState({title:title});

}

async setDate(){

    var displayDate;

    if(this.state.contest.status==="upcoming")
    displayDate=this.state.contest.ContestStart;

    else if(this.state.contest.status==="inprogress" || this.state.contest.status==="ended")
    displayDate=this.state.contest.ContestDeadline;

    else if(this.state.contest.status==="voting")
    displayDate=this.state.contest.VotingDeadline;

    const date = await helpers.UnixToUTCDate(displayDate);
    const endedAtStr = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
	const yearStr = date.toLocaleDateString('en-US', { year: 'numeric' });
	const timeStr = date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    this.setState({date:`${endedAtStr + ", " + yearStr + ", " + timeStr + " UTC"}`});

}

render(){

   return (
       <div className="contest-item p-3 mt-3">
           <div className="contest-title">{this.state.title}</div>
           <div className={"contest-details mt-1 "+this.state.contest.status}>
           <div className="contest-status"><div className="status-icon"></div><div className="status-text"></div></div>
           <div className="contest-date"><div className="contest-date-text mr-1"></div><div className="contest-date-utc">{this.state.date}</div></div>
           </div>
       </div>
   );

}

}

export default ContestListItem;