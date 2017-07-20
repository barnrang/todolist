String.prototype.isEmpty = function() {
    return (this.length === 0 || !this.trim());
};

function checkSubString(sub, str){
  var lensub = sub.length;
  var lenstr = str.length;
  str = str.toLowerCase();
  sub = sub.toLowerCase();
  var i = 0, j = 0;
  if(lensub > lenstr) return false;
  for(i = 0; i < lenstr; i++){
    var chr = str[i];
    if(chr == sub[j]){
      j++;
    }
    if(j == lensub){
      return true;
    }
  }
  return false;
}


$(document).ready(function(){
  alert("js success")
  //Search box
  console.log("test");
  var lists = {};
  if(localStorage.tasklist){
    console.log(JSON.parse(localStorage.tasklist));
    var lists = JSON.parse(localStorage.tasklist);
    //var i = 0;
    var table = $('#todolist')
    for(var key in lists){
      console.log(key);
      table.append("<tr><th class=\"job\">" + key + "</th><th>"
    + "<input type=\"checkbox\" class=\"checkbox-regular\">" + "</tr>")
    }
  }else{
    console.log("not found");
  }

  $('.searchBox').keyup(function(event){
    $('.searchResult').empty();
    var list = $(".job");
    //console.log(list[0].innerText);
    var i = 0;
    var sub = $(this).val();
    if(sub){
      for(;i < list.length; i++){
        if(checkSubString(sub, list[i].innerText)){
          $('.searchResult').append(list[i].innerText + "<br>");
        }
      }
    }
    /*console.log("key has been pressed " + pressCount + " times"
  + "by key" + String.fromCharCode(event.which));*/
  })
  //add task

  $('#target').on('submit', function(e) {
    var text = $('#todoname').val();
    var tmp = text;
    if(typeof(Storage) !== "undefined"){
      if(localStorage.tasklist){
        lists[text] = 1;
        localStorage.tasklist = JSON.stringify(lists);
      }
      else{
        var listTemp = {text:1};
        localStorage.tasklist = JSON.stringify(listTemp);
      }
    }else{
      alert("your Browser not support lol")
    }
    //$('#todolist').append(text+"<br>");
    if(!text.isEmpty()){
      $('#todolist').append("<tr><th class=\"job\">" + text + "</th><th>"
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

  //finish task
  $('#delete').click(function(){
    var tick = $(".checkbox-regular");
    var job = $("tr");
    var jobName = $('.job');
    var i;
    for(i = 0; i < tick.length; i++){
      if(tick[i].checked){
        console.log(jobName[i]);
        var text = jobName[i].innerText;
        console.log(text)
        job[i+1].remove();
        delete lists[text];
        localStorage.tasklist = JSON.stringify(lists);
      }
    }
  });
});
