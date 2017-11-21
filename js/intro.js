$(document).ready(function(){
	$('.info .verify-energy').click(toggleView);
	$('#intro .car-icon').click(toggleView);

})

function toggleView(){
	console.log("123123")
  viewId = $(this).attr('target')
  /* ESCONDER TODOS AS VIEWS */
  $('.menu').addClass('hidden-class')
  $('.content').addClass('hidden-class')
  $('.content#'+viewId).removeClass('hidden-class')
  
  /* ESCONDER TODOS OS HEADERS 
  $('.header').addClass('hidden-class')
  $('.header[target="'+viewId+'"]').removeClass('hidden-class')*/
}


