$(document).ready(function(){
    checkLogin();
    $('body').html('<div id="loginBox"><div id="loginTitle">Welcome on TO DO LIST</div>'+standard_login_container(['google'])+'</div>');
    hover_check();
});

function on_login(){
    init_lists();
}

function on_init_lists(){
  $('#loginBox').hide();
  paint_containers();
  show_screen('.main');
  loading_all_my_tasks();
  event_handlers();
}

function event_handlers() {
  
  // menu button action, go menu
  $(document).on('click', '.menu_btn', loading_all_my_lists);

  // Click on AllMyTasks Or Close Button, go to list of allMyTasks=menu
  $(document).on('click', '.close_btn, .all_my_tasks_button', loading_all_my_tasks);

  // logout button action, go back login
  $(document).on('click', '.logout_button', function(){
    logout();
  }); //? if logout in place of fct --> infinite loop login logout ?

  // add Task button action, go to create task
  $(document).on('click', '.add_a_task_button', function(){
    show_screen('.create');
    $('.start_date_input').val(date_of('today'));
    $('.deadline_input').val(date_of('tomorrow'));
    put_list_in_select_api($('.title_of_list').attr('list_id'));
  });

  // Cancel Create/edit Task button action, go to main
  $(document).on('click', '.cancel_button', function(){
    show_screen('.main');
    clear_inputs_and_set_default_attributes();
  });

  // Click on Task Button, go to Edit task
  $(document).on('click', '.task_button', function(){
    show_screen('.create');
    get_task_api($(this).attr('iid'));
  });

  // Click on List Button, go to task of this list
  $(document).on('click', '.list_button', function(){
    var list = {
      id : $(this).attr('list_id'),
      description : $(this).children('.list_name').text()
    };
    loading_tasks_of_this_list(list);
  });

  // Delete button action in EDIT
  $(document).on('click', '.delete_button', function() {
    delete_task_api($(this).parent('[iid]').attr('iid'));
  });

  // 'Stop/Start/Restart/Done task' button action
  $(document).on('click', '.stop_task_btn, .task_done_btn, .restart_task_btn, .start_task_btn', function(){
    edit_task_api(variable_task($(this)));
  });

  // Deadline Button action when NO HOVER on task list
  $(document).on('click', '.deadline_btn', function() {
    $(this).siblings('.tooltip').show();
    remaining_days_in_tooltip($(this).siblings('.tooltip'));
    return false;
  });
  
  // Deadline Button action hover on task list
  $(document).on('mouseenter mouseleave', '.deadline_btn', display_tooltip);
  
  // Check Button action click on task list
  $(document).on('click', '.task_status', function(){
    var task_id = $(this).parent('[iid]').attr('iid');
    var new_status = variables_on_check_click(this);
    edit_task_status_button_api(task_id, new_status);
    return false;
  });

  // Favorite Button action click on task list
  $(document).on('click', '.favorite', function(){
    var task_id = $(this).parent('[iid]').attr('iid');
    var new_val = variables_on_favorite_click(this);
    edit_favorite_button_api(task_id, new_val);
    return false;
  });

// Favorite Button action click on Create Menu
  $(document).on('click', '.create_favorite', function(){
  variables_on_favorite_click(this);
  }); // ? when '()' in function not possible on one line ??

  // Delete list button action in Menu
  $(document).on('click', '.delete_list_button', function(){
    delete_list_api($(this).parent('[list_id]').attr('list_id'));
    number_of_all_my_tasks();
    return false;
  });

  // StartDate/Deadline Input action calculating remaining time in Create Menu
  $(document).on('change', '.start_date_input, .deadline_input', remaining_days_in_edit);

  //click to save and CREATE OR EDIT a task 
  $(document).on('click', '.save_button', function() {
    var task = variable_task($('.form_task'));
    if ((task['description'].length != 0) && (task['related_list_id'] != 'default')) {
      if (task['id'] == 'null') {
        create_task_api(task);
      } else {
        edit_task_api(task);
      }
    } else {
        $('.task_name_input').focus();
        alert('You need to add a task name and/or select a list..');
      }
  });

  // add a List function in menu
  $(document).on('click', '.add_list_button', function() {
    var list = {
      description : $('.list_name_input').val()
    };
    if (list['description'].length != 0) {
      create_list_api(list);
    } else {
      $('.list_name_input').focus();
      }
    $('.list_name_input').val('');
  });
  //this below is end of event_handlers functions
};

function paint_containers() {
  $('body').html('\
    <div class="container main"></div>\
    <div class="container menu"></div>\
    <div class="container create"></div>');
  paint_main_screen();
  paint_menu_screen();
  paint_create_screen();
}

