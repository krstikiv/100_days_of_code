$(document).ready(function() {
  var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "bob798787987978"];

  function getUserChannel() {
    users.forEach(function(user) {
      function url(data, name) {
        return "https://wind-bow.gomix.me/twitch-api/" + data + "/" + name + "?callback=?";
      }

      $.getJSON(url("streams", user), function(data) {

        var status;
        //console.log(userData.stream);

        if (data.stream !== null) {
          status = "online";
          var game = data.stream.game;
        } else {
          status = "offline";
          //console.log(game);
        }

        //console.log(userData.stream.game);

        $.getJSON(url("channels", user), function(data) {

          var title;
          var logo = data.logo;
          var displayName = data.display_name !== null ? data.display_name : user;
          var userUrl = data.url;
          if (status === "online") {
            title = game;
          } else {
            title = status;
          }
          var html = '<div class="row"><div class="col-xs-4"><img class="img-responsive img-circle" src="' + logo + '"></div><div class="col-xs-4"><a href="' + userUrl + '" target="_blank">' + displayName + '</a></div><div class="col-xs-4">' + title + '</div></div>';
          $("#all").append(html);
          if (status === "online") {
            $("#online").append(html);
          } else {
            $("#offline").append(html);
          }

        }); //get channel info

      }); //get streams of user

    }); //end for each loop

  } //end main function

  getUserChannel();

}); //end document