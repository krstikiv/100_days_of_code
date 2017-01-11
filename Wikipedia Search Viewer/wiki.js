//Run some jQuery
$(document).ready(function() {
  
 //Create a click function when user clicks Search 
  $("#btnsearch").click(function() {
    //Get user's input
    var searchTerm = $('#userInput').val();
    //Edit wiki's api to include the search term
    var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchTerm + "&format=json&callback=?";
    
    console.log(url); //Check link
    console.log(searchTerm); //Check if user's input is captured
    $.ajax({
      type: "GET",
      url: url,
      contentType: "application/json; charset=utf-8",
      async: false,
      dataType: "json",
      success: function(data) {
        $('#display-result').html('');
        //display Wiki's data into the div element. 
        for (var i = 0; i < data[1].length; i++) {
          $('#display-result').prepend("<div><div><a href=" + data[3][i] + " target='_blank'>" + data[1][i] + "</a>" + "<p>" + data[2][i] + "</p></div></div>");
        }

        $("#userInput").val(''); //clear the search field
             },
      error: function(errorMessage) {
        console.log(errorMessage);
      }
      
    });
 return false; 
  });

  //autocomplete function
var url = "https://en.wikipedia.org/w/api.php";
 $("#userInput").autocomplete({
   autoFocus: true,
    source: function(request, response) {
      $.ajax({
        url: url,
        dataType: "jsonp",
        data: {
          action: "opensearch",
          format: "json",
          search: request.term
        },
        success: function(data) {
          response(data[1]);
        }
      });
    }
  }); 

});