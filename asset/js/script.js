/* DOM Elements */
const amountInput = document.getElementById('amount');
const fromSelect = document.getElementById('fromCurrency');
const toSelect = document.getElementById('toCurrency');
const form = document.getElementById('converterForm');
const resultInput = document.getElementById('result');
const themeToggle = document.getElementById('themeToggle');
const swapBtn = document.getElementById('swapBtn');
const errorMessage = document.getElementById('errorMessage');
const rateText = document.getElementById('rateText');

let currenciesList = [];

/* Fetch available currencies from Frankfurter API */
async function loadCurrencies() {
    try {
        const response = await fetch('https://api.frankfurter.app/currencies');
        const data = await response.json();
        currenciesList = Object.keys(data).sort();
        populateCurrencySelects();
    } catch (error) {
        console.error('Error loading currencies:', error);
        showError('Failed to load currency data. Please refresh the page.');
    }
}

/* Populate currency select dropdowns */
function populateCurrencySelects() {
    // Clear existing options
    fromSelect.innerHTML = '<option value="">Select currency</option>';
    toSelect.innerHTML = '<option value="">Select currency</option>';

    // Add all currencies
    currenciesList.forEach(currency => {
        const optionFrom = document.createElement('option');
        optionFrom.value = currency;
        optionFrom.textContent = currency;

        const optionTo = document.createElement('option');
        optionTo.value = currency;
        optionTo.textContent = currency;

        fromSelect.appendChild(optionFrom);
        toSelect.appendChild(optionTo);
    });

    // Set defaults
    setDefaults();
}

/* Set default currencies */
function setDefaults() {
    fromSelect.value = 'USD';
    toSelect.value = 'EUR';
}

/* Validate user input */
function isValidInput(amount, from, to) {
    if (!amount || isNaN(amount) || amount <= 0) return false;
    if (!from || !to) return false;
    if (from === to) return false;
    return true;
}

/* Clear error message */
function clearError() {
    errorMessage.textContent = '';
    errorMessage.classList.remove('error');
}

/* Show error message */
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('error');
    resultInput.value = '';
    rateText.textContent = 'Enter valid amounts to see the rate';
}

/* Perform currency conversion */
async function convertCurrency(amount, from, to) {
    try {
        clearError();
        
        const response = await fetch(
            `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
        );
        
        if (!response.ok) {
            throw new Error('Conversion failed');
        }

        const data = await response.json();
        const converted = data.rates[to];
        
        if (!converted) {
            throw new Error('Invalid conversion result');
        }

        displayResult(amount, from, to, converted);
    } catch (error) {
        console.error('Conversion error:', error);
        showError('Unable to fetch exchange rate. Please try again.');
    }
}

/* Display conversion result */
function displayResult(amount, from, to, converted) {
    const rate = (converted / amount).toFixed(6);
    resultInput.value = converted.toFixed(2);
    rateText.textContent = `1 ${from} = ${rate} ${to}`;
}

/* Handle form submission */
function handleSubmit(event) {
    event.preventDefault();

    const amount = parseFloat(amountInput.value);
    const from = fromSelect.value;
    const to = toSelect.value;

    if (!isValidInput(amount, from, to)) {
        showError('Please enter a valid amount and select different currencies.');
        return;
    }

    convertCurrency(amount, from, to);
}

/* Handle real-time conversion as user types */
function handleAmountChange() {
    const amount = parseFloat(amountInput.value);
    const from = fromSelect.value;
    const to = toSelect.value;

    if (isValidInput(amount, from, to)) {
        convertCurrency(amount, from, to);
    } else {
        clearError();
        resultInput.value = '';
        rateText.textContent = 'Enter amount to see the rate';
    }
}

/* Handle currency selection change */
function handleCurrencyChange() {
    const amount = parseFloat(amountInput.value);
    const from = fromSelect.value;
    const to = toSelect.value;

    if (from === to) {
        showError('Please select different currencies.');
        return;
    }

    if (isValidInput(amount, from, to)) {
        convertCurrency(amount, from, to);
    } else {
        clearError();
        resultInput.value = '';
        rateText.textContent = 'Enter amount to see the rate';
    }
}

/* Handle theme toggle */
function toggleTheme() {
    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
}

/* Handle currency swap */
function swapCurrencies() {
    const temp = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = temp;

    const amount = parseFloat(amountInput.value);
    if (isValidInput(amount, fromSelect.value, toSelect.value)) {
        convertCurrency(amount, fromSelect.value, toSelect.value);
    }
}

/* Load saved theme preference */
function loadThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
    }
}

/* Event Listeners */
form.addEventListener('submit', handleSubmit);
amountInput.addEventListener('input', handleAmountChange);
fromSelect.addEventListener('change', handleCurrencyChange);
toSelect.addEventListener('change', handleCurrencyChange);
themeToggle.addEventListener('click', toggleTheme);
swapBtn.addEventListener('click', swapCurrencies);

/* Initialize Application */
async function init() {
    loadThemePreference();
    await loadCurrencies();
}

init();