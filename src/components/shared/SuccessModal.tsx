import { X } from "lucide-react";
import { Link } from "wouter";
import check from "../../assets/success.svg";
import Button from "./Button";

interface SuccessModalProps {
  isOpen: boolean;
  message: string;
  buttonText: string;
  buttonLink: string;
  onClose: () => void;
}

const SuccessModal = ({
  isOpen,
  message = "Action Completed Successfully!",
  buttonText = "Go Back",
  buttonLink = "/",
  onClose,
}: SuccessModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 flex justify-center items-center z-50">
      <div className="relative space-y-8 flex flex-col justify-center bg-white w-full h-[422px] max-w-md p-8 rounded-md text-center shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <div className="flex justify-center">
          <img src={check} alt="A success icon" className="" />
        </div>

        {/* Message */}
        <p className="text-sm font-medium mb-6">{message}</p>

        {/* Action Button */}
        <Link href={buttonLink}>
          <Button title={buttonText} className="rounded-sm" />
        </Link>
      </div>
    </div>
  );
};

export default SuccessModal;
