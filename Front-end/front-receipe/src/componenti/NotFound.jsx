import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  text-align: center;
`;

const Title = styled.h1`
  font-size: 5rem;
  color: #dc3545;
  margin-bottom: 20px;
`;

const Message = styled.p`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 20px;
`;

const BackButton = styled.button`
  padding: 10px 20px;
  font-size: 1rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/Recipes');
  };

  return (
    <Container>
      <Title>404</Title>
      <Message>Pagina non trovata</Message>
      <BackButton onClick={handleGoHome}>Torna alla Home</BackButton>
    </Container>
  );
};

export default NotFound;
