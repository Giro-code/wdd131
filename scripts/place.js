const temperature = 28; // Celsius
const windSpeed = 12; // km/h

function calculateWindChill(temp, wind) {
  return 13.12 + 0.6215 * temp - 11.37 * wind ** 0.16 + 0.3965 * temp * wind ** 0.16;
}

let windChill = "N/A";
if (temperature <= 10 && windSpeed > 4.8) {
  windChill = `${calculateWindChill(temperature, windSpeed).toFixed(1)} °C`;
}

document.querySelector("#wind-chill").textContent = windChill;
document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastmodified").textContent = document.lastModified;
