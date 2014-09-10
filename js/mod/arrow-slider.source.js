'use strict'

honey.def("lib:jquery", function(H) {

	var opt = {
		container: "",
		list: "",
		pre_btn: "",
		next_btn: "",
		item: "",
		activeClass: "",
		loop: false
	}

	H.arrowSlider = function(_opt) {
		$.extend(opt, _opt);

		var c = $(opt.container),
			list = c.find(opt.list),
			preBtn = c.parent().find(opt.pre_btn),
			nextBtn = c.parent().find(opt.next_btn),
			items = c.find(opt.item),
			currentIndex = 0,
			maxLength = items.length,
			itemWidth = list.find(opt.item).eq(0).width(),
			speed = 400,
			animating = false

		if (maxLength > 1) {
			preBtn.hide()
			nextBtn.fadeIn()
		}

		list.width(itemWidth * maxLength)

		items.hide().eq(currentIndex).
		addClass(opt.activeClass.replace(".", ""))
			.show()

		preBtn.on("click", function(e) {
			e.preventDefault();
			if (animating) return;
			animating = true

			if (currentIndex == 0) return;

			items.eq(currentIndex).fadeOut(function() {
				nextBtn.show()
				items.eq(--currentIndex).fadeIn(function() {
					animating = false
				})
				if (currentIndex == 0) preBtn.hide()
			})
			return false
		})

		nextBtn.on("click", function(e) {
			e.preventDefault();

			if (animating) return;
			animating = true

			if (currentIndex == maxLength - 1) return;

			items.eq(currentIndex).fadeOut(function() {
				preBtn.show()
				items.eq(++currentIndex).fadeIn(function() {
					animating = false
				})
				if (currentIndex == maxLength - 1) nextBtn.hide()
			})

			return false
		})
		return {
			getCurrentIndex: function() {
				return currentIndex
			},
			refresh: function() {
				items = c.find(opt.item);
				maxLenth = items.length
			}
		}
	}
})