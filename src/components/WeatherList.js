import styles from '../styles/WeatherList.module.css';

export default function WeatherList({ weatherData, onTogglePin }) {
  return (
    <div className={styles.weatherListContainer}>
      {weatherData.length === 0 ? (
        <p className={styles.noData}>No weather data. Click "Fetch Weather Data" to load.</p>
      ) : (
        <table className={styles.weatherTable}>
          <thead>
            <tr>
              <th>Provider</th>
              <th>Location</th>
              <th>Temperature (°C)</th>
              <th>Wind Speed (m/s)</th>
              <th>Conditions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {weatherData.map((provider, index) => (
              <tr 
                key={provider.providerName} 
                className={provider.isPinned ? styles.pinnedRow : ''}
              >
                <td>{provider.providerName}</td>
                <td>{provider.location}</td>
                <td>{provider.temperature}</td>
                <td>{provider.windSpeed}</td>
                <td>{provider.weatherCondition}</td>
                <td>
                  <button 
                    onClick={() => onTogglePin(provider.providerName)}
                    className={styles.pinButton}
                  >
                    {provider.isPinned ? 'Unpin' : 'Pin'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}