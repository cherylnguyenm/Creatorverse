import React, { useState } from 'react';
import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import ShowCreators from './pages/ShowCreators';
import ViewCreator from './pages/ViewCreator';
import EditCreator from './pages/EditCreator';
import AddCreator from './pages/AddCreator';

// Define the Routes component
const RoutesComponent = ({ creators, addCreator, updateCreator }) => {
  return useRoutes([
    { path: "/", element: <ShowCreators creators={creators} /> },
    { path: "/creators/:id", element: <ViewCreator /> },  // ViewCreator fetches its data
    { path: "/edit/:id", element: <EditCreator updateCreator={updateCreator} /> },
    { path: "/add", element: <AddCreator addCreator={addCreator} /> }
  ]);
};

const App = () => {
  const [creators, setCreators] = useState([
    { id: 1, name: 'John Doe', url: 'https://www.youtube.com/johndoe', description: 'Great coding tutorials.', imageurl: 'someImageURL' },
    { id: 2, name: 'Jane Smith', url: 'https://www.twitch.tv/janesmith', description: 'Indie games streamer.', imageurl: 'someImageURL' }
  ]);

  const addCreator = (newCreator) => {
    setCreators([...creators, { id: creators.length + 1, ...newCreator }]);
  };

  const updateCreator = (id, updatedCreator) => {
    setCreators(creators.map(creator => (creator.id === parseInt(id) ? { id: parseInt(id), ...updatedCreator } : creator)));
  };

  return (
    <Router>
      <div className="App">
        <RoutesComponent creators={creators} addCreator={addCreator} updateCreator={updateCreator} />
      </div>
    </Router>
  );
};

export default App;
