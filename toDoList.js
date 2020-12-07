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
  $("#closeBtn").on('click', function(){
    $(".container-main").toggle();
    $(".container-menu").hide();
  });

// logout button action, go back login
  $(".logout-bar").on('click', function(){
    $(".container-menu").toggle();
    $(".container-home").show();
  });

  // add Task button action, go to create task
  $(".addATask-bar").on('click', function(){
    $(".container-main").toggle();
    $(".container-create").show();
  });

  // Cancel Create/edit Task button action, go to main
  $(".cancel-bar").on('click', function(){
    $(".container-create").toggle();
    $(".container-main").show();
  });

  // Check Button actions hover and click
  $("#checkBtn").on({
    click: function(){
      $(this).css( "background-image", "url(../images/check.svg)");
    },
    mouseenter: function(){
      $(this).css( "background-image", "url(../images/check.svg)");
    },
    mouseleave: function(){
      $(this).css( "background-image", "url(../images/not_check.svg)");
    }

    
  });



  // input code above, this below is end of ready function
});
