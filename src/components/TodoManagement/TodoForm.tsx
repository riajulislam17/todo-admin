import React from "react";
import TextField from "@/components/FormField/TextField";
import TextArea from "@/components/FormField/TextArea";
import DatePickerInput from "@/components/FormField/DatePickerInput";
import useForm from "@/hooks/useForm";
import { handleResource } from "@/utils/APIRequester";
import { Trash } from "lucide-react";

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

interface TodoFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  editData?: Todo | null;
}

const TodoForm: React.FC<TodoFormProps> = ({
  onSuccess,
  onCancel,
  editData,
}) => {
  const { formData, handleChange, loading, setLoading } = useForm({
    title: editData?.title || "",
    description: editData?.description || "",
    todo_date: editData?.todo_date || "",
    priority: editData?.priority || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // if (!formData.title) {
    //   toast.error("Title is required");
    //   return;
    // }

    setLoading(true);
    try {
      if (editData) {
        // Update existing todo
        await handleResource({
          method: "patch",
          endpoint: "/todos",
          isMultipart: true,
          id: editData.id,
          data: {
            title: formData.title,
            description: formData.description,
            todo_date: formData.todo_date,
            priority: formData.priority,
          },
          popupMessage: true,
          popupText: "Todo updated successfully!",
        });
      } else {
        // Create new todo
        await handleResource({
          method: "post",
          endpoint: "/todos/",
          isMultipart: true,
          data: {
            title: formData.title,
            description: formData.description,
            todo_date: formData.todo_date,
            priority: formData.priority,
          },
          popupMessage: true,
          popupText: "Todo created successfully!",
        });
      }
      onSuccess();
    } catch {
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="title"
        placeholder=""
        title="Title"
        type="text"
        required={false}
        value={String(formData.title || "")}
        onChange={(value) => handleChange("title", value)}
      />

      <DatePickerInput
        name="todo_date"
        placeholder=""
        title="Date"
        required={false}
        value={String(formData.todo_date || "")}
        onChange={(value) => handleChange("todo_date", value)}
      />

      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-semibold mb-4">
          Priority
        </label>
        <div className="flex gap-6">
          {[
            { value: "extreme", color: "bg-red-500" },
            { value: "moderate", color: "bg-green-500" },
            { value: "low", color: "bg-yellow-500" },
          ].map((priority) => (
            <label
              key={priority.value}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className={`w-2 h-2 rounded-full ${priority.color}`}></div>
              <span className="text-gray-700 capitalize">{priority.value}</span>
              <input
                type="checkbox"
                name="priority"
                value={priority.value}
                checked={formData.priority === priority.value}
                onChange={(e) => handleChange("priority", e.target.value)}
                className={`w-4 h-4 rounded-sm cursor-pointer`}
              />
            </label>
          ))}
        </div>
      </div>

      <TextArea
        name="description"
        placeholder="Start writing here...."
        title="Description"
        required={false}
        cols={4}
        value={String(formData.description || "")}
        onChange={(value) => handleChange("description", value)}
      />

      <div className="flex justify-between items-center gap-3 mt-6">
        <button
          type="submit"
          disabled={loading}
          className=" bg-[#5272FF] text-white px-6 py-3 rounded-md"
        >
          {loading ? (editData ? "Updating..." : "Creating...") : "Done"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-[#EE0039] text-white p-3 rounded-lg"
        >
          <Trash />
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
