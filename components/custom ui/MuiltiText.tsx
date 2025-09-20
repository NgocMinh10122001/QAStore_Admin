"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";
import { Button } from "../ui/button";

interface IMultiTextProps {
  placeholder: string;
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const MultiText: React.FC<IMultiTextProps> = ({
  placeholder,
  value,
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputValue] = useState("");

const addTag = (inputValue : string) => {
    onChange(inputValue)
    setInputValue("")
}

  return (
    <div>
        <Input
      placeholder={placeholder}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={(e) => {
        if(e.key === "Enter"){
            e.preventDefault()
            addTag(inputValue)
        }
      }}
    />
    <div className="flex gap-1 flex-wrap mt-4">
        {value && value.length>0 && value?.map((tag, index) => {
            return <Badge className="bg-grey-1 text-white rounded-xl outline-none px-2 py-1" key={index}>
                <span className="text-sm">{tag}</span>
                <Button className="!p-0 h-fit rounded-full cursor-pointer bg-transparent hover:bg-transparent" onClick={() => onRemove(tag)}><X/></Button>
            </Badge>
        })}
    </div>
    </div>
  );
};

export default MultiText;
