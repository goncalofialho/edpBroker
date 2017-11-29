// THIS FILE CONTAINS THE REQUESTS TO THE APP



// request current energy
function setCurrentEnergy(){
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

  l.forEach(function(element){
    pack = clone.clone()
    pack.removeClass('template')
    pack.find('.pack > p').text(element)
    $('.content#verify-energy .packages-list.reserved').append(pack)
  })

}

function getPacks(){
  l = [{"Name": "GreenLight" , "Company": "AlenSolar" , "Watts": 350 , "Duration" : "2 Meses"},
      {"Name": "BlueEnergie" , "Company": "EDP" , "Watts": 150 , "Duration" : "1 Mes"}] // VALUES RETRIEVED

  clone = $('.content#buy-energy #main-buy-energy .pack.template').clone()

  l.forEach(function(element){
    pack = clone.clone()
    pack.removeClass('template')
    pack.find('.info .title').text("Pacote "+element["Name"])
    pack.find('.info .producer').text(element["Company"])
    pack.find('.info .ammount span:first-child').text(element["Watts"]+"Mw")
    pack.find('.info .ammount span:last-child').text(element["Duration"])
    $('.content#buy-energy #main-buy-energy .packages-list .packs').append(pack)
  })
}

function getCreditCards(){

}

function getTransactions(){

}
