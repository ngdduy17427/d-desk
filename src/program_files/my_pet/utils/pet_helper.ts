import { repeat } from "utils/utils_helper";
import { PetAvatarOption, SpriteAvatar } from "../@type";

export const WhiteCat: SpriteAvatar = "WHITE_CAT";
export const YellowCat: SpriteAvatar = "YELLOW_CAT";
export const BrownCat: SpriteAvatar = "BROWN_CAT";
export const BlackCat: SpriteAvatar = "BLACK_CAT";

export const PetAvatars: Map<SpriteAvatar, PetAvatarOption> = new Map();

PetAvatars.set(WhiteCat, {
  value: WhiteCat,
  label: "White Cat",
  thumb: `${process.env.NEXT_PUBLIC_BASE_URL}/images/my_pet/thumb_white_cat.gif`,
  avatarSheet: {
    IDLE: [...repeat(2, [1, 4], [0, 4], [1, 4], [2, 4])],
    NORTH: [...repeat(2, [1, 1], [0, 1], [1, 1], [2, 1])],
    EAST: [...repeat(2, [1, 0], [0, 0], [1, 0], [2, 0])],
    SOUTH: [...repeat(2, [1, 2], [0, 2], [1, 2], [2, 2])],
    WEST: [...repeat(2, [1, 3], [0, 3], [1, 3], [2, 3])],
  },
});
PetAvatars.set(YellowCat, {
  value: YellowCat,
  label: "Yellow Cat",
  thumb: `${process.env.NEXT_PUBLIC_BASE_URL}/images/my_pet/thumb_yellow_cat.gif`,
  avatarSheet: {
    IDLE: [...repeat(2, [5, 4], [4, 4], [5, 4], [6, 4])],
    NORTH: [...repeat(2, [5, 1], [4, 1], [5, 1], [6, 1])],
    EAST: [...repeat(2, [5, 0], [4, 0], [5, 0], [6, 0])],
    SOUTH: [...repeat(2, [5, 2], [4, 2], [5, 2], [6, 2])],
    WEST: [...repeat(2, [5, 3], [4, 3], [5, 3], [6, 3])],
  },
});
PetAvatars.set(BrownCat, {
  value: BrownCat,
  label: "Brown Cat",
  thumb: `${process.env.NEXT_PUBLIC_BASE_URL}/images/my_pet/thumb_brown_cat.gif`,
  avatarSheet: {
    IDLE: [...repeat(2, [9, 4], [8, 4], [9, 4], [10, 4])],
    NORTH: [...repeat(2, [9, 1], [8, 1], [9, 1], [10, 1])],
    EAST: [...repeat(2, [9, 0], [8, 0], [9, 0], [10, 0])],
    SOUTH: [...repeat(2, [9, 2], [8, 2], [9, 2], [10, 2])],
    WEST: [...repeat(2, [9, 3], [8, 3], [9, 3], [10, 3])],
  },
});
PetAvatars.set(BlackCat, {
  value: BlackCat,
  label: "Black Cat",
  thumb: `${process.env.NEXT_PUBLIC_BASE_URL}/images/my_pet/thumb_black_cat.gif`,
  avatarSheet: {
    IDLE: [...repeat(2, [13, 4], [12, 4], [13, 4], [14, 4])],
    NORTH: [...repeat(2, [13, 1], [12, 1], [13, 1], [14, 1])],
    EAST: [...repeat(2, [13, 0], [12, 0], [13, 0], [14, 0])],
    SOUTH: [...repeat(2, [13, 2], [12, 2], [13, 2], [14, 2])],
    WEST: [...repeat(2, [13, 3], [12, 3], [13, 3], [14, 3])],
  },
});
