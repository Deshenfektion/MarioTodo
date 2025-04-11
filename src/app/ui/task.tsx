interface TaskProps {
  title?: any;
  completed?: any;
  onToggle?: any;
  onDelete?: any;
}

function Task({ title, completed, onToggle, onDelete }: TaskProps) {
  return (
    <div className="flex items-center justify-between p-3 bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 mb-2">
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          checked={completed}
          //   onChange={onToggle}
          className="w-5 h-5 accent-green-500"
        />
        <span
          className={`text-base ${
            completed
              ? "line-through text-neutral-400"
              : "text-neutral-900 dark:text-neutral-100"
          }`}
        >
          {title}
        </span>
      </div>
      <button
        // onClick={onDelete}
        className="text-sm text-red-500 hover:underline"
      >
        Löschen
      </button>
    </div>
  );
}

export default Task;
