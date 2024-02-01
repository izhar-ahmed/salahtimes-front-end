const DeleteConfirmation = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-10">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white p-4 rounded-md shadow-md">
          <p className="text-lg font-semibold mb-4">Are you sure?</p>
          <div className="flex justify-end">
            <button
              className="mr-2 px-4 py-2 bg-red-500 text-white rounded-md"
              onClick={onConfirm}
            >
              Yes
            </button>
						<button
              className="mr-2 px-4 py-2 bg-green-500 text-white rounded-md"
              onClick={onCancel}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;