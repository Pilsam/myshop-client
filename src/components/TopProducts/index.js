"useClient";
import React from "react";
import "./style.css";
import Link from "next/link";
import Rating from "@mui/material/Rating";
import Image from "next/image";

const TopProducts = ({ title, data = [] }) => {
  // Ensure we always have an array
  const products = Array.isArray(data) ? data : data?.data || [];

  // Filter rating > 4.5 and limit to 3
  const filtered = products
    ?.filter((item) => item?.attributes?.rating > 4.5)
    .slice(0, 3);

  return (
    <div className="topSelling_box">
      <h3>{title}</h3>

      {filtered?.map((item, index) => {
        const attrs = item.attributes;

        // Use productImages as main source
        const imageUrl =
          attrs?.productImages?.data?.[0]?.attributes?.url || "/placeholder.jpg";

        return (
          <div key={index} className="items d-flex align-items-center">
            <div className="img">
              <Link href={`/product/${item.id}`}>
                <Image
                  src={imageUrl}
                  alt={attrs?.name || "Product image"}
                  width={80}
                  height={80}
                  className="w-100"
                />
              </Link>
            </div>

            <div className="info px-3">
              <Link href={`/product/${item.id}`}>
                <h4>{attrs?.name}</h4>
              </Link>

              <Rating
                name="half-rating-read"
                defaultValue={attrs?.rating || 0}
                precision={0.5}
                readOnly
              />

              <div className="d-flex align-items-center">
                <span className="price text-g font-weight-bold">
                  ${attrs?.price}
                </span>
                {attrs?.oldPrice && (
                  <span className="oldPrice">${attrs.oldPrice}</span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TopProducts;
