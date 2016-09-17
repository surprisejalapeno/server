//statsController.js
var db = require('../models/Database.js');

//MOCK UP DUMMY RESPONSE, HERE, FOR TESTING STATS VIEW?
var dummyData = {
  entriesLast7Days: 4,
  entryStreakSelf: 12,
  entryStreakFriendsBiggest: 17,
  entryStreakFriendsBiggestName: "Kevin",
  entryStreakFriendsSmallest: 2,
  entryStreakFriendsSmallestName: "Vincent"
}

module.exports = {
  //add controller methods here
  getStats: function(req, res, next) {
    res.status(200).json(dummyData);
  }
}