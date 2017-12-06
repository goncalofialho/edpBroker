$(document).ready(function(){
	enableClicks();

	// UNCOMMENT TO MAKE DYNAMIC REQUESTS
	getCurrentEnergy()
})
var checkedItems = {}, counter = 0;
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
	$('#bank-account #bank-account-intro .cards-list .cards .card  .delete ').click(toggleConfirmDelete)
	$('#bank-account #confirm-delete-card .item-infos .infos .finalize').click(toggleConfirmedDelete)
	$('#bank-account #confirmed-delete-card .item-infos .infos .finalized').click(toggleGoToCards)

	/* TRANSACTION */
	$('#transactions #main-transactions .transaction-content').click(toggleSubView)
	$('#transactions #transaction-info .transaction-section .title').click(toggleStats)

	/* TOGGLE STATS BOXES */
	$('#energy-stats .stats-section .title').click(toggleStats)

	/* FILTERS */
	$('.filters .tab-filters > p').click(toggleFilters)
	$('.filters .tab-filters .filter-items > div svg').click(removeSearchLabel)
	$('.filters .tab-filters .search-options .title').click(toggleFilterSubSection)
	$('.filters .tab-filters .search-options .search-option-area .accept-remove-buttons .accept').click(addFilter)
	$('.filters .tab-filters .search-options .search-option-area .accept-remove-buttons .delete').click(removeFilter)

	startSlider()
	minMaxVerify()
	enableCombobox()
}

function toggleSubView(){
	viewId = $(this).attr('target')
	parentId = $(this).attr('parent')
	console.log(viewId)
	if(viewId == "transaction-info"){
		// UNCOMMENT TO MAKE DYNAMIC REQUESTS
		getTransactionDetails($(this).parent().attr("id"));
	}
	if(viewId == "bank-account-edit"){
		// UNCOMMENT TO MAKE DYNAMIC REQUESTS
		cleanFields()
		getCreditCard($(this).closest('.card').attr("id"))
	}if( viewId == "bank-account-intro" && parentId == "bank-account-edit"){
		// UNCOMMENT TO MAKE DYNAMIC REQUESTS
		if(validateCreditCard()){
			create_update_CreditCard($(this).attr("id"))
		}
		else
			return
	}

	$('#'+parentId).parent().children().addClass('hidden-class')
	$('#'+parentId).parent().find('#'+viewId).removeClass('hidden-class')

}

function toggleConfirmDelete(){
	viewId = $(this).attr('target')
	$('#bank-account  > div').addClass('hidden-class');
	$('#bank-account  #'+viewId).removeClass('hidden-class');
	if( viewId == "confirm-delete-card"){
		id =  $(this).parent().closest('.card').attr('id')
		number = $(this).parent().closest('.card').find('.info div:first-child p').text().substring(7)
		titular = $(this).parent().closest('.card').find('.info div:last-child p').text().substring(9)
		$('#bank-account #'+viewId+' .infos .info:first-child').html('<strong>N.C.C: </strong>'+number)
		$('#bank-account #'+viewId+' .infos .info:nth-child(2)').html('<strong>Titular: </strong>'+titular)
		$('#bank-account #'+viewId+' .infos p:nth-child(3)').attr('id',id)
	}
}

function toggleConfirmedDelete(){
	viewId = $(this).attr('target')
	$('#bank-account  > div').addClass('hidden-class');
	$('#bank-account  #'+viewId).removeClass('hidden-class');
	// UNCOMMENT TO MAKE DYNAMIC REQUESTS
	deleteCreditCard($(this).attr('id'))
}

function toggleGoToCards(){
	viewId = $(this).attr('target')
	$('#bank-account  > div').addClass('hidden-class');
	$('#bank-account  #'+viewId).removeClass('hidden-class');
	getCreditCardsSettings()
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
		getProducersList()
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
	if(viewId == "bank-account"){
		getCreditCardsSettings()
	}

}

