import AvatarImage from "./AvatarImage";

interface PeopleCardProps {
  name: string;
  imageUrl: string;
  bio: string;
  children?: React.ReactNode;
  onclick?: () => void;
}
const FriendCard = (props: PeopleCardProps) => {
  const { name, imageUrl, bio, children, onclick } = props;

  return (
    <div
      className="w-full p-4 max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 hover:cursor-pointer"
      onClick={onclick}
    >
      <div className="flex flex-col items-center mb-4">
        <AvatarImage className="w-16 h-16" src={imageUrl} alt={name} />
        <h5 className="mb-1 text-xl font-medium text-gray-900">{name}</h5>
        <div className="text-sm text-gray-500 text-">{bio}</div>
        {children && <>{children}</>}
      </div>
    </div>
  );
};

export default FriendCard;
