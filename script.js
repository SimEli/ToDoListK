$(document).ready(function(){
    checkLogin();
    $('body').html('<div id="loginBox"><div id="loginTitle">Welcome on TO DO LIST</div>'+standard_login_container(['google'])+'</div>');
    hover_check();
});

function on_login(){
    init_lists();
}

function on_init_lists(){
  $('#login_container,#loginTitle').hide();
  $('body').html(paint_containers());
    event_handlers();
    loadingAllMyTasks();
}

function paint_containers() {
  return ('\
  <!-- content of main screen (all my tasks) below -->\
  <div class="container-main">\
    <div class="title-main-bar">\
      <h1 class="title-of-list">All My Tasks</h1>\
      <div class="menuBtn"></div>\
    </div>\
      <div class="task-list">\
        <div class="list-of-task">\
        </div>\
        <div class="addATask-button">\
          <h2 class="title">Add a Task</h2>\
          <div id="addATaskBtn"></div>\
        </div>\
      </div>\
  </div>\
  <!-- content of menu screen (My To Do List) below -->\
  <div class="container-menu">\
    <div class="title-menu-bar">\
      <h1 class="title">My To Do List</h1>\
      <div class="closeBtn"></div>\
    </div>\
      <div class="menu-list">\
        <div class="new-list-name">\
            <input type="text" placeholder="New List Name" name="listName" class="listName">\
            <div class="submit-list" ></div>\
        </div>\
        <div class="list-of-list">\
          <div class="allMyTasks-button">\
            <div class="list-name"><h3>All My Tasks</h3></div>\
            <div class="numberOfAllTasks"></div>\
          </div>\
        </div>\
        <br>\
        <div class="logout-button">\
          <h1 class="title">Logout</h1>\
          <div id="logoutBtn"></div>\
        </div>\
      </div>\
  </div>\
  <!-- content of create/edit screen below -->\
  <div class="container-create">\
    <div class="title-create-bar">\
      <input type="text" name="taskName" class="taskNameInput newTaskInput" placeholder="Task Name">\
      <div class="create-favorite" fav="f"></div>\
    </div>\
    <div class="taskDone-stopTask-buttons buttonsStatus">\
      <div class="taskDone-button" status="done">\
        <h2 class="title">Task Done</h2>\
        <div class="taskDoneBtn"></div>\
      </div>\
      <div class="stopTask-button" status="notStarted">\
        <h2 class="title">Stop Task</h2>\
        <div class="stopTaskBtn"></div>\
      </div>\
    </div>\
    <div class="startTask-taskDone-buttons buttonsStatus">\
      <div class="startTask-button" status="started">\
        <h2 class="title">Start Task</h2>\
        <div class="startTaskBtn"></div>\
      </div>\
      <div class="taskDone-button" status="done">\
        <h2 class="title">Task Done</h2>\
        <div class="taskDoneBtn"></div>\
      </div>\
    </div>\
    <div class="reStartTask-button buttonsStatus">\
      <div class="reStartTask" status="started">\
        <h2 class="title">Restart Task</h2>\
        <div class="reStartTaskBtn"></div>\
      </div>\
    </div>\
    <div class="form-task">\
        <div>\
          <label for="description">Description</label>\
          <input type="text" name="description" class="descriptionInput newTaskInput" placeholder="task description">\
        </div>\
        <div>\
          <label for="list">List</label>\
          <select name="list" class="select-list">\
          </select>\
        </div>\
        <div>\
          <label for="startDate">Start Date</label>\
          <input type="date" name="startDate" class="startDateInput newTaskInput">\
        </div>\
        <div>\
          <label for="deadline">Deadline</label>\
          <input type="date" name="deadline" class="deadlineInput newTaskInput">\
        </div>\
        <div class="remainingDays-display">Remaining Time:<span class="numberOfDays"></span>day(s)</div>\
      <!-- </form> -->\
    </div>\
    <div class="save-cancel-delete-buttons">\
      <div class="save-button">\
        <h2 class="title">Save</h2>\
        <div class="saveBtn"></div>\
      </div>\
      <div class="cancel-button">\
        <h2 class="title">Cancel</h2>\
        <div class="cancelBtn"></div>\
      </div>\
      <div class="delete-button">\
        <h2 class="title">Delete</h2>\
        <div class="deleteBtn"></div>\
      </div>\
    </div>\
  </div>');
};

