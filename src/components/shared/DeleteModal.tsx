import { X } from "lucide-react";
import Button from "./Button";

interface DeleteModalProps {
  isOpen: boolean;
  message: string;
  buttonText: string;
  onClose: () => void;
  title: string;
  confirmClick: () => void;
  cancelClick: () => void;
}

const DeleteModal = ({
  isOpen,
  message = "Action Completed Successfully!",
  buttonText = "Go Back",
  onClose,
  title = "Delete",
  cancelClick,
  confirmClick,
}: DeleteModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 flex justify-center items-center z-50">
      <div className="relative space-y-10 flex flex-col justify-center bg-white w-full h-[422px] max-w-md p-8 rounded-md text-center shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <p className="font-semibold">{title}</p>

        {/* Message */}
        <p className="text-sm font-medium mb-6">{message}</p>

        <div className="flex gap-2 justify-center">
          <Button
            title="Cancel"
            variant="outline"
            className="border border-[#000000] text-black rounded-sm"
            onClick={cancelClick}
          />
          <Button
            title={buttonText}
            onClick={confirmClick}
            className="bg-[#990000] rounded-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
