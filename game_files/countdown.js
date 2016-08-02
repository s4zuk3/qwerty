


$(document).ready(function() {
	var tick = function(){
		var unixNow = new Date().getTime();
		var unixFestigame = new Date('Thu, 4 Aug 2016 19:00:00 GMT').getTime();
		var delta = Math.floor(unixFestigame - unixNow);
		x = Math.floor(delta / 1000);
		sec = x % 60;
		x /= 60;
		min = Math.floor(x) % 60;
		x /= 60;
		hours = Math.floor(x) % 24;
		x /= 24;
		days = Math.floor(x);
		$("#countdown-days").text(days);
		$("#countdown-hours").text(hours);
		$("#countdown-min").text(min);
		
		// console.log(days +" : "+hours+" : "+min+" : "+sec);
	}

  	tick();
  	setInterval(tick, 1000);
});