function event_handlers() {
  
  // menu button action, go menu
  $(document).on('click', '.menuBtn', function(){
    loadingAllMyLists();
  });

  // close button action, go back main
  $(document).on('click', '.closeBtn', function(){
    loadingAllMyTasks();
  });

  // logout button action, go back login
  $(document).on('click', '.logout-button', function(){
    logout();
  });

  // add Task button action, go to create task
  $(document).on('click', '.addATask-button', function(){
    $('.container-main').hide();
    $('.container-create').show();
    $('.startDateInput').val(todayDate());
    $('.deadlineInput').val(tomorrowDate());
    $('.form-task').attr({'iid': 'null', 'status': 'notStarted', 'remainingDays': 1});
    putListInSelectAPI();
  });

  // Cancel Create/edit Task button action, go to main
  $(document).on('click', '.cancel-button', function(){
    $('.container-create').hide();
    $('.container-main').show();
    $('.newTaskInput').val('');
    $('.buttonsStatus').hide();
    $('.delete-button').removeClass('displayed');
    $('.form-task').attr({'iid': 'null', 'status': 'notStarted', 'remainingDays': 1});
  });

 // Click on AllMyTasks Button, go to list of allMyTasks
  $(document).on('click', '.allMyTasks-button', function(){
    loadingAllMyTasks();
  });

  // Click on Task Button, go to Edit task
 $(document).on('click', '.task-button', function(){
  var taskId = $(this).attr('iid');
  console.log(taskId);
  $('.container-main').hide();
  $('.container-create').show();
  $('.delete-button').addClass('displayed');
  getTaskAPI(taskId);
  putListInSelectAPI();
});

  // Click on List Button, go to task of this list
  $(document).on('click', '.list-button', function(){
    var listId = $(this).attr('listId');
    // console.log(listId);
    var list = {
      description : $(this).children('.list-name').text()
    };
    loadingTasksOfThisList(listId, list);
  });

  // Delete button action in EDIT
  $(document).on('click', '.delete-button', function() {
    var taskId = $('div').filter('div.form-task').attr('iid');
    console.log(taskId);
    deleteTaskAPI(taskId);
  });

  // "Stop task" button action, display the "Start Task" button in place
  $(document).on('click', '.stopTask-button', function(){
    var taskId = $('div').filter('div.form-task').attr('iid');
    // console.log(taskId);
    var task = {
      description     : $('.taskNameInput').val(),
      task_description: $('.descriptionInput').val(),
      start_date      : $('.startDateInput').val(),
      deadline        : $('.deadlineInput').val(),
      favorite        : $('.create-favorite').attr('fav'),
      remaining_days  : $('.form-task').attr('remainingDays'),
      status          : $(this).attr('status')
    };
    editTaskAPI(taskId, task);
    var status = task['status'];
    console.log(status);
  });

  // 'task done' button action, display 'ReStart Task' button in place
  $(document).on('click', '.taskDone-button', function(){
    var taskId = $('div').filter('div.form-task').attr('iid');
    // console.log(taskId);
    var task = {
      description     : $('.taskNameInput').val(),
      task_description: $('.descriptionInput').val(),
      start_date      : $('.startDateInput').val(),
      deadline        : $('.deadlineInput').val(),
      favorite        : $('.create-favorite').attr('fav'),
      remaining_days  : $('.form-task').attr('remainingDays'),
      status          : $(this).attr('status')
    };
    editTaskAPI(taskId, task);
    var status = task['status'];
    console.log(status);
  });

  // "Restart Task" button action, display "Stop task" button in place
  $(document).on('click', '.reStartTask', function(){
    var taskId = $('div').filter('div.form-task').attr('iid');
    // console.log(taskId);
    var task = {
      description     : $('.taskNameInput').val(),
      task_description: $('.descriptionInput').val(),
      start_date      : $('.startDateInput').val(),
      deadline        : $('.deadlineInput').val(),
      favorite        : $('.create-favorite').attr('fav'),
      remaining_days  : $('.form-task').attr('remainingDays'),
      status          : $(this).attr('status')
    };
    editTaskAPI(taskId, task);
    var status = task['status'];
    console.log(status);
  });

  // 'Start Task' button action, display 'Stop task' button in place
  $(document).on('click', '.startTask-button', function(){
    var taskId = $('div').filter('div.form-task').attr('iid');
    // console.log(taskId);
    var task = {
      description     : $('.taskNameInput').val(),
      task_description: $('.descriptionInput').val(),
      start_date      : $('.startDateInput').val(),
      deadline        : $('.deadlineInput').val(),
      favorite        : $('.create-favorite').attr('fav'),
      remaining_days  : $('.form-task').attr('remainingDays'),
      status          : $(this).attr('status')
    };
    editTaskAPI(taskId, task);
    var status = task['status'];
    console.log(status);
  });

  // Check Button action click on task list
  $(document).on('click', '.taskStatus', function(){
    var o={'notStarted':'done','done':'notStarted', 'started':'done'};
    var status=$(this).parents('[status]').attr('status');
    console.log(status);
    var new_status=o[status];

    console.log(new_status);
    $(this).parents('[status]').attr('status', new_status);

    var taskId = $(this).parents('[iid]').attr('iid');
    
    editTaskStatusButtonAPI(taskId, new_status);
    return false; //to avoid clicking on task-button too !
  });

  // Deadline Button action hover on task list
  $(document).on('mouseenter', '.deadlineBtn', function() {
    var thisTooltip = $(this).siblings('.tooltip');
    thisTooltip.addClass('displayed');
    remainingDaysInTooltip(thisTooltip);
  });
  $(document).on('mouseleave', '.deadlineBtn', function() {
    $(this).siblings('.tooltip').removeClass('displayed');
  });

  // Favorite Button action click on task list
  $(document).on('click', '.favorite', function(){
    var o={'t':'f','f':'t'};
    var val=$(this).attr('fav');

    var new_val=o[val];

    console.log(new_val);
    $(this).attr('fav', new_val);

    var taskId = $(this).parents('[iid]').attr('iid');
    
    editFavoriteButtonAPI(taskId, new_val);
    return false; //to avoid clicking on task-button too !
  });

// Favorite Button action click on Create Menu
  $(document).on('click', '.create-favorite', function(){
    var o={'t':'f','f':'t'}
    var val=$(this).attr('fav')

    var new_val=o[val]

    console.log(new_val);
    $(this).attr('fav',new_val);
  });

  // Delete list button action in Menu
  $(document).on('click', '.delete-list-button', function(){
    var listId = $(this).parents('[listId]').attr('listId');
    console.log(listId);
    deleteListAPI(listId);
  });

  // StartDate Input action calculating remaining time in Create Menu
  $(document).on('change', '.startDateInput', function(){
    remainingDaysInEdit();
  });

 // Deadline Input action calculating remaining time in Create Menu
  $(document).on('change', '.deadlineInput', function(){
    remainingDaysInEdit();
  });

  // addind attribute listId on form task in Create Menu
  // $(document).on('click', '.select-list', function(){
  //   listSelected = ( $(".select-list option:selected").val() );
  //   $('.form-task').attr('listId', listSelected);
  // });

  //click to save and CREATE OR EDIT a task 
  $(document).on('click', '.save-button', function() {
    var taskId = $('div').filter('div.form-task').attr('iid');
    console.log(taskId);
    var listId =$(".select-list option:selected").val();
    console.log(listId);
    // var listId = $('div').filter('div.form-task').attr('listId');
    // console.log(listId);
    var task = {
      description     : $('.taskNameInput').val(),
      task_description: $('.descriptionInput').val(),
      start_date      : $('.startDateInput').val(),
      deadline        : $('.deadlineInput').val(),
      favorite        : $('.create-favorite').attr('fav'),
      remaining_days  : $('.form-task').attr('remainingDays'),
      status          : $('.form-task').attr('status')
    };
    if (task['description'].length != 0) {
      if (taskId == "null") {
        createTaskAPI(task, listId);
      } else {
        editTaskAPI(taskId, task, listId);
      }
    } else $('.taskNameInput').focus();

    $('.newTaskInput').val(''); // clear Inputs after entry
    $('.create-favorite').attr('fav', 'f');
    $('.form-task').attr({'iid': 'null', 'status': 'notStarted', 'remainingDays': 1});
  });

  // add a List function in menu
  $(document).on('click', '.submit-list', function() {
    var list = {
      description : $('.listName').val()
    };
    if (list.length != 0) {
      createListAPI(list);
    } else $('.listName').focus();
    $('.listName').val('');
  });
  //this below is end of event_handlers functions
};

