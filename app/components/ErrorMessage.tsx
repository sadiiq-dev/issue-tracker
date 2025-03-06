import React, { PropsWithChildren } from "react";
import { Text } from "@radix-ui/themes";
const ErrorMessage = ({ children }: PropsWithChildren) => {
  if (!children) return null;
  return (
    <div className="mt-[-12px] mb-[12px]">
      <Text color="red" as="p">
        {children}
      </Text>
    </div>
  );
};

export default ErrorMessage;
