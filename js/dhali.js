'using strict';


var	mid,
	w,
	isHidden = []

$.each( $('.dhali'), function () {

	isHidden.push(this)
})


mid = $(window).height() / 2 


w = $(window).scroll(function() {
	for (i = 0; i < isHidden.length; i++){
		if ( w.scrollTop() >= $(isHidden[i]).offset().top - mid ) {

			$(isHidden[i]).addClass( $(isHidden[i]).attr('data-animation') )
		}
		
		//Reverse transition if scroll goes back up?
	}
})







// function Dhali (el, transition, speed) {

// 	this.el = el;
// 	this.transition = transition;
// 	this.speed = speed;

// }

// var dhali = new Dhali()