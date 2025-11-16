import TodoForm from "@/components/TodoManagement/TodoForm";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

function CreateTodo() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push("/todos");
  };

  const handleCancel = () => {
    router.push("/todos");
  };

  return (
    <>
      <Head>
        <title>Create Todo</title>
      </Head>
      <div className="px-8 py-5">
        <h1 className="text-3xl font-bold text-black mb-6 border-b">
          Create New Task
        </h1>
        <div className="bg-white rounded-lg shadow p-8 max-w-3xl">
          <TodoForm onSuccess={handleSuccess} onCancel={handleCancel} />
        </div>
      </div>
    </>
  );
}

export default CreateTodo;