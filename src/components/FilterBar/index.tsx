import React, { ChangeEvent } from "react";
import { CloseIcon, Search2Icon } from "@chakra-ui/icons";
import {
  InputGroup,
  InputLeftElement,
  Input,
  HStack,
  IconButton,
} from "@chakra-ui/react";

type FilterBarProps = {
  placeholder: string;
  value: string;
  setValue: (value: string) => void;
};

const FilterBar = ({ placeholder, value, setValue }: FilterBarProps) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setValue(text);
  };

  return (
    <HStack w="100%" gap={2}>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <Search2Icon color="gray.300" />
        </InputLeftElement>
        <Input
          value={value}
          type="search"
          placeholder={placeholder}
          onChange={onChange}
        />
      </InputGroup>
      <IconButton
        disabled={value.length === 0}
        onClick={() => setValue("")}
        colorScheme="red"
        aria-label="Clear Search"
        icon={<CloseIcon />}
      />
    </HStack>
  );
};

export default FilterBar;
