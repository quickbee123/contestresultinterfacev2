import React, {Component} from 'react';
import ContestHeader from './ContestHeader';
import SubmissionTable from './SubmissionTable';
import { Spinner } from 'react-bootstrap';
import JuryTable from './JuryTable';
import contestAPI from '../api/contestAPI';
import helpers from '../helpers/index'
import exportExcel from '../helpers/export'
import BackButton from './BackButton';
import logo from '../assets/error.png'


class ContestPage extends Component{

    constructor(props){
    super(props);
    this.state={
        address: '',
        title: '',
        submissions:[],
        jurors:[],
        loading: true,
        error:false
    }
    this.getContestDetails = this.getContestDetails.bind(this);
    this.setSubmissions = this.setSubmissions.bind(this);
    this.setJurors = this.setJurors.bind(this);
    this.sortSubmissions = this.sortSubmissions.bind(this);
    this.sortJurors = this.sortJurors.bind(this);
    this.handleSubmissionRewardChange = this.handleSubmissionRewardChange.bind(this);
    this.handleJurorRewardChange = this.handleJurorRewardChange.bind(this);
    this.exportToExcel = this.exportToExcel.bind(this);
    this.goBack = this.goBack.bind(this);
    }

    componentDidMount(){

        
        var address = new URLSearchParams(this.props.location.search).get('address');

        this.setState({address:address},()=>{
            this.getContestDetails();
        })
        
        
    }

    async getContestDetails(){
        
     const name =  await contestAPI.getContestTitle(this.state.address);
     if(name){
        
        const response =  await contestAPI.getSubmJurorDetails(this.state.address);
        this.setState({title:name});
        await this.setSubmissions(response.submissions);
        await this.setJurors(response.jurors);
        this.setState({loading:false});
     }
     else{
        this.setState({loading:false,error:true});
     }
     
     
    }

    async setSubmissions(submissions){
     var submArray = await helpers.sortCollections(submissions,'average',false);
     submArray = await helpers.extractRejectedSubm(submArray);
     for(var keys in submArray){
        submArray[keys].place=parseInt(keys)+1;
    }
     this.setState({submissions:submArray});
    }

    async setJurors(jurors){
        var jurArray = jurors;
        for(var keys in jurArray){
            jurArray[keys].no=parseInt(keys)+1;
        }
        this.setState({jurors:jurArray});
    }

    async sortSubmissions(field,asc){

        var submArray = await helpers.sortCollections(this.state.submissions,field,asc);
        this.setState({submissions:submArray});
    }

    async sortJurors(field,asc){

        var jurArray = await helpers.sortCollections(this.state.jurors,field,asc);
        this.setState({jurors:jurArray});
    }

    async handleSubmissionRewardChange(index,value){
        var submArray = this.state.submissions;
        submArray[index].reward = value;

        this.setState({submissions:submArray});
    }

    async handleJurorRewardChange(index,value){
        var jurArray = this.state.jurors;
        jurArray[index].reward = value;

        this.setState({jurors:jurArray});
    }

    async exportToExcel(){
        var submArray = await helpers.sortCollections(this.state.submissions,'place',true);
        var jurArray = await helpers.sortCollections(this.state.jurors,'no',true);
        const params = {
            title:this.state.title,
            submissions:submArray,
            jurors:jurArray
        }

        exportExcel(params);
    }

    async goBack(){
        this.props.history.goBack();
    }

render(){

    const {loading} = this.state;
    const {error} = this.state;


   return (
       loading ? (<div className="h-100 row align-items-center justify-content-center"><Spinner animation="border" /></div>):  
       error ? (<div className="mx-3 h-100"><BackButton goBack={this.goBack} /><div className="h-100 row align-items-center justify-content-center"><img src={logo} width="50" height="50"/>Address invalid</div></div>):   
       (<div className="contest-page">
           <BackButton goBack={this.goBack}/>
           <ContestHeader
           title={this.state.title}
           export={this.exportToExcel}
           />
           <h4 className="my-3">Submissions</h4>
           <SubmissionTable
           submissions={this.state.submissions}
           sort={this.sortSubmissions}
           rewardChange={this.handleSubmissionRewardChange}/>
           <h4 className="my-3">Jurors</h4>
           <JuryTable
           jurors={this.state.jurors}
           sort={this.sortJurors}
           rewardChange={this.handleJurorRewardChange}/>
       </div>)
   );

}

}

export default ContestPage;