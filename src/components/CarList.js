import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import data from '../data'; // Replace with your car data

const ITEMS_PER_PAGE = 6;

const CarList = () => {
  const { page } = useParams();
  const currentPage = parseInt(page || 1, 10);

  // Define and initialize searchQuery
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCars, setFilteredCars] = useState(data);

  useEffect(() => {
    // Filter cars based on search query
    const filtered = data.filter(car => car.name.toLowerCase().includes(searchQuery.toLowerCase()));
    setFilteredCars(filtered);
  }, [searchQuery]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredCars.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const displayedCars = filteredCars.slice(startIndex, endIndex);

  return (
    <div className="car-list">
      <input
        type="text"
        placeholder="Search cars..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
      />
      <div className="car-cards">
        {displayedCars.map(car => (
          <div className="car-card" key={car.id}>
            {/* Render car card content here */}
            <h3>{car.name}</h3>
            <p>{car.description}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        <Link to={`/page/${currentPage - 1}`} disabled={currentPage === 1}>
          Previous
        </Link>
        {[...Array(Math.min(10, totalPages)).keys()].map(pageNum => (
          <Link key={pageNum + 1} to={`/page/${pageNum + 1}`} className={pageNum + 1 === currentPage ? 'active' : ''}>
            {pageNum + 1}
          </Link>
        ))}
        <Link to={`/page/${currentPage + 1}`} disabled={currentPage === totalPages}>
          Next
        </Link>
      </div>
    </div>
  );
};

export default CarList;

