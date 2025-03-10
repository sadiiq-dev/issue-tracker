import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const loadingNewIssue = () => {
  return (
    <div className="mx-x-xl">
      <Skeleton width={"40%"} />
      <Skeleton height={"18rem"} width={"40%"} />
    </div>
  );
};

export default loadingNewIssue;