function todayDate() {
  var today = new Date();
  var day   = ("0" + today.getDate()).slice(-2);       // adjust 0 before single digit day
  var month = ("0" + (today.getMonth() + 1)).slice(-2);// current month
  var year  = today.getFullYear();                     // current year
  var today = (year + "-" + month + "-" + day);        // prints date in YYYY-MM-DD format
  // console.log(today); 
  return today ;
}

function tomorrowDate() {
  var tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
  var day      = ("0" + tomorrow.getDate()).slice(-2);
  var month    = ("0" + (tomorrow.getMonth() + 1)).slice(-2);
  var year     = tomorrow.getFullYear();
  var tomorrow = (year + "-" + month + "-" + day);
  // console.log(tomorrow);
  return tomorrow ;
}

function remainingDaysInEdit() {
  var todaysDate         = todayDate();
  var deadline           = $('.deadlineInput').val();
  var date1              = new Date(todaysDate);
  var date2              = new Date(deadline);
  var Difference_In_Time = date2.getTime() - date1.getTime();
  var Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));
  $(".numberOfDays").text(Difference_In_Days);
  $('.form-task').attr('remainingDays', Difference_In_Days);
  $(".message").text(Difference_In_Days);
}

function remainingDaysInTooltip(thisTooltip) {
  var todaysDate         = todayDate();
  var deadline           = thisTooltip.attr('deadline');
  var date1              = new Date(todaysDate);
  var date2              = new Date(deadline);
  var Difference_In_Time = date2.getTime() - date1.getTime();
  var Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));
  $(".message").text(Difference_In_Days + " day(s) left");
}
// function editStatusOfTask(thisSelector) {
//   return {
//     description: $('.taskNameInput').val(),
//     task_description: $('.descriptionInput').val(),
//     start_date: $('.startDateInput').val(),
//     deadline: $('.deadlineInput').val(),
//     favorite: $('.create-favorite').attr('fav'),
//     status: $(thisSelector).attr('status')
//   };
// }

