import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import FriendCard from "~/components/FriendCard";
import { getFriends } from "~/services/friends";

const FriendsPage = () => {
  const navigate = useNavigate();
  const { data, isPending, isError, isSuccess } = useQuery({
    queryKey: ["friends"],
    queryFn: getFriends,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (!isSuccess) {
    return <div>No data</div>;
  }

  return (
    <div>
      <div className="flex grid grid-cols-3 gap-4">
        {data.map((friend) => {
          return (
            <FriendCard
              onclick={() => navigate(`/users/profile/${friend.id}`)}
              key={friend.id}
              name={friend.username}
              imageUrl={friend.imageUrl}
              bio={friend.bio}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FriendsPage;
