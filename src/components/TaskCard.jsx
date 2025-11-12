import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
// MUI icons can be used for better visual cues
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const TaskCard = ({ task }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-gray-700 p-3 rounded-md shadow-md touch-none flex flex-col gap-2"
    >
      <p className="font-semibold">{task.title}</p>
      <div className="flex flex-wrap gap-2">
        {task.tags.map((tag) => (
          <span key={tag} className="bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex justify-between items-center text-sm text-gray-400 mt-2">
        <span className="flex items-center gap-1"><PersonIcon fontSize="small" /> {task.assignedTo}</span>
        <span className="flex items-center gap-1"><CalendarTodayIcon fontSize="small" /> {task.dueDate}</span>
      </div>
    </div>
  );
};

export default TaskCard;