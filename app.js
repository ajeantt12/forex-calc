document.getElementById('calcForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    let amount = parseFloat(document.getElementById('amount').value);
    let rewardRate = parseFloat(document.getElementById('rewardRate').value);
    let forexFee = parseFloat(document.getElementById('forexFee').value);
    let currency = document.getElementById('currency').value.toUpperCase();
    
    // Fetch exchange rate from an API
    fetch(`https://api.exchangerate-api.com/v4/latest/INR`)
        .then(response => response.json())
        .then(data => {
            let exchangeRate = data.rates[currency];
            if (exchangeRate) {
                let amountInCurrency = amount / exchangeRate;  // INR to target currency
                let rewardAmount = amount * (rewardRate / 100);
                let forexAmount = amount * (forexFee / 100);
                let extraAmount = rewardAmount + forexAmount;
                
                // Output result
                document.getElementById('result').innerText = `The extra amount in INR due to reward rate and forex fee is: ₹${extraAmount.toFixed(2)}`;
            } else {
                document.getElementById('result').innerText = "Invalid Currency.";
            }
        })
        .catch(error => {
            document.getElementById('result').innerText = "Error fetching exchange rates.";
        });
});
