export const initialData = {
  tasks: {
    'task-1': { id: 'task-1', title: 'Diseñar el layout principal', priority: 'Alta', tags: ['UI', 'Diseño'], assignedTo: 'Alfredo', dueDate: '2024-08-15' },
    'task-2': { id: 'task-2', title: 'Configurar el Context API', priority: 'Alta', tags: ['React', 'Core'], assignedTo: 'Ana', dueDate: '2024-08-16' },
    'task-3': { id: 'task-3', title: 'Implementar Drag and Drop', priority: 'Media', tags: ['React', 'dnd-kit'], assignedTo: 'Alfredo', dueDate: '2024-08-20' },
    'task-4': { id: 'task-4', title: 'Crear modal de edición con MUI', priority: 'Baja', tags: ['MUI', 'Formulario'], assignedTo: 'Carlos', dueDate: '2024-08-22' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Por Hacer',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
    },
    'column-2': {
      id: 'column-2',
      title: 'En Progreso',
      taskIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'Hecho',
      taskIds: [],
    },
  },
  // Facilitar el orden de las columnas
  columnOrder: ['column-1', 'column-2', 'column-3'],
  users: [
    { id: 'user-1', name: 'Alfredo' },
    { id: 'user-2', name: 'Ana' },
    { id: 'user-3', name: 'Carlos' },
  ],
  tags: [
    { id: 'tag-1', name: 'UI' },
    { id: 'tag-2', name: 'Diseño' },
    { id: 'tag-3', name: 'React' },
    { id: 'tag-4', name: 'Core' },
  ]
};
