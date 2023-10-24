function initSlider() {
	const slideButtons = document.querySelectorAll('.slide-btn');
	const imageList = document.querySelector('.image-list');

	// scrollWidth returns max width of an element, including content hidden due
	// to overflow. Includes padding just like clientWidth
	const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

	// hide slide buttons when there is no room to scroll
	function handleSlideButtons() {
		// scrollLeft returns the number of pixels that an element's content is
		// scrolled from its left edge
		slideButtons[0].style.display =
			imageList.scrollLeft <= 0 ? 'none' : 'block';
		slideButtons[1].style.display =
			imageList.scrollLeft >= maxScrollLeft ? 'none' : 'block';
	}

	slideButtons.forEach((button) => {
		button.addEventListener('click', () => {
			const direction = button.id === 'prev-slide' ? -1 : 1;
			// clientWidth returns width of an element in pixels (including padding)
			const scrollAmount = imageList.clientWidth * direction;
			// left specifies number of pixels to scroll along the X axis
			imageList.scrollBy({ left: scrollAmount, behavior: 'smooth' });
		});
	});

	imageList.addEventListener('scroll', () => {
		handleSlideButtons();
	});
}

// load event is only fired when the whole page has loaded, including
// stylesheets, scripts, iframes, and images
window.addEventListener('load', initSlider);
