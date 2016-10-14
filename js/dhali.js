'using strict';

var dali = {
	elements: [],
	config: function(settings){

		if (settings){
			this.custom(settings)
		} else {
			this.getScreen();
			this.loadArray();
			this.setAnimationSpeed()
			this.watch()
		}
	},
	getScreen: function(){
		this.mid = $(window).height() / 2
		console.log(this.mid)
	},
	loadArray: function() {

		var that = this

		$.each( $('[dali]'), function() {

			var options = that.buildOptions(this)

			var dali = {
				el: this,
				transition: options['transition'],
				speed: options['speed']
			}

			that.elements.push(dali)
		})
	},
	buildOptions: function(dali) {
		var data = $(dali).attr('dali'),
			splitData = data.split(','),
			options = {
				transition: 'fadeInUp',
				speed: '1s'
			}

		if ( splitData.length > 1){
			options['transition'] = splitData[0]
			options['speed'] = splitData[1]
		} else {
			options['transition'] = data
		}

		return options
	},
	setAnimationSpeed: function(){
		var elements = this.elements

		for (var i = 0; i < elements.length; i++) {

			var speed = elements[i].speed

			$(elements[i].el).css({
			 	'-webkit-animation-duration': speed,
			 	'-moz-animation-duration':    speed,
			 	'-ms-animation-duration':     speed,
			 	'-o-animation-duration':      speed,
			 	'animation-duration':         speed     
			})
		}
	},
	watch: function() {
		var that = this

		var r = $(window).resize(function() {
			that.getScreen()
		})

		var w = $(window).scroll(function() {
			that.checkElement(w)
		})
	},
	checkElement: function(w){
		var that = this
		var elements = that.elements

		for (i = 0; i < elements.length; i++){
				if ( w.scrollTop() >= $(elements[i].el).offset().top - that.mid ) {
					$(elements[i].el).addClass( elements[i].transition )
				}
			}
	},
	custom: function(settings) {
		//check for options
			//run code for that particular option
			// if (options['reverse'] === true){

			// 	this.checkElement = function(w){
			// 		var that = this
			// 		var elements = that.elements

			// 		for (i = 0; i < elements.length; i++){
			// 				if ( w.scrollTop() >= $(elements[i].el).offset().top - that.mid ) {
			// 					$(elements[i].el).addClass( elements[i].transition )
			// 				} else if ( w.scrollTop() <= $(elements[i].el).offset().top - that.mid ) {
			// 					$(elements[i].el).addClass( elements[i].transition + 'out')
			// 				}
			// 			}
			// 	}

			// }
		//set attr of all items of one class or id
		//change the name of the attr to run the animation

		//at the end run the default config to finish loading
		console.log(settings)
		this.config()
	}

}

var settings = {
	reverse: true
}

dali.config(settings)









