interface DeleteFileModalProps {
  onClose: () => void;
  onDelete: () => void;
}

export function DeleteFileModal({ onClose, onDelete }: DeleteFileModalProps) {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white rounded shadow-lg p-6 max-w-sm w-full">
        <h2 className="text-lg font-bold mb-4">Delete File</h2>
        <p className="mb-6">Are you sure you want to delete this file? This action cannot be undone.</p>
        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="px-4 py-2 rounded text-gray-700 border border-gray-300 hover:bg-gray-100">
            Cancel
          </button>
          <button onClick={onDelete} className="px-4 py-2 rounded text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-600">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

