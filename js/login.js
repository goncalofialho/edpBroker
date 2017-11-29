$(document).ready(function(){
  $(".edpCheckBox label").on("click",function(){
     event.preventDefault();
    $(this).find('span.checkBox-icon').toggleClass('checked')
  })

  $.getJSON( 'http://85.247.219.175:4567/api/customers/login?email='+mail+'&password='+psswd+'', function( data ) {
    console.log(data.length)

  });
})

// http://85.247.219.175:4567/api/customers?filter={"where":{"customer_id":10}}
