import React, { useState } from "react";
import styled from "styled-components";


const Form = styled.form`
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
  resize: vertical;
  height: 100px;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px 15px;
  font-size: 18px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`; 



function Edit({ recipe, closeModal, refreshRecipes }) {
  const [newImage, setImage] = useState(recipe?.image || '');
  const [newTitle, setTitle] = useState(recipe?.title || '');
  const [newIngredients, setIngredients] = useState(recipe?.ingredients || '');
  const [newInstructions, setInstructions] = useState(recipe?.instructions || '');
  const [newCategory, setCategory] = useState(recipe?.category || '');

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }
    



    const dataPut = async (e) => {
      e.preventDefault();
      const url = `http://localhost:3000/recipes/${recipe._id}`; 
      console.log('ID della ricetta:', recipe._id);
      console.log('URL della richiesta:', url)
      try {
          const response = await fetch(url, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                  image: newImage,
                  title: capitalizeFirstLetter(newTitle),
                  ingredients: newIngredients,
                  instructions: newInstructions,
                  category: newCategory
              }),
              
              
          });
          console.log(response);
          
          if (response.ok) {
              closeModal(); 
              refreshRecipes(); 
          } else {
            console.error("Modifica fallita.");
          }
        } catch (error) {
          console.error("Errore durante la richiesta di modifica:", error);
        }
      };


    return (
        <Form onSubmit={dataPut}>
          <h1>Modifica Ricetta</h1>
          <InputGroup>
            <Label htmlFor="image">Immagine</Label>
            <Input
              type="text"
              id="image"
              placeholder="URL immagine"
              value={newImage}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </InputGroup>
    
          <InputGroup>
            <Label htmlFor="title">Titolo</Label>
            <Input
              type="text"
              id="title"
              placeholder="Titolo della ricetta"
              value={newTitle}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </InputGroup>
    
          <InputGroup>
            <Label htmlFor="ingredients">Ingredienti</Label>
            <Textarea
              id="ingredients"
              placeholder="Elenca gli ingredienti"
              value={newIngredients}
              onChange={(e) => setIngredients(e.target.value)}
              required
            />
          </InputGroup>
    
          <InputGroup>
            <Label htmlFor="instructions">Istruzioni</Label>
            <Textarea
              id="instructions"
              placeholder="Descrivi i passaggi della ricetta"
              value={newInstructions}
              onChange={(e) => setInstructions(e.target.value)}
              required
            />
          </InputGroup>
    
          <InputGroup>
            <Label htmlFor="category">Categoria</Label>
            <Select
              id="category"
              value={newCategory}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Seleziona una categoria</option>
              <option value="Primo">Primo</option>
              <option value="Secondo">Secondo</option>
              <option value="Dessert">Dessert</option>
            </Select>
          </InputGroup>
    
          <Button type="submit">Conferma modifica</Button>

        </Form>
    );
}

export default Edit;
