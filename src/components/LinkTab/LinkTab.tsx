import React, { PropsWithChildren } from "react";
import { Link, Tab } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

export type LinkTabProps = {
  href: string;
  dataTestId: string;
};

const LinkTab = ({
  href,
  dataTestId,
  children,
}: PropsWithChildren<LinkTabProps>) => (
  <Link
    data-testid={dataTestId}
    tabIndex={-1}
    as={ReactRouterLink}
    to={href}
    textDecoration={"none"}
  >
    <Tab>{children}</Tab>
  </Link>
);

export default LinkTab;
