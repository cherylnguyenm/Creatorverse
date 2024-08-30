import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';

const EditCreator = () => {
  const { id } = useParams(); // Get the creator's id from the URL
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');
  const [imageurl, setImageURL] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the creator's current information from the database
    const fetchCreator = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching creator:', error);
      } else {
        setName(data.name);
        setUrl(data.url);
        setDescription(data.description);
        setImageURL(data.imageurl);
      }
    };

    fetchCreator();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Update the creator's information in the database
    const { error } = await supabase
      .from('creators')
      .update({ name, url, description, imageurl })
      .eq('id', id);

    if (error) {
      console.error('Error updating creator:', error);
    } else {
      navigate(`/view/${id}`); // Navigate to the view page after a successful update
    }
  };

  const handleDelete = async () => {
    // Delete the creator from the database
    const { error } = await supabase
      .from('creators')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting creator:', error);
    } else {
      navigate('/'); // Navigate to the homepage after deletion
    }
  };

  return (
    <div>
      <h1>Edit Creator</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <label htmlFor="url">URL</label>
        <input
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="URL"
          required
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <label htmlFor="imageurl">Image URL</label>
        <input
          id="imageurl"
          value={imageurl}
          onChange={(e) => setImageURL(e.target.value)}
          placeholder="Image URL (optional)"
        />
        <button type="submit">Save Changes</button>
      </form>
      <button onClick={handleDelete}>Delete Creator</button>
    </div>
  );
};

export default EditCreator;
