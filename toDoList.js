$(function(){
  console.log('jQuery est prêt !');

  // $(".container-main").hide();
});
    $("#enter").on('click', function(){

      $(".container-main").toggle();
      $(".container-home").hide();
    });

  homePage();
  
  // $(".submit").on('click', function(){

  //   $("container-main").toggle();
  // });






function homePage() {
  $(".container-menu").hide();
  $(".container-create").hide();
}
// $(".title-menu-bar").click(function(){
//   $('.list-list').toggle();

// $('div').on('click', function(){
// location.href="menu.html";
// });
