import React, { useEffect, useState, useContext } from 'react';
import Radio from '@mui/material/Radio';
import { Button } from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import bannerImg from '../../assets/images/banner1.jpg';
import Link from 'next/link';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

import { MyContext } from '@/context/ThemeContext';
import Image from 'next/image';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Sidebar = (props) => {
    const [value, setValue] = useState([100, 100000]);
    const [value2, setValue2] = useState(0);
    const [ratingsArr, setRatingsArr] = useState([
       5.0,
       4.5,
       4.4,
       4.3,
       4.2,
       4.1,
       4.0,
       3.5,
       3.4,
       3.3,
       3.2,
       3.1,
       3,0,
       2.5,
       2.4,
       2.3,
       2.2,
       2.1,
       2.0,
       1.5,
       1.4,
       1.3,
       1.2,
       1.1,
       1.0
    ])

    
    

    const context = useContext(MyContext);


    const filterByRating = (keyword) => {
        props.filterByRating(parseFloat(keyword))
    }

const changePrice=(val)=>{
    setValue(val)
    props.filterByPrice(val);
}

    return (
        <>
            <div className={`sidebar ${context.isOpenFilters === true && 'open'}`}>
                <div className='card border-0 shadow res-hide'>
                    <h3>Category</h3>
                    <div className='catList'>

                        {
                            props.catData !== undefined && props.catData.length !== 0 &&
                            props.catData?.map((item, index) => {
                                return (
                                    <Link href={`/category/${item.attributes.title.toLowerCase()}`}>
                                        <div className='catItem d-flex align-items-center'>
                                            <span className='img'><img src='https://wp.alithemes.com/html/nest/demo/assets/imgs/theme/icons/category-1.svg' width={30} /></span>
                                            <h4 className='mb-0 ml-3 mr-3 text-capitalize'>{item.attributes.title}</h4>
                                            <span className='d-flex align-items-center justify-content-center rounded-circle ml-auto'>
                                                {item.attributes.products.data.length}</span>
                                        </div>
                                    </Link>
                                )

                            })

                        }

                    </div>
                </div>



                <div className='card border-0 shadow'>
                    <h3>Fill by price</h3>
                    <RangeSlider value={value} onInput={changePrice} min={100} max={100000} step={5} />
                  

                    <div className='d-flex pt-2 pb-2 priceRange'>
                        <span>From: <strong className='text-success'>Rs: {value[0]}</strong></span>
                        <span className='ml-auto'>From: <strong className='text-success'>Rs: {value[1]}</strong></span>
                    </div>
                </div>



                <div className='filters pt-0'>
                    <h5>Filter By Ratings</h5>
                    <ul className='pl-2'>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                        >
                            {
                                ratingsArr.length !== 0 &&
                                ratingsArr.map((item, index) => {
                                    return (
                                        <li key={index}> <FormControlLabel value={item} control={<Radio onChange={() => filterByRating(item)} />} label={item} /></li>
                                    )
                                })

                            }
                        </RadioGroup>
                    </ul>
                </div>



                <Image src={bannerImg} className='w-100' alt='banner' />

            </div>
        </>
    )
}

export default Sidebar;