import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Tab, Tabs } from "@mui/material";
import { useState } from "react";

import Loading from "~/components/Loading";
import { getSuggestions, sendRequest } from "~/services/friends";
import FriendRequests from "./FriendRequests";
import FriendSuggestion from "./FriendSuggestion";
import { useNavigate } from "react-router-dom";

const FriendRequestPage = () => {
  const [tabsValue, setTabsValue] = useState<"RECEIVED" | "SENT">("RECEIVED");

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { data: userData, isPending: userPending } = useQuery({
    queryKey: ["suggestions"],
    queryFn: getSuggestions,
  });

  const { mutateAsync: addFriend } = useMutation({
    mutationFn: sendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["suggestions"] });
      queryClient.invalidateQueries({ queryKey: ["sentFriendRequests"] });
    },
  });

  const handleAddFriend = async (id: number) => {
    await addFriend(id);
  };

  const handleTabChange = (
    _event: React.SyntheticEvent,
    newValue: "RECEIVED" | "SENT"
  ) => {
    setTabsValue(newValue);
  };

  if (userPending) {
    return <Loading />;
  }

  return (
    <div className="flex">
      <div className="w-full basis-4/5 h-screen mr-3">
        <Tabs className="mb-4" value={tabsValue} onChange={handleTabChange}>
          <Tab label="Received" value={"RECEIVED"} />
          <Tab label="Sent" value={"SENT"} />
        </Tabs>

        <FriendRequests type={tabsValue} />
      </div>

      <div className="ml-2 mt-10 h-screen">
        <p className="text-md font-bold text-center text-primary-500 mb-4">
          People you may know
        </p>
        {userPending ? (
          <Loading />
        ) : (
          userData?.map((user) => (
            <FriendSuggestion
              onClick={() => navigate(`/users/profile/${user.id}`)}
              key={user.id}
              name={user.username}
              imageUrl={user.imageUrl}
              onSend={(e: React.MouseEvent) => {
                e.stopPropagation();
                handleAddFriend(user.id);
              }}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default FriendRequestPage;
