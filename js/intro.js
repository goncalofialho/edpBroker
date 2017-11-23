$(document).ready(function(){
	$('.info .verify-energy').click(toggleView);
	$('#intro .car-icon').click(toggleView);
	$('.header .home').click(toggleView);
	$('.menu .option.stats').click(toggleView);
	$('.menu .option.settings').click(toggleView);
	$('.menu .option.history').click(toggleView);
	$('.header .back').click(toggleBackView);
	$('#settings #main-settings .item[target="bank-account"]').click(toggleView)

	/* BUY ENERGY */
	$('#buy-energy #main-buy-energy .packages-list .packs .pack').click(toggleBuyPackets)
	$('#buy-energy #desc-buy-energy .buy').click(toggleChooseCard)
	$('#buy-energy #method-buy-energy .cards-list .cards .card').click(toggleConfirmBuy)
	$('#buy-energy #confirm-buy-energy .item-infos .infos .finalize').click(toggleConfirmedBuy)
	$('#buy-energy #confirmed-product .item-infos .infos .finalized').click(toggleBackHome)

	/* BANK ACCOUNT */
	$('#bank-account #bank-account-intro *[target="bank-account-edit"]').click(toggleSubView)
	$('#bank-account #bank-account-edit *[target="bank-account-intro"]').click(toggleSubView)

	/* TOGGLE STATS BOXES */
	$('#energy-stats .stats-section .title').click(toggleStats)

})
function toggleSubView(){
	viewId = $(this).attr('target')
	parentId = $(this).attr('parent')
	$('#'+parentId).parent().children().addClass('hidden-class')
	$('#'+parentId).parent().find('#'+viewId).removeClass('hidden-class')
}
function toggleView(){
  viewId = $(this).attr('target')
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
		index = $('.container .content:not(.hidden-class) > div').index($('.container .content:not(.hidden-class) > div:not(.hidden-class)'))
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

function toggleConfirmBuy(){
	viewId = $(this).attr('target')
	$('#buy-energy > div').addClass('hidden-class');
	$('#buy-energy #'+viewId).removeClass('hidden-class');
}

function toggleConfirmedBuy(){
	viewId = $(this).attr('target')
	$('#buy-energy > div').addClass('hidden-class');
	$('#buy-energy #'+viewId).removeClass('hidden-class');
}

function toggleBackHome(){
	viewId = $(this).attr('target')
	$('#buy-energy > div').addClass('hidden-class');
	$('#buy-energy #'+viewId).removeClass('hidden-class');
	goToIntro()
}

function toggleStats(){
	console.log("this")
	$(this).parent().toggleClass('open')
}
