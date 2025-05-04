function handleSearch() {
    const input = document
        .getElementById('searchInput')
        .value.trim()
        .toLowerCase()
    const resultsDiv = document.getElementById('results')
    resultsDiv.innerHTML = ''

    if (!input) {
        alert('Please enter a valid search keyword.')
        return
    }

    fetch('travel_recommendation_api.json')
        .then((res) => res.json())
        .then((data) => {
            let matchedItems = []

            if (input.includes('beach')) {
                matchedItems = data.beaches
            } else if (input.includes('temple')) {
                matchedItems = data.temples
            } else if (input.includes('country')) {
                // flatten all cities from countries
                matchedItems = data.countries.flatMap(
                    (country) => country.cities
                )
            }

            if (matchedItems.length === 0) {
                resultsDiv.innerHTML = '<p>No results found.</p>'
                return
            }

            matchedItems.forEach((item) => {
                const card = document.createElement('div')
                card.className = 'recommendation-card'
                card.innerHTML = `
                  <img src="assets/${item.imageUrl}" alt="${item.name}" class="recommendation-img"/>
                  <div class="card-content">
                    <h3 class="card-title">${item.name}</h3>
                    <p class="card-description">${item.description}</p>
                    <a href="#" class="visit-button">Visit</a>
                  </div>
                `
                resultsDiv.appendChild(card)
            })
        })
        .catch((err) => {
            console.error('Error fetching data:', err)
            resultsDiv.innerHTML = '<p>Error loading data.</p>'
        })
}

function clearResults() {
    document.getElementById('searchInput').value = ''
    document.getElementById('results').innerHTML = ''
}
