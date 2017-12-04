// THIS FILE CONTAINS THE REQUESTS TO THE APP
// var url = 'http://85.247.219.175:4567/api/';
var url = 'http://localhost:3000/api/';

user_id = localStorage.getItem('user_id')


// request current energy
function getCurrentEnergy() {
  $.getJSON(url + 'customers/activePack?customer_id=' + user_id, function(json) {
    if (typeof json.energy_id[0] !== 'undefined' && typeof json.energy_id[0].percentage !== 'undefined') {
      percentage = json.energy_id[0].percentage;
    } else {
      percentage = 0; // VALUE RETRIEVED
    }
    $("#intro .circle .edp-color").removeClass(function(index, className) {
      return (className.match(/(^|\s)p\S+/g) || []).join(' ');
    });
    $("#intro .circle .edp-color").addClass('p' + percentage);
    $("#intro .circle .edp-color span").text(percentage + "%");
    $('.content#verify-energy .packages-list:not(.reserved) .pack .bar  .percentage').css('width', percentage + '%')
    $('.content#verify-energy .packages-list:not(.reserved) .pack .bar  p').text(percentage + '%')
  })
}

function getReservedPacks() {
  var l = [];
  $.getJSON(url + 'customers/' + user_id + '/energy', function(json) {
    $.each(json, function(index, packs) {
      l.push(packs.packName);
    });

    clone = $('.content#verify-energy .packages-list.reserved .packs.template').clone()

    // REMOVING ALL TRASH ELEMENTS
    $('.content#verify-energy .packages-list.reserved .packs:not(.template)').remove()

    l.forEach(function(element) {
      pack = clone.clone()
      pack.removeClass('template')
      pack.find('.pack > p').text("Pacote   " + element)
      $('.content#verify-energy .packages-list.reserved').append(pack)
    });
  })
}

function getPacks() {
  packsArray = []
  $.getJSON(url + 'customers/packsForSale', function(json) {
    clone = $('.content#buy-energy #main-buy-energy .pack.template').clone()
    // REMOVING ALL TRASH
    $('.content#buy-energy #main-buy-energy .pack:not(.template)').remove()
    json.energy_id.forEach(function(pack) {
      $.getJSON(url + 'customers/' + pack.producer_id, function(prod) {
        name = prod.customer_name;
      });
      temp = {
        'id': pack.energy_id,
        'Name': pack.packName,
        'Company': name,
        'Watts': pack.quantity
      }
      packsArray.push(temp);
    })


    packsArray.forEach(function(element) {
      pack = clone.clone()
      pack.removeClass('template')
      pack.attr('id', element["id"])
      pack.find('.info .title').text("Pacote " + element["Name"])
      pack.find('.info .producer').text(element["Company"])
      pack.find('.info .ammount span:first-child').text(element["Watts"] + "Mw")
      // pack.find('.info .ammount span:last-child').text(element["Duration"])
      $('.content#buy-energy #main-buy-energy .packages-list .packs').append(pack)

    })
    // ENABLING CLICKS FOR NEW ELEMENTS
    enableClicks()
  })
}

function getCreditCardsMarket() {
  $.getJSON(url + 'customers/' + user_id + '/creditCards', function(json) {
    cards = [];
    json.forEach(function(card) {
      if (card.active === 1) {
        temp = {
          "N.C.C": card.creditcard_number,
          "Owner": card.card_holder
        };
        cards.push(temp);
      }
    })
    clone = $('.content#buy-energy  #method-buy-energy .card.template').clone()

    // REMOVING ALL TRASH
    $('.content#buy-energy  #method-buy-energy .card:not(.template)').remove()

    cards.forEach(function(element) {
      pack = clone.clone()
      pack.removeClass('template')
      pack.attr('id', element["id"])
      pack.find('.info:first-child').html("<strong>N.C.C:</strong> " + element["N.C.C"])
      pack.find('.info:last-child').html("<strong>Titular:</strong> " + element["Owner"])
      $('.content#buy-energy  #method-buy-energy .cards-list .cards').append(pack)
    })

    // ENABLING CLICKS FOR NEW ELEMENTS
    enableClicks()
  })
}

