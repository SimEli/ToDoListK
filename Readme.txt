 
    --> whitesmoke for "done" = weird
    --> fff3b0 for "started" = not "yellowish" temporarly changed.
    -->  var o={'notStarted':'done','done':'notStarted', 'started':'done'}; check if OK, on click when started = done but on reclick = notStarted (need to go in edit mode and restart task)

    * ! CSS for tooltip ! and tooltip remaining time
    check color and background color tooltip

enlever tous les displays flex ! et mettre position absolute et relative partout.

//click to save and CREATE a new task 
  $(document).on('click', '.save-button', function() {
    var task = {
      description: $('.taskNameInput').val(),
      task_description: $('.descriptionInput').val(),
      start_date: $('.startDateInput').val(),
      deadline: $('.deadlineInput').val(),
      favorite: $('.create-favorite').attr('fav'),
      status: $('.form-task').attr('status')
    };
    if (task['description'].length != 0) {
      createTaskAPI(task);
    } else $('.taskNameInput').focus();
    // clear Inputs after entry 
    $('.newTaskInput').val('');
    $('.create-favorite').attr('fav', 'f');
    $('.form-task').attr({'iid': 'null', 'status': 'notStarted'}); //check in API
  });
// Save button action in EDIT MODE
  $(document).on('click', '.edit-task', function() {
    var taskId = $(this).attr('iid'); // herrrrrrrrrrrrrrrrrrrrrrrrrreeeeeeeee
    console.log(taskId);
    var task = {
      description: $('.taskNameInput').val(),
      task_description: $('.descriptionInput').val(),
      start_date: $('.startDateInput').val(),
      deadline: $('.deadlineInput').val(),
      favorite: $('.create-favorite').attr('fav'),
      status: $('.form-task').attr('status')
    };
    editTaskAPI(taskId, task);
  });
--------------------------------

  var task = {
      description     : $('.taskNameInput').val(),
      task_description: $('.descriptionInput').val(),
      start_date      : $('.startDateInput').val(),
      deadline        : $('.deadlineInput').val(),
      favorite        : $('.create-favorite').attr('fav'),
      status          : $(this).attr('status')
    };
put this variable in global scope, OK but not the "this" !

maybe check with a case switch for start stop and restart and done btn ?

https://stackoverflow.com/questions/34841300/switch-statement-in-jquery-click-handler
---------------------------------------------------

change paint_containers method and remove all display:none ! check with attr "state" to show or hide, or with a function acting on the selector
$(.container- + value +) ?? or 3 function paintcontaienrs ? menu main create ? OR container-menu.siblings.not(tata).hide ?

to display or not a div, play with class or attr and opacity !

mettre restarttask btn example sur bckgd de restarttask-button = div restarttaskbtn delete

merge delete-button class displayed avec buttons status hide ! 
NOOO because delete aussi sur displayed

mettre un if dans remainingDaysIN EDIT SI STARTDATE pas = a TODAY mais dans futur !!! NOOOOOOOOOOOOOOO
---------------------------------------
You can concatenate the variable with the string:
$(".snitches-index-header + .tags-column ." + state + "_count")
If you are trying to use a Template literal then you need to use backticks and the dollar sign not #:
$(`.snitches-index-header + .tags-column .${state}_count`)
----------------------------------------

add current list when adding a task !!  in get task api !!

add SPREAD on Box Shadow (save delete cancel et buttons status)

Uppercase list and task name ? and in .text titre tasks