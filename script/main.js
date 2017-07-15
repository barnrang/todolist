String.prototype.isEmpty = function() {
    return (this.length === 0 || !this.trim());
};


$(document).ready(function(){
  alert("js success")
  var count = 0;
  $('#target').on('submit', function(e) {
    var text = $('#todoname').val();
    var tmp = text;
    //$('#todolist').append(text+"<br>");
    if(!text.isEmpty()){
      $('#todolist').append("<tr id=\""+ count + "\"><th>" + text + "</th><th>"
    + "<input type=\"checkbox\" class=\"checkbox-regular\" id=\""+ count + "\">" + "</tr>");
      $('#todoname').val("");
    }
    e.preventDefault();
    $.ajax({
        url : $(this).attr('action') || window.location.pathname,
        type: "GET",
        data: $(this).serialize(),
    });
  });


  $('#delete').click(function(){
    var tick = $(".checkbox-regular");
    console.log(tick);
  });
});