function addPackToMyList(pack_id, card_id) {
  finalURL = url + 'energies/' + pack_id;
  $.getJSON(finalURL, function(json) {
    json.holder = user_id;



    $.ajax({
      type: "PUT",
      contentType: "application/json; charset=utf-8",
      url: finalURL,
      data: JSON.stringify(json),
      dataType: "json",
      success: function(msg) {
        console.log('Success' + msg);
      },
      error: function(err) {
        console.log('ERROR' + err);
      }
    });


    transaction = {"client_id": user_id,
                  "energy_id": pack_id,
                  "production": "string",
                  "creditcard_used": card_id
                };


    $.ajax({
      type: "POST",
      contentType: "application/json; charset=utf-8",
      url: url + 'transactions',
      data: JSON.stringify(transaction),
      dataType: "json",
      success: function(msg) {
        console.log('Transaction success: ' + msg);
      },
      error: function(err) {
        console.log('ERROR - Transaction: ' + err);
      }
    });



  })
}


function getCreditCardsSettings() {
  $.getJSON(url + 'customers/' + user_id + '/creditCards', function(json) {
    cards = [];
    json.forEach(function(card) {
      if (card.active == 1) {
        temp = {
          "N.C.C": card.creditcard_number,
          "Owner": card.card_holder,
          "id" : card.creditcard_id
        };
        cards.push(temp);
      }
    })
    clone = $('.content#bank-account .cards-list .cards .card.template').clone()

    // REMOVING ALL TRASH
    $('.content#bank-account .cards-list .cards .card:not(.template)').remove()

    cards.forEach(function(element) {
      pack = clone.clone()
      pack.removeClass('template')
      pack.attr('id', element["id"])
      pack.find('.info > div:first-child p').html("<strong>N.C.C:</strong> " + element["N.C.C"])
      pack.find('.info > div:last-child p').html("<strong>Titular:</strong> " + element["Owner"])
      $('.content#bank-account .cards-list .cards').append(pack)

    })
    // ENABLING CLICKS FOR NEW ELEMENTS
    enableClicks()
  })

}

