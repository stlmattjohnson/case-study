import React from "react";
import { ArrowRightIcon } from "@chakra-ui/icons";
import { IconButton, Link } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

type FilterBarProps = {
  href: string;
  ariaLabel: string;
  dataTestId: string;
  onChange: () => void;
};

const LinkButton = ({
  href,
  ariaLabel,
  dataTestId,
  onChange,
}: FilterBarProps) => {
  return (
    <Link
      tabIndex={-1}
      as={ReactRouterLink}
      to={href}
      onClick={() => onChange()}
      data-testid={dataTestId}
    >
      <IconButton
        aria-label={ariaLabel}
        size="sm"
        colorScheme="telegram"
        icon={<ArrowRightIcon />}
      ></IconButton>
    </Link>
  );
};

export default LinkButton;
