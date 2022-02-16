import React, { PropsWithChildren } from "react";
import { Tab } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export type LinkTabProps = {
  href: string;
  dataTestId: string;
  ariaLabel: string;
};

const LinkTab = ({
  href,
  dataTestId,
  ariaLabel,
  children,
}: PropsWithChildren<LinkTabProps>) => {
  const navigate = useNavigate();

  return (
    <Tab
      tabIndex={0}
      data-testid={dataTestId}
      aria-label={ariaLabel}
      onClick={() => navigate(href)}
    >
      {children}
    </Tab>
  );
};
export default LinkTab;
