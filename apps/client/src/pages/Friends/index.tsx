import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import AddFriendFooter from "~/components/AddFriendFooter";
import FriendCard from "~/components/FriendCard";
import { getFriends, removeFriend } from "~/services/friends";

const FriendsPage = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { data, isPending, isError } = useQuery({
    queryKey: ["friends"],
    queryFn: getFriends,
  });

  const { mutateAsync: removeFriendMutate } = useMutation({
    mutationFn: removeFriend,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });

  const handleUnfriend = async (id: number) => {
    await removeFriendMutate(id);
  };

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (!data) {
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
            >
              <AddFriendFooter
                onDecline={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  handleUnfriend(friend.id);
                }}
                cancelText="Unfriend"
              />
            </FriendCard>
          );
        })}
      </div>
    </div>
  );
};

export default FriendsPage;
