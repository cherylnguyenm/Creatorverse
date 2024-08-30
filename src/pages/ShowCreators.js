import React, { useEffect, useState } from 'react';
import { supabase } from '../client';
import Card from '../components/Card';
import './ShowCreators.css';

const ShowCreators = () => {
    const [creators, setCreators] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchCreators = async () => {
        try {
          const { data, error } = await supabase
            .from('creators') 
            .select('*');
  
          if (error) {
            console.error('Error fetching creators:', error);
            return;
          }
  
          setCreators(data);
        } catch (err) {
          console.error('Error fetching creators:', err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchCreators();
    }, []);
  
    if (loading) return <p>Loading...</p>;
  
    return (
      <div className="container">
        <section className="welcome">
          <h1>Welcome to Creatorverse!</h1>
          <p>Discover and manage your favorite content creators.</p>
          <div className="buttons">
            <button onClick={() => document.getElementById('creators-list').scrollIntoView({ behavior: 'smooth' })}>
              View Creators
            </button>
            <a href="/add">
              <button>Add Creator</button>
            </a>
          </div>
        </section>
  
        <section id="creators-list">
          <h2>Content Creators</h2>
          {creators.length > 0 ? (
            creators.map((creator) => (
              <Card
                key={creator.id}
                id={creator.id}
                name={creator.name}
                url={creator.url}
                description={creator.description}
                imageurl={creator.imageurl}
              />
            ))
          ) : (
            <p>No creator listed</p>
          )}
        </section>
      </div>
    );
  };

export default ShowCreators;
