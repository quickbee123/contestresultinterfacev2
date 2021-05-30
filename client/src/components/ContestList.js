import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import ContestListItem from './ContestListItem';

class ContestList extends Component{

    constructor(props){
        super(props);
        this.state={
            contests: this.props.contests
        }

    }

    componentDidUpdate(prevProps) {
        
        if (this.props.contests !== prevProps.contests) {
          this.setState({contests:this.props.contests});
        }
      }

    

render(){

   const list = this.state.contests.map((contest)=>{
    return(
        
        <div key ={contest.Id}>
            <Link to={{pathname: `/contest?address=${contest.Address}`}} className="text-decoration-none">
              <ContestListItem contest={contest}/>
            </Link>
        </div>
         
    );
       
   });

   return (
       
       <div>
       {list}
       </div>
   );

}

}

export default ContestList;