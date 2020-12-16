// var LinkedIn_data={}
// var google_data={}
// var facebook_data={}

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
  // alert('painted?');
  return `
  <!-- content of main screen (all my tasks) below -->

  <div class="container-main">
    <div class="title-main-bar">
      <h1 class="title">All My Tasks</h1>
      <div class="menuBtn"></div>
    </div>
      <div class="task-list">
        <div class="list-of-task">
        </div>
        <div class="addATask-button">
          <h2 class="title">Add a Task</h2>
          <div id="addATaskBtn"></div>
        </div>
      </div>
  </div>

  <!-- content of menu screen (My To Do List) below -->

  <div class="container-menu">
    <div class="title-menu-bar">
      <h1 class="title">My To Do List</h1>
      <div class="closeBtn"></div>
    </div>
      <div class="menu-list">
        <div class="new-list-name">
            <input type="text" placeholder="New List Name" name="listName" class="listName">
            <div class="submit-list" ></div>
        </div>
        <div class="list-of-list">
          <div class="list-button">
            <div class="list-name"><h3>testList nested in html</h3></div>
            <div class="delete-list-button"></div>
          </div>
        </div>
        <br>
        <div class="logout-button">
          <h1 class="title">Logout</h1>
          <div id="logoutBtn"></div>
        </div>
      </div>
  </div>

  <!-- content of create/edit screen below -->

  <div class="container-create">
    <div class="title-create-bar">
      <input type="text" name="taskName" class="taskNameInput" placeholder="Task Name">
      <div class="unFavorite"></div>
    </div>
    <div class="taskDone-stopTask-buttons">
      <div class="taskDone-button">
        <h2 class="title">Task Done</h2>
        <div class="taskDoneBtn"></div>
      </div>
      <div class="stopTask-button">
        <h2 class="title">Stop Task</h2>
        <div class="stopTaskBtn"></div>
      </div>
    </div>
    <div class="startTask-taskDone-buttons">
      <div class="startTask-button">
        <h2 class="title">Start Task</h2>
        <div class="startTaskBtn"></div>
      </div>
      <div class="taskDone-button">
        <h2 class="title">Task Done</h2>
        <div class="taskDoneBtn"></div>
      </div>
    </div>
    <div class="reStartTask-button">
      <div class="reStartTask">
        <h2 class="title">Restart Task</h2>
        <div class="reStartTaskBtn"></div>
      </div>
    </div>
    <div class="form-new-task">
        <div>
          <label for="description">Description</label>
          <input type="text" name="description" class="descriptionInput" placeholder="task description">
        </div>
        <div>
          <label for="list">List</label>
          <select name="list" class="list" placeholder="Select a list here">
            <option value="MFL">My first List</option>
            <option value="MSL">My second List</option>
          </select>
        </div>
        <div>
          <label for="startDate">Start Date</label>
          <input type="date" name="startDate" class="startDateInput">
        </div>
        <div>
          <label for="deadline">Deadline</label>
          <input type="date" name="deadline" class="deadlineInput">
        </div>
        <p class="remainingTime-display">remainingTime-display</p>
        <div class="message"></div>
      <!-- </form> -->
    </div>
    <div class="save-cancel-delete-buttons">
      <div class="save-button">
        <h2 class="title">Save</h2>
        <div class="saveBtn"></div>
      </div>
      <div class="cancel-button">
        <h2 class="title">Cancel</h2>
        <div class="cancelBtn"></div>
      </div>
      <div class="delete-button">
        <h2 class="title">Delete</h2>
        <div class="deleteBtn"></div>
      </div>
    </div>  
  </div> `
}