function paint_main_screen() {
  $('.main').html('\
    <div class="title_main_bar">\
      <span class="title_of_list"></span>\
      <div class="menu_btn"></div>\
    </div>\
    <div class="task_list">\
      <div class="list_of_task"></div>\
      <div class="add_a_task_button">\
        <div class="text_in_button">Add a Task</div>\
      </div>\
    </div>');
}

function paint_menu_screen() {
  $('.menu').html('\
    <div class="title_menu_bar">\
      <span class="title_of_list_menu">My To Do List</span>\
      <div class="close_btn"></div>\
    </div>\
    <div class="menu_list">\
      <div class="new_list_name">\
        '+paint_input_list_and_task_name('list_name_input', 'list_name_input', 'New List Name')+'\
        <div class="add_list_button" ></div>\
      </div>\
      <div class="list_of_list"></div>\
      <div class="logout_button">\
        <div class="logout_text text_in_button">Logout</div>\
      </div>\
    </div>');
}

function paint_create_screen() {
  $('.create').html('\
  <div class="title_create_bar">\
  '+paint_input_list_and_task_name('task_name', 'task_name_input new_task_input', 'Task Name')+'\
  <div class="create_favorite" fav="f"></div>\
  </div>\
  <div class="form_task" iid= "null" status="not_started">\
  '+paint_buttons_status_edition()+'\
  '+paint_all_labels_and_inputs()+'\
  <div class="remaining_days_display">Remaining Time: <span class="number_of_days">1</span> day(s)</div>\
  '+paint_buttons_save_cancel_delete()+'\
  </div>');
};

function paint_input_list_and_task_name(name_input, class_name, placeholder) {
  return ('\
  <input type="text" placeholder="'+placeholder+'" name="'+name_input+'" class="'+class_name+'">');
}

function paint_all_labels_and_inputs() {
  return ('\
    '+paint_label_and_input('description', 'Description', 'text', 'task description')+'\
    <div class="label_input">\
      <label for="list">List</label>\
      <select name="list" class="select_list"></select>\
    </div>\
    '+paint_label_and_input('start_date', 'Start Date', 'date', '')+'\
    '+paint_label_and_input('deadline', 'Deadline', 'date', '')+'\
  ');
}

function paint_label_and_input(label, text, type, placeholder) {
  return ('\
    <div class="label_input">\
      <label for="'+label+'">'+text+'</label>\
      <input type="'+type+'" name="'+label+'" class="'+label+'_input new_task_input" placeholder="'+placeholder+'">\
    </div>');
}

function paint_buttons_status_edition() {
  return ('\
  <div class="task_done_stop_task_buttons buttons_status">\
  '+paint_buttons_status('task_done', 'done', 'Task Done')+'\
  '+paint_buttons_status('stop_task', 'not_started', 'Stop Task')+'\
  </div>\
  <div class="start_task_task_done_buttons buttons_status">\
  '+paint_buttons_status('start_task', 'started', 'Start Task')+'\
  '+paint_buttons_status('task_done', 'done', 'Task Done')+'\
  </div>\
  '+paint_buttons_status('buttons_status restart_task', 'started', 'Restart Task')+'\
  ');
}

function paint_buttons_status(btn, status, text) {
  return ('\
  <div class="'+btn+'_btn" status="'+status+'">\
        <div class="text_in_button status_btn">'+text+'</div>\
      </div>');
}

function paint_buttons_save_cancel_delete() {
  return ('\
    '+paint_buttons_s_c_d('save', 'Save')+'\
    '+paint_buttons_s_c_d('cancel', 'Cancel')+'\
    '+paint_buttons_s_c_d('buttons_status delete', 'Delete')+'\
  ');
}

function paint_buttons_s_c_d(btn, text) {
  return ('\
  <div class="'+btn+'_button">\
        <div class="text_in_button">'+text+'</div>\
      </div>');
}

function variables_on_check_click(that) {
  var o = { 'not_started': 'done', 'done': 'not_started', 'started': 'done' };
  var status = $(that).parent('[status]').attr('status');
  var new_status = o[status];
  $(that).parent('[status]').attr('status', new_status);
  return new_status;
}

function variables_on_favorite_click(that) {
  var o = { 't': 'f', 'f': 't' };
  var val = $(that).attr('fav');
  var new_val = o[val];
  $(that).attr('fav', new_val);
  return new_val;
}

function display_tooltip() {
  var this_tooltip = $(this).siblings('.tooltip');
  this_tooltip.toggle();
  remaining_days_in_tooltip(this_tooltip);
  return false;
}

