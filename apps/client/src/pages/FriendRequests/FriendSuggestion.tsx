import { IoIosPersonAdd } from "react-icons/io";
import AvatarImage from "~/components/AvatarImage";

interface FriendSuggestionProps {
  name: string;
  imageUrl: string;
  onSend: (e: React.MouseEvent) => void;
  onClick?: () => void;
}

const FriendSuggestion = (props: FriendSuggestionProps) => {
  const { name, imageUrl, onSend, onClick } = props;
  return (
    <div
      className="flex px-3 py-4 mb-4 gap-10 items-center border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100s"
      onClick={onClick}
    >
      <div className="flex items-center">
        <AvatarImage className="w-16 h-16" src={imageUrl} alt={name} />
      </div>
      <div>
        <h5 className="mb-1 text-l font-medium text-gray-900">{name}</h5>
        <button
          onClick={onSend}
          className="inline-flex gap-2 items-center px-4 py-2 text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800"
        >
          <IoIosPersonAdd />
          Add
        </button>
      </div>
    </div>
  );
};

export default FriendSuggestion;
