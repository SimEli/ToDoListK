$(function(){
  // alert('jQuery est prêt !');
});

// $('p').each(function(){
// $(this).html('Hello World !'); // $(this) représente le paragraphe courant
// });

$('div').on('click', function(){
location.href="menu.html";
});

$(".title-menu-bar").click(function(){
  $('.list-list').toggle();
});