function createListAPI(list) {
  api.create_item(
    { 'iclass': 'list' },
    {
      'changes': {
        'description': list['description']
      }
    },
    function (listId) {
      list['id'] = listId;
      // console.log(list);
      $('.list-of-list').append(paintList(list));
    }
  );
}

function createTaskAPI(task, listId) {
  api.create_item(
    { 'iclass': 'task' },
    {
      'changes': {
        'description'     : task['description'],
        'task_description': task['task_description'],
        'favorite'        : task['favorite'],
        'status'          : task['status'],
        'start_date'      : task['start_date'],
        'deadline'        : task['deadline']
      },
      'relations': {
        'list':[listId]
      }
    }, function (taskId) {
      task['id'] = taskId;
      $('.list-of-task').append(paintTask(task));
      $('.container-create').hide();
      $('.container-main').show();
      $('.form-task').attr({'iid': 'null', 'status': 'notStarted', 'remainingDays': 1});
    }
  );
}

function editTaskAPI(taskId, task, listId) {
  api.edit(
    {
      'iclass': 'task',
      'iid': taskId
    },
    {
      'changes': {
        'description'     : task['description'],
        'task_description': task['task_description'],
        'favorite'        : task['favorite'],
        'status'          : task['status'],
        'start_date'      : task['start_date'],
        'deadline'        : task['deadline']
      },
      'relations': {
        'list':[listId]
      }
    }, function (taskId) {
      task['id'] = taskId;
      $('.list-of-task').children('[iid="' + taskId + '"]').replaceWith(paintTask(task));
      $('.container-create').hide();
      $('.container-main').show();
      $('.delete-button').removeClass('displayed');
      $('.buttonsStatus').hide();
      $('.form-task').attr({'iid': 'null', 'status': 'notStarted', 'remainingDays': 1});
    }
  );
}

function getTaskAPI(taskId) {
  api.get_item(
    {
      'iclass': 'task',
      'iid': taskId
    },
    function (data) {
      $('.taskNameInput').val(data[0]['description']);
      $('.descriptionInput').val(data[0]['task_description']);
      $('.create-favorite').attr('fav', data[0]['favorite']);
      $('.startDateInput').val(data[0]['start_date'].split(' ')[0]);
      $('.deadlineInput').val(data[0]['deadline'].split(' ')[0]);
      $('.form-task').attr('iid', data[0]['id']);
      $('.form-task').attr('status', data[0]['status']);
      var status = (data[0]['status']);
      switchButtonsStatus(status);
      remainingDaysInEdit();
    }
  );
}

function putListInSelectAPI() {
  $('.select-list').html('');
  api.search_item(
    {
      'iclass':'list',
      'search':''
    },
    {},
    function(data){
      for(var i = 0; i < data.length; i++) {
        $('.select-list').append('<option value="' + data[i]['id'] + '"> ' + data[i]['description'] + '</option>');
      }
    }
  );
}

function switchButtonsStatus(status) {
  switch (status) {
    case 'started':
      $('.taskDone-stopTask-buttons').show();
      break;
    case 'done':
      $('.reStartTask-button').show();
      break;
      case 'notStarted':
      $('.startTask-taskDone-buttons').show();
      break;
  }
}

