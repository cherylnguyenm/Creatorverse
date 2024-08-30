import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';  // Ensure the client is configured correctly

const ViewCreator = () => {
  const { id } = useParams();
  const [creator, setCreator] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreator = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching creator:', error);
      } else {
        setCreator(data);
      }
      setLoading(false);
    };

    fetchCreator();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!creator) return <p>No creator found.</p>;

  return (
    <div>
      <h1>{creator.name}</h1>
      <p>{creator.description}</p>
      <a href={creator.url} target="_blank" rel="noopener noreferrer">
        <button>Visit Channel</button>
      </a>
      {creator.imageurl && (
        <img
          src={creator.imageurl}
          alt={creator.name}
          style={{ width: '200px', height: 'auto', borderRadius: '8px' }}
        />
      )}
    </div>
  );
};

export default ViewCreator;
