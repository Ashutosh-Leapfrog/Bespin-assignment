import { CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <div>
      <h1>Loading.........</h1>
      <CircularProgress
        variant="determinate"
        color="primary"
        size={40}
        thickness={4}
        value={100}
      />
    </div>
  );
};

export default Loading;
