import { createContext, useState } from 'react';
import { initialData } from '../api/mockData';

export const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
  const [boardData, setBoardData] = useState(initialData);

  // Aquí añadiremos funciones para mover, crear, editar y eliminar tareas.
  const value = {
    boardData,
    setBoardData,
  };

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
};