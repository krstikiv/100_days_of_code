$(document).ready(function() {
  $('#search').click(function() {

    var userSearch = $(".input-field").val();
    var url = 'http://en.wikipedia.org/w/api.php';

    $.ajax({
      url: url,
      data: {
        action: 'opensearch',
        search: userSearch,
        limit: 10,
        format: 'json'
      },
      dataType: 'jsonp',
      success: processResult

    });
  });
});

//autocomplete function
$(".input-field").autocomplete({
    autoFocus: true,
    source: function(request, response) {
        $.ajax({
            url: "http://en.wikipedia.org/w/api.php",
            dataType: "jsonp",
            data: {
                'action': "opensearch",
                'format': "json",
                'search': request.term
            },
            success: function(data) {
                response(data[1]);
            },
            error: function () {
              response([]);
            }
        });
    }
});



function processResult(data) {
  for (var i = 0; i < data[1].length; i++) {
    $('#display-result').prepend("<div><a href="+data[3][i]+">" + data[1][i] + "</a>" + "<p>" + data[2][i] + "</p></div>");
  }
}