$(document).ready(function(){
  $('.menu .option.stats svg').click(toggleSettings)
  $('.menu .option.stats p').click(toggleSettings)
  $('.menu .option.history svg').click(toggleSettings)
  $('.menu .option.history p').click(toggleSettings)
  $('.menu .option.settings svg').click(toggleSettings)
  $('.menu .option.settings p').click(toggleSettings)

})

function toggleSettings(){
  $('.menu').toggleClass('seek')
	$('#intro').toggleClass('seek')
}
