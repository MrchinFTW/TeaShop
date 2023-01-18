fetch(
	'https://raw.githubusercontent.com/MrchinFTW/class-work/main/products.json'
)
	.then((response) => response.json())
	.then((data) => {
		productData = data;
		tempProductArray = productData;
		renderPage(productData);
	});

sortProducts.addEventListener('change', (e) => {
	sortValue = e.target.value;
	tempProductArray = jsonFormating(tempProductArray);
	tempProductArray.items.sort(compareFN);
	renderPage(tempProductArray);
});

showFiltersBtn.addEventListener('click', () => {
	// TODO: add transition to the toggle
	filtersSection.classList.toggle('hidden');
});

filterByPriceBtn.addEventListener('click', () => {
	let filterMinNumber = filterByPriceInput[0].valueAsNumber;
	let filterMaxNumber = filterByPriceInput[1].valueAsNumber;
	if (filterMaxNumber < filterMinNumber || filterMinNumber < 0) {
		return 0;
	}
	filterByPriceFN(productData, filterMinNumber, filterMaxNumber);
	filterByPriceInput[0].value = filterByPriceInput[1].value = '';
});

filterByNameInput.addEventListener('keyup', (e) => {
	let keyPressed = e.target.value;
	clearTimeout(debounce);
	debounce = setTimeout(() => {
		keyPressed = keyPressed.toLowerCase();
		filterByNameFN(productData, keyPressed);
	}, 300);
});

headerTimer();

document.addEventListener('click', () => {
	let soundToPlay = Math.floor(Math.random() * 4);
	let sound = new Audio('./sounds/' + soundToPlay + '.mp3');
	if (muted) {
		sound.play();
	}
});
