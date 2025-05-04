function handleSearch() {
    const input = document
        .getElementById('searchInput')
        .value.trim()
        .toLowerCase()
    const resultsContainer = document.getElementById('results')
    resultsContainer.innerHTML = ''

    fetch('travel_recommendation_api.json')
        .then((res) => res.json())
        .then((data) => {
            const matches = []

            data.countries.forEach((country) => {
                country.cities.forEach((city) => {
                    if (
                        city.name.toLowerCase().includes(input) ||
                        city.description.toLowerCase().includes(input) ||
                        country.name.toLowerCase().includes(input)
                    ) {
                        matches.push(city)
                    }
                })
            })

            data.temples.forEach((temple) => {
                if (
                    temple.name.toLowerCase().includes(input) ||
                    temple.description.toLowerCase().includes(input)
                ) {
                    matches.push(temple)
                }
            })

            data.beaches.forEach((beach) => {
                if (
                    beach.name.toLowerCase().includes(input) ||
                    beach.description.toLowerCase().includes(input)
                ) {
                    matches.push(beach)
                }
            })

            if (matches.length === 0) {
                resultsContainer.innerHTML = '<p>No results found.</p>'
                return
            }

            matches.forEach((place) => {
                const card = document.createElement('div')
                card.className = 'recommendation-card'

                card.innerHTML = `
            <img class="recommendation-img" src="assets/${place.imageUrl}" alt="${place.name}" />
            <div class="card-content">
              <h3 class="card-title">${place.name}</h3>
              <p class="card-description">${place.description}</p>
              <a href="#" class="visit-button">Visit</a>
            </div>
          `
                resultsContainer.appendChild(card)
            })
        })
        .catch((err) => {
            console.error('Error loading data', err)
            resultsContainer.innerHTML = '<p>Failed to load data.</p>'
        })
}

function clearResults() {
    document.getElementById('searchInput').value = ''
    document.getElementById('results').innerHTML = ''
}
