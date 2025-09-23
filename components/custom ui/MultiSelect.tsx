"use client";
import React, { useState } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { X } from "lucide-react";

interface IMultiSelectProps {
  placeholder: string;
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  collections: CollectionType[];
}

const MultiSelect: React.FC<IMultiSelectProps> = ({
  placeholder,
  value,
  onChange,
  onRemove,
  collections,
}) => {
  
  // const [commandList, setCommandList] = useState(false)
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  let selected: CollectionType[];

  if (value.length === 0) {
    selected = [];
  } else {
    selected = value.map((id) =>
      collections.find((collection) => collection._id === id)
    ) as CollectionType[];
  }

  const selectable = collections.filter(
    (collection) => !selected.includes(collection)
  );

  return (
    <Command className="overflow-visible bg-white ">
      <div className="border rounded-md shadow-xs">
        <div className="flex gap-1 flex-wrap">
          {selected.length > 0 &&
            selected.map((item) => (
              <Badge
                key={item._id}
                className="bg-grey-1 text-white rounded-xl outline-none px-2 py-1 mt-2 ms-2"
              >
                <span className="text-sm">{item.title}</span>
                <Button
                  className="!p-0 h-fit rounded-full cursor-pointer bg-transparent hover:bg-transparent"
                  onClick={() => onRemove(item._id)}
                >
                  <X />
                </Button>
              </Badge>
            ))}
        </div>
        <CommandInput
          placeholder={placeholder}
          value={inputValue}
          onValueChange={setInputValue}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
        />
      </div>
      <div className="mt-2 relative z-10">
        {open && (
          <CommandList className="absolute w-full border rounded-md shadow-md top-0 overflow-auto z-10">
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup >
              {selectable &&
                selectable.length > 0 &&
                selectable.map((collection) => (
                  <CommandItem
                    key={collection._id}
                    onMouseDown={(e) => e.preventDefault()}
                    onSelect={() => {
                      onChange(collection._id);
                      setInputValue("");
                    }}
                  >
                    {collection.title}
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        )}
      </div>
    </Command>
  );
};

export default MultiSelect;
