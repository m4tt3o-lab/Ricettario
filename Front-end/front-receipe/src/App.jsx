import './App.css';
import Add from './componenti/Addform';
import Display from './componenti/displayRecipes';
import NotFound from './componenti/NotFound';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='AddRecip' element={<Add/>} />
        <Route path='/Recipes' element={<Display />} />
        <Route path='/' element={<Navigate to="/Recipes" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
