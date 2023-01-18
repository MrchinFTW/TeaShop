const productContainer = document.getElementById('products-container');
const submitBtn = document.getElementById('subminBtn');
const newItemField = document.getElementById('newItemField');
const sortProducts = document.getElementById('sortProducts');
const filtersSection = document.getElementById('filtersSection');
const showFiltersBtn = document.getElementById('showFiltersBtn');
const resetBtn = document.getElementById('resetBtn');
const filterByPriceInput =
	document.getElementsByClassName('filterByPriceInput');
const filterByPriceBtn = document.getElementById('filterByPriceBtn');
const filterByNameInput = document.getElementById('filterByNameInput');
const timerMinutes = document.getElementById('minutes');
const timerSeconds = document.getElementById('seconds');
const muteBtn = document.getElementById('mute');
let muted = true;
let productListHtml,
	tempProductArray,
	productData,
	debounce = '',
	sortValue = 'price';

function jsonFormating(nonFormatedObj) {
	if (Array.isArray(nonFormatedObj)) {
		let FormatedObj = JSON.stringify({ items: nonFormatedObj });
		return JSON.parse(FormatedObj);
	}
	return nonFormatedObj;
}

function renderPage(items) {
	if (Array.isArray(items)) {
		items = jsonFormating(items);
	}
	items.items.sort(compareFN);

	let rawTemplate = document.getElementById('itemsTemplate').innerHTML;
	let compiledTemplate = Handlebars.compile(rawTemplate);
	let generatedHTML = compiledTemplate(items);

	productContainer.innerHTML = '';
	productContainer.innerHTML = generatedHTML;
}

function mute() {
	if (muted) {
		muteBtn.textContent = 'Unmute';
		muted = false;
	} else {
		muteBtn.textContent = 'Mute';
		muted = true;
	}
}

function decrement(event) {
	console.log();
	if (event.srcElement.nextElementSibling.value > 0) {
		event.srcElement.nextElementSibling.value--;
	}
}

function incrament(event) {
	event.srcElement.offsetParent.childNodes[3].value++;
}

function filterByPriceFN(productList, nimNumber, maxNumber) {
	tempProductArray = productList.items.filter((product) => {
		if (product.price >= nimNumber && product.price <= maxNumber)
			return product;
	});
	if (tempProductArray.length >= 1) {
		renderPage(tempProductArray);
	}
}

function compareFN(productA, productB) {
	if (sortValue === 'price') {
		return productA.price - productB.price;
	}
	return productA.itemName.localeCompare(productB.itemName);
}

function filterByNameFN(productList, filterString) {
	let productsToReturn = [];
	productList.items.filter((elm) => {
		if (elm.itemName.toLowerCase().includes(filterString.toLowerCase())) {
			productsToReturn.push(elm);
		}
	});
	renderPage(productsToReturn);
}

function showAllProducts() {
	tempProductArray = productData;
	renderPage(productData);
	filterByPriceInput[0].value =
		filterByPriceInput[1].value =
		filterByNameInput.value =
			'';
}

function headerTimer() {
	let seconds = 0,
		minutes = 0;
	setInterval(() => {
		if (seconds >= 60) {
			seconds = 0;
			minutes++;
			timerMinutes.textContent = minutes < 10 ? '0' + minutes : minutes;
		}
		timerSeconds.innerText = seconds < 10 ? '0' + seconds : seconds;
		seconds++;
	}, 1000);
}
