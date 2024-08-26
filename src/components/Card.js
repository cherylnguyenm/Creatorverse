import React from 'react';
import { Link } from 'react-router-dom';
import './Card.css';

const Card = ({ id, name, url, description, imageURL }) => {
  return (
    <div className="card">
      {imageURL ? (
        <img src={imageURL} alt={name} className="card-image" />
      ) : (
        <div className="placeholder-image">No Image Available</div>
      )}
      <h2>{name}</h2>
      <p>{description}</p>
      <div className="card-actions">
        {}
        <a href={url} target="_blank" rel="noopener noreferrer">
          <button className="action-button">Visit Channel</button>
        </a>
        <Link to={`/creators/${id}`}>
          <button className="action-button">View</button>
        </Link>
        <Link to={`/edit/${id}`}>
          <button className="action-button">Edit</button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
