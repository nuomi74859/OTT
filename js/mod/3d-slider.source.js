'use strict'

honey.def("lib:jquery", function(H) {
	var _opt = {
		container: "",
		item: "",
		pagination: "",
		activeClass: "",
		showNum: 3,
		pre_btn: "",
		next_btn: ""
	}

	H.slider3d = function(opt) {
		$.extend(_opt, opt);

		var container = $(_opt.container),
			pagination = $(_opt.pagination),
			items = container.find(_opt.item),
			maxLength = items.length,
			currentIndex = 0,
			currentShows = [],
			animateSpeed = 250,
			fadeSpeed = 100
		if (maxLength < 2) return;

		var tmpArr = []

		$.each(items, function(index, item) {
			tmpArr.push(item)
		})

		items = tmpArr

		$(items).css({
			top: "50%",
			left: "50%",
			width: "10%",
			height: "10%"
		}).hide()

		pagination.on("click", function() {
			var index = $(this).index()
			moveTo(index)
			pagination.removeClass(_opt.activeClass).eq(index).addClass(_opt.activeClass)
		})

		pagination.eq(0).click()

		var pre_btn = $(opt.pre_btn),
			next_btn = $(opt.next_btn)
		if(pre_btn.length > 0 && next_btn.length > 0) {
			pre_btn.on("click", function(){
				var targetIndex = --currentIndex
				if(targetIndex < 0) targetIndex = maxLength - 1
				pagination.eq(targetIndex).click()
				return false;
			})

			next_btn.on("click", function(){
				var targetIndex = ++currentIndex
				if(targetIndex > maxLength - 1) targetIndex = 0
				pagination.eq(targetIndex).click()
				return false;
			})
		}

		function moveTo(index) {
			if (currentShows.length > 0) {
				$.each(currentShows, function(index, item) {
					$(item).fadeOut(fadeSpeed);
				})
			}
			var tmp = []

			if (_opt.showNum == 3) {
				if (index == 0) {
					tmp.push(items[maxLength - 1], items[index], items[index + 1])
				} else if (index == (maxLength - 1)) {
					tmp.push(items[index - 1], items[index], items[0])
				} else {
					tmp.push(items[index - 1], items[index], items[index + 1])
				}

				$(tmp[0]).hide().stop().css({
					opactiy: 0.8
				}).fadeIn(fadeSpeed).animate({
					left: "0",
					right: "none",
					top: "24px",
					width: "640px",
					height: "269px",
					opacity: 0.5,
					zIndex: 1
				}, animateSpeed);

				$(tmp[1]).hide().stop().css({
					opactiy: 0.8
				}).fadeIn(fadeSpeed).animate({
					left: "39px",
					top: "0",
					width: "776px",
					height: "326px",
					opacity: 1,
					zIndex: 10
				}, animateSpeed);

				$(tmp[2]).hide().stop().css({
					opactiy: 0.8
				}).fadeIn(fadeSpeed).animate({
					right: "0",
					left: "220px",
					top: "24px",
					width: "640px",
					height: "269px",
					opacity: 0.5,
					zIndex: 1
				}, animateSpeed);
				currentIndex = index
			} else if (_opt.showNum == 5 && items.length >= 5) {
				if (index == 0) {
					tmp.push(items[maxLength - 2], items[maxLength - 1], items[index], items[index + 1], items[index + 2])
				} else if (index == (maxLength - 1)) {
					tmp.push(items[index - 2], items[index - 1], items[index], items[0], items[1])
				} else {
					var pre_2 = index - 2,
						next_2 = index + 2
					if (index == 1) {
						pre_2 = maxLength - 1
					} else if (index == maxLength - 2) {
						next_2 = 0
					}
					tmp.push(items[pre_2], items[index - 1], items[index], items[index + 1], items[next_2])
				}

				$(tmp[0]).hide().stop().css({
					opactiy: 0.8
				}).fadeIn(fadeSpeed).animate({
					left: "0",
					right: "none",
					top: "54px",
					width: "521px",
					height: "293px",
					opacity: 0.5,
					zIndex: 1
				}, animateSpeed);

				$(tmp[1]).hide().stop().css({
					opactiy: 1
				}).fadeIn(fadeSpeed).animate({
					left: "52px",
					right: "none",
					top: "19px",
					width: "647px",
					height: "364px",
					opacity: 0.8,
					zIndex: 5
				}, animateSpeed);

				$(tmp[2]).hide().stop().css({
					opactiy: 0.8
				}).fadeIn(fadeSpeed).animate({
					right: "0",
					left: "109px",
					top: "0",
					width: "728px",
					height: "409px",
					opacity: 1,
					zIndex: 10
				}, animateSpeed);

				$(tmp[3]).hide().stop().css({
					opactiy: 1
				}).fadeIn(fadeSpeed).animate({
					left: "256px",
					top: "19px",
					width: "647px",
					height: "364px",
					opacity: 0.8,
					zIndex: 5
				}, animateSpeed);

				$(tmp[4]).hide().stop().css({
					opactiy: 0.8
				}).fadeIn(fadeSpeed).animate({
					left: "446px",
					top: "54px",
					width: "521px",
					height: "293px",
					opacity: 0.5,
					zIndex: 1
				}, animateSpeed);
				currentIndex = index
			}

			currentShows = tmp
		}
	}
})