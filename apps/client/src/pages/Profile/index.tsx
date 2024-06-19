import { IconButton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

import { FaEdit } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";
import { ImProfile } from "react-icons/im";

import AvatarImage from "~/components/AvatarImage";
import Error from "~/components/Error";
import Loading from "~/components/Loading";
import colors from "~/constants/colors";
import { getUser } from "~/services/users";
import ProfileService from "~/services/ProfileService";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const userId = Number(params?.userId);

  useEffect(() => {
    const checkUser = async () => {
      const currentUserId = await ProfileService.getUserId();
      if (userId === currentUserId) {
        return setIsCurrentUser(true);
      }
      setIsCurrentUser(false);
    };
    checkUser();
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["getUserById", userId],
    queryFn: async () => {
      return await getUser(userId);
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <div className="w-full h-full flex flex-col bg-gray-100">
      <div className="mb-10 flex justify-end items-center w-full">
        {isCurrentUser && (
          <IconButton
            disableRipple
            onClick={() => navigate(`/users/profile/${userId}/edit`)}
          >
            <FaEdit
              size={20}
              color={colors.primary[900]}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = colors.primary[300];
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = colors.primary[900];
              }}
            />
          </IconButton>
        )}
      </div>
      <div className="flex flex-col max-w-3xl w-full gap-5">
        <div className="flex justify-center items-center">
          <AvatarImage
            className="w-32 h-32"
            src={data?.imageUrl ?? ""}
            alt={data?.username ?? "John Doe"}
          />
        </div>
        <h1 className="text-3xl font-bold">{data?.username}</h1>
        <div className="flex gap-2 items-start">
          <ImProfile size={32} />
          {data?.bio}
        </div>
        <div className="flex gap-2 items-center">
          <MdAlternateEmail />
          {data?.email}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
