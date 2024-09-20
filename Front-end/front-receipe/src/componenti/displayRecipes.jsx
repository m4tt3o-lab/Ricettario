import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Edit from '../componenti/Editform';
import Modal from '../componenti/modale';

const PageWrapper = styled.div`
  background: linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%);
  min-height: 100vh;
  padding: 0;
  margin: 0;
`;

// Componenti stilizzati
const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 20px 40px;
  background-color: #007bff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  color: white;
`;

const StyledLink = styled.a`
  color: #fff;
  cursor: pointer;
  text-decoration: none;
  font-size: 18px;
  margin-right: 20px;
  font-weight: bold;
  transition: color 0.3s;

  &:hover {
    color: #ffdd57;
  }
`;

const SelectCategory = styled.select`
  margin-left: auto;
  padding: 8px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ddd;
  background-color: #fff;
  cursor: pointer;
`;

const RecipesContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 20px;
  padding: 0 40px;
`;

const RecipesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const RecipeCard = styled.div`
  background: linear-gradient(135deg, #f5f7f9 0%, #c3cfe2 100%);
  border: 1px solid #ddd;
  padding: 20px;
  width: 320px;
  box-sizing: border-box;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  position: relative;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;

const ActionButton = styled.button`
  padding: 10px 15px;
  font-size: 16px;
  color: #fff;
  background-color: ${({ isDelete }) => (isDelete ? '#dc3545' : '#007bff')};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ isDelete }) => (isDelete ? '#c82333' : '#0056b3')};
  }
`;

const RecipeImage = styled.img`
  max-width: 100%;
  border-radius: 8px;
  height: auto;
  margin-bottom: 16px;
  border: 2px solid #ddd;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const RecipeTitle = styled.h2`
  font-size: 22px;
  color: #333;
  margin: 0 0 10px;
  font-family: 'Arial', sans-serif;
`;

const RecipeIngredients = styled.p`
  font-size: 16px;
  color: #555;
  margin: 0 0 10px;
  line-height: 1.5;
`;

const RecipeInstructions = styled.p`
  font-size: 16px;
  color: #555;
  line-height: 1.5;
`;

const Display = () => {
  const [recipes, setRecipes] = useState([]);
  const [category, setCategory] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getRecipes();
  }, [category]);

  const getRecipes = async () => {
    try {
      const url =
        category === 'all'
          ? 'http://localhost:3000/recipes'
          : `http://localhost:3000/recipes/category/${category}`;
      const response = await fetch(url);
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error('Errore durante il recupero delle ricette:', error);
    }
  };

  const removeRecipe = async (id) => {
    const url = `http://localhost:3000/recipes/${id}`;

    try {
      const response = await fetch(url, {
        method: 'DELETE',
      });

      if (response.ok) {
        setRecipes((prevRecipes) =>
          prevRecipes.filter((recipe) => recipe._id !== id)
        );
        console.log('Ricetta cancellata con successo.');
      } else {
        console.error('Errore durante la cancellazione della ricetta.');
      }
    } catch (error) {
      console.error('Errore durante la richiesta di cancellazione della ricetta:', error);
    }
  };

  const openModal = (recipe) => {
    setSelectedRecipe(recipe);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedRecipe(null);
  };



  return (
    <PageWrapper>
      <Header>
        <StyledLink onClick={() => navigate('/AddRecip')}>+Aggiungi Ricetta</StyledLink>
        <SelectCategory value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">Tutte le Categorie</option>
          <option value="Primo">Primo</option>
          <option value="Secondo">Secondo</option>
          <option value="Dessert">Dessert</option>
        </SelectCategory>
      </Header>

      <RecipesContainer>
        <RecipesWrapper>
          {recipes.map((recipe) => (
            <RecipeCard key={recipe._id}>
              <RecipeImage src={recipe.image} alt={recipe.title} />
              <RecipeTitle>{recipe.title}</RecipeTitle>
              <RecipeIngredients>
                <strong>Ingredienti:</strong> {recipe.ingredients}
              </RecipeIngredients>
              <RecipeInstructions>
                <strong>Istruzioni:</strong> {recipe.instructions}
              </RecipeInstructions>
              <ButtonContainer>
                <ActionButton isDelete onClick={() => removeRecipe(recipe._id)}>Cancella</ActionButton>
                <ActionButton onClick={() => openModal(recipe)}>Modifica</ActionButton>
              </ButtonContainer>
            </RecipeCard>
          ))}
        </RecipesWrapper>
      </RecipesContainer>

      {modalOpen && (
        <Modal isOpen={modalOpen} onClose={closeModal}>
          {selectedRecipe && <Edit recipe={selectedRecipe} closeModal={closeModal} refreshRecipes={getRecipes} />} 
        </Modal>
      )}
    </PageWrapper>
  );
};

export default Display;
