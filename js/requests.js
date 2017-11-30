// THIS FILE CONTAINS THE REQUESTS TO THE APP
var url = 'http://85.247.219.175:4567/api/';
user_id = localStorage.getItem('user_id')


// request current energy
function getCurrentEnergy(){
  $.getJSON( url + 'customers/activePack?customer_id=' + user_id, function(json) {
    console.log(json);
    if(typeof json.energy_id[0] !== 'undefined' && typeof json.energy_id[0].percentage !== 'undefined'){
      percentage = json.energy_id[0].percentage;
    } else {
      percentage = 0;  // VALUE RETRIEVED
    }
    $("#intro .circle .edp-color").removeClass (function (index, className) {
      return (className.match (/(^|\s)p\S+/g) || []).join(' ');
    });
    $("#intro .circle .edp-color").addClass('p'+percentage);
    $("#intro .circle .edp-color span").text(percentage+"%");
    $('.content#verify-energy .packages-list:not(.reserved) .pack .bar  .percentage').css('width', percentage+'%')
    $('.content#verify-energy .packages-list:not(.reserved) .pack .bar  p').text(percentage+'%')
  })
}

function getReservedPacks(){
  var l = [];
  $.getJSON( url + 'customers/' + user_id + '/energy', function(json) {
    $.each(json, function(index, packs){
      l.push(packs.packName);
    });

    clone = $('.content#verify-energy .packages-list.reserved .packs.template').clone()

    // REMOVING ALL TRASH ELEMENTS
    $('.content#verify-energy .packages-list.reserved .packs:not(.template)').remove()

    l.forEach(function(element){
      pack = clone.clone()
      pack.removeClass('template')
      pack.find('.pack > p').text("Pacote   " + element)
      $('.content#verify-energy .packages-list.reserved').append(pack)
    });
  })
}

function getPacks(){
  packsArray = []
  $.getJSON( url + 'customers/packsForSale', function(json) {
    clone = $('.content#buy-energy #main-buy-energy .pack.template').clone()
    // REMOVING ALL TRASH
    $('.content#buy-energy #main-buy-energy .pack:not(.template)').remove()
    json.energy_id.forEach(function(pack){
      $.getJSON(url + 'customers/' + pack.producer_id, function(prod){
        name = prod.customer_name;
      });
      temp = {'id' : pack.energy_id,
            'Name' : pack.packName,
            'Company' : name,
            'Watts' : pack.quantity}
      packsArray.push(temp);
    })


    packsArray.forEach(function(element){
      pack = clone.clone()
      pack.removeClass('template')
      pack.attr('id', element["id"])
      pack.find('.info .title').text("Pacote "+element["Name"])
      pack.find('.info .producer').text(element["Company"])
      pack.find('.info .ammount span:first-child').text(element["Watts"]+"Mw")
      // pack.find('.info .ammount span:last-child').text(element["Duration"])
      $('.content#buy-energy #main-buy-energy .packages-list .packs').append(pack)

    })
    // ENABLING CLICKS FOR NEW ELEMENTS
    enableClicks()
  })
}

function getCreditCardsMarket(){
  // l = [{"N.C.C" : 1780972838 , "Owner" : "João Rodrigues" , "id" : 1},
  //      {"N.C.C" : 5420522521 , "Owner" : "Luísa Rodrigues" , "id" : 2}
  //     ] // VALUES RETRIEVED

  $.getJSON(url + 'customers/' + user_id + '/creditCards', function(json) {
    cards = [];
    json.forEach(function(card){
      temp = {"N.C.C" : card.creditcard_number,
            "Owner" : card.card_holder};
      cards.push(temp);
    })
    clone = $('.content#buy-energy  #method-buy-energy .card.template').clone()

    // REMOVING ALL TRASH
    $('.content#buy-energy  #method-buy-energy .card:not(.template)').remove()

    cards.forEach(function(element){
      pack = clone.clone()
      pack.removeClass('template')
      pack.attr('id', element["id"])
      pack.find('.info:first-child').html("<strong>N.C.C:</strong> "+element["N.C.C"])
      pack.find('.info:last-child').html("<strong>Titular:</strong> "+element["Owner"])
      $('.content#buy-energy  #method-buy-energy .cards-list .cards').append(pack)
    })

    // ENABLING CLICKS FOR NEW ELEMENTS
    enableClicks()
  })
}

