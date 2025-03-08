import { Flex } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const loadingIssueDetail = () => {
  return (
    <div className="max-w-[30rem]">
      <>
        <Skeleton width={"6rem"} height={"2rem"} />
        <div className="mt-8">
          <Skeleton height={"1.2rem"} />
          <Flex gap={"10px"} className="items-center" my={"3"}>
            <Skeleton width={"4rem"} height={"1.2rem"} />
            <Skeleton width={"5rem"} height={"1.2rem"} />
          </Flex>
          <Skeleton count={5} height={"1.2rem"} className="mt-2" />
        </div>
      </>
    </div>
  );
};

export default loadingIssueDetail;
