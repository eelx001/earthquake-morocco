async function fetchEarthquakeData() {
    try {
        const response = await axios.get('https://earthquake.usgs.gov/fdsnws/event/1/query', {
            params: {
                format: 'geojson',
                starttime: '2023-09-01',
                minmagnitude: 4.0,
                maxlatitude: 35.9225, // Adjusted max latitude for Morocco
                minlatitude: 27.6634, // Adjusted min latitude for Morocco
                maxlongitude: -0.9987,
                minlongitude: -13.1714,
            },
        });

        const earthquakeData = response.data.features;
        earthquakeData.sort((a, b) => {
            
            return new Date(b.properties.time) - new Date(a.properties.time);
        });

        const earthquakeTable = document.getElementById('earthquakeData');

        for (const earthquake of earthquakeData) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${earthquake.properties.place}</td>
                <td>${earthquake.properties.mag}</td>
                <td>${new Date(earthquake.properties.time).toLocaleString()}</td>
                <td>${new Date(earthquake.properties.updated).toLocaleString()}</td>
            `;
            earthquakeTable.appendChild(row);
        }
    } catch (error) {
        console.error(error);
    }
}

// Call the function to fetch earthquake data when the page loads
fetchEarthquakeData();

// setTimeout(function () {
//     location.reload();
// }, 120000); 


