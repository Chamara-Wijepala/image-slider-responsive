function initSlider() {
	const slideButtons = document.querySelectorAll('.slide-btn');
	const scrollbar = document.querySelector('.scrollbar');
	const scrollbarThumb = document.querySelector('.scrollbar-thumb');
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

	// update scrollbar thumb position based on image scroll
	function updateScrollThumbPosition() {
		const scrollPosition = imageList.scrollLeft;
		// offsetWidth returns the width of an element including the border
		const thumbPosition =
			(scrollPosition / maxScrollLeft) *
			(scrollbar.clientWidth - scrollbarThumb.offsetWidth);
		scrollbarThumb.style.left = `${thumbPosition}px`;
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
		updateScrollThumbPosition();
	});

	// handle scrollbar thumb drag
	scrollbarThumb.addEventListener('mousedown', (e) => {
		// clientX returns horizontal coordinate in the viewport where the event
		// occurred
		const startX = e.clientX;
		const thumbPosition = scrollbarThumb.offsetLeft;

		// update thumb position on mouse move
		function handleMouseMove(e) {
			const deltaX = e.clientX - startX;
			const newThumbPosition = thumbPosition + deltaX;
			// getBoundingClientRect().width returns the elements width including
			// padding and border width
			const maxThumbPosition =
				scrollbar.getBoundingClientRect().width - scrollbarThumb.offsetWidth;

			const boundedPosition = Math.max(
				0,
				Math.min(maxThumbPosition, newThumbPosition)
			);
			const scrollPosition =
				(boundedPosition / maxThumbPosition) * maxScrollLeft;

			scrollbarThumb.style.left = `${boundedPosition}px`;
			imageList.scrollLeft = scrollPosition;
		}

		// prevent thumb from sliding after mouseup
		function handleMouseUp() {
			document.removeEventListener('mousemove', handleMouseMove);
			document.removeEventListener('mouseup', handleMouseUp);
		}

		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);
	});
}

// load event is only fired when the whole page has loaded, including
// stylesheets, scripts, iframes, and images
window.addEventListener('load', initSlider);
