module.exports = {

	ContestContract : {
		abi:{
		"ABI version": 2,
		"header": ["pubkey", "time"],
		"functions": [
			{
				"name": "constructor",
				"inputs": [
					{"name":"title","type":"bytes"},
					{"name":"link","type":"bytes"},
					{"name":"hash","type":"uint256"},
					{"name":"juryAddr","type":"address"},
					{"name":"juryKeys","type":"uint256[]"}
				],
				"outputs": [
				]
			},
			{
				"name": "setupContest",
				"inputs": [
					{"name":"startsIn","type":"uint16"},
					{"name":"lastsFor","type":"uint16"}
				],
				"outputs": [
				]
			},
			{
				"name": "setupJurors",
				"inputs": [
					{"name":"jurors","type":"address[]"}
				],
				"outputs": [
				]
			},
			{
				"name": "rejectApplicant",
				"inputs": [
				],
				"outputs": [
				]
			},
			{
				"name": "submitWithContact",
				"inputs": [
					{"name":"participant","type":"address"},
					{"name":"forumLink","type":"bytes"},
					{"name":"fileLink","type":"bytes"},
					{"name":"hash","type":"uint256"},
					{"name":"contact","type":"address"}
				],
				"outputs": [
				]
			},
			{
				"name": "submit",
				"inputs": [
					{"name":"participant","type":"address"},
					{"name":"forumLink","type":"bytes"},
					{"name":"fileLink","type":"bytes"},
					{"name":"hash","type":"uint256"}
				],
				"outputs": [
				]
			},
			{
				"name": "openContest",
				"inputs": [
				],
				"outputs": [
				]
			},
			{
				"name": "closeContest",
				"inputs": [
				],
				"outputs": [
				]
			},
			{
				"name": "openVoting",
				"inputs": [
				],
				"outputs": [
				]
			},
			{
				"name": "closeVoting",
				"inputs": [
				],
				"outputs": [
				]
			},
			{
				"name": "rejectVote",
				"inputs": [
				],
				"outputs": [
				]
			},
			{
				"name": "voteFor",
				"inputs": [
					{"name":"id","type":"uint16"},
					{"name":"mark","type":"uint32"}
				],
				"outputs": [
				]
			},
			{
				"name": "voteForCommented",
				"inputs": [
					{"name":"id","type":"uint16"},
					{"name":"mark","type":"uint32"},
					{"name":"comment","type":"bytes"}
				],
				"outputs": [
				]
			},
			{
				"name": "abstain",
				"inputs": [
					{"name":"id","type":"uint16"},
					{"name":"comment","type":"bytes"}
				],
				"outputs": [
				]
			},
			{
				"name": "voteAgainst",
				"inputs": [
					{"name":"id","type":"uint16"},
					{"name":"comment","type":"bytes"}
				],
				"outputs": [
				]
			},
			{
				"name": "finalizeResults",
				"inputs": [
				],
				"outputs": [
				]
			},
			{
				"name": "votingEndsIn",
				"inputs": [
				],
				"outputs": [
					{"name":"daysLeft","type":"uint64"}
				]
			},
			{
				"name": "contestStartCountdown",
				"inputs": [
				],
				"outputs": [
					{"name":"secondsLeft","type":"int64"}
				]
			},
			{
				"name": "contestCountdown",
				"inputs": [
				],
				"outputs": [
					{"name":"secondsLeft","type":"int64"}
				]
			},
			{
				"name": "votingCountdown",
				"inputs": [
				],
				"outputs": [
					{"name":"secondsLeft","type":"int64"}
				]
			},
			{
				"name": "getId",
				"inputs": [
					{"name":"addr","type":"address"}
				],
				"outputs": [
					{"name":"value0","type":"uint16"}
				]
			},
			{
				"name": "listContenders",
				"inputs": [
				],
				"outputs": [
					{"name":"ids","type":"uint16[]"},
					{"name":"addresses","type":"address[]"}
				]
			},
			{
				"name": "getStatsFor",
				"inputs": [
					{"name":"id","type":"uint16"}
				],
				"outputs": [
					{"name":"totalPoints","type":"uint64"},
					{"name":"avgHi","type":"uint32"},
					{"name":"avgLo","type":"uint32"},
					{"name":"jurorsVoted","type":"uint16"},
					{"name":"accepted","type":"uint16"},
					{"name":"abstained","type":"uint16"},
					{"name":"rejected","type":"uint16"}
				]
			},
			{
				"name": "getVotesPerJuror",
				"inputs": [
					{"name":"id","type":"uint16"}
				],
				"outputs": [
					{"name":"jurorsFor","type":"address[]"},
					{"name":"marks","type":"uint32[]"},
					{"name":"commentsFor","type":"bytes[]"},
					{"name":"jurorsAbstained","type":"address[]"},
					{"name":"commentsAbstained","type":"bytes[]"},
					{"name":"jurorsAgainst","type":"address[]"},
					{"name":"commentsAgainst","type":"bytes[]"}
				]
			},
			{
				"name": "getJuryStats",
				"inputs": [
				],
				"outputs": [
					{"components":[{"name":"id","type":"uint16"},{"name":"addr","type":"address"}],"name":"jury","type":"map(uint256,tuple)"}
				]
			},
			{
				"name": "getContestStats",
				"inputs": [
				],
				"outputs": [
					{"name":"totalScore","type":"uint64"},
					{"name":"avgHi","type":"uint32"},
					{"name":"avgLo","type":"uint32"},
					{"name":"jurorsVoted","type":"uint16"},
					{"name":"entries","type":"uint16"}
				]
			},
			{
				"name": "getContestInfo",
				"inputs": [
				],
				"outputs": [
					{"name":"title","type":"bytes"},
					{"name":"link","type":"bytes"},
					{"name":"hash","type":"uint256"},
					{"name":"juryAddr","type":"address"},
					{"name":"juryKeys","type":"uint256[]"},
					{"name":"juryAddresses","type":"address[]"},
					{"name":"maxVotingAttempts","type":"uint8"}
				]
			},
			{
				"name": "getContestProgress",
				"inputs": [
				],
				"outputs": [
					{"name":"votesCount","type":"uint64"},
					{"name":"contendersCount","type":"uint16"},
					{"name":"contestOpen","type":"bool"},
					{"name":"votingOpen","type":"bool"},
					{"name":"contestDeadline","type":"uint64"},
					{"name":"votingDeadline","type":"uint64"},
					{"name":"resultsFinalized","type":"bool"}
				]
			},
			{
				"name": "getInfoFor",
				"inputs": [
					{"name":"id","type":"uint16"}
				],
				"outputs": [
					{"name":"addr","type":"address"},
					{"name":"forumLink","type":"bytes"},
					{"name":"fileLink","type":"bytes"},
					{"name":"hash","type":"uint256"},
					{"name":"appliedAt","type":"uint64"},
					{"name":"contact","type":"address"}
				]
			},
			{
				"name": "getContendersInfo",
				"inputs": [
				],
				"outputs": [
					{"name":"ids","type":"uint16[]"},
					{"name":"addrs","type":"address[]"},
					{"name":"forumLinks","type":"bytes[]"},
					{"name":"fileLinks","type":"bytes[]"},
					{"name":"hashes","type":"uint256[]"},
					{"name":"appliedAts","type":"uint64[]"},
					{"name":"contacts","type":"address[]"}
				]
			},
			{
				"name": "getVotes",
				"inputs": [
				],
				"outputs": [
					{"name":"votes","type":"uint64"}
				]
			},
			{
				"name": "getVotesFor",
				"inputs": [
					{"name":"id","type":"uint16"}
				],
				"outputs": [
					{"name":"votes","type":"uint16"}
				]
			},
			{
				"name": "getTotalRatingFor",
				"inputs": [
					{"name":"id","type":"uint16"}
				],
				"outputs": [
					{"name":"rating","type":"uint64"}
				]
			},
			{
				"name": "resultsFinalized",
				"inputs": [
				],
				"outputs": [
					{"name":"flag","type":"bool"}
				]
			},
			{
				"name": "getFinalStatusFor",
				"inputs": [
					{"name":"id","type":"uint16"}
				],
				"outputs": [
					{"name":"status","type":"bool"}
				]
			},
			{
				"name": "getFinalStatus",
				"inputs": [
				],
				"outputs": [
					{"name":"status","type":"bool[]"}
				]
			},
			{
				"name": "getFinalContestStats",
				"inputs": [
				],
				"outputs": [
					{"name":"totalScore","type":"uint64"},
					{"name":"avgHi","type":"uint32"},
					{"name":"avgLo","type":"uint32"},
					{"name":"jurorsVoted","type":"uint16"},
					{"name":"entries","type":"uint16"},
					{"name":"passed","type":"uint16"},
					{"name":"rejected","type":"uint16"}
				]
			},
			{
				"name": "getFinalStatsFor",
				"inputs": [
					{"name":"id","type":"uint16"}
				],
				"outputs": [
					{"name":"status","type":"bool"},
					{"name":"totalPoints","type":"uint64"},
					{"name":"avgHi","type":"uint32"},
					{"name":"avgLo","type":"uint32"},
					{"name":"jurorsVoted","type":"uint16"},
					{"name":"accepted","type":"uint16"},
					{"name":"abstained","type":"uint16"},
					{"name":"rejected","type":"uint16"}
				]
			},
			{
				"name": "getFinalVotingData",
				"inputs": [
				],
				"outputs": [
					{"name":"ids","type":"uint16[]"},
					{"name":"juryAddresses","type":"address[]"},
					{"name":"statuses","type":"bool[]"},
					{"name":"totalRatings","type":"uint64[]"},
					{"name":"jurorsVoted","type":"uint16[]"},
					{"name":"votesFor","type":"uint16[]"},
					{"name":"votesAbstained","type":"uint16[]"},
					{"name":"votesAgainst","type":"uint16[]"}
				]
			},
			{
				"name": "transfer",
				"inputs": [
					{"name":"dest","type":"address"},
					{"name":"value","type":"uint64"},
					{"name":"bounce","type":"bool"},
					{"name":"flags","type":"uint16"}
				],
				"outputs": [
				]
			},
			{
				"name": "forceContest",
				"inputs": [
					{"name":"flag","type":"bool"}
				],
				"outputs": [
				]
			},
			{
				"name": "forceVoting",
				"inputs": [
					{"name":"flag","type":"bool"}
				],
				"outputs": [
				]
			},
			{
				"name": "forceFinalize",
				"inputs": [
					{"name":"flag","type":"bool"}
				],
				"outputs": [
				]
			},
			{
				"name": "setContestDeadline",
				"inputs": [
					{"name":"time","type":"uint64"}
				],
				"outputs": [
				]
			},
			{
				"name": "setVotingDeadline",
				"inputs": [
					{"name":"time","type":"uint64"}
				],
				"outputs": [
				]
			},
			{
				"name": "upgrade",
				"inputs": [
					{"name":"c","type":"cell"}
				],
				"outputs": [
				]
			}
		],
		"data": [
			{"key":1,"name":"debugNonce","type":"uint256"}
		],
		"events": [
		]
	  }	
	}

}