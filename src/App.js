import React, { useState, useEffect } from 'react';
import Header from './components/Header';

import api from './services/api';

import './App.css';

// import background from './assets/background.jpg';

function App() {

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function loadProjects() {
      const { data } = await api.get('/projects');
      setProjects(data);
    }
    loadProjects();
    /*
    api.get('/projects').then((response) => {
      setProjects(response.data);
    });
    */
  }, []);

  // desestruturação do estado
  // 1 - a variavel no seu estado original
  // 2 - Função para alterar o estado

  async function handleAddProject() {
    const { data } = await api.post('/projects',{
      title: `New Project ${new Date().getTime()}`,
      owner: 'Rodolfo',
    });
    setProjects([...projects, data]);
  }

  return (
  <>
    <Header title="React" />
    { /* <img width={300} src={background} alt="background" /> */ }
    <ul>
      {projects.map((p) => <li key={p.id}>{p.title}</li>)}
    </ul>
    <button type="button" onClick={handleAddProject}>Adicionar Projeto</button>
  </>
  )
}

export default App;