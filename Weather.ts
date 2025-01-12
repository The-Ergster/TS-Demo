interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    description: string;
  }[];
}

class WeatherApp {
  private apiKey: string = 'your-api-key-here'; // Use your own API key from OpenWeatherMap
  private weatherElement: HTMLElement;
  private cityInputElement: HTMLInputElement;

  constructor(weatherElement: HTMLElement, cityInputElement: HTMLInputElement) {
    this.weatherElement = weatherElement;
    this.cityInputElement = cityInputElement;
  }

  async fetchWeather(city: string): Promise<void> {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`);
      const data: WeatherData = await response.json();

      this.renderWeather(data);
    } catch (error) {
      this.weatherElement.textContent = 'Error fetching weather data.';
    }
  }

  renderWeather(data: WeatherData): void {
    this.weatherElement.innerHTML = `
      <h2>Weather in ${data.name}</h2>
      <p>Temperature: ${data.main.temp}°C</p>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Description: ${data.weather[0].description}</p>
    `;
  }

  setupEventListeners(): void {
    this.cityInputElement.addEventListener('input', () => {
      const city = this.cityInputElement.value.trim();
      if (city) {
        this.fetchWeather(city);
      }
    });
  }
}

// Initialize the Weather App
const weatherElement = document.getElementById('weather')!;
const cityInputElement = document.getElementById('city-input') as HTMLInputElement;
const weatherApp = new WeatherApp(weatherElement, cityInputElement);

weatherApp.setupEventListeners();