function getTransactions() {
  l = [];
  $.getJSON(url + 'customers/' + user_id + '/transactions', function(json) {
    json.forEach(function(transaction) {
      $.getJSON(url + 'energies/' + transaction.energy_id, function(energy) {
        $.getJSON(url + 'customers/' + energy.producer_id, function(provider) {
          time = transaction.transaction_time.split('-')
          obj = {
            'Value': parseInt(energy.quantity) * energy.KWhPrice + "€",
            'Date': time[2].substring(0, 2) + '/' + time[1] + '/' + time[0],
            'Company': provider.customer_name,
            'id': transaction.transaction_id
          };
          l.push(obj);

          clone = $('.content#transactions #main-transactions .transaction-list .transaction-item.template').clone()

          // REMOVING ALL TRASH
          $('.content#transactions #main-transactions .transaction-list .transaction-item:not(.template)').remove()

          l.forEach(function(element) {
            transaction = clone.clone()
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
function getTransactionDetails(id) {
  $.getJSON(url + 'transactions/' + id, function(transaction) {
    $.getJSON(url + 'energies/' + transaction.energy_id, function(energy) {
      $.getJSON(url + 'customers/' + energy.producer_id, function(producer) {
        $.getJSON(url + 'creditCards/' + transaction.creditcard_used, function(card) {
          date = transaction.transaction_time.split('-');
          time = transaction.transaction_time.split('T')[1].split(':');
          element = {
            "Date": date[2].substring(0, 2) + '/' + date[1] + '/' + date[0],
            "Time": time[0] + ':' + time[1] + 'h',
            "Card": card.creditcard_number,
            "Company": producer.customer_name,
            "Ammount": energy.quantity,
            "Price": parseInt(energy.quantity) * energy.KWhPrice + ',00 €'
          }
          $('.content#transactions #transaction-info .transaction-section:first-child .section-area p:nth-child(1) small').text(element["Date"])
          $('.content#transactions #transaction-info .transaction-section:first-child .section-area p:nth-child(2) small').text(element["Time"])
          $('.content#transactions #transaction-info .transaction-section:first-child .section-area p:nth-child(3) small').text(element["Card"].toString().substring(0, 4) + " **** ****")

          $('.content#transactions #transaction-info .transaction-section:nth-child(2) .section-area p:nth-child(1) small').text(element["Company"])
          $('.content#transactions #transaction-info .transaction-section:nth-child(2) .section-area p:nth-child(2) small').text(element["Ammount"] + "Mw")
          $('.content#transactions #transaction-info .transaction-section:nth-child(2) .section-area p:nth-child(3) small').text(element["Price"])
        })
      })
    })
  })
}

// O ARGUMENTO ID TEM O ID DO PACOTE AO QUAL VAMOS FAZER UM REQUEST COM OS SEUS DETALHES
function getPackDetails(id) {
  $.getJSON(url + 'energies/' + id, function(json) {
    $.getJSON(url + 'customers/' + pack.producer_id, function(prod) {
      name = prod.customer_name;
    })
    price = parseInt(json.quantity) * json.KWhPrice;
    pack = {
      "Name": json.packName,
      "Description": json.packDescript,
      "Company": name,
      "Ammount": json.quantity,
      "Price": price,
      "Product Rating": 5,
      "Company Rating": 6,
      "Contact": "Contact"
    };

    pack_id = id
    $('.content#buy-energy #desc-buy-energy .title ').text("Pacote " + pack["Name"])
    $('.content#buy-energy #desc-buy-energy .package-description .description').html("<strong>Descrição:</strong> " + pack["Description"])
    $('.content#buy-energy #desc-buy-energy .package-description .package-important #quantity').html("<strong>Energia:</strong> " + pack["Ammount"] + "Mw")
    $('.content#buy-energy #desc-buy-energy .package-description .package-important #price').html("<strong>Preço:</strong> " + pack["Price"])
    $('.content#buy-energy #desc-buy-energy .package-description p:nth-child(3)').html("<strong>Produtor:</strong> " + pack["Company"])
    $('.content#buy-energy #desc-buy-energy .package-description p:nth-child(4)').html("<strong>Avaliação do Produtor:</strong> " + pack["Company Rating"] + "/10")
    $('.content#buy-energy #desc-buy-energy .package-description p:nth-child(5)').html("<strong>Avaliação do Produto:</strong> " + pack["Product Rating"] + "/10")
    $('.content#buy-energy #desc-buy-energy .package-description p:nth-child(6)').html("<strong>Contacto:</strong> " + pack["Contact"])
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

function getConfirmationDetails(id) {
  $.getJSON(url + 'energies/' + id, function(json) {
    $.getJSON(url + 'customers/' + pack.producer_id, function(prod) {
      name = prod.customer_name;
    })
    price = parseInt(json.quantity) * json.KWhPrice;
    pack = {
      "Name": json.packName,
      "Description": json.packDescript,
      "Company": name,
      "Ammount": json.quantity,
      "Price": price,
      "Product Rating": 5,
      "Company Rating": 6,
      "Contact": "Contact"
    };

    $('.content#buy-energy #confirm-buy-energy .infos p:nth-child(1)').html("<strong><u> Pacote: " + pack["Name"] + "</u></strong>")
    $('.content#buy-energy #confirm-buy-energy .infos p:nth-child(2)').html("<strong>Produtor: </strong> " + pack["Company"])
    $('.content#buy-energy #confirm-buy-energy .infos p:nth-child(3)').html("<strong>Energia: </strong> " + pack["Ammount"] + "Mw")
    $('.content#buy-energy #confirm-buy-energy .infos p:nth-child(4)').html("<strong>Preço:</strong> " + pack["Price"])
  })

}


function getCreditCard(id){
  if (id == null) {
    // CREATE CARD
    $('.content#bank-account #bank-account-edit h1').text("Adicionar Cartão")
    $('.content#bank-account #bank-account-edit .edit-field:nth-child(2) input').val('')
    $('.content#bank-account #bank-account-edit .edit-field:nth-child(3) input').val('')
    $('.content#bank-account #bank-account-edit .edit-field:nth-child(4) input').val('')
    $('.content#bank-account #bank-account-edit .edit-field:nth-child(5) input').val('')
    $('.content#bank-account #bank-account-edit .add-card').attr('id', '-1')

  } else {
    // MODIFY CARD WITH THIS ID
    $.getJSON(url + 'creditCards/' + id, function(json) {
      date = json.expires.split('-');
      card = {
        "C.C.N": json.creditcard_number,
        "Name": json.card_holder,
        "Date": date[1] + '/' + date[0].substring(2,4),
        "Code": json.ccv
      } // RETRIEVED DATA FROM CARD ID

      $('.content#bank-account #bank-account-edit h1').text("Editar Cartão")
      $('.content#bank-account #bank-account-edit .edit-field:nth-child(2) input').val(card["C.C.N"].toString().substring(0,3) + " " + card["C.C.N"].toString().substring(3,6) + " " + card["C.C.N"].toString().substring(6 ,9) + " " +  card["C.C.N"].toString().substring(9,12) )
      $('.content#bank-account #bank-account-edit .edit-field:nth-child(3) input').val(card["Name"])
      $('.content#bank-account #bank-account-edit .edit-field:nth-child(4) input').val(card["Date"])
      $('.content#bank-account #bank-account-edit .edit-field:nth-child(5) input').val(card["Code"])
      $('.content#bank-account #bank-account-edit .add-card').attr('id', id)
  	})

  }
}

function create_update_CreditCard(id){
  ncc  = $('.content#bank-account #bank-account-edit .edit-field:nth-child(2) input').val().split(' ').join('')
  name = $('.content#bank-account #bank-account-edit .edit-field:nth-child(3) input').val()
  val  = $('.content#bank-account #bank-account-edit .edit-field:nth-child(4) input').val()
  code = $('.content#bank-account #bank-account-edit .edit-field:nth-child(5) input').val()

  if(validateCreditCard()){
    uDate = val.split('/');
    val = (new Date('20' + uDate[1], uDate[0] - 1)).toISOString(); // Generates a date in mySQL format
     if(id == "-1"){
      // CREATE NEW CARD
      card = {"creditcard_number": ncc,
          "card_holder": name,
          "ccv": code,
          "expires": val,
          "holder": user_id
      }
      $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: url + 'creditCards',
        data: JSON.stringify(card),
        dataType: "json",
        success: function(msg) {
          console.log('Card created success: ' + msg);
          getCreditCardsSettings()
        },
        error: function(xhr, status, error) {
          console.log(error);
        }
      });


    }else{
      // UPDATE EXIST CARD
      $.getJSON(url + 'creditCards/' + id, function(json) {
    		json.creditcard_number = ncc;
    		json.card_holder = name;
    		json.expires = val ;
    		json.ccv = code;

        $.ajax({
          type: "PUT",
          contentType: "application/json; charset=utf-8",
          url: url + 'creditCards/' + id,
          data: JSON.stringify(json),
          dataType: "json",
          success: function(msg) {
            console.log('Card edited success: ' + msg);
            getCreditCardsSettings()
          },
          error: function(err) {
            console.log('ERROR - Credit card editing: ' + err);
          }
        });
    	})

    }
  }
}

function deleteCreditCard(id){
  console.log('CC ID' + id);
  $.getJSON(url + 'creditCards/' + id, function(json) {
    json.active = 0;

    $.ajax({
      type: "PUT",
      contentType: "application/json; charset=utf-8",
      url: url + 'creditCards/' + id,
      data: JSON.stringify(json),
      dataType: "json",
      success: function(msg) {
        console.log('Card delete success: ' + msg);
        getCreditCardsSettings()
      },
      error: function(err) {
        console.log('ERROR - Credit card editing: ' + err);
      }
    });
  })

}
