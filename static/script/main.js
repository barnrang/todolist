String.prototype.isEmpty = function() {
    return (this.length === 0 || !this.trim());
};

function updateDraggable(top, bottom){
  $('workblock').draggable({revert:true, axis: "y",
    containment: [0,top,0,bottom],
    drag: function(e, ui){
      $(this).css("background-color","#FFFFFF");
    },
    stop: function(e, ui){
      $(this).css("background-color","#F5F5F5")
    }
});
}

function checkSubString(sub, str){
  var lensub = sub.length;
  var lenstr = str.length;
  console.log(topContainment + " " + bottomContainment);
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
  //console.log("test");
  var lists = {};

  if(localStorage.tasklist){
    console.log(JSON.parse(localStorage.tasklist));
    var lists = JSON.parse(localStorage.tasklist);
    //var i = 0;
    var table = $('#todolist')
    for(var key in lists){
      console.log(key);
      table.append("<workblock draggable=\"true\">"
        + "<div class=\"job\">"
        + key
        + "</div>"
        + "<div class=\"checkbox-list\">"
        +  "<input type=\"checkbox\" class=\"checkbox-regular\">"
        + "</div>"
        + "</workblock>")
    }
  }else{
    console.log("not found");
  }

  var topContainment = $('#todoname').offset().top;
  var bottomContainment = $('#delete').offset().top;
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
      $('#todolist').append("<workblock draggable=\"true\">"
        + "<div class=\"job\">"
        + text
        + "</div>"
        + "<div class=\"checkbox-list\">"
        +  "<input type=\"checkbox\" class=\"checkbox-regular\">"
        + "</div>"
        + "</workblock>");
      bottomContainment = $('#delete').offset().top;
      $('#todoname').val("");
      updateDraggable(topContainment,bottomContainment);
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
    var job = $("workblock");
    var jobName = $('.job');
    var i;
    for(i = 0; i < tick.length; i++){
      if(tick[i].checked){
        console.log(jobName[i]);
        var text = jobName[i].innerText;
        console.log(text)
        job[i].remove();
        delete lists[text];
        localStorage.tasklist = JSON.stringify(lists);
      }
    }
    bottomContainment = $('#delete').offset().top;
    updateDraggable(topContainment, bottomContainment);
  });

  updateDraggable(topContainment,bottomContainment);
});
