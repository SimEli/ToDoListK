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
      <h1 class="title">All My Tasks</h1>\
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
          <div class="list-button">\
            <div class="list-name"><h3>testList nested in html</h3></div>\
            <div class="delete-list-button"></div>\
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
          <select name="list" class="list" placeholder="Select a list here">\
            <option value="MFL">My first List</option>\
            <option value="MSL">My second List</option>\
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
        <p class="remainingTime-display">remainingTime-display</p>\
        <div class="message"></div>\
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
    $('.container-main').hide();
  });

  // close button action, go back main
  $(document).on('click', '.closeBtn', function(){
    $('.container-main').show();
    $('.container-menu').hide();
  });

  // logout button action, go back login
  $(document).on('click', '.logout-button', function(){
    logout();
  });

  // add Task button action, go to create task
  $(document).on('click', '.addATask-button', function(){
    $('.container-main').hide();
    $('.container-create').show();
    $('.form-task').attr({'iid': 'null', 'status': 'notStarted'}); //check in API
  });

  // Cancel Create/edit Task button action, go to main
  $(document).on('click', '.cancel-button', function(){
    $('.container-create').hide();
    $('.container-main').show();
    $('.newTaskInput').val('');
    $('.buttonsStatus').hide();
    $('.delete-button').removeClass('displayed');
    $('.form-task').attr({'iid': 'null', 'status': 'notStarted'});
  });

  // Click on Task Button, go to Edit task
  $(document).on('click', '.task-name', function(){
    var taskId = $(this).parents('[iid]').attr('iid');
    console.log(taskId);
    $('.container-main').hide();
    $('.container-create').show();
    $('.delete-button').addClass('displayed');
    getTaskAPI(taskId);
//     let date_ob = new Date();

// // adjust 0 before single digit date
// let date = ("0" + date_ob.getDate()).slice(-2);

// // current month
// let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

// // current year
// let year = date_ob.getFullYear();

// // prints date in YYYY-MM-DD format
// console.log(year + "-" + month + "-" + date);
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
  });

// Favorite Button action click on Create Menu
  $(document).on('click', '.create-favorite', function(){
    var o={'t':'f','f':'t'}
    var val=$(this).attr('fav')

    var new_val=o[val]

    console.log(new_val);
    $(this).attr('fav',new_val)
  });

  // Delete list button action in Menu
  $(document).on('click', '.delete-list-button', function(){
    var taskId = $(this).parents('[iid]').attr('iid');
    console.log(taskId);
    deleteListAPI(taskId);
  });

  //click to save and CREATE OR EDIT a task 
  $(document).on('click', '.save-button', function() {
    var taskId = $('div').filter('div.form-task').attr('iid');
    console.log(taskId);

    var task = {
      description     : $('.taskNameInput').val(),
      task_description: $('.descriptionInput').val(),
      start_date      : $('.startDateInput').val(),
      deadline        : $('.deadlineInput').val(),
      favorite        : $('.create-favorite').attr('fav'),
      status          : $('.form-task').attr('status')
    };
    if (task['description'].length != 0) {
      if (taskId == "null") {
        createTaskAPI(task);
      } else {
        editTaskAPI(taskId, task);
      }
    } else $('.taskNameInput').focus();

    $('.newTaskInput').val(''); // clear Inputs after entry
    $('.create-favorite').attr('fav', 'f');
    $('.form-task').attr({'iid': 'null', 'status': 'notStarted'});
  });

  // add a List function in menu
  $(document).on('click', '.submit-list', function() {
    var list = $('.listName').val();
    if (list.length != 0) {
      createListAPI(list);
    } else $('.listName').focus();
    $('.listName').val('');
  });
  //this below is end of event_handlers functions
};

function editStatusOfTask(thisSelector) {
  return {
    description: $('.taskNameInput').val(),
    task_description: $('.descriptionInput').val(),
    start_date: $('.startDateInput').val(),
    deadline: $('.deadlineInput').val(),
    favorite: $('.create-favorite').attr('fav'),
    status: $(thisSelector).attr('status')
  };
}

function createListAPI(list) {
  api.create_item(
    { 'iclass': 'list' },
    {
      'changes': {
        'description': list
      }
    },
    function (list) {
      $('.list-of-list').append(paintList(list));
    }
  );
}

function createTaskAPI(task) {
  api.create_item(
    { 'iclass': 'task' },
    {
      'changes': {
        'description'     : task['description'],
        'task_description': task['task_description'],
        'favorite'        : task['favorite'],
        'start_date'      : task['start_date'],
        'deadline'        : task['deadline'],
        'status'          : task['status']
      }
    }, function (taskId) {
      task['id'] = taskId;
      $('.list-of-task').append(paintTask(task));
      $('.container-create').hide();
      $('.container-main').show();
      $('.form-task').attr({'iid': 'null', 'status': 'notStarted'});
    }
  );
}

function editTaskAPI(taskId, task) {
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
      // 'relations': {
      //   'concept':[2,4,related_concept_iid1,related_concept_iid2,{'id':related_concept_iid3,'qual':'fav'}],
      // }
    }, function (taskId) {
      task['id'] = taskId;
      $('.list-of-task').children('[iid="' + taskId + '"]').replaceWith(paintTask(task));
      $('.container-create').hide();
      $('.container-main').show();
      $('.delete-button').removeClass('displayed');
      $('.buttonsStatus').hide();
      $('.form-task').attr({'iid': 'null', 'status': 'notStarted'}); //check in API
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
      $('.form-task').attr('iid', data[0]['id']);
      $('.taskNameInput').val(data[0]['description']);
      $('.descriptionInput').val(data[0]['task_description']);
      $('.create-favorite').attr('fav', data[0]['favorite']);
      $('.form-task').attr('status', data[0]['status']);
      var status = (data[0]['status']);
      console.log(status);
      switchButtonsStatus(status);
      $('.startDateInput').val(data[0]['start_date'].split(' ')[0]);
      $('.deadlineInput').val(data[0]['deadline'].split(' ')[0]);
      console.log(data[0]['start_date']);
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
      $('.form-task').attr({'iid': 'null', 'status': 'notStarted'});
    }
  );
}

function deleteListAPI(taskId) {
  api.delete_item(
    {
      'iclass': 'list',
      'iid': taskId
    },
    function () {
    $('.delete-list-button').parents('[iid="' + taskId + '"]').remove();
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
  $(".container-main").show();
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
    }
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
      <div class="deadlineBtn" title="Remaining Time : 1s"></div>\
      <div class="favorite" fav="'+task['favorite']+'"></div>\
    </div>\
  </div>');
};

function loadingAllMyLists() {
  $(".container-menu").show();
  api.search_item(
    {
      'iclass':'list',
      'search':''
    },
    {},
    function(data){
      for(var i = 0; i < data.length; i++) {
        $('.list-of-list').append(paintList(data[i]));
      }
    }
  );
};

function paintList(list){
  return ('\
  <div class="list-button" iid="' + list['id'] + '">\
    <div class="list-name"><h3>' + list['description'] + '</h3></div>\
    <div class="delete-list-button"></div>\
  </div>');
};

function hover_check() {
  if(matchMedia('(hover: hover)').matches && matchMedia('(pointer:fine)').matches){
    $('body').addClass('has_hover');
  }
};
