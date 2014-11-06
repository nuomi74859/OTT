'use strict'

honey.def("lib:jquery", function(H) {

	var opt = {
		container: "",
		list: "",
		pagination: "",
		activeClass: "",
		autoCreat: true,
		autoplay: true
	}

	H.navSlider = function(_opt) {
		$.extend(opt, _opt);

		var c = $(opt.container),
			pagination = $(opt.pagination),
			pItem,
			list = c.find(opt.list),
			items = list.find("li"),
			currentIndex = 0,
			maxLength = items.length,
			imgWidth = items.eq(0).width(),
			pHTML = [],
			aid = 0

		list.width(list.find("li").eq(0).width() * maxLength)

		if (opt.autoCreat) {
			for (var i = 0; i < maxLength; i++) {
				pHTML.push('<li>'+(i+1)+'</li>')
			}
			pagination.empty().html(pHTML.join(""));

			pItem = pagination.find("li")
//			pItem.width(c.width() / maxLength)
		} else {
			pItem = pagination.find("li")
		}

		function moveTo(index) {
			pItem.removeClass(opt.activeClass).eq(index).addClass(opt.activeClass)
			currentIndex = index

			c.animate({
				scrollLeft: imgWidth * index
			}, function() {
				if (opt.autoplay) {
					if (aid) clearTimeout(aid)
					aid = setTimeout(function() {
						currentIndex = (currentIndex + 1 == maxLength) ? 0 : (currentIndex + 1)
						moveTo(currentIndex)
					}, 5000);
				}
			});
		}

		pItem.on('click', function() {
			var index = $(this).index()
			moveTo(index)
			return false;
		})

		moveTo(0)

		return {
			getCurrentIndex: function() {
				return currentIndex
			},
			refresh: function() {
				items = c.find(opt.item)
				maxLength = items.length
			}
		}
	}
})