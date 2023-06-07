// Selecting the form and button elements
const form = document.querySelector('#weatherForm');
const submitButton = document.querySelector('#weatherForm button');

// Adding event listener for form submission
form.addEventListener('submit', handleSubmit);

// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault(); // Prevents the default form submission behavior

    // Retrieve the location value from the input field
    const locationInput = document.querySelector('#locationInput');
    const location = locationInput.value;

    // Call a function to fetch weather data based on the location
    fetchWeatherData(location);
}

// Function to fetch weather data based on the location
async function fetchWeatherData(location) {
    const apiKey = '658c05715emshcca5c61163e9886p17402bjsn2f0821549753';
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

    try {
        const response = await fetch(url); // Make the API request

        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }

        const data = await response.json(); // Convert the response to JSON

        // Extract necessary weather information
        const city = data.location.name;
        const temperature = data.current.temp_c;
        const condition = data.current.condition.text;

        // Update the HTML to display the weather data
        const weatherInfo = document.querySelector('#weatherInfo');
        weatherInfo.innerHTML = `
            <h2>Weather Information</h2>
            <p>City: ${city}</p>
            <p>Temperature: ${temperature}°C</p>
            <p>Condition: ${condition}</p>
        `;
    } catch (error) {
        console.log(error);

        // Display an error message to the user
        const weatherInfo = document.querySelector('#weatherInfo');
        weatherInfo.innerHTML = `<p>Error fetching weather data. Please try again later.</p>`;
    }
}
