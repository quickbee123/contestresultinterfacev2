import React, {Component} from 'react';
import ContestList from './ContestList';
import Header from './Header';
import contestAPI from '../api/contestAPI';
import helpers from '../helpers';

class MainPage extends Component{

    constructor(props){
        super(props);
        this.state={
            contests: [],
            filtered_contests:[],
            status: {
                inprogress:true,
                voting:true,
                ended:true
            },
            searchName:"",
            subgovId:0
        }

        this.updateContests = this.updateContests.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleSubgovChange = this.handleSubgovChange.bind(this);
        this.filterContests = this.filterContests.bind(this);
    }

    componentDidMount(){
     
        this.updateContests();
     
    }

    async updateContests(){

        var response = await contestAPI.getAllContests();
        response = await helpers.sortContests(response);
        this.setState({contests:response,filtered_contests:response});
        

    }

    async handleNameChange(e){

        let value = e.target.value.toLowerCase();
        this.setState({searchName:value},this.filterContests);
        

        

    }

    async handleStatusChange(e){

        var id = e.target.id;
        var status = this.state.status;
        if(id==="checkbox1")
        status.inprogress=!status.inprogress;
        if(id==="checkbox2")
        status.voting=!status.voting;
        if(id==="checkbox3")
        status.ended=!status.ended;

        this.setState({status:status},this.filterContests);

    }

    async handleSubgovChange(e){
        this.setState({subgovId:e.target.value},this.filterContests);
    }

    async filterContests(){

        var contests= this.state.contests;
        var statusChecked = [];

        for (var key in this.state.status){
          if(this.state.status[key]){
              statusChecked.push(key);
          }
        }

        contests = contests.filter((contest)=>{

            if(this.state.subgovId!=0){

                return contest.SubgovernanceId == this.state.subgovId && statusChecked.includes(contest.status);

            }

            return statusChecked.includes(contest.status);

            

        })

        var firstMatch = contests.filter((contest)=>{
            return contest.Title.toLowerCase().search(this.state.searchName) ===0;
        });

        var anyMatch = contests.filter((contest)=>{
            return contest.Title.toLowerCase().search(this.state.searchName) > 0;
        });

        this.setState({filtered_contests:[...firstMatch,...anyMatch]});

    }

render(){

   return (
       <>
       <Header 
        nameChange={this.handleNameChange}
        status={this.state.status}
        statusChange={this.handleStatusChange}
        subgovChange={this.handleSubgovChange}/>
       <ContestList contests={this.state.filtered_contests}/>
       </>
   );

}

}

export default MainPage;