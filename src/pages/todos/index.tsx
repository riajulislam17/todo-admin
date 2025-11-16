import PageHeader from "@/components/layouts/PageHeader";
import TodoTable from "@/components/TodoManagement/TodoTable";
import TodoForm from "@/components/TodoManagement/TodoForm";
import Modal from "@/components/common/Modal";
import SearchField from "@/components/FormField/SearchField";
import Head from "next/head";
import React, { useState, useMemo, useCallback } from "react";
import useDebounce from "@/hooks/useDebounce";

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

function Index() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editTodo, setEditTodo] = useState<Todo | null>(null);
  const [refresh, setRefresh] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");

  // Debounce search query to reduce API calls
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const getDateForFilter = useCallback((days: number) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toISOString().split('T')[0];
  }, []);

  const filterOptions = useMemo(() => [
    { label: "Deadline Today", value: getDateForFilter(0) },
    { label: "Expires in 5 Days", value: getDateForFilter(5) },
    { label: "Expires in 10 Days", value: getDateForFilter(10) },
    { label: "Expires in 30 Days", value: getDateForFilter(30) },
  ], [getDateForFilter]);

  const handleOpenModal = useCallback(() => {
    setEditTodo(null);
    setIsModalOpen(true);
  }, []);

  const handleEdit = useCallback((todo: Todo) => {
    setEditTodo(todo);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setEditTodo(null);
  }, []);

  const handleSuccess = useCallback(() => {
    setRefresh((prev) => !prev);
    handleCloseModal();
  }, [handleCloseModal]);

  return (
    <>
      <Head>
        <title>Todo List</title>
      </Head>
      <div className="">
        <PageHeader title="New Task" text="Todos" onClick={handleOpenModal} />

        {/* Search and Filter Section */}
        <div className="px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            {/* Search Section */}
            <div className="flex-1 w-full sm:w-auto">
              <SearchField
                placeholder="Search todos..."
                value={searchQuery}
                onChange={setSearchQuery}
              />
            </div>

            {/* Filter Dropdown Section */}
            <div className="w-full sm:w-auto">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white text-gray-700"
              >
                <option value="">All Todos</option>
                {filterOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <TodoTable
          onEdit={handleEdit}
          refresh={refresh}
          searchQuery={debouncedSearchQuery}
          selectedFilter={selectedFilter}
        />

        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={editTodo ? "Edit Task" : "Create New Task"}
        >
          <TodoForm
            onSuccess={handleSuccess}
            onCancel={handleCloseModal}
            editData={editTodo}
          />
        </Modal>
      </div>
    </>
  );
}

export default Index;
