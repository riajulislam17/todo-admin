import React, { useEffect, useState, useCallback, memo } from "react";
import { handleResource } from "@/utils/APIRequester";
import { Pencil, Trash2 } from "lucide-react";

interface Todo {
  id: number;
  title: string;
  description: string;
  priority: string;
  is_completed: boolean;
  position: number;
  todo_date: string | null;
  created_at: string;
  updated_at: string;
}

interface TodoTableProps {
  onEdit?: (todo: Todo) => void;
  refresh?: boolean;
  searchQuery?: string;
  selectedFilter?: string;
}

const TodoTable: React.FC<TodoTableProps> = memo(({
  onEdit,
  refresh,
  searchQuery = "",
  selectedFilter = "",
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchTodos = async () => {
      try {
        setLoading(true);
        const response = await handleResource({
          method: "get",
          endpoint: `/todos/?search=${searchQuery}&todo_date=${selectedFilter}`,
        });

        if (!abortController.signal.aborted && response.results) {
          setTodos(response.results);
        }
      } catch {
        if (!abortController.signal.aborted) {
          setTodos([]);
        }
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchTodos();

    return () => {
      abortController.abort();
    };
  }, [refresh, searchQuery, selectedFilter, refetchTrigger]);

  const handleDelete = useCallback(async (id: number) => {
    try {
      await handleResource({
        method: "delete",
        endpoint: "/todos",
        id: id,
        popupMessage: true,
        popupText: "Todo deleted successfully!",
      });
      setRefetchTrigger((prev) => prev + 1);
    } catch {
      // Error handled by handleResource
    }
  }, []);

  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }, []);

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case "extreme":
        return "bg-[#FEE2E2] text-[#DC2626]";
      case "moderate":
        return "bg-[#DCFCE7] text-[#16A34A]";
      case "low":
        return "bg-[#FEF9C3] text-[#D7A633]";
      default:
        return "bg-gray-300 text-gray-500";
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow p-4 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          </div>
        ))}
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <p className="text-gray-500 text-lg">No todos yet</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-8 py-5">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-5 border border-gray-200"
        >
          {/* Title and Status */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-semibold text-gray-800 truncate flex-1">
              {todo.title}
            </h3>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ml-2 capitalize ${getPriorityColor(
                todo.priority
              )}`}
            >
              {todo.priority}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 text-lg mb-4 line-clamp-3">
            {todo.description || "No description provided"}
          </p>

          {/* Actions */}
          <div className="flex items-center justify-between gap-2 pt-3">
            {todo.todo_date && (
              <span className=" text-gray-500">
                Due {formatDate(todo.todo_date)}
              </span>
            )}

            <div className="flex justify-between items-center gap-3">
              <button
                onClick={() => onEdit && onEdit(todo)}
                className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-50 rounded-lg transition-colors"
                aria-label="Edit"
              >
                <Pencil size={18} />
              </button>
              <button
                onClick={() => handleDelete(todo.id)}
                className="p-2 text-red-600 bg-red-50 hover:bg-red-50 rounded-lg transition-colors"
                aria-label="Delete"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});

TodoTable.displayName = "TodoTable";

export default TodoTable;
