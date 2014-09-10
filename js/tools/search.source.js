'use strict'

honey.def("lib:jquery", function(H) {

	var searchBox = $(".search-con")
	$(".int-txt").on("focus", function(){
		searchBox.addClass("a-hover")
	}).on("blur", function(){
		searchBox.removeClass("a-hover")
	})

	//todo
	
})