function getCreditCardsSettings(){
  $.getJSON(url + 'customers/' + user_id + '/creditCards', function(json) {
    cards = [];
    json.forEach(function(card){
      temp = {"N.C.C" : card.creditcard_number,
            "Owner" : card.card_holder};
      cards.push(temp);
    })
    clone = $('.content#bank-account .cards-list .cards .card.template').clone()

    // REMOVING ALL TRASH
    $('.content#bank-account .cards-list .cards .card:not(.template)').remove()

    cards.forEach(function(element){
      pack = clone.clone()
      pack.removeClass('template')
      pack.attr('id', element["id"])
      pack.find('.info > div:first-child p').html("<strong>N.C.C:</strong> "+element["N.C.C"])
      pack.find('.info > div:last-child p').html("<strong>Titular:</strong> "+element["Owner"])
      $('.content#bank-account .cards-list .cards').append(pack)

	  })
    // ENABLING CLICKS FOR NEW ELEMENTS
    enableClicks()
  })

}

function getTransactions(){
  l = [];
  $.getJSON(url + 'customers/' + user_id + '/transactions', function(json) {
    json.forEach(function(transaction){
      $.getJSON(url + 'energies/' + transaction.energy_id , function(energy) {
        $.getJSON(url + 'customers/' + energy.producer_id , function(provider) {
          time = transaction.transaction_time.split('-')
          obj = {'Value' : parseInt(energy.quantity) * energy.KWhPrice + "€",
              'Date' : time[2].substring(0,2) + '/' + time[1] + '/' + time[0],
              'Company' : provider.customer_name,
              'id' : transaction.transaction_id};
          l.push(obj);

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
        })
      })
    })
	})

}

// O ARGUMENTO ID TEM O ID DA TRANSACAO AO QUAL VAMOS FAZER UM REQUEST COM OS SEUS DETALHES
function getTransactionDetails(id){
  $.getJSON(url + 'transactions/' + id, function(json) {
    $.getJSON(url + 'energies/' + json.energy_id, function(energy) {
      $.getJSON(url + 'customers/' + energy.producer_id, function(producer) {
        date = json.transaction_time.split('-');
        time = json.transaction_time.split('T')[1].split(':');
    		element = {"Date" : date[2].substring(0,2) + '/' + date[1] + '/' + date[0],
                  "Time" : time[0] + ':' + time[1] + 'h',
                  "Card" : 2583972838,
                  "Company" : producer.customer_name,
                  "Ammount" : energy.quantity,
                  "Price" : parseInt(energy.quantity) * energy.KWhPrice + ',00 €'}
        $('.content#transactions #transaction-info .transaction-section:first-child .section-area p:nth-child(1) small').text(element["Date"])
        $('.content#transactions #transaction-info .transaction-section:first-child .section-area p:nth-child(2) small').text(element["Time"])
        $('.content#transactions #transaction-info .transaction-section:first-child .section-area p:nth-child(3) small').text(element["Card"].toString().substring(0,4) + " **** ****")

        $('.content#transactions #transaction-info .transaction-section:nth-child(2) .section-area p:nth-child(1) small').text(element["Company"])
        $('.content#transactions #transaction-info .transaction-section:nth-child(2) .section-area p:nth-child(2) small').text(element["Ammount"] + "Mw")
        $('.content#transactions #transaction-info .transaction-section:nth-child(2) .section-area p:nth-child(3) small').text(element["Price"])
	   })
	  })
	})
}

