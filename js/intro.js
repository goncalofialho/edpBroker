$(document).ready(function(){
	$('.info .verify-energy').click(toggleView);
	$('#intro .car-icon').click(toggleView);
	$('.header .home').click(toggleView);
	$('.header .back').click(toggleView);

	/* BUY ENERGY */ 
	$('#buy-energy #main-buy-energy .packages-list .packs .pack').click(toggleBuyPackets)
})

function toggleView(){
  viewId = $(this).attr('target')
  /* ESCONDER TODOS AS VIEWS */
  $('.menu').addClass('hidden-class')
  $('.content').addClass('hidden-class')
  $('.content#'+viewId).removeClass('hidden-class')
  
  /* ESCONDER TODOS OS HEADERS  */
  console.log(viewId)
  $('.header').addClass('hidden-class')
  $('.header[target="'+viewId+'"]').removeClass('hidden-class')
  if(viewId == "intro")
	  $('.menu').removeClass('hidden-class')
}


function toggleBuyPackets(){
	viewId = $(this).attr('target')
	console.log($(this))
	console.log(viewId)
	$('#buy-energy > div').addClass('hidden-class');
	$('#buy-energy #'+viewId).removeClass('hidden-class');
}