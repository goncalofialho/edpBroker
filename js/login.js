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
    console.log(x["customer_id"])
    if(x["customer_id"].length == 0){
      $('.formValidatorsBox.hidden').removeClass('hidden')
      $('.formValidatorsBox .erro .msgTxt').text("Dados inválidos")
    }else{
      successLogin(x["customer_id"][0]["customer_id"])
    }
  })

}

function successLogin(id){
  localStorage.setItem("user_id", id);
  window.location.replace("./index.html");
}

// http://85.247.219.175:4567/api/customers?filter={"where":{"customer_id":10}}
