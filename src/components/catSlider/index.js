import React, { useEffect, useRef, useState, useContext } from 'react';
import Slider from "react-slick";
import './style.css';
import Link from 'next/link';

import { MyContext } from '../../context/ThemeContext';

const CatSlider = (props) => {
  const [allData, setAllData] = useState();
  const context = useContext(MyContext);

  const [itemBg, setItemBg] = useState([
    '#fffceb',
    '#ecffec',
    '#feefea',
    '#fff3eb',
    '#fff3ff',
    '#f2fce4',
    '#feefea',
    '#fffceb',
    '#feefea',
    '#ecffec',
    '#feefea',
    '#fff3eb',
    '#fff3ff',
    '#f2fce4',
    '#feefea',
    '#fffceb',
    '#feefea',
    '#ecffec'
  ]);

  const slider = useRef();

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 1,
    fade: false,
    arrows: context.windowWidth > 992 ? true : false,
    autoplay: context.windowWidth > 992 ? 2000 : false,
    centerMode: context.windowWidth > 992 ? true : false
  };

  useEffect(() => {
    setAllData(props.data);
  }, [props.data]);

  return (
    <>
      <div className="catSliderSection">
        <div className="container-fluid" ref={slider}>
          <h2 className="hd">Featured Categories</h2>
          <Slider {...settings} className="cat_slider_Main" id="cat_slider_Main">
            {props.data?.data?.map((item, index) => {
              const title = item.attributes?.title || "Category";
              const imgUrl = item.attributes?.img?.data?.attributes?.url
                ? "http://localhost:1337" + item.attributes.img.data.attributes.url
                : "/placeholder.png"; // fallback image
              const productCount = item.attributes?.products?.data?.length || 0;

              return (
                <div className="item" key={index}>
                  <Link href={`/cat/${title.toLowerCase()}`}>
                    <div className="info" style={{ background: itemBg[index] }}>
                      <img src={imgUrl} width="80" alt={title} />
                      <h5 className="text-capitalize mt-3">{title}</h5>
                      <p>{productCount} items</p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default CatSlider;
