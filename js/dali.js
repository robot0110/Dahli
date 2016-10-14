'using strict';

var dali = {
	elements: [],
	lastScroll: 0,
	newScroll: 0,
	scrollDirection: '',
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
	},
	loadArray: function() {

		var that = this

		$.each( $('[dali]'), function() {
			$(this).addClass('dali')
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
			that.getLastScroll()
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
	getLastScroll: function(){
		this.newScroll = $(window).scrollTop()
		if (this.newScroll > this.lastScroll){
			this.lastScroll = this.newScroll
			if (this.scrollDirection != 'down'){
				this.scrollDirection = 'down'
				console.log(this.scrollDirection)
			}
		} else {
			this.lastScroll = this.newScroll
			if (this.scrollDirection != 'up') {
				this.scrollDirection = 'up'
				console.log(this.scrollDirection)
			}
		}

	},
	custom: function(settings) {
		//check for options
			//run code for that particular option
			if (settings.hasOwnProperty('reverse') && settings.reverse === true) {
				
				this.checkElement = function(w){
					var that = this
					var elements = that.elements

					for (i = 0; i < elements.length; i++){

							if ( w.scrollTop() >= $(elements[i].el).offset().top - that.mid && that.scrollDirection === 'down') {

								$(elements[i].el).addClass( elements[i].transition ).removeClass( elements[i].transition + '-reverse'  )

							} else if ( w.scrollTop() <= $(elements[i].el).offset().top - that.mid && that.scrollDirection === 'up') {

								$(elements[i].el).addClass( elements[i].transition + '-reverse').removeClass( elements[i].transition  )

							}
					}
				}
			}
			if (settings.hasOwnProperty('setClass') && settings.setClass != null) {

				if (typeof settings.setClass === 'object'){

					var size = Object.keys(settings.setClass).length;

					var propList = []

					for (var prop in settings.setClass){
						
						propList.push(prop)
						propList.push(settings.setClass[prop])
						console.log(propList)
					}
				}
			
				$(settings.setClass[0]).attr('dali', settings.setClass[1])
			}
			
		//set attr of all items of one class or id
		//change the name of the attr to run the animation

		//at the end run the default config to finish loading

	

		this.config()
	}

}



dali.config({
	reverse: true,
	setClass: ['.veno-box','fadeInUp']
	// setClass: {
	// 	'.card': 'fadeInRight',
	// 	'.box': 'fadeInLeft'
	// }
})









