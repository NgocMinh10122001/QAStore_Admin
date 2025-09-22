import {
  CldUploadWidget,
  CloudinaryUploadWidgetOptions,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { Plus, Trash } from "lucide-react";
import Image from "next/image";

import { Button } from "../ui/button";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string[]) => void;
  onRemove: (value: string) => void;
  options?: CloudinaryUploadWidgetOptions;
}

interface CloudinaryQueuesEndResult {
  info?: {
    files?: Array<{
      uploadInfo: {
        url: string;
        secure_url: string;
      };
    }>;
  };
  event?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  onRemove,
  value,
  options,
}) => {
  const onQueuesEnd = (result: CloudinaryUploadWidgetResults) => {
    // console.log("upload completed",res.info.files.map((file:any) => file.uploadInfo.url));
    // console.log("upload completed",result);
    //  onChange(result?.info?.files.map((file: any) => file.uploadInfo.url) || []);
    const queuesEndResult = result as CloudinaryQueuesEndResult;

    if (queuesEndResult.event === "queues-end") {
      const urls =
        queuesEndResult.info?.files?.map((file) => file.uploadInfo.url) || [];
      onChange(urls);
    } else {
      onChange([]);
    }
  };
  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {value &&
          value.length > 0 &&
          value.map((url, index) => (
            <div key={index} className="relative w-[12.5rem] h-[12.5rem] ">
              <div className="absolute top-0 right-0 z-10">
                <Button
                  onClick={() => onRemove(url)}
                  className="bg-red-1 hover:bg-red-400 duration-150 ease-in-out text-white cursor-pointer"
                >
                  <Trash className="w-4 h-4 " />
                </Button>
              </div>
              <Image
                src={url}
                fill
                alt="collection"
                className="object-cover rounded-lg"
              />
            </div>
          ))}
      </div>
      <CldUploadWidget
        uploadPreset="qastore"
        onQueuesEnd={onQueuesEnd}
        options={options}
      >
        {({ open }) => {
          return (
            <Button
              onClick={() => open()}
              className="bg-grey-1 text-white cursor-pointer"
            >
              <Plus />
              Upload an Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
