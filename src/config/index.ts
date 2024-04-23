import { IAppBackgroundOption, IAppCursorOption, IAppThemeOption } from "@type";
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

export const AppThemeOptions: IAppThemeOption[] = [
  { value: "normal", label: "Normal", theme: "normal" },
  { value: "theme-1", label: "Theme 1", theme: "theme-1" },
  { value: "theme-2", label: "Theme 2", theme: "theme-2" },
  { value: "theme-3", label: "Theme 3", theme: "theme-3" },
  { value: "theme-4", label: "Theme 4", theme: "theme-4" },
  { value: "theme-5", label: "Theme 5", theme: "theme-5" },
];
export const AppBackgroundOptions: IAppBackgroundOption[] = [
  {
    value: "bg-1",
    label: "Forest 1",
    image: `${process.env.NEXT_PUBLIC_BASE_URL}/images/background/app_bg_1.png`,
  },
  {
    value: "bg-2",
    label: "Forest 2",
    image: `${process.env.NEXT_PUBLIC_BASE_URL}/images/background/app_bg_2.png`,
  },
  {
    value: "bg-3",
    label: "Forest 3",
    image: `${process.env.NEXT_PUBLIC_BASE_URL}/images/background/app_bg_3.png`,
  },
];
export const AppCursorOptions: IAppCursorOption[] = [
  { value: "normal", label: "Normal" },
  { value: "cursor-1", label: "Bubble cursor", cursorEffect: bubbleCursor },
  { value: "cursor-2", label: "Character cursor", cursorEffect: characterCursor },
  { value: "cursor-3", label: "Clock cursor", cursorEffect: clockCursor },
  { value: "cursor-4", label: "Emoji cursor", cursorEffect: emojiCursor },
  { value: "cursor-5", label: "Fairy Dust cursor", cursorEffect: fairyDustCursor },
  { value: "cursor-6", label: "Following Dot cursor", cursorEffect: followingDotCursor },
  { value: "cursor-7", label: "Ghost cursor", cursorEffect: ghostCursor },
  { value: "cursor-8", label: "Rainbow cursor", cursorEffect: rainbowCursor },
  { value: "cursor-9", label: "Snowflake cursor", cursorEffect: snowflakeCursor },
  { value: "cursor-10", label: "Springy Emoji cursor", cursorEffect: springyEmojiCursor },
  { value: "cursor-11", label: "Trailing cursor", cursorEffect: trailingCursor },
];
