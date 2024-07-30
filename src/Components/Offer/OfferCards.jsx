import { useQuery } from "react-query";
import { getCoupons } from "../../../lib/helper";
import OfferCardRow from "./OfferCardRow";

const OfferCard = () => {
  const { data, isLoading, refetch } = useQuery(["coupons"], () =>
    getCoupons("show=on")
  );

  return (
    <>
      <div className="grid lg:grid-cols-4 gap-5">
        {data?.data?.result?.map((coupon) => {
          return <OfferCardRow key={coupon._id} coupon={coupon} />;
        })}
      </div>
    </>
  );
};

export default OfferCard;
