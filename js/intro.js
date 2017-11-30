$(document).ready(function(){
	enableClicks();

	// UNCOMMENT TO MAKE DYNAMIC REQUESTS
	getCurrentEnergy()
})

var pack_id = ""
var card_id = ""


function enableClicks(){
	$('body *').off('click');
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
	$('#buy-energy #desc-buy-energy .buy').click(toggleChooseCardgetTransactionDetails)
	$('#buy-energy #method-buy-energy .cards-list .cards .card').click(toggleConfirmBuy)
	$('#buy-energy #confirm-buy-energy .item-infos .infos .finalize').click(toggleConfirmedBuy)
	$('#buy-energy #confirmed-product .item-infos .infos .finalized').click(toggleBackHome)

	/* BANK ACCOUNT */
	$('#bank-account #bank-account-intro *[target="bank-account-edit"]').click(toggleSubView)
	$('#bank-account #bank-account-edit *[target="bank-account-intro"]').click(toggleSubView)

	/* TRANSACTION */
	$('#transactions #main-transactions .transaction-content').click(toggleSubView)
	$('#transactions #transaction-info .transaction-section .title').click(toggleStats)

	/* TOGGLE STATS BOXES */
	$('#energy-stats .stats-section .title').click(toggleStats)
}
function toggleSubView(){
	viewId = $(this).attr('target')
	parentId = $(this).attr('parent')
	$('#'+parentId).parent().children().addClass('hidden-class')
	$('#'+parentId).parent().find('#'+viewId).removeClass('hidden-class')

	if(viewId == "transaction-info"){
		// UNCOMMENT TO MAKE DYNAMIC REQUESTS
		// getCreditCardsSettings($(this).parent().attr("id"))
	}
	if(viewId == "bank-account-edit"){
		// UNCOMMENT TO MAKE DYNAMIC REQUESTS
		// updateCreditCard($(this).closest('.card').attr("id"))
	}

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

	if(viewId == "buy-energy"){
		// UNCOMMENT TO MAKE DYNAMIC REQUESTS
		getPacks()
	}
	if(viewId == "verify-energy"){
		// UNCOMMENT TO MAKE DYNAMIC REQUESTS
		getReservedPacks()
	}
	if(viewId == "buy-energy"){
		// UNCOMMENT TO MAKE DYNAMIC REQUESTS
		getCreditCardsSettings()
	}
	if(viewId == "transactions"){
		// UNCOMMENT TO MAKE DYNAMIC REQUESTS
		getTransactions()
	}

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

	// CHAMAR AQUI A FUNÇÃO getPackDetails
	// UNCOMMENT TO MAKE DYNAMIC REQUESTS
	
	pack_id=$(this).attr('id')
	getPackDetails(pack_id)
}

function toggleChooseCardgetTransactionDetails(){
	viewId = $(this).attr('target')
	$('#buy-energy > div').addClass('hidden-class');
	$('#buy-energy #'+viewId).removeClass('hidden-class');
	// UNCOMMENT TO MAKE DYNAMIC REQUESTS
	
	card_id=$(this).attr('id')
	getCreditCardsMarket()
}

function toggleConfirmBuy(){	
	viewId = $(this).attr('target')
	$('#buy-energy > div').addClass('hidden-class');
	$('#buy-energy #'+viewId).removeClass('hidden-class');
	getConfirmationDetails(pack_id)
}

function toggleConfirmedBuy(){
	viewId = $(this).attr('target')
	$('#buy-energy > div').addClass('hidden-class');
	$('#buy-energy #'+viewId).removeClass('hidden-class');
	addPackToMyList(pack_id,card_id)
}

function toggleBackHome(){
	viewId = $(this).attr('target')
	$('#buy-energy > div').addClass('hidden-class');
	$('#buy-energy #'+viewId).removeClass('hidden-class');
	goToIntro()
}

function toggleStats(){
	$(this).parent().toggleClass('open')
}

// https://webdesign.tutsplus.com/tutorials/auto-formatting-input-value--cms-26745
(function($, undefined) {

    "use strict";

    // When ready.
    $(function() {

        var $input = $( "#ccn-input" );

        $input.on( "keyup", function( event ) {


            // When user select text in the document, also abort.
            var selection = window.getSelection().toString();
            if ( selection !== '' ) {
                return;
            }

            // When the arrow keys are pressed, abort.
            if ( $.inArray( event.keyCode, [38,40,37,39] ) !== -1 ) {
                return;
            }


            var $this = $( this );

            // Get the value.
            var input = $this.val();

            var input = input.replace(/[\D\s\._\-]+/g, "");
                    input = input ? parseInt( input, 10 ) : 0;

                    $this.val( function() {
                        return ( input === 0 ) ? "" : input.toLocaleString( "pt-Pt" );
                    } );
        } );

    });
})(jQuery);


// https://webdesign.tutsplus.com/tutorials/auto-formatting-input-value--cms-26745
(function($, undefined) {

    "use strict";

    // When ready.
    $(function() {

        var $input = $( "#validade" );

        $input.on( "keyup", function( event ) {


            // When user select text in the document, also abort.
            var selection = window.getSelection().toString();
            if ( selection !== '' ) {
                return;
            }

            // When the arrow keys are pressed, abort.
            if ( $.inArray( event.keyCode, [38,40,37,39] ) !== -1 ) {
                return;
            }


            var $this = $( this );

            // Get the value.
            var input = $this.val();

			if ( $.inArray( event.keyCode, [8] ) !== -1  && input.toString().length==2) {
				return input.toString()[0];
			}

            var input = input.replace(/[\D\s\._\-]+/g, "");
                    $this.val( function() {
						var res=input.toString();

						if(res.length>=2)
							res = input.toString().substring(0,2)+"/"+input.toString().substring(2,4);
                        return ( parseInt(input.toString().substring(0,2),10) > 12 || input.toString().substring(0,2)=="00") ? "" : res;
                    } );
        } );

    });
})(jQuery);
