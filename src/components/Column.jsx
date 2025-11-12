import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import TaskCard from './TaskCard';
import AddTask from './AddTask';

const Column = ({ column, tasks }) => {
  const { setNodeRef } = useDroppable({ id: column.id });

  return (
    <div ref={setNodeRef} className="bg-gray-800 rounded-lg p-4">
      <h2 className="font-bold text-xl mb-4">{column.title}</h2>
      <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-4">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
        <AddTask columnId={column.id} />
      </SortableContext>
    </div>
  );
};

export default Column;