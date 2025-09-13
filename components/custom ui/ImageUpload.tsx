import { CldUploadWidget, CloudinaryUploadWidgetResults } from "next-cloudinary";
import { Plus, Trash } from "lucide-react";
import Image from "next/image";

import { Button } from "../ui/button";

interface ImageUploadProps {
    value : string[];
    onChange : (value : string) => void;
    onRemove : (value: string) => void
}



const ImageUpload:React.FC<ImageUploadProps> = ({onChange, onRemove, value}) => {
  

    const onUpload = (result: CloudinaryUploadWidgetResults ) => {
            onChange(result?.info?.url || "");
            console.log(result?.info?.url )

    }
  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {value.map((url, index) => 
        <div key={index} className="relative w-[12.5rem] h-[12.5rem] ">
          <div className="absolute top-0 right-0 z-10">
            <Button  onClick={() => onRemove(url)} className="bg-red-1 text-white cursor-pointer"><Trash className="w-4 h-4 "/></Button>
          </div>
          <Image  src={url} fill  alt="collection" className="object-cover rounded-lg"/>
        </div>
        )}
      </div>
      <CldUploadWidget uploadPreset="qastore" onSuccess={onUpload}>
      {({ open }) => {
        return <Button onClick={() => open()} className="bg-grey-1 text-white cursor-pointer"><Plus/>Upload an Image</Button>;
      }}
    </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
