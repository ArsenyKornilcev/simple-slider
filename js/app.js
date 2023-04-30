window.addEventListener("DOMContentLoaded", () => {
	const slider = document.querySelector(".slider");
	const slides = document.querySelectorAll(".slider__item");
	const sliderBtns = document.querySelectorAll(".slider__dot");
	const arrow_prev = document.querySelector(".slider__arrow_prev");
	const arrow_next = document.querySelector(".slider__arrow_next");
	let currentSlideIndex = 0;

	arrow_prev.addEventListener("click", () => {
		chooseSlide(currentSlideIndex - 1);
	});

	arrow_next.addEventListener("click", () => {
		chooseSlide(currentSlideIndex + 1);
	});

	function chooseSlide(newIndex) {
		// remove class in current slide
		slides[currentSlideIndex].classList.remove("slider__item_active");
		sliderBtns[currentSlideIndex].classList.remove("slider__dot_active");

		fixIndex(newIndex);

		// add class in new slide
		slides[currentSlideIndex].classList.add("slider__item_active");
		sliderBtns[currentSlideIndex].classList.add("slider__dot_active");
	}

	function fixIndex(newIndex) {
		// infinite slider
		switch (true) {
			case newIndex < 0:
				currentSlideIndex = 2;
				break;
			case newIndex > 2:
				currentSlideIndex = 0;
				break;
			default:
				currentSlideIndex = newIndex;
				break;
		}
	}

	// dots
	sliderBtns.forEach((btn, index) => {
		btn.addEventListener("click", () => {
			sliderBtns[currentSlideIndex].classList.remove(
				"slider__dot_active"
			);
			slides[currentSlideIndex].classList.remove("slider__item_active");

			currentSlideIndex = index;

			btn.classList.add("slider__dot_active");
			slides[currentSlideIndex].classList.add("slider__item_active");
		});
	});

	let sliderInterval = setInterval(() => {
		chooseSlide(currentSlideIndex + 1);
	}, 3000);

	// функция для запуска таймера автоперелистывания
	function startTimer() {
        if(!sliderInterval) {
            sliderInterval = setInterval(() => {
				// здесь вызываем функцию для перелистывания слайдов
				chooseSlide(currentSlideIndex + 1);
			}, 3000);
            isSliderWorking = true;
        }
	}

	// функция для остановки таймера
	function stopTimer() {
		clearInterval(sliderInterval);
        sliderInterval = null;
	}

	slider.addEventListener("click", () => {
		stopTimer();

		setTimeout(startTimer, 5000);
	});
});
