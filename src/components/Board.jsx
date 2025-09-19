import { useState } from 'react';
import { DndContext, DragOverlay, closestCorners, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useTasks } from '../hooks/useTasks';
import Column from './Column';
import TaskCard from './TaskCard';

const Board = () => {
  const { boardData, setBoardData } = useTasks();
  const [activeTask, setActiveTask] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
  );

  const handleDragStart = (event) => {
    const { active } = event;
    const task = boardData.tasks[active.id];
    setActiveTask(task);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeId = active.id;
    const overId = over.id;

    const findColumn = (taskId) => {
      return boardData.columnOrder.find(columnId => boardData.columns[columnId].taskIds.includes(taskId));
    };

    const activeColumnId = findColumn(activeId);
    let overColumnId = over.id;

    // Si `over.id` no es una columna, significa que se soltó sobre una tarea.
    // En ese caso, encontramos la columna de esa tarea.
    if (!boardData.columns[over.id]) {
      overColumnId = findColumn(overId); // Se soltó sobre otra tarea
    }

    if (!activeColumnId || !overColumnId) return;

    if (activeColumnId === overColumnId) {
      // Mover dentro de la misma columna
      setBoardData((prev) => {
        const column = prev.columns[activeColumnId];
        const oldIndex = column.taskIds.indexOf(activeId);
        const newIndex = column.taskIds.indexOf(overId);
        const newTaskIds = arrayMove(column.taskIds, oldIndex, newIndex);
        return {
          ...prev,
          columns: {
            ...prev.columns,
            [activeColumnId]: { ...column, taskIds: newTaskIds },
          },
        };
      });
    } else {
      // Mover a una columna diferente
      setBoardData((prev) => {
        const sourceColumn = prev.columns[activeColumnId];
        const destColumn = prev.columns[overColumnId];

        const sourceTaskIds = [...sourceColumn.taskIds];
        const destTaskIds = [...destColumn.taskIds];

        const [removed] = sourceTaskIds.splice(sourceTaskIds.indexOf(activeId), 1);

        // Si se suelta sobre una columna, añadir al final. Si es sobre una tarea, añadir en esa posición.
        let newIndex;
        // Si `over.id` es una columna, `indexOf` será -1.
        const overIsAColumn = boardData.columns[over.id];
        if (overIsAColumn) {
          newIndex = destTaskIds.length;
        } else {
          newIndex = destTaskIds.indexOf(overId);
        }

        if (newIndex < 0) { // Fallback por si algo sale mal
          newIndex = destTaskIds.length; // Añadir al final si no se encuentra el overId (caso de columna vacía)
        }

        destTaskIds.splice(newIndex, 0, removed);

        return {
          ...prev,
          columns: {
            ...prev.columns,
            [activeColumnId]: { ...sourceColumn, taskIds: sourceTaskIds },
            [overColumnId]: { ...destColumn, taskIds: destTaskIds },
          },
        };
      });
    }

    setActiveTask(null);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCorners}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {boardData.columnOrder.map((columnId) => {
          const column = boardData.columns[columnId];
          const tasks = column.taskIds.map((taskId) => boardData.tasks[taskId]);
          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </div>
      <DragOverlay>{activeTask ? <TaskCard task={activeTask} /> : null}</DragOverlay>
    </DndContext>
  );
};

export default Board;
