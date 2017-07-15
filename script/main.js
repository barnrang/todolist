String.prototype.isEmpty = function() {
    return (this.length === 0 || !this.trim());
};


$(document).ready(function(){
  alert("js success")
  $('#target').on('submit', function(e) {
    var text = $('#todoname').val();
    var tmp = text;
    //$('#todolist').append(text+"<br>");
    if(!text.isEmpty()){
      $('#todolist').append("<tr><th>" + text + "</th><th>"
    + "<input type=\"checkbox\" class=\"checkbox-regular\">" + "</tr>");
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
    var job = $("tr");
    var i;
    for(i = 0; i < tick.length; i++){
      if(tick[i].checked){
        job[i+1].remove();
      }
    }
  });
});
