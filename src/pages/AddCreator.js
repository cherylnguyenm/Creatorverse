import React, { useState } from 'react';
import { supabase } from '../client';
import { useNavigate } from 'react-router-dom';

const AddCreator = () => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from('creators')
      .insert([{ name, url, description, imageurl: imageURL }]);

    if (error) {
      console.error('Error adding creator:', error);
    } else {
      navigate('/');
    }
  };

  return (
    <div>
      <h1>Add a New Content Creator</h1>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
        <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="URL" required />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />
        <input value={imageURL} onChange={(e) => setImageURL(e.target.value)} placeholder="Image URL" />
        <button type="submit">Add Creator</button>
      </form>
    </div>
  );
};

export default AddCreator;