// O ARGUMENTO ID TEM O ID DO PACOTE AO QUAL VAMOS FAZER UM REQUEST COM OS SEUS DETALHES
function getPackDetails(id){
  $.getJSON(url + 'energies/' + id, function(json) {
    $.getJSON(url + 'customers/' + pack.producer_id, function(prod){
      name = prod.customer_name;
    })
    price = parseInt(json.quantity) * json.KWhPrice;
    pack = {"Name" : json.packName,
          "Description" : json.packDescript,
          "Company" : name,
          "Ammount" : json.quantity,
          "Price" : price,
          "Product Rating" : 5,
          "Company Rating" : 6,
          "Contact" : "Contact"};

	pack_id=id
    $('.content#buy-energy #desc-buy-energy .title ').text("Pacote "+pack["Name"])
    $('.content#buy-energy #desc-buy-energy .package-description .description').html("<strong>Descrição:</strong> "+pack["Description"])
	$('.content#buy-energy #desc-buy-energy .package-description .package-important #quantity').html("<strong>Energia:</strong> "+pack["Ammount"]+"Mw")
    $('.content#buy-energy #desc-buy-energy .package-description .package-important #price').html("<strong>Preço:</strong> "+pack["Price"])
    $('.content#buy-energy #desc-buy-energy .package-description p:nth-child(3)').html("<strong>Produtor:</strong> "+pack["Company"])
    $('.content#buy-energy #desc-buy-energy .package-description p:nth-child(4)').html("<strong>Avaliação do Produtor:</strong> "+pack["Company Rating"]+"/10")
    $('.content#buy-energy #desc-buy-energy .package-description p:nth-child(5)').html("<strong>Avaliação do Produto:</strong> "+pack["Product Rating"]+"/10")
    $('.content#buy-energy #desc-buy-energy .package-description p:nth-child(6)').html("<strong>Contacto:</strong> "+pack["Contact"])
  })

  // pack = {"Name" : "GoldEnergy" ,
  //     "Description" : "Pacote de fornecimento de energia eolica com baixo teor de poluição" ,
  //     "Company" : "SaviorEnergy" ,
  //     "Ammount" : 120 ,
  //     "Price" : "25,00 €" ,
  //     "Product Rating" : 5,
  //     "Company Rating" : 6,
  //     "Contact" : "Saviorenergy.com"
  //   } // RESPOSTA DOS DETALHES DO ID {X}

}

function getConfirmationDetails(id){
  $.getJSON(url + 'energies/' + id, function(json) {
    $.getJSON(url + 'customers/' + pack.producer_id, function(prod){
      name = prod.customer_name;
    })
    price = parseInt(json.quantity) * json.KWhPrice;
    pack = {"Name" : json.packName,
          "Description" : json.packDescript,
          "Company" : name,
          "Ammount" : json.quantity,
          "Price" : price,
          "Product Rating" : 5,
          "Company Rating" : 6,
          "Contact" : "Contact"};

	$('.content#buy-energy #confirm-buy-energy .infos p:nth-child(1)').html("<strong><u> Pacote: "+pack["Name"]+"</u></strong>")
	$('.content#buy-energy #confirm-buy-energy .infos p:nth-child(2)').html("<strong>Produtor: </strong> "+pack["Company"])
	$('.content#buy-energy #confirm-buy-energy .infos p:nth-child(3)').html("<strong>Energia: </strong> "+pack["Ammount"]+"Mw")
	$('.content#buy-energy #confirm-buy-energy .infos p:nth-child(4)').html("<strong>Preço:</strong> "+pack["Price"])
  })

}


function updateCreditCard(id){
  console.log(id)

  if(id == null){
    // CREATE CARD
    $('.content#bank-account #bank-account-edit h1').text("Adicionar Cartão")
    $('.content#bank-account #bank-account-edit .edit-field:nth-child(2) input').val('')
    $('.content#bank-account #bank-account-edit .edit-field:nth-child(3) input').val('')
    $('.content#bank-account #bank-account-edit .edit-field:nth-child(4) input').val('')
    $('.content#bank-account #bank-account-edit .edit-field:nth-child(5) input').val('')

  }else{
    // MODIFY CARD WITH THIS ID
    card = { "C.C.N" : 123456789482,
             "Name"  : "João Rodrigues",
             "Date"  : "12/17" ,
             "Code"  : 124  } // RETRIEVED DATA FROM CARD ID

    $('.content#bank-account #bank-account-edit h1').text("Editar Cartão")
    $('.content#bank-account #bank-account-edit .edit-field:nth-child(2) input').val(card["C.C.N"])
    $('.content#bank-account #bank-account-edit .edit-field:nth-child(3) input').val(card["Name"])
    $('.content#bank-account #bank-account-edit .edit-field:nth-child(4) input').val(card["Date"])
    $('.content#bank-account #bank-account-edit .edit-field:nth-child(5) input').val(card["Code"])


  }
}

function buyPackage(id){

}
