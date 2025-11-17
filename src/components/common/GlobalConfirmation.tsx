import React, { useState, useEffect } from "react";
import Modal from "./Modal";

// Global resolver for confirmation
let resolver: ((value: boolean) => void) | null = null;
let openDialog: ((message: string) => void) | null = null;

// Simple function to trigger confirmation from anywhere
export const confirmDelete = (message?: string): Promise<boolean> => {
  return new Promise((resolve) => {
    resolver = resolve;
    if (openDialog) {
      openDialog(message || "Are you sure you want to delete this item?");
    } else {
      // Fallback to window.confirm if component not mounted
      resolve(window.confirm(message || "Are you sure you want to delete this item?"));
    }
  });
};

const GlobalConfirmation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Register the dialog opener
    openDialog = (msg: string) => {
      setMessage(msg);
      setIsOpen(true);
    };

    return () => {
      openDialog = null;
    };
  }, []);

  const handleConfirm = () => {
    if (resolver) resolver(true);
    setIsOpen(false);
  };

  const handleCancel = () => {
    if (resolver) resolver(false);
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={true}
      onClose={handleCancel}
      title="Confirm Delete"
    >
      <div>
        <p className="text-gray-600 mb-6">
          {message}
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default GlobalConfirmation;
