import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import AddFriendFooter from "~/components/AddFriendFooter";
import Error from "~/components/Error";
import FriendCard from "~/components/FriendCard";
import Loading from "~/components/Loading";
import NoData from "~/components/NoData";
import {
  acceptRequests,
  rejectRequests,
  getFriendRequests,
  getSentFriendRequests,
  declineRequests,
} from "~/services/friends";

interface FriendRequestsProps {
  type: "RECEIVED" | "SENT";
}

const FriendRequests = (props: FriendRequestsProps) => {
  const { type } = props;

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { mutateAsync: acceptRequestsMutate } = useMutation({
    mutationFn: acceptRequests,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["receivedFriendRequests"],
      });
      queryClient.invalidateQueries({ queryKey: ["sentFriendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["suggestions"] });
    },
  });

  const { mutateAsync: rejectRequestsMutate } = useMutation({
    mutationFn: rejectRequests,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["receivedFriendRequests"],
      });
      queryClient.invalidateQueries({ queryKey: ["sentFriendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["suggestions"] });
    },
  });

  const { mutateAsync: cancelRequestsMutate } = useMutation({
    mutationFn: declineRequests,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["receivedFriendRequests"],
      });
      queryClient.invalidateQueries({ queryKey: ["sentFriendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["suggestions"] });
    },
  });

  const {
    data: receivedRequests,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["receivedFriendRequests"],
    queryFn: getFriendRequests,
    enabled: type === "RECEIVED",
  });

  const {
    data: sentRequests,
    isError: sentError,
    isPending: sentPending,
  } = useQuery({
    queryKey: ["sentFriendRequests"],
    queryFn: getSentFriendRequests,
    enabled: type === "SENT",
  });

  const handleAccept = async (id: number) => {
    await acceptRequestsMutate(id);
  };

  const handleDecline = async (id: number) => {
    await rejectRequestsMutate(id);
  };

  const handleCancel = async (id: number) => {
    await cancelRequestsMutate(id);
  };

  const renderData = type === "RECEIVED" ? receivedRequests : sentRequests;

  if (isPending && sentPending) {
    return <Loading />;
  }

  if (isError && sentError) {
    return <Error />;
  }

  if (!renderData) {
    return <NoData />;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {renderData.map((friend) => (
        <FriendCard
          onclick={() => navigate(`/users/profile/${friend.id}`)}
          key={friend.id}
          name={friend.username}
          imageUrl={friend.imageUrl}
          bio={friend.bio}
        >
          {type === "RECEIVED" ? (
            <AddFriendFooter
              onAccept={(e: React.MouseEvent) => {
                e.stopPropagation();
                handleAccept(friend.id);
              }}
              onDecline={(e: React.MouseEvent) => {
                e.stopPropagation();
                handleDecline(friend.id);
              }}
              cancelText="Decline"
            />
          ) : (
            <AddFriendFooter
              cancelText="Cancel"
              onDecline={(e: React.MouseEvent) => {
                e.stopPropagation();
                handleCancel(friend.id);
              }}
            />
          )}
        </FriendCard>
      ))}
    </div>
  );
};

export default FriendRequests;