/* VERIFICA SE VOLTAR PARA TRAS É SUBVIEW OU VIEW PRINCIPAL */
function toggleBackView(){
	if(! $('.content:not(.hidden-class) > *').hasClass('hidden-class')){
		goToIntro()
	}else if($('.content:not(.hidden-class)').attr('id') == "bank-account" && $('.content:not(.hidden-class) > div:not(.hidden-class)').attr('id') == 'confirm-delete-card'){
		$('.content:not(.hidden-class) > div').addClass('hidden-class')
		$('.content:not(.hidden-class) > div#bank-account-intro').removeClass('hidden-class')
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
	card_id = ""

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

function validateCreditCard(){
	$('.content#bank-account #bank-account-edit .edit-field input').removeClass('missing')
	$('.content#bank-account #bank-account-edit .missing-vals').addClass('hidden')
	$('.content#bank-account #bank-account-edit .edit-field input').each(function(){
		if($(this).val() == "")
			$(this).addClass('missing')
	})

	if($('.content#bank-account #bank-account-edit .edit-field input.missing').length > 0){
		$('.content#bank-account #bank-account-edit .missing-vals').removeClass('hidden')
		return false
	}else{
		$('.content#bank-account #bank-account-edit .missing-vals').addClass('hidden')
	}
	return true
}
function cleanFields(){
	$('.content#bank-account #bank-account-edit .edit-field input').removeClass('missing')
	$('.content#bank-account #bank-account-edit .missing-vals').addClass('hidden')
}


function searchFor(category){
	if(! $('.tab-filters').hasClass('search-options'))
		$('.tab-filters').addClass('search-options')
	$('.tab-filters .filter-items > div[searchFor="'+category+'"]').addClass('selected')
	// UNCOMMENT TO MAKE DYNAMIC REQUESTS
	getPacksFiltered()
}

function removeSearchLabel(){
	$(this).parent().removeClass('selected')
	filter = $(this).parent().attr('searchfor')
	$('.filters .tab-filters .search-options .search-option[filter="'+filter+'"] .search-option-area .accept-remove-buttons p').toggleClass('hide')
	if( $('.tab-filters .filter-items > div.selected ').length == 0)
		$('.tab-filters').removeClass('search-options')
	getPacksFiltered()

}
function toggleFilters(){
	$('.tab-filters').toggleClass('open')
	$('.tab-filters > p small').toggleClass('hide')
}
function toggleFilterSubSection(){
	$(this).parent().toggleClass('open')
}
function startSlider(){
	$( function() {
		$( "#price-range" ).slider({
			range: true,
			min: 0,
			max: 300,
			values: [ 0, 50 ],
			slide: function( event, ui ) {
				$('.filters .tab-filters .search-options .price-option .search-option-area .option-section > div:first-child input').first().val(ui.values[ 0 ])
				$('.filters .tab-filters .search-options .price-option .search-option-area .option-section > div:first-child input').last().val(ui.values[ 1 ])

			}
		});
		$('.filters .tab-filters .search-options .price-option .search-option-area .option-section > div:first-child input').first().val(0)
		$('.filters .tab-filters .search-options .price-option .search-option-area .option-section > div:first-child input').last().val(50)

		$( "#watts-range" ).slider({
			range: true,
			min: 0,
			max: 500,
			values: [ 50, 300 ],
			slide: function( event, ui ) {
				$('.filters .tab-filters .search-options .watts-option .search-option-area .option-section > div:first-child input').first().val(ui.values[ 0 ])
				$('.filters .tab-filters .search-options .watts-option .search-option-area .option-section > div:first-child input').last().val(ui.values[ 1 ])

			}
		});
		$('.filters .tab-filters .search-options .watts-option .search-option-area .option-section > div:first-child input').first().val(50)
		$('.filters .tab-filters .search-options .watts-option .search-option-area .option-section > div:first-child input').last().val(300)


		});
}

function minMaxVerify(){
     $( "input[type='number']" ).bind("change paste keyup",function() {
        var max = parseInt($(this).attr('max'));
        var min = parseInt($(this).attr('min'));

				if($(this).val() != ''){
					if($(this).index() == 1){
						if(parseInt($(this).val()) > parseInt($($(this).parent().find("input")[1]).val()))
							$(this).val($($(this).parent().find("input")[1]).val())
					}else{
						if(parseInt($(this).val()) < parseInt($($(this).parent().find("input")[0]).val()))
							$(this).val($($(this).parent().find("input")[0]).val())
					}
				}
        if ($(this).val() > max)
        {
            $(this).val(max);
        }
        else if ($(this).val() < min || $(this).val() == '')
        {
            $(this).val(min);
        }else if ($(this).val()[0] == '0' && $(this).val().length > 1){
					$(this).val($(this).val().substring(1))
				}

				$(this).parent().parent().find('.ui-slider').slider('values',0,parseInt($($(this).parent().find("input")[0]).val()))
				$(this).parent().parent().find('.ui-slider').slider('values',	1,parseInt($($(this).parent().find("input")[1]).val()))
      });

  }

function addFilter(){
	filter = $(this).closest('.search-option').attr('filter')
	searchFor(filter)
	$(this).parent().find('p').toggleClass('hide')

}

function removeFilter(){
	filter = $(this).closest('.search-option').attr('filter')
	removeLabel(filter)
	$(this).parent().find('p').toggleClass('hide')

}

function removeLabel(filter){
	$('.tab-filters .filter-items > div[searchFor="'+filter+'"]').removeClass('selected')
	if( $('.tab-filters .filter-items > div.selected ').length == 0)
		$('.tab-filters').removeClass('search-options')

}

function enableCombobox(){
	$('.list-group.checked-list-box .list-group-item').each(function () {

        // Settings
        var $widget = $(this),
            $checkbox = $('<input type="checkbox" class="hidden" />'),
            color = ($widget.data('color') ? $widget.data('color') : "primary"),
            style = ($widget.data('style') == "button" ? "btn-" : "list-group-item-"),
            settings = {
                on: {
                    icon: 'glyphicon glyphicon-check'
                },
                off: {
                    icon: 'glyphicon glyphicon-unchecked'
                }
            };

        $widget.css('cursor', 'pointer')
        $widget.append($checkbox);

        // Event Handlers
        $widget.on('click', function () {
            $checkbox.prop('checked', !$checkbox.is(':checked'));
            $checkbox.triggerHandler('change');
            updateDisplay();
        });
        $checkbox.on('change', function () {
            updateDisplay();
        });


        // Actions
        function updateDisplay() {
            var isChecked = $checkbox.is(':checked');

            // Set the button's state
            $widget.data('state', (isChecked) ? "on" : "off");

            // Set the button's icon
            $widget.find('.state-icon')
                .removeClass()
                .addClass('state-icon ' + settings[$widget.data('state')].icon);

            // Update the button's color
            if (isChecked) {
                $widget.addClass(style + color + ' active');
            } else {
                $widget.removeClass(style + color + ' active');
            }

						// Update lists
						checkedItems = {}
						counter = 0
						$(".checked-list-box li.active").each(function(idx, li) {
							checkedItems[counter] = $(li).text();
							counter++;
        		})
					}

        // Initialization
        function init() {

            if ($widget.data('checked') == true) {
                $checkbox.prop('checked', !$checkbox.is(':checked'));
            }

            updateDisplay();

            // Inject the icon if applicable
            if ($widget.find('.state-icon').length == 0) {
                $widget.prepend('<span class="state-icon ' + settings[$widget.data('state')].icon + '"></span>');
            }
        }
        init();




    });

		$('.filters .tab-filters .search-option[filter="producer"] .option-section input').keyup(enableFiltering)

		function enableFiltering(){
			var that = this, $allListElements = $(this).parent().find('.well ul > li');

			var $matchingListElements = $allListElements.filter(function(i, li){
					var listItemText = $(li).text().toUpperCase(), searchText = that.value.toUpperCase();
					return ~listItemText.indexOf(searchText);
			});

			$allListElements.hide();
			$matchingListElements.show();
		}
}

function getFilters(){
	filters = {	}
	$('.filters .tab-filters.search-options .filter-items > .selected').each(function(){
		filter_type = $(this).attr('searchfor')

		data = $(this).closest('.tab-filters').find('.search-options > div[filter="'+filter_type+'"]')
		var val = [];
		if(filter_type == 'price' || filter_type=='watts'){
			val = [parseInt(data.find('input').first().val()) , parseInt(data.find('input').last().val()) ]
		}else if (filter_type=='producer'){
			data.find('ul li.active').each(function(){
				val.push($(this).text())
			})
		}
		filters[filter_type] = val
	})
	return filters
}