function variable_task(this_selector) {
  return {
    'id'              : this_selector.closest('[iid]').attr('iid'),
    'description'     : $('.task_name_input').val(),
    'task_description': $('.description_input').val(),
    'start_date'      : $('.start_date_input').val(),
    'deadline'        : $('.deadline_input').val(),
    'favorite'        : $('.create_favorite').attr('fav'),
    'status'          : this_selector.attr('status'),
    'related_list_id' : $('.select_list').val()
  };
}

function clear_inputs_and_set_default_attributes() {
  $('.new_task_input').val('');
  $('.buttons_status').hide();
  $('.number_of_days').html('1');
  $('.create_favorite').attr('fav', 'f');
  $('.form_task').attr({ 'iid': 'null', 'status': 'not_started'});
}

function date_of(this_day) {
  var given_day = '';
    if (this_day == 'today') {
      given_day = new Date();
    } else {
      given_day = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
    }
  var day       = ('0' + given_day.getDate()).slice(-2);         // adjust 0 before single digit day
  var month     = ('0' + (given_day.getMonth() + 1)).slice(-2);  // current month
  var year      = given_day.getFullYear();                       // current year
  var given_day = (year + '-' + month + '-' + day);              // prints date in YYYY-MM-DD format
  return given_day ;
}

function remaining_days_in_edit() {
  var today              = new Date(date_of('today'));
  var start_date         = new Date($('.start_date_input').val());
  var deadline           = new Date($('.deadline_input').val());
  var difference_in_time = deadline.getTime() - today.getTime();
  var difference_in_days = Math.round(difference_in_time / (1000 * 3600 * 24));
  
  if (start_date < today || deadline < today) {
    alert('Be Careful, you are going in the past..');
  };
  if  (deadline < start_date) {
    alert('You cannot start a task after the deadline..');
  };
  $('.number_of_days').html(difference_in_days);
}

//!possible de fusionner avec days in edit ? if $this = X alors fais le IF en +
function remaining_days_in_tooltip(this_tooltip) {
  var today              = new Date(date_of('today'));
  var deadline           = new Date(this_tooltip.attr('deadline'));
  var difference_in_time = deadline.getTime() - today.getTime();
  var difference_in_days = Math.round(difference_in_time / (1000 * 3600 * 24));
  $('.message').html(difference_in_days+' day(s) left');
}

function create_list_api(list) {
  api.create_item(
    { 'iclass': 'list' },
    {
      'changes': {
        'description': list['description']
      }
    },
    function (list_id) {
      list['id'] = list_id;
      $('.list_of_list').append(paint_list(list));
    }
  );
}

function create_task_api(task) {
  api.create_item(
    { 'iclass': 'task' },
    {
      'changes': {
        'description'     : task['description'],
        'task_description': task['task_description'],
        'favorite'        : task['favorite'],
        'status'          : task['status'],
        'start_date'      : task['start_date'],
        'deadline'        : task['deadline'],
        'related_list_id' : task['related_list_id']
      },
      'relations': {
        'list': task['related_list_id']
      }
    }, function (task_id) {
      task['id'] = task_id;
      $('.list_of_task').append(paint_task(task));
      show_screen('.main');
      clear_inputs_and_set_default_attributes();
    }
  );
}

function edit_task_api(task) {
  api.edit(
    {
      'iclass': 'task',
      'iid': task['id']
    },
    {
      'changes': task,
      'relations': {
        'list': task['related_list_id']
      }
    }, function (task_id) {
      task['id'] = task_id;
      $('.list_of_task').children('[iid="' + task_id + '"]').replaceWith(paint_task(task));
      show_screen('.main');
      clear_inputs_and_set_default_attributes();
    }
  );
}

function get_task_api(task_id) {
  api.get_item(
    {
      'iclass': 'task',
      'iid': task_id
    },
    function (data) {
      $('.task_name_input').val(data[0]['description']);
      $('.description_input').val(data[0]['task_description']);
      $('.create_favorite').attr('fav', data[0]['favorite']);
      $('.start_date_input').val(data[0]['start_date'].split(' ')[0]);
      $('.deadline_input').val(data[0]['deadline'].split(' ')[0]);
      $('.form_task').attr({'iid': data[0]['id'], 'status': data[0]['status']});
      switch_buttons_status(data[0]['status']);
      remaining_days_in_edit();
      put_list_in_select_api(data[0]['related_list_id']);
    },
      false
  );
}

function put_list_in_select_api(list_id) {
  $('.select_list').html('');
  $('.select_list').append('<option value="default" selected="selected">Select a list</option>');
  api.search_item(
    {
      'iclass':'list',
      'search':''
    },
    {},
    function(data){
      var option='';
      for(var i = 0; i < data.length; i++) {
        var selected = '';
        if (data[i]['id'] == list_id){
          selected ='selected'
        }
        option+='<option value="'+data[i]['id']+'" '+selected+'> '+data[i]['description']+'</option>'  
      }
      $('.select_list').append(option);
    }
  );
}

