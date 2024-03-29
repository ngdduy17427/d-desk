import { IAppBackground, IAppCursor } from "@type";
import {
  bubbleCursor,
  characterCursor,
  clockCursor,
  emojiCursor,
  fairyDustCursor,
  followingDotCursor,
  ghostCursor,
  rainbowCursor,
  snowflakeCursor,
  springyEmojiCursor,
  trailingCursor,
} from "cursor-effects";
import { uuidv4 } from "utils/utils_helper";

export const AppBackgrounds: IAppBackground[] = [
  { value: uuidv4(), image: "images/background/app-bg-1.png" },
  { value: uuidv4(), image: "images/background/app-bg-2.png" },
  { value: uuidv4(), image: "images/background/app-bg-3.png" },
];

export const AppCursors: IAppCursor[] = [
  { value: uuidv4(), label: "Normal" },
  { value: uuidv4(), label: "Bubble cursor", cursor: bubbleCursor },
  { value: uuidv4(), label: "Character cursor", cursor: characterCursor },
  { value: uuidv4(), label: "Clock cursor", cursor: clockCursor },
  { value: uuidv4(), label: "Emoji cursor", cursor: emojiCursor },
  { value: uuidv4(), label: "Fairy Dust cursor", cursor: fairyDustCursor },
  { value: uuidv4(), label: "Following Dot cursor", cursor: followingDotCursor },
  { value: uuidv4(), label: "Ghost cursor", cursor: ghostCursor },
  { value: uuidv4(), label: "Rainbow cursor", cursor: rainbowCursor },
  { value: uuidv4(), label: "Snowflake cursor", cursor: snowflakeCursor },
  { value: uuidv4(), label: "Springy Emoji cursor", cursor: springyEmojiCursor },
  { value: uuidv4(), label: "Trailing cursor", cursor: trailingCursor },
];