function event_handlers() {
  
  // menu button action, go menu
  $(document).on('click', '.menuBtn', function(){
    $(".container-menu").show();
    $(".container-main").hide();
  });

  // close button action, go back main
  $(document).on('click', '.closeBtn', function(){
    $(".container-main").show();
    $(".container-menu").hide();
  });

  // logout button action, go back login
  $(document).on('click', '.logout-button', function(){
    $(".container-menu").hide();
    $(".container-main").hide();
    logout();
  });

  // add Task button action, go to create task
  $(document).on('click', '.addATask-button', function(){
    $(".container-main").hide();
    $(".container-create").show();
  });

  // Cancel Create/edit Task button action, go to main
  $(document).on('click', '.cancel-button', function(){
    $(".container-create").hide();
    $(".container-main").show();
    $('.taskNameInput').val('');
    $(".taskDone-stopTask-buttons").removeClass("displayed");
    $(".delete-button").removeClass("displayed");
    $(".startTask-taskDone-buttons").removeClass("displayed");
    $(".reStartTask-button").removeClass("displayed");
  });

  // Click on Task Button, go to Edit task
  $(document).on('click', '.task-name', function(){
    $(".container-main").hide();
    $(".container-create").show();
    $(".taskDone-stopTask-buttons").addClass("displayed");
    $(".delete-button").addClass("displayed");
    var taskId = $(this).parents('[iid]').attr('iid')
    api.get_item(
      {
        'iclass':'task',
        'iid':taskId
      },
      function(data){
        $('.taskNameInput').val(data[0]['description']);
        $('.descriptionInput').val(data[0]['task_description']);
        $('.startDateInput').val(data[0]['start_date'].split(' ')[0]);
        $('.deadlineInput').val(data[0]['deadline'].split(' ')[0]);
      }
    );
    // Delete button action in EDIT
    $('.delete-button').on('click', function() {
      
      api.delete_item(
        {
          'iclass':'task',
          'iid':taskId
        },
        function(){
          $(this).parent(".task-button").remove();
          $(".container-create").hide();
          init_lists();
          $('.taskNameInput').val('');
          $('.descriptionInput').val('');
          $('.startDateInput').val('');
          $('.deadlineInput').val('');
          $(".taskDone-stopTask-buttons").removeClass("displayed");
          $(".delete-button").removeClass("displayed");
        }
      );
      
    });
    // EDIT action and Update it
    var saveTask = $('.save-button');
    saveTask.on('click', function() {
      var task = { 
        description : $('.taskNameInput').val(),
        task_description : $('.descriptionInput').val(),
        start_date : $('.startDateInput').val(),
        deadline : $('.deadlineInput').val()
      }
      api.edit(
        {
          'iclass':'task',
          'iid':taskId
        },
        {
          'changes':{
            'description': task['description'],
            'task_description': task['task_description'],
            // 'favorite': favorite,
            // 'task_done': taskDone,
            'start_date': task['start_date'],
            'deadline': task['deadline']
          }
        },
        $('.task-name').html(paintTask(task))
      );
    });
  });

  // "Stop task" button action, display the "Start Task" button in place
  $(document).on('click', '.stopTask-button', function(){
    $(".taskDone-stopTask-buttons").removeClass("displayed");
    $(".startTask-taskDone-buttons").addClass("displayed");
  });

  // "task done" button action, display "ReStart Task" button in place
  $(document).on('click', '.taskDone-button', function(){
    $(".taskDone-stopTask-buttons").removeClass("displayed");
    $(".startTask-taskDone-buttons").removeClass("displayed");
    $(".reStartTask-button").addClass("displayed");
  });

  // "Restart Task" button action, display "Stop task" button in place
  $(document).on('click', '.reStartTask-button', function(){
    $(".reStartTask-button").removeClass("displayed");
    $(".taskDone-stopTask-buttons").addClass("displayed");
    // $(".startTask-taskDone-buttons").removeClass("displayed");
  });

  // "Start Task" button action, display "Stop task" button in place
  $(document).on('click', '.startTask-button', function(){
    $(".startTask-taskDone-buttons").removeClass("displayed");
    $(".taskDone-stopTask-buttons").addClass("displayed");
    // $(".startTask-taskDone-buttons").removeClass("displayed");
  });

  // Check Button action click on task list
  $(document).on('click', '.uncheckedBtn', function(){
    $(this).toggleClass("checked");
  });

  // Favorite Button action click on task list AND on Create Menu
  $(document).on('click', '.unFavorite', function(){
    $(this).toggleClass("favorite");
  });
  
  // Delete list button action in Menu
  $(document).on('click', '.delete-list-button', function(){
    $(this).parent(".list-button").remove();
    // api.delete_item(
    //   {
    //     'iclass': $(this).parent(".list-button")
    //   },
    //   function(data){
    //     alert('we have successfully eliminated concept number 1 yay!');
    //   }
    // );
  });
  // for deadline tooltip remaining time ?
  //   $( function() {
  //   $( document ).tooltip();
  // } );
    var saveTask = $('.save-button');
    saveTask.on('click', function() {
      var task = { 
        description : $('.taskNameInput').val(),
        task_description : $('.descriptionInput').val(),
        start_date : $('.startDateInput').val(),
        deadline : $('.deadlineInput').val()
      }

      if (task['description'].length != 0) { 

        api.create_item(
          {'iclass':'task'},
          {
            'changes':{
              'description': task['description'],
              'task_description': task['task_description'],
              // 'favorite': favorite,
              // 'task_done': taskDone,
              'start_date': task['start_date'],
              'deadline': task['deadline']
            }
          },
          $('.list-of-task').html(paintTask(task))
        );
        // Save Create/edit Task button action, go to main
        $(".container-create").hide();
        $(".container-main").show();
        $(".taskDone-stopTask-buttons").removeClass("displayed");
        $(".delete-button").removeClass("displayed");
        $(".startTask-taskDone-buttons").removeClass("displayed");
        $(".reStartTask-button").removeClass("displayed");

      } else $('.taskNameInput').focus();
      // clear Inputs after entry 
      $('.taskNameInput').val('');
      $('.descriptionInput').val('');
      $('.startDateInput').val('');
      $('.deadlineInput').val('');
    });

  // add a List function in menu
  $(function() {

    var list = $('.list-of-list');
    var addList = $('.submit-list');

    addList.on('click', function() {
      var text = $('.listName').val();
      if (text.length != 0) {

        api.create_item(
          {'iclass':'list'},
          {
            'changes':{
              'description': text
              }
          },
          function(data){
            list.append('\
          <div class="list-button" iid="'+data+'">\
            <div class="list-name"><h3>' + text + '</h3></div>\
            <div class="delete-list-button"></div>\
          </div>');
          }
        );
      } else $('.listName').focus();
      
      $('.listName').val('');
    }); 
  });
  
  // input code above, this below is end of event_handlers functions
};

// display new task in task list
function paintTask(task){
  return ('\
  <div class="task-button" iid="'+task['id']+'">\
    <div class="check-task_name-onLeft">\
      <div class="uncheckedBtn"></div>\
      <div class="task-name"><h1>' + task['description'] + '</h1></div>\
    </div>\
    <div class="deadline-favorite-onRight">\
      <div class="deadlineBtn" title="Remaining Time : 1s"></div>\
      <div class="unFavorite"></div>\
    </div>\
  </div>');
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
  }

function hover_check() {
  if(matchMedia('(hover: hover)').matches && matchMedia('(pointer:fine)').matches){
    $('body').addClass('has_hover');
  }
}
