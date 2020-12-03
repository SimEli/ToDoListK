$(function(){
  alert('jQuery est prêt !');

  $("container-main").hide();

  $(".submit").on('click', function(){

    $("container-main").toggle();
    $("container-home").toggle();
  });

  $("container-menu").hide();
  $("container-create").hide();
  
  // $(".submit").on('click', function(){

  //   $("container-main").toggle();
  // });

});



// $(".title-menu-bar").click(function(){
//   $('.list-list').toggle();

// $('div').on('click', function(){
// location.href="menu.html";
// });
