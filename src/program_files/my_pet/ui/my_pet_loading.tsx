import DImage from "components/d_image";
import { memo } from "react";

const MyPetLoading = (): JSX.Element => (
  <div className="my-pet-loading">
    <DImage
      src={`${process.env.NEXT_PUBLIC_BASE_URL}/images/my_pet/cat_loading.gif`}
      alt="Cat Loading"
      unoptimized
    />
  </div>
);

export default memo(MyPetLoading);
