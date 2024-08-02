import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";

const EmojiPickerComponent = ({ children, setEmojiIcon }) => {
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  return (
    <div>
      <div onClick={() => setOpenEmojiPicker(!openEmojiPicker)}>{children}</div>
      {openEmojiPicker && (
        <di className="absolute z-10">
          <EmojiPicker
            emojiStyle="facebook"
            onEmojiClick={(e) => {
              setEmojiIcon(e.emoji);
              setOpenEmojiPicker(false);
            }}
          />
        </di>
      )}
    </div>
  );
};

export default EmojiPickerComponent;
