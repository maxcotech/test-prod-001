import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function ItemDetail() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:4001/api/items/' + id)
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(setItem)
      .catch(() => navigate('/'));
  }, [id, navigate]);

  if (!item) return <p>Loading...</p>;

  return (
    <div className='page-container' style={{ padding: 16 }}>
      <div className='content'>
        <h2>{item.name}</h2>
        <p><strong>Category:</strong> {item.category}</p>
        <p><strong>Price:</strong> ${item.price}</p>
      </div>

    </div>
  );
}

export default ItemDetail;