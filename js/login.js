$(document).ready(function(){
  $(".edpCheckBox label").on("click",function(){
     event.preventDefault();
    $(this).find('span.checkBox-icon').toggleClass('checked')
  })


  $('.btn.btn-primary').click(trylogin)






})

var x;
var json;
function trylogin(){

  mail = $('.login-input-box.user .login-input').val()
  psswd = $('.login-input-box.password .login-input').val()
  console.log('http://85.247.219.175:4567/api/customers/login?email='+mail+'&password='+psswd+'')

  $.getJSON( 'http://85.247.219.175:4567/api/customers/login?email='+mail+'&password='+psswd+'').done(function(data){
    x = data
    json = x["responseJSON"]
    console.log(x)
    if(x == null){
      $('.formValidatorsBox.hidden').removeClass('hidden')
      $('.formValidatorsBox .erro .msgTxt').text("Dados inválidos")
    }else{
      console.log(x["customer_id"][0])
    }
  })
}

// http://85.247.219.175:4567/api/customers?filter={"where":{"customer_id":10}}
