$(document).ready(function(){
  $(".edpCheckBox label").on("click",function(){
     event.preventDefault();
    $(this).find('span.checkBox-icon').toggleClass('checked')
  })
})
