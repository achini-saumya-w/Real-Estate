// Dummy property data
const propertyData = [
    {
        id: 1,
        category: 'sell-house',
        location: 'Colombo',
        price: 'Rs.1500000',
        bedrooms: 3,
        bathrooms: 2,
        images: ['img1.jpg', 'img1.jpg', 'img1.jpg'],
        postedTime: '2024-01-06',
        description: ''
    },
    {
        id: 2,
        category: 'sell-house',
        location: 'Colombo',
        price: 'Rs.1500000',
        bedrooms: 3,
        bathrooms: 2,
        images: ['img2.jpg', 'img2.jpg', 'img2.jpg'],
        postedTime: '2024-01-06',
        description: ''
    },
    {
        id: 3,
        category: 'sell-house',
        location: 'Colombo',
        price: 'Rs.1500000',
        bedrooms: 3,
        bathrooms: 2,
        images: ['img3.jpg', 'img3.jpg', 'img3.jpg'],
        postedTime: '2024-01-06',
        description: ''
    }
];

let filteredProperties = [...propertyData];

function handleSearch() {
    const category = document.getElementById('category').value;
    const minPrice = document.getElementById('minPrice').value;
    const maxPrice = document.getElementById('maxPrice').value;
    const location = document.getElementById('location').value;
    const bedrooms = document.getElementById('bedrooms').value;
    const bathrooms = document.getElementById('bathrooms').value;

    filteredProperties = propertyData.filter(property => {
        return (!category || property.category === category) &&
            (!minPrice || property.price >= parseInt(minPrice)) &&
            (!maxPrice || property.price <= parseInt(maxPrice)) &&
            (!location || property.location.toLowerCase().includes(location.toLowerCase())) &&
            (!bedrooms || property.bedrooms >= parseInt(bedrooms)) &&
            (!bathrooms || property.bathrooms >= parseInt(bathrooms));
    });

    displayProperties();
}

function displayProperties() {
    const propertyContainer = document.getElementById('propertyContainer');
    propertyContainer.innerHTML = '';

    filteredProperties.forEach(property => {
        const card = document.createElement('div');
        card.className = 'col-md-4';
        card.innerHTML = `
            <div class="card mb-4 property-card">
                <div id="carousel${property.id}" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                        ${property.images.map((img, index) => `
                        <div class="carousel-item ${index === 0 ? 'active' : ''}">
                            <img class="d-block w-100" src="${img}" alt="Property image">
                        </div>`).join('')}
                    </div>
                    <a class="carousel-control-prev" href="#carousel${property.id}" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carousel${property.id}" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${property.location}</h5>
                    <p class="card-text">Category: ${formatCategory(property.category)}</p>
                    <p class="card-text">Price: ${property.price}</p>
                    <p class="card-text">Bedrooms: ${property.bedrooms}</p>
                    <p class="card-text">Bathrooms: ${property.bathrooms}</p>
                    <p class="card-text">Posted: ${new Date(property.postedTime).toLocaleDateString()}</p>
                    <p class="card-text">${truncateDescription(property.description)}</p>
                    <button class="btn btn-primary" onclick="handleViewDetails(${property.id})">View More</button>
                </div>
            </div>`;
        propertyContainer.appendChild(card);
    });
}

function handleViewDetails(id) {
    const property = filteredProperties.find(p => p.id === id);
    const modal = new bootstrap.Modal(document.getElementById('propertyModal'));

    document.getElementById('propertyModalLabel').innerText = property.location;
    document.getElementById('carouselInner').innerHTML = property.images.map((img, index) => `
        <div class="carousel-item ${index === 0 ? 'active' : ''}">
            <img class="d-block w-100" src="${img}" alt="Property image">
        </div>`).join('');
    document.getElementById('modalLocation').innerText = `Location: ${property.location}`;
    document.getElementById('modalPrice').innerText = `Price: ${property.price}`;
    document.getElementById('modalBedrooms').innerText = `Bedrooms: ${property.bedrooms}`;
    document.getElementById('modalBathrooms').innerText = `Bathrooms: ${property.bathrooms}`;
    document.getElementById('modalPostedTime').innerText = `Posted: ${new Date(property.postedTime).toLocaleDateString()}`;
    document.getElementById('modalDescription').innerText = property.description;

    modal.show();
}

function formatCategory(category) {
    switch (category) {
        case 'rent-house': return 'Rent House';
        case 'sell-house': return 'Sell House';
        case 'rent-land': return 'Rent Land';
        case 'sell-land': return 'Sell Land';
        case 'rent-room': return 'Rent Room';
        case 'rent-annex': return 'Rent Annex';
        default: return 'Unknown';
    }
}

function truncateDescription(description) {
    return description.length > 100 ? description.substring(0, 100) + '...' : description;
}

// Back to Top button functionality
const backToTopBtn = document.getElementById('backToTopBtn');

window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopBtn.style.display = "block";
    } else {
        backToTopBtn.style.display = "none";
    }
}

function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

document.addEventListener('DOMContentLoaded', () => {
    displayProperties();
});
