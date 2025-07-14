import React, { useEffect, useState } from 'react';
import './App.css';
import RecipeDetails from './RecipeDetails';

function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState('');
  const [dietaryTags, setDietaryTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState('');

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('https://localhost:7068/api/RecipeShare');
        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setItems(data);

        // Extract unique dietary tags
        const tagsSet = new Set();
        data.forEach(recipe => {
          if (recipe.dietaryTags) {
            recipe.dietaryTags.split(',').forEach(tag => tagsSet.add(tag.trim()));
          }
        });
        setDietaryTags(Array.from(tagsSet));
      } catch (error) {
        console.error('Error fetching data:', error);
        alert(error.message); // Show error to user
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  // Fetch recipes by selected dietary tag
  useEffect(() => {  if (selectedTag === "") {
    // If "All Tags" is selected, fetch all recipes
    const fetchAll = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://localhost:7068/api/RecipeShare');
        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setItems(data);
        setSelected('');
      } catch (error) {
        console.error('Error fetching all recipes:', error);
        alert(error.message); // Show error to user
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
    return;
  }
  // Otherwise, fetch recipes by selected tag
    const fetchByTag = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://localhost:7068/api/RecipeShare/filter/${encodeURIComponent(selectedTag)}`);
  
        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setItems(data);
        setSelected('');
      } catch (error) {
        console.error('Error fetching filtered recipes:', error);
        alert(error.message); // Show error to user
      } finally {
        setLoading(false);
      }
    };
    fetchByTag();
  }, [selectedTag]);

  if (loading) return <div>Loading...</div>;

  const selectedRecipe = items.find(
    item => (item.title || item.id || items.indexOf(item).toString()) === selected
  );

  return (
    <section id="sectionCSS">
      <div>
      <h2>Recipe List</h2>
      <select size={10} 
        style={{ width: '25em' ,  fontSize: '1em'}}
        value={selected}
        onChange={e => setSelected(e.target.value)}
      >
        {/* <option value="">Select a recipe</option> */}
        {items.map((item, idx) => (
          <option key={idx} value={item.title || item.id || idx}>
            {item.title || JSON.stringify(item)}
          </option>
        ))}
      </select>
      <RecipeDetails recipe={selectedRecipe} />
      </div>
      <div>
        <h2>Dietary Tag</h2>
        <select
          style={{ width: '15em', fontSize: '1em' }}
          value={selectedTag}
          onChange={e => setSelectedTag(e.target.value)}
        >
          <option value="">All Tags</option>
          {dietaryTags.map((tag, idx) => (
            <option key={idx} value={tag}>{tag}</option>
          ))}
        </select>
      </div>
    </section>
  );
}

export default App;