function deleteTaskAPI(taskId) {
  api.delete_item(
    {
      'iclass': 'task',
      'iid': taskId
    },
    function () {
      $('.task-name').parents('[iid="' + taskId + '"]').remove();
      $('.container-create').hide();
      $('.container-main').show();
      $('.newTaskInput').val('');
      $('.buttonsStatus').hide();
      $('.delete-button').removeClass('displayed');
      $('.form-task').attr({'iid': 'null', 'status': 'notStarted', 'remainingDays': 1});
    }
  );
}

function deleteListAPI(listId) {
  api.delete_item(
    {
      'iclass': 'list',
      'iid': listId
    },
    function () {
    $('.delete-list-button').parents('[listId="' + listId + '"]').remove();
    }
  );
}

function editFavoriteButtonAPI(taskId, value) {
  api.edit(
    {
      'iclass': 'task',
      'iid': taskId
    },
    {
      'changes': {
        'favorite': value
      }
    }, function () {
    // $(this).attr('fav',new_val);
    }
  );
}

function editTaskStatusButtonAPI(taskId, value) {
  api.edit(
    {
      'iclass': 'task',
      'iid': taskId
    },
    {
      'changes': {
        'status': value
      }
    }, function () {

    }
  );
}

// main menu with tasks loaded from DB
function loadingAllMyTasks() {
  $('.list-of-task').html('');
  $('.container-main').show();
  $('.container-menu').hide();
  $(".title-of-list").text('All My Tasks');
  api.search_item(
    {
      'iclass':'task',
      'search':''
    },
    {},
    function(data){
      for(var i = 0; i < data.length; i++) {
        $('.list-of-task').append(paintTask(data[i]));
      }
      // console.log(data.length);
    }
  );
};

function numberOfAllMyTasks() {
  api.search_item(
    {
      'iclass':'task',
      'search':''
    },
    {},
    function(data){
      $(".numberOfAllTasks").text("( " + data.length + " )");
    }
  );
};

function loadingTasksOfThisList(listId, list) {
  $('.list-of-task').html('');
  $('.container-main').show();
  $('.container-menu').hide();
  api.search_item(
    {
      'iclass':'task',
      'search':''
    },
    {
      'relations':{
        'list':[listId]
      }
    },
    function(data){
      for(var i = 0; i < data.length; i++) {
        $('.list-of-task').append(paintTask(data[i]));
      }
      console.log(data.length);
      $(".title-of-list").text(list['description']);

    }
  );
};

function numberOfTasksInThisList(listId) {
  api.search_item(
    {
      'iclass':'task',
      'search':''
    },
    {
      'relations':{
        'list':[listId]
      }
    },
    function(data){
      var listId = $(".numberOfTasks").parent('[listId]').attr('listId');

      // for(var i = 0; i < data.length; i++) {
        console.log(data);
        console.log(data.length);
        console.log(listId);
        $(".numberOfTasks").parent('[listId]').attr('listId').text("( " + data.length + " )");
      }
    // }
  );
};

// display new task in task list
function paintTask(task){
  return ('\
  <div class="task-button" iid="'+task['id']+'" status="'+task['status']+'">\
    <div class="check-task_name-onLeft">\
      <div class="taskStatus"></div>\
      <div class="task-name"><h1>' + task['description'] + '</h1></div>\
    </div>\
    <div class="deadline-favorite-onRight">\
      <div class="tooltip" deadline="'+task['deadline']+'"><div class="message"></div><div class="arrow"></div></div>\
      <div class="deadlineBtn"></div>\
      <div class="favorite" fav="'+task['favorite']+'"></div>\
    </div>\
  </div>');
};

function loadingAllMyLists() {
  $('.list-button').remove();
  // remove because html don't work and cannot do it on list of list because keep allMytasks button
  $('.container-menu').show();
  $('.container-main').hide();
  api.search_item(
    {
      'iclass':'list',
      'search':''
    },
    {},
    function(data){
      for(var i = 0; i < data.length; i++) {
        $('.list-of-list').append(paintList(data[i]));
        var listId = data[i]['id'];
        console.log(listId);
        numberOfTasksInThisList(listId);
      }
    }
  );
  // var listId = $('div').filter('div.list-button').attr('listId');
  numberOfAllMyTasks();
};

function paintList(list){
  return ('\
  <div class="list-button" listId="' + list['id'] + '">\
    <div class="list-name"><h3>' + list['description'] + '</h3></div>\
    <div class="numberOfTasks">' + list.length + '</div>\
    <div class="delete-list-button"></div>\
  </div>');
};

function hover_check() {
  if(matchMedia('(hover: hover)').matches && matchMedia('(pointer:fine)').matches){
    $('body').addClass('has_hover');
  }
};
