window.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById("calc-form");
  if (form) {
    setupIntialValues();
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues() {
  const values = { amount: 10000, years: 10, rate: 4.5 };
  const amountUI = document.getElementById("loan-amount");
  amountUI.value = values.amount;
  const yearsUI = document.getElementById("loan-years");
  yearsUI.value = values.years;
  const rateUI = document.getElementById("loan-rate");
  rateUI.value = values.rate;
  update();
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  let uiVals = getCurrentUIValues();
  let calc = calculateMonthlyPayment(uiVals);
  updateMonthly(calc);
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(values) {
  let P = values.amount;
  let i = (values.rate / 100) / 12;
  let n = Math.floor(values.years * 12);

  let numerator = P * i;
  let sumN = Math.pow((1 + i), -n);
  let denominator = 1 - sumN;

  let payment = numerator / denominator;

  //Convert payment to a string with 2 decimal places.
  let strFormat = "$" + payment.toFixed(2);

  //Return that string.
  return strFormat;
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(monthly) {
  let showPayment = document.getElementById("monthly-payment");
  showPayment.innerText = monthly;
}
