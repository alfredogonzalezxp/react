import { useState } from 'react';
import { useTasks } from '../hooks/useTasks';

const AddTask = ({ columnId }) => {
  const [title, setTitle] = useState('');
  const { addTask } = useTasks();

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(columnId, title);
    setTitle(''); // Limpiar el input después de agregar
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="+ Añadir nueva tarea"
        className="w-full bg-gray-700 border-2 border-gray-600 rounded-md p-2 text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500"
      />
      {title && (
        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 text-sm">
          Agregar Tarea
        </button>
      )}
    </form>
  );
};

export default AddTask;