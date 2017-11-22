$(document).ready(function(){
	$('.info .verify-energy').click(toggleView);
	$('#intro .car-icon').click(toggleView);
	$('.header .home').click(toggleView);
	$('.menu .option.stats').click(toggleView);
	$('.header .back').click(toggleBackView);

	/* BUY ENERGY */
	$('#buy-energy #main-buy-energy .packages-list .packs .pack').click(toggleBuyPackets)
	$('#buy-energy #desc-buy-energy .buy').click(toggleChooseCard)

	/* TOGGLE STATS BOXES */
	$('#energy-stats .stats-section .title').click(toggleStats)

})

function toggleView(){
  viewId = $(this).attr('target')
	console.log("1" , $(this))
  /* ESCONDER TODOS AS VIEWS */
  $('.menu').addClass('hidden-class')
  $('.content').addClass('hidden-class')
  $('.content#'+viewId).removeClass('hidden-class')

  /* ESCONDER TODOS OS HEADERS  */
  $('.header').addClass('hidden-class')
  $('.header[target="'+viewId+'"]').removeClass('hidden-class')
  if(viewId == "intro")
	  $('.menu').removeClass('hidden-class')
}

/* VERIFICA SE VOLTAR PARA TRAS É SUBVIEW OU VIEW PRINCIPAL */
function toggleBackView(){
	if(! $('.content:not(.hidden-class) > *').hasClass('hidden-class')){
		goToIntro()
	}else{
		el = $('.content:not(.hidden-class)')
		index = $('#buy-energy > div').index($('#buy-energy > div:not(.hidden-class)'))
		if(index-1 == -1){
			goToIntro()
		}else{
			$('.content:not(.hidden-class) > div').addClass('hidden-class')
			$(el.children().get(index-1)).removeClass('hidden-class')
		}
	}
}
function goToIntro(){
	$('.menu').removeClass('hidden-class')
	$('.content').addClass('hidden-class')
	$('.content#intro').removeClass('hidden-class')
	$('.header').addClass('hidden-class')
	$('.header[target="intro"]').removeClass('hidden-class')
}

function toggleBuyPackets(){
	viewId = $(this).attr('target')
	$('#buy-energy > div').addClass('hidden-class');
	$('#buy-energy #'+viewId).removeClass('hidden-class');
}

function toggleChooseCard(){
	viewId = $(this).attr('target')
	$('#buy-energy > div').addClass('hidden-class');
	$('#buy-energy #'+viewId).removeClass('hidden-class');
}

function toggleStats(){
	console.log("this")
	$(this).parent().toggleClass('open')
}
