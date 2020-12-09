$(document).ready(function(){

  // access MAIN via TEST BUTTON
  $("#enter").on('click', function(){
    $(".container-main").toggle();
    $(".container-home").hide();
  });

  // menu button action, go menu
  $("#menuBtn").on('click', function(){
    $(".container-menu").toggle();
    $(".container-main").hide();
  });

  // close button action, go back main
  $(".closeBtn").on('click', function(){
    $(".container-main").toggle();
    $(".container-menu").hide();
  });

// logout button action, go back login
  $(".logout-button").on('click', function(){
    $(".container-menu").toggle();
    $(".container-home").show();
  });

  // add Task button action, go to create task
  $(".addATask-button").on('click', function(){
    $(".container-main").toggle();
    $(".container-create").show();
  });

  // Cancel Create/edit Task button action, go to main
  $(".cancel-button").on('click', function(){
    $(".container-create").toggle();
    $(".container-main").show();
    $('.taskName').val('');
    $(".taskDone-stopTask-buttons").removeClass("displayed");
    $(".delete-button").removeClass("displayed");
  });

  // Save Create/edit Task button action, go to main
  $(".save-button").on('click', function(){
    $(".container-create").toggle();
    $(".container-main").show();
    $(".taskDone-stopTask-buttons").removeClass("displayed");
    $(".delete-button").removeClass("displayed");
  });

  // Click on Task Button, go to Edit task
  $(document).on('click', '.task-name', function(){
    $(".container-main").toggle();
    $(".container-create").show();
    $(".taskDone-stopTask-buttons").addClass("displayed");
    $(".delete-button").addClass("displayed");
    var $text = $(this).text();
    $('.taskName').val($text);

  });

  // Check Button action click on task list
  $('.list-of-task').on('click', '.uncheckedBtn', function(){
    $(this).toggleClass( "checked");
  });

  // Favorite Button action click on task list AND on Create Menu
  $(document).on('click', '.unFavorite', function(){
    $(this).toggleClass( "favorite");
  });
  
  // for deadline tooltip remaining time ?
  //   $( function() {
  //   $( document ).tooltip();
  // } );

  $(function() {

    var $task, $saveTask;
    $task = $('.list-of-task');
    $saveTask = $('.save-button');

    $saveTask.on('click', function(e) {
      e.preventDefault();
      var text = $('.taskName').val();
      if (text.length != 0) { 
        $task.append(`
        <div class="task-button"> 
          <div class="check-task_name-onLeft">
            <div class="uncheckedBtn"></div>
            <div class="task-name"><h1>` + text + `</h1>
            </div>
          </div>
          <div class="deadline-favorite-onRight">
            <div class="deadlineBtn" title="Remaining Time : 1s"></div>
            <div class="unFavorite"></div>
          </div>
        </div>`
        );
      } else alert("Enter some text!")
      // clear the taskName input after entry 
      $('.taskName').val('');
    });
  });

  // add a List function in menu
  $(function() {

    var $list, $addList;
    $list = $('.list-of-list');
    $addList = $('.submit-list');

    $addList.on('click', function(e) {
      e.preventDefault();
      var text = $('.listName').val();
      if (text.length != 0) {
      $list.append(`
      <div class="list-button">
        <div class="list-name"><h3>` + text + `</h3></div>
        <div class="delete-list-button"></div>
      </div>`);
      } else alert("Enter some text!")
      
      $('.listName').val('');
    }); 
  });
  
  // Delete list button action in Menu
  $('.list-of-list').on('click', '.delete-list-button', function() {
    $(this).parent(".list-button").remove();
  });
  // input code above, this below is end of ready function
});
