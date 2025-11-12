import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // Contiene los estilos de Tailwind
import { TasksProvider } from './context/TaskContext.jsx';
// import './styles/main.scss'; // Importaremos nuestro SCSS principal aquí
 
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TasksProvider>
      <App />
    </TasksProvider>
  </StrictMode>
);