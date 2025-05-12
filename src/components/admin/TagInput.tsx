import React, { useState } from "react";

const TagInput: React.FC<{
  onTagsChange?: (tags: string[]) => void;
}> = ({ onTagsChange }) => {
  const [tags, setTags] = useState<string[]>([""]);
  
  const handleTagChange = (value: string, index: number) => {
    const updatedTags = [...tags];
    updatedTags[index] = value;
    setTags(updatedTags);
    onTagsChange?.(updatedTags);
  };

  const addTag = () => {
    setTags([...tags, ""]);
  };

  const removeTag = (index: number) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
    onTagsChange?.(updatedTags);
  };

  return (
    <div className="mb-4">
      <label className="block mb-1 text-sm font-medium text-gray-700">Tags</label>
      {tags.map((tag, index) => (
        <div key={index} className="flex items-center gap-2 mb-2">
          <input
            type="text"
            value={tag}
            onChange={(e) => handleTagChange(e.target.value, index)}
            placeholder="Enter tag"
            className="flex-1 h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="button"
            onClick={() => removeTag(index)}
            className="text-sm text-red-500 hover:underline"
          >
          - Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addTag}
        className="mt-1 text-sm text-primary bg-action px-4 py-1 rounded-md hover:underline"
      >
        + Add Tag
      </button>
    </div>
  );
};

export default TagInput;
