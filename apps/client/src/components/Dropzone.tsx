import React, { ChangeEvent, useState } from "react";

interface DropzoneProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  name: string;
}

const Dropzone: React.FC<DropzoneProps> = (props) => {
  const { onChange, name } = props;
  const [imagePreview, setImagePreview] = useState<string>("");

  const handleImagePreview = (files: FileList | null) => {
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(files[0]);
    } else {
      setImagePreview("");
    }
  };

  const handleDropzoneChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event);
    handleImagePreview(event.target.files);
  };

  return (
    <div>
      <div className="flex items-center justify-center w-full">
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF</p>
            </div>
          )}
          <input
            onChange={handleDropzoneChange}
            name={name}
            type="file"
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
};

export default Dropzone;
