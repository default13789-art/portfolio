import React, { useState, useEffect } from 'react';

/**
 * CyberpunkClock – Modern cyberpunk-style clock widget
 *
 * Features:
 * - Real-time clock with seconds
 * - Current date display
 * - Location: Bogura, Bangladesh
 * - Weather with real API data (wttr.in) + fallback
 * - Neon glow effects
 * - Glitch animation on hover
 * - Scanline effects
 */

const CyberpunkClock = () => {
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [glitchActive, setGlitchActive] = useState(false);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch weather data
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch('https://wttr.in/Bogura,BD?format=j1');
        if (!response.ok) throw new Error('Weather unavailable');
        const data = await response.json();
        const current = data.current_condition[0];
        setWeather({
          temp: current.temp_C,
          condition: current.weatherDesc[0].value,
          humidity: current.humidity,
          icon: getWeatherIcon(current.weatherCode)
        });
      } catch (err) {
        // Fallback data
        setWeather({
          temp: '28',
          condition: 'Partly Cloudy',
          humidity: '65',
          icon: '⛅'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 30 * 60 * 1000); // Refresh every 30 min
    return () => clearInterval(interval);
  }, []);

  // Random glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() < 0.05) {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 200);
      }
    }, 5000);
    return () => clearInterval(glitchInterval);
  }, []);

  const getWeatherIcon = (code) => {
    const icons = {
      '113': '☀️', '116': '⛅', '119': '☁️', '122': '☁️',
      '176': '🌧️', '263': '🌧️', '266': '🌧️', '293': '🌧️',
      '296': '🌧️', '299': '🌧️', '302': '🌧️', '305': '🌧️',
      '200': '⛈️', '389': '⛈️', '179': '❄️', '182': '❄️',
      '227': '❄️', '143': '🌫️', '248': '🌫️'
    };
    return icons[code] || '🌡️';
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div
      className={`cyberpunk-clock ${glitchActive ? 'glitch-active' : ''}`}
      onMouseEnter={() => setGlitchActive(true)}
      onMouseLeave={() => setGlitchActive(false)}
    >
      {/* Scanline effect */}
      <div className="scanline"></div>

      {/* Top decoration bar */}
      <div className="cyber-bar"></div>

      {/* Time display */}
      <div className="clock-section">
        <div className="clock-label">SYS.TIME</div>
        <div className="clock-time">{formatTime(time)}</div>
      </div>

      {/* Date display */}
      <div className="clock-section">
        <div className="clock-label">SYS.DATE</div>
        <div className="clock-date">{formatDate(time)}</div>
      </div>

      {/* Location display */}
      <div className="clock-section">
        <div className="clock-label">SYS.LOC</div>
        <div className="clock-location">
          <span className="loc-icon">◉</span>
          <span>BOGURA, BD</span>
        </div>
      </div>

      {/* Weather display */}
      <div className="clock-section weather-section">
        <div className="clock-label">SYS.WTHR</div>
        {loading ? (
          <div className="weather-loading">
            <span className="loading-dot"></span>
          </div>
        ) : (
          <div className="weather-info">
            <span className="weather-icon">{weather?.icon}</span>
            <span className="weather-temp">{weather?.temp}°C</span>
            <span className="weather-humidity">{weather?.humidity}%</span>
          </div>
        )}
      </div>

      {/* Status indicators */}
      <div className="status-indicators">
        <span className="status-dot online"></span>
        <span className="status-dot active"></span>
        <span className="status-dot sync"></span>
      </div>

      {/* Corner accents */}
      <div className="corner-tl"></div>
      <div className="corner-tr"></div>
      <div className="corner-bl"></div>
      <div className="corner-br"></div>
    </div>
  );
};

export default CyberpunkClock;
