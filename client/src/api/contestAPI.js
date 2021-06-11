import axios from 'axios';
import tonAPI from './tonAPI';
import helpers from '../helpers/index'

const contestAPI= {
    async getAllContests(){

        var response = (await axios.get('/api/contests')).data;
        response = await this.getContestStatus(response);
        response = await this.getContestTitles(response);
        console.log(response);
        return response;
    },
    async getAllSubgov(){

      const response = await axios.get('/api/subgov');

      return response.data;
  },
    async getSubmJurorDetails(address){
    var result = await tonAPI.getSubmJurorInfo(address);

    result.submissions= result.submissions.map((subm)=>{

      var avg = (parseInt(subm.marks)/parseInt(subm.accepted))|| 0.00;
      subm.average = avg.toFixed(2);

      if(subm.accepted<subm.rejected)
      subm.average=null;
        
      return {
          place: 0,
          address:subm.address,
          submission:subm.id,
          average:subm.average,
          accepted:subm.accepted,
          rejected:subm.rejected,
          reward:""
      }
  });

  result.jurors= result.jurors.map((jur)=>{
 
    jur.votes = (parseInt(jur.accepted) || 0) + (parseInt(jur.rejected) || 0) + (parseInt(jur.abstained) || 0);
    return {
        no: 0,
        address:jur.address,
        votes:jur.votes,
        accepted:jur.accepted || 0,
        abstained:jur.abstained || 0,
        rejected:jur.rejected || 0,
        reward:""
    }
});

    return result;
    },
    async getContestTitle(address){
      const result = await tonAPI.getContestTitle(address);
      if(result)
      return (await helpers.hex2a(result));

      return undefined;
    },
    async getContestStatus(contests){
      var unix_now = Math.round(Date.now()/1000);
      contests.forEach(contest => {

          

          if(contest.ContestStart-unix_now>0){
              contest.status="upcoming";

          }
          else if(contest.ContestDeadline-unix_now>0){
            contest.status="inprogress";

          }
          else if(contest.VotingDeadline-unix_now>0){
            contest.status="voting";

          }
          else{
            contest.status="ended";

          }

      });
      return contests;

    },
    async getContestTitles(contests){
      
      for(var contest of contests){
        contest.Title = await helpers.hex2a(contest.Title);
      }

      console.log(contests);
      return contests;
    }
}

export default contestAPI;