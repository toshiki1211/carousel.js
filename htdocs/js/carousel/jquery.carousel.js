/*
*  jQuery.carousel.js v1
*  2016.05.29 tomizawa
*/

;
$(function($) {
	'use strict';

	$.fn.carousel = function(options){
		var defaultOptions = {
			speed : 1000,
			delay : 3000
		};

		var target = $(this);
		var options = $.extend({}, defaultOptions, options);
		var imgWidth;
		var imgHeight;
		var imgListLength;
		var slideImgs = target.find('#img ul');
		var listItem = slideImgs.children();
		var slideCount = 2;
		var btnFlg = false;

		$(window).load(function(){
			imgWidth = $('#img_container ul li img').width();
			imgHeight = $('#img_container ul li img').height();
			imgListLength = $('#img_container ul li img').length;

			$('#img_container').css('width', imgWidth * imgListLength);
			$('#carousel').css('width', imgWidth);
			$('#carousel').css('height', imgHeight);
			$('#carousel').css('overflow', 'hidden');
			$('#img_container ul li').css('width', imgWidth);
			$('#img').css('left', -imgWidth);
		});

		var init = function(){
			target.append('<div class="right_btn">&gt</did>', '<div class="left_btn">&lt;</did>');

			var firstItemClone = slideImgs.find('> li:first-child').clone(true);
			var lastItemClone = slideImgs.find('> li:last-child').clone(true);
			slideImgs.append(firstItemClone);
			slideImgs.prepend(lastItemClone);

			animationAuto();

			$('.right_btn').click(function() {
				slideNext();
			});

			$('.left_btn').click(function() {
				slidePrev();
			});
		}

		var slidePrev = function(){
			if(btnFlg == false){
				btnFlg = true;

				slideCount--;

				$('#img').animate({'left': -imgWidth * (slideCount - 1)}, options.speed, function(){
					btnFlg = false;

					if(slideCount <= 1){
						slideImgs.append(listItem.clone(true).addClass('clone'));
						$('#img').css('left', -imgWidth * (imgListLength - 2));
						$('.clone').remove();

						slideCount = imgListLength - 1;
					}
				});
			}
		}

		var slideNext = function(){
			if(btnFlg == false){
				btnFlg = true;

				slideCount++;

				$('#img').animate({'left': -imgWidth * (slideCount - 1)}, options.speed, function(){
					btnFlg = false;

					if(slideCount >= imgListLength){
						slideImgs.append(listItem.clone(true).addClass('clone'));
						$('#img').css('left', -imgWidth);
						$('.clone').remove();

						slideCount = 2;
					}
				});
			}
		};

		var animationAuto = function(){
			var slideAnim = setInterval(function(){
				slideNext();
			}, options.delay);
		};

		init();
	};
});