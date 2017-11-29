// THIS FILE CONTAINS THE REQUESTS TO THE APP



// request current energy
function getCurrentEnergy(){
  /* THIS CODE GOES INSIDE AJAX FUNCTION */

  percentage = 50 // VALUE RETRIEVED
  $("#intro .circle .edp-color").removeClass (function (index, className) {
    return (className.match (/(^|\s)p\S+/g) || []).join(' ');
  });
  $("#intro .circle .edp-color").addClass('p'+percentage);
  $("#intro .circle .edp-color span").text(percentage+"%");
  $('.content#verify-energy .packages-list:not(.reserved) .pack .bar  .percentage').css('width', percentage+'%')
  $('.content#verify-energy .packages-list:not(.reserved) .pack .bar  p').text(percentage+'%')

}

function getReservedPacks(){
  /* THIS CODE GOES INSIDE AJAX FUNCTION */

  l = ["GreenLight", "BlueOcean", "CloudWind", "FireRed", "EarthStone"] // VALIE RETRIEVED
  clone = $('.content#verify-energy .packages-list.reserved .packs.template').clone()

  // REMOVING ALL TRASH ELEMENTS
  $('.content#verify-energy .packages-list.reserved .packs:not(.template)').remove()

  l.forEach(function(element){
    pack = clone.clone()
    pack.removeClass('template')
    pack.find('.pack > p').text("Pacote" + element)
    $('.content#verify-energy .packages-list.reserved').append(pack)
  })

}

function getPacks(){
  l = [{"Name": "GreenLight" , "Company": "AlenSolar" , "Watts": 350 , "Duration" : "2 Meses"},
      {"Name": "BlueEnergie" , "Company": "EDP" , "Watts": 150 , "Duration" : "1 Mes"}] // VALUES RETRIEVED

  clone = $('.content#buy-energy #main-buy-energy .pack.template').clone()

  // REMOVING ALL TRASH
  $('.content#buy-energy #main-buy-energy .pack:not(.template)').remove()

  l.forEach(function(element){
    pack = clone.clone()
    pack.removeClass('template')
    pack.find('.info .title').text("Pacote "+element["Name"])
    pack.find('.info .producer').text(element["Company"])
    pack.find('.info .ammount span:first-child').text(element["Watts"]+"Mw")
    pack.find('.info .ammount span:last-child').text(element["Duration"])
    $('.content#buy-energy #main-buy-energy .packages-list .packs').append(pack)
  })

  // ENABLING CLICKS FOR NEW ELEMENTS
  enableClicks()
}

function getCreditCardsMarket(){
  l = [{"N.C.C" : 1780972838 , "Owner" : "João Rodrigues"},
       {"N.C.C" : 5420522521 , "Owner" : "Luísa Rodrigues"}
      ] // VALUES RETRIEVED
  clone = $('.content#buy-energy  #method-buy-energy .card.template').clone()

  // REMOVING ALL TRASH
  $('.content#buy-energy  #method-buy-energy .card:not(.template)').remove()

  l.forEach(function(element){
    pack = clone.clone()
    pack.removeClass('template')
    pack.find('.info:first-child').html("<strong>N.C.C:</strong> "+element["N.C.C"])
    pack.find('.info:last-child').html("<strong>Titular:</strong> "+element["Owner"])
    $('.content#buy-energy  #method-buy-energy .cards-list .cards').append(pack)
  })

  // ENABLING CLICKS FOR NEW ELEMENTS
  enableClicks()
}

function getCreditCardsSettings(){
  l = [{"N.C.C" : 1780972838 , "Owner" : "João Rodrigues"},
       {"N.C.C" : 5420522521 , "Owner" : "Luísa Rodrigues"}
      ] // VALUES RETRIEVED

  clone = $('.content#bank-account .cards-list .cards .card.template').clone()

  // REMOVING ALL TRASH
  $('.content#bank-account .cards-list .cards .card:not(.template)').remove()

  l.forEach(function(element){
    pack = clone.clone()
    pack.removeClass('template')
    pack.find('.info > div:first-child p').html("<strong>N.C.C:</strong> "+element["N.C.C"])
    pack.find('.info > div:last-child p').html("<strong>Titular:</strong> "+element["Owner"])
    $('.content#bank-account .cards-list .cards').append(pack)
  })

  // ENABLING CLICKS FOR NEW ELEMENTS
  enableClicks()
}

function getTransactions(){
  l = [{"Value" : "5.00 €"  , "Date" : "24/11/2017" , "Company" : "EDP", "id" : 24},
       {"Value" : "65.00 €" , "Date" : "25/10/2017" , "Company" : "GreenLight", "id" : 54},
       {"Value" : "52.00 €" , "Date" : "26/09/2017" , "Company" : "RedPower", "id" : 14},
       {"Value" : "45.00 €" , "Date" : "23/08/2017" , "Company" : "Dlig", "id" : 26}
      ] // VALUES RETRIEVED

  clone = $('.content#transactions #main-transactions .transaction-list .transaction-item.template').clone()

  // REMOVING ALL TRASH
  $('.content#transactions #main-transactions .transaction-list .transaction-item:not(.template)').remove()

  l.forEach(function(element){
    transaction  = clone.clone()
    transaction.removeClass('template')
    transaction.find('.date').text(element["Date"])
    transaction.find('.transaction-content p:first-child small').text(element["Value"])
    transaction.find('.transaction-content p:nth-child(2) small').text(element["Company"])
    transaction.attr('id', element["id"])
    $('.content#transactions #main-transactions .transaction-list').append(transaction)
  })

  // ENABLING CLICKS FOR NEW ELEMENTS
  enableClicks()
}

function insertCreditCard(){

}

function updateCreditCard(){

}
