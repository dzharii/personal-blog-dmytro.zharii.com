// JavaScript
document.getElementById('calculateButton').addEventListener('click', () => {
    // Retrieve the meter values from the inputs
    const inputValue1 = parseFloat(document.getElementById('input1').value);
    const inputValue2 = parseFloat(document.getElementById('input2').value);

    // Validate the inputs and create Meters objects
    try {
        const meters1 = new Meters(inputValue1);
        const meters2 = new Meters(inputValue2);

        // Perform the addition operation and get the result
        const resultMeters = meters1.add(meters2);

        // Display the result
        document.getElementById('result').innerText = resultMeters.value + ' m';
    } catch (error) {
        // Handle any errors that occurred during the creation of the Meters objects
        document.getElementById('result').innerText = 'Error: ' + error.message;
    }
});
