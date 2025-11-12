import { createContext, useState } from 'react';
import { initialData } from '../api/mockData';

export const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
  const [boardData, setBoardData] = useState(initialData);

  const addTask = (columnId, taskTitle) => {
    if (!taskTitle.trim()) return; // No agregar tareas vacías
    const newTaskId = `task-${Date.now()}`;
    const newTask = {
      id: newTaskId,
      title: taskTitle,
      // Valores por defecto para una nueva tarea
      tags: ['New'],
      assignedTo: 'Unassigned',
      dueDate: new Date().toISOString().split('T')[0], // Fecha de hoy
    };

    setBoardData(prev => {
      const newTasks = {
        ...prev.tasks,
        [newTaskId]: newTask,
      };

      const column = prev.columns[columnId];
      const newTaskIds = [...column.taskIds, newTaskId];

      return {
        ...prev,
        tasks: newTasks,
        columns: {
          ...prev.columns,
          [columnId]: {
            ...column,
            taskIds: newTaskIds,
          },
        },
      };
    });
  };

  // Aquí añadiremos funciones para mover, crear, editar y eliminar tareas.
  const value = {
    boardData,
    setBoardData,
    addTask,
  };

  return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>;
};