function switch_buttons_status(status) {
  switch (status) {
    case 'started':
      $('.task_done_stop_task_buttons').show();
      break;
    case 'done':
      $('.restart_task_btn').show();
      break;
    case 'not_started':
      $('.start_task_task_done_buttons').show();
      break;
  }
  $('.delete_button').show();
}

function delete_task_api(task_id) {
  api.delete_item(
    {
      'iclass': 'task',
      'iid': task_id
    },
    function () {
      $('.task_name').parents('[iid="'+task_id+'"]').remove();
      show_screen('.main');
      clear_inputs_and_set_default_attributes();
    }
  );
}

function delete_list_api(list_id) {
  api.delete_item(
    {
      'iclass': 'list',
      'iid': list_id
    },
    function () {
      $('.delete_list_button').parents('[list_id="'+list_id+'"]').remove();
    }
  );
}

function edit_favorite_button_api(task_id, value) {
  api.edit(
    {
      'iclass': 'task',
      'iid': task_id
    },
    {
      'changes': {
        'favorite': value
      }
    }, function () {
    }
  );
}

function edit_task_status_button_api(task_id, value) {
  api.edit(
    {
      'iclass': 'task',
      'iid': task_id
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
function loading_all_my_tasks() {
  $('.list_of_task').html('');
  show_screen('.main');
  $('.title_of_list').html('All My Tasks');
  api.search_item(
    {
      'iclass':'task',
      'search':''
    },
    {'orderby':'deadline ASC'},
    function(data){
      for(var i = 0; i < data.length; i++) {
        $('.list_of_task').append(paint_task(data[i]));
      }
    },
      false
  );
};

function show_screen(screen) {
  $('.container').hide();
  $(screen).show();
}

function number_of_all_my_tasks() {
  api.search_item(
    {
      'iclass':'task',
      'search':''
    },
    {},
    function(data){
      $('.number_of_all_tasks').html("("+data.length+")"); 
    },
      false
  );
};

function loading_tasks_of_this_list(list) {
  $('.list_of_task').html('');
  show_screen('.main');
  api.search_item(
    {
      'iclass':'task',
      'search':''
    },
    {
      'relations':{
        'list':[list['id']]
      }
    },
    function(data){
      for(var i = 0; i < data.length; i++) {
        $('.list_of_task').append(paint_task(data[i]));
      }
      $('.title_of_list').html(list['description']);
      $('.title_of_list').attr('list_id', list['id']);
    }
  );
};

function number_of_tasks_in_this_list(list_id) {
  $('.number_of_tasks').html('');
  api.search_item(
    {
      'iclass':'task',
      'search':''
    },
    {
      'relations':{
        'list':[list_id]
      }
    },
    function(data){
      var number_of_tasks = $('.list_button').find('[list_id="'+list_id+'"]');
        number_of_tasks.html("("+data.length+")");
    }
  );
};

// display new task in task list
function paint_task(task){
  return ('\
  <div class="task_button" iid="'+task['id']+'" status="'+task['status']+'" list_id="'+task['related_list_id']+'">\
    <div class="task_status"></div>\
    <div class="task_name">' + task['description'] + '</div>\
    <div class="tooltip" deadline="'+task['deadline']+'"><div class="message"></div><div class="arrow"></div></div>\
    <div class="deadline_btn"></div>\
    <div class="favorite" fav="'+task['favorite']+'"></div>\
  </div>');
};

function paint_all_my_tasks_button(){
  return ('\
  <div class="all_my_tasks_button">\
    <div class="list_name">All My Tasks</div>\
    <div class="number_of_all_tasks"></div>\
  </div>');
};

function loading_all_my_lists() {
  $('.list_of_list').html('');
  $('.list_of_list').append(paint_all_my_tasks_button());
  show_screen('.menu');
  api.search_item(
    {
      'iclass':'list',
      'search':''
    },
    {},
    function(data){
      for(var i = 0; i < data.length; i++) {
        $('.list_of_list').append(paint_list(data[i]));
        number_of_tasks_in_this_list(data[i]['id']);
      }
    }
  );
  number_of_all_my_tasks();
};

function paint_list(list){
  return ('\
  <div class="list_button" list_id="' + list['id'] + '">\
    <div class="list_name">' + list['description'] + '</div>\
    <div class="number_of_tasks" list_id="' + list['id'] + '">(0)</div>\
    <div class="delete_list_button"></div>\
  </div>');
};

function hover_check() {
  if(matchMedia('(hover: hover)').matches && matchMedia('(pointer:fine)').matches){
    $('body').addClass('has_hover');
  }
};
//! 727 lines !