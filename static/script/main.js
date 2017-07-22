String.prototype.isEmpty = function() {
    return (this.length === 0 || !this.trim());
};

/*function updateDraggable(top, bottom){
  $('workblock').draggable({revert:true, axis: "y",
    containment: [0,top,0,bottom],
    drag: function(e, ui){
      $(this).css("background-color","#FFFFFF");
    },
    stop: function(e, ui){
      $(this).css("background-color","#F5F5F5")
    }
});
}*/



function updateSortable(){
  $('#todolist').sortable()
}

function updateToggle(){
  $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
  });
}

function changeDisplay(){

  var windowWidth = $(window).width();
  console.log(windowWidth);
  if(windowWidth < 768){
    console.log("lol");
    if(!document.getElementById("menu-toggle")){
      console.log("lol2")
      var text = $(".nav-bar").html();
      console.log($(".nav-bar").children().outerWidth());
      $(".nav-bar").children().animate({rigth: $(".nav-bar").children().outerWidth()})
      console.log("notice");
      text = "<a class=\"active\""
      + "id=\"menu-toggle\" href=\"#\">Folder</a>"
      + text;
      $(".nav-bar").html(text);
      updateToggle();
    }
  } else {
    if(document.getElementById("menu-toggle")){
      $("#menu-toggle").remove();
    }
  }
}



//$('table').sortable();

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
  var windowWidth = $(window).width();
  console.log(windowWidth);
  //Navigation bar
  if(windowWidth >= 768){
    console.log('test');
    $("#menu-toggle").remove();
  }
  else updateToggle();
//Slide bar


  if(localStorage.tasklist){
    console.log(JSON.parse(localStorage.tasklist));
    var lists = JSON.parse(localStorage.tasklist);
    //var i = 0;
    var table = $('#todolist')
    for(var key in lists){
      console.log(key);
      table.append("<li class=\"workblock\">"
        + "<div class=\"job\">"
        + key
        + "</div>"
        + "<div class=\"checkbox-list\">"
        +  "<input type=\"checkbox\" class=\"checkbox-regular\">"
        + "</div>"
        + "</li>")
    }
  }else{
    console.log("not found");
  }
  console.log('Enable sortable');
  var topContainment = $('#todoname').offset().top;
  var bottomContainment = $('#delete').offset().top;
  updateSortable();

//Search Box
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

//Todolist
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
      $('#todolist').append("<li class=\"workblock\">"
        + "<div class=\"job\">"
        + text
        + "</div>"
        + "<div class=\"checkbox-list\">"
        +  "<input type=\"checkbox\" class=\"checkbox-regular\">"
        + "</div>"
        + "</li>");
      bottomContainment = $('#delete').offset().top;
      $('#todoname').val("");
      //updateSortable();
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
    var job = $(".workblock");
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
    //updateSortable();
  });


  //updateDraggable(topContainment,bottomContainment);
});
