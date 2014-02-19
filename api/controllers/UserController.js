/**
 * UserController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    
  


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to UserController)
   */
  _config: {},

  create: function(req, res, next){
    //Create a new user wth the params sent from the sign up form (new.ejs)
    User.create(req.params.all(), function userCreated(err, user){

    //in case there is an error
      if(err){
        console.log(err);

        //If error redirect to index page
        res.redirect('/');
        return;
      }

      req.session.User = user;
      
      //After sucessfully creating a user redirect to the show action
      res.redirect('/success');
    });
  }
};
