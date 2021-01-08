
    * change input date for "datetime" ?  and remove split in edit task

    $(".taskDone-stopTask-buttons").removeClass("displayed");
    $(".delete-button").removeClass("displayed");
    $(".startTask-taskDone-buttons").removeClass("displayed");
    $(".reStartTask-button").removeClass("displayed");


    * attr for CHECKED = sstarted stopped or done. default = not    started
    color for status of each tasks
    --> whitesmoke for "done" = weird
    --> fff3b0 for "started" = not "yellowish" temporarly changed.
    -->  var o={'notStarted':'done','done':'notStarted', 'started':'done'}; check if OK, on click when started = done but on reclick = notStarted (need to go in edit mode and restart task)
    * ! CSS for tooltip ! and tooltip remaining time

    * relations between lists and tasks and in selection list 
      lists = all my tasks with number (array.length)
      + all other lists created (with bin on list-button)
      when click on a list, display "all my tasks" or the clicked named list which all her tasks

OK  * add attr IID in edit mode to use for edit delete tasks and also for check ?

possible to put iid in save btn in place of edittask btn and then delete no need class edittask btn, just check if an iid attr is on save btn then it's an edit mode, if no iid or iid=null then it's save (new one)
