const helpers={

async UnixToUTCDate(unix){
    var date= new Date(unix*1000);

      return new Date(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds()
        );
},

async hex2a(hex) {
    
    var bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i !== bytes.length; i++) {
        bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
    }
    bytes = new TextDecoder().decode(bytes);
    return bytes;
},

async sortCollections(collection, sortParam , order) {
	const sortedCollection = collection.sort((a, b) => {
		let A = a[sortParam], B = b[sortParam];

		if (typeof A === 'string')
			A = parseFloat(A);

		if (typeof B === 'string')
			B = parseFloat(B);

		const comparison = order ? (A || 0) - (B || 0) : (B || 0) - (A || 0);

		return comparison;
	})

	return sortedCollection;
},

async sortSubgov(subgov) {
	const sortedSubgov = subgov.sort((a, b) => {
		let A = a.name.toLowerCase(), B = b.name.toLowerCase();

		if(A < B) { return -1; }
        if(A > B) { return 1; }
        return 0;
	})

	return sortedSubgov;
},

async extractRejectedSubm(submissions){
    var end = submissions.length;
    for(var i=0;i<end;i++){
      if(submissions[i].average===null){
          
          var item = submissions[i];
          submissions.splice(i,1);

          submissions.push(item);
          i--;
          end--;

      }
    }

    return submissions;
},

async filterContest(val){
    
    return function(contest){
        return contest.status===val;
    }

},

async sortContests(contests){
    
    var inprogress = await contests.filter(await this.filterContest('inprogress'));
    var voting = await contests.filter(await this.filterContest('voting'));
    var ended = await contests.filter(await this.filterContest('ended'));


    inprogress = await this.sortCollections(inprogress,'ContestDeadline',true);
    voting = await this.sortCollections(voting,'VotingDeadline',true);
    ended = await this.sortCollections(ended,'ContestDeadline',false);


    return [...inprogress,...voting,...ended];
}

}
export default helpers;