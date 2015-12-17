module.exports = function(User){
  var faker = require('faker');   
 
  // Delete all previous data
  User.remove({}, function(err){
    if(err) {
      console.log('Error deleting data from users');
    } else {
      console.log('Delete all data from users');
      // Create 10 users
      _createUsers(5);
    }
  });


  function _createUsers(number){
    var numb = number || 1;
    for(var i = 0; i < numb; i++){
      _createUser();
    }
  }
  function _createUser(){  
    var user = new User({
      username: faker.name.findName(),
      password: faker.internet.password(),
      avatar: faker.image.avatar()
    }); 
    user.save(function(err, savedUser){
      console.log('new user saved', savedUser);
    });
    return user; 
  }

};
