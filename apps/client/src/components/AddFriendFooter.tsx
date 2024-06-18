interface AddFriendCardProps {
  onAccept?: (e: React.MouseEvent) => void;
  onDecline?: (e: React.MouseEvent) => void;
  cancel?: boolean;
}

const AddFriendFooter = (props: AddFriendCardProps) => {
  const { onAccept, onDecline, cancel } = props;
  return (
    <div className="flex mt-4 md:mt-6">
      {onAccept && (
        <button
          onClick={onAccept}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-success-700 rounded-lg hover:bg-success-800"
        >
          Add friend
        </button>
      )}

      {onDecline && (
        <button
          onClick={onDecline}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-error-700 rounded-lg hover:bg-error-800"
        >
          {cancel ? "Cancel" : "Decline"}
        </button>
      )}
    </div>
  );
};

export default AddFriendFooter;
