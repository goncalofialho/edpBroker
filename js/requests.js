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
  l = [{"Name": "GreenLight" , "Company": "AlenSolar" , "Watts": 350 , "Duration" : "2 Meses" , "id" : 52},
      {"Name": "BlueEnergie" , "Company": "EDP" , "Watts": 150 , "Duration" : "1 Mes" , "id" :42 }] // VALUES RETRIEVED

  clone = $('.content#buy-energy #main-buy-energy .pack.template').clone()

  // REMOVING ALL TRASH
  $('.content#buy-energy #main-buy-energy .pack:not(.template)').remove()

  l.forEach(function(element){
    pack = clone.clone()
    pack.removeClass('template')
    pack.attr('id', element["id"])
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

// O ARGUMENTO ID TEM O ID DA TRANSACAO AO QUAL VAMOS FAZER UM REQUEST COM OS SEUS DETALHES
function getTransactionDetails(id){
  element = {"Date" : "14/09/2017" ,
      "Time" : "21:49h" ,
      "Card" : 2583972838 ,
      "Company" : "RedEnergie" ,
      "Ammount" : 150 ,
      "Price" : "25,00 €"
    }

  $('.content#transactions #transaction-info .transaction-section:first-child .section-area p:nth-child(1) small').text(element["Date"])
  $('.content#transactions #transaction-info .transaction-section:first-child .section-area p:nth-child(2) small').text(element["Time"])
  $('.content#transactions #transaction-info .transaction-section:first-child .section-area p:nth-child(3) small').text(element["Card"].toString().substring(0,4) + " **** ****")

  $('.content#transactions #transaction-info .transaction-section:nth-child(2) .section-area p:nth-child(1) small').text(element["Company"])
  $('.content#transactions #transaction-info .transaction-section:nth-child(2) .section-area p:nth-child(2) small').text(element["Ammount"] + "Mw")
  $('.content#transactions #transaction-info .transaction-section:nth-child(2) .section-area p:nth-child(3) small').text(element["Price"])

}

// O ARGUMENTO ID TEM O ID DO PACOTE AO QUAL VAMOS FAZER UM REQUEST COM OS SEUS DETALHES
function getPackDetails(id){
  pack = {"Name" : "GoldEnergy" ,
      "Time" : "2 Meses" ,
      "Description" : "Pacote de fornecimento de energia eolica com baixo teor de poluição" ,
      "Company" : "SaviorEnergy" ,
      "Ammount" : 120 ,
      "Price" : "25,00 €" ,
      "Product Rating" : 5,
      "Company Rating" : 6,
      "Contact" : "Saviorenergy.com"
    } // RESPOSTA DOS DETALHES DO ID {X}

  $('.content#buy-energy #desc-buy-energy .title ').text("Pacote "+pack["Name"])
  $('.content#buy-energy #desc-buy-energy .package-description .duration').text("Pacote "+pack["Time"])
  $('.content#buy-energy #desc-buy-energy .package-description .description').html("<strong>Descrição:</strong> "+pack["Description"])
  $('.content#buy-energy #desc-buy-energy .package-description p:nth-child(3)').html("<strong>Produtor:</strong> "+pack["Company"])
  $('.content#buy-energy #desc-buy-energy .package-description p:nth-child(4)').html("<strong>Energia:</strong> "+pack["Ammount"]+"Mw")
  $('.content#buy-energy #desc-buy-energy .package-description p:nth-child(5)').html("<strong>Preço:</strong> "+pack["Price"])
  $('.content#buy-energy #desc-buy-energy .package-description p:nth-child(6)').html("<strong>Avaliação do Produtor:</strong> "+pack["Company Rating"]+"/10")
  $('.content#buy-energy #desc-buy-energy .package-description p:nth-child(7)').html("<strong>Avaliação do Produto:</strong> "+pack["Product Rating"]+"/10")
  $('.content#buy-energy #desc-buy-energy .package-description p:nth-child(8)').html("<strong>Contacto:</strong> "+pack["Contact"])
}

function insertCreditCard(){

}

function updateCreditCard(){

}
