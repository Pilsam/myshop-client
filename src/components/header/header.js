"use client"

import React, { useState, useEffect, useRef, useContext } from 'react';
import '../header/header.css';
import Logo from '../../assets/images/logo.svg';
import SearchIcon from '@mui/icons-material/Search';
import Select from '../selectDrop/select';
import axios from 'axios';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import IconCompare from '../../assets/images/icon-compare.svg';
import IconHeart from '../../assets/images/icon-heart.svg';
import IconCart from '../../assets/images/icon-cart.svg';
import IconUser from '../../assets/images/icon-user.svg';

import Button from '@mui/material/Button';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import { ClickAwayListener } from '@mui/base/ClickAwayListener';

import Nav from './nav/nav';
import Link from 'next/link';
import { MyContext } from '../../context/ThemeContext';
import { useRouter } from 'next/navigation';
import MenuIcon from '@mui/icons-material/Menu';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import Image from 'next/image';

import { fetchDataFromApi } from '@/utils/api';

const Header = () => {
  const [isOpenDropDown, setisOpenDropDown] = useState(false);
  const [isOpenAccDropDown, setisOpenAccDropDown] = useState(false);
  const [isopenSearch, setOpenSearch] = useState(false);
  const [isOpenNav, setIsOpenNav] = useState(false);
  const [catData, setCatData] = useState([]);
  const [searchInputValue, setsearchInputValue] = useState("");

  const headerRef = useRef(null);
  const searchInput = useRef(null);

  const context = useContext(MyContext);
  const history = useRouter();

  const [categories, setcategories] = useState([]);

  useEffect(() => {
    getCountry('https://countriesnow.space/api/v0.1/countries/');
    getCatData();
  }, [context.productData]);

  const cat = [];

  const getCatData = () => {
    fetchDataFromApi("/api/categories?populate=*").then(res => {
      setCatData(res);

      if (res?.data?.length > 0) {
        res.data.forEach(item => {
          cat.push(item.attributes.title);
        });

        const uniqueArray = [...new Set(cat)];
        setcategories(uniqueArray);
      }
    });
  };

  const countryList = [];
  const getCountry = async (url) => {
    try {
      await axios.get(url).then((res) => {
        if (res?.data?.data) {
          res.data.data.forEach(item => {
            countryList.push(item.country);
          });
        }
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  // ✅ Fixed scroll handler with cleanup
  useEffect(() => {
    const handleScroll = () => {
      if (!headerRef.current) return;

      let position = window.pageYOffset;
      if (position > 100) {
        headerRef.current.classList.add('fixed');
      } else {
        headerRef.current.classList.remove('fixed');
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const signOut = () => {
    context.signOut();
    history.push('/');
  };

  const openSearch = () => {
    setOpenSearch(true);
    if (searchInput.current) {
      searchInput.current.focus();
    }
  };

  const closeSearch = () => {
    setOpenSearch(false);
    if (searchInput.current) {
      searchInput.current.blur();
      searchInput.current.value = "";
    }
  };

  const openNav = () => setIsOpenNav(true);
  const closeNav = () => {
    setIsOpenNav(false);
    setisOpenAccDropDown(false);
  };

  const onChangeSearchInput = (e) => {
    setsearchInputValue(e.target.value);
  };

  const searchFun = () => {
    let params;

    if (
      context.headerSearchCatListValue !== "" &&
      context.headerSearchCatListValue !== "All Categories"
    ) {
      params = `/api/products?populate=*&[filters][categories][title]=${context.headerSearchCatListValue}&[filters][name][$contains]=${searchInputValue}`;
    } else {
      params = `/api/products?populate=*&[filters][name][$contains]=${searchInputValue}`;
    }

    fetchDataFromApi(params).then(res => {
      context.setSearchData(res.data);
      context.setsearchKeyword(searchInputValue);
      history.push(`/blank`);
      setTimeout(() => {
        history.push(`/search?query=${searchInputValue}`);
      }, 300);
    });
  };

  return (
    <>
      <div className="headerWrapper" ref={headerRef}>
        <header>
          <div className="container-fluid">
            <div className="row">
              {/* Logo + Mobile toggles */}
              <div className="col-sm-2 part1 d-flex align-items-center">
                <Link href="/"><Image src={Logo} className="logo" alt="Logo" /></Link>
                {context.windowWidth < 992 && (
                  <div className="ml-auto d-flex align-items-center">
                    <div className="navbarToggle mr-0" onClick={openSearch}><SearchIcon /></div>
                    <ul className="list list-inline mb-0 headerTabs pl-0 mr-4">
                      <li className="list-inline-item">
                        <span>
                          <Link href="/cart">
                            <Image src={IconCart} alt="Cart" />
                            <span className="badge bg-success rounded-circle">
                              {context.cartItems?.length}
                            </span>
                          </Link>
                        </span>
                      </li>
                    </ul>
                    <div className="navbarToggle mr-2" onClick={openNav}><MenuIcon /></div>
                    {context.isLogin === "true" && (
                      <div className="myAccDrop" onClick={() => setisOpenAccDropDown(!isOpenAccDropDown)}><PersonOutlineOutlinedIcon /></div>
                    )}
                  </div>
                )}
              </div>

              {/* Search bar */}
              <div className="col-sm-5 part2">
                <div className={`headerSearch d-flex align-items-center ${isopenSearch ? 'open' : ''}`}>
                  {context.windowWidth < 992 && (
                    <div className="closeSearch" onClick={closeSearch}><ArrowBackIosIcon /></div>
                  )}

                  {categories.length !== 0 && (
                    <Select data={categories} placeholder={'All Categories'} icon={false} />
                  )}

                  <div className="search">
                    <input
                      type="text"
                      placeholder="Search for items..."
                      ref={searchInput}
                      onChange={onChangeSearchInput}
                      value={searchInputValue}
                    />
                    <SearchIcon className="searchIcon cursor" onClick={searchFun} />
                  </div>
                </div>
              </div>

              {/* Desktop right section */}
              <div className="col-sm-5 d-flex align-items-center part3 res-hide">
                <div className="ml-auto d-flex align-items-center">
                  <div className="countryWrapper">
                    <Select data={countryList} placeholder={'Your Location'} icon={<LocationOnOutlinedIcon style={{ opacity: '0.5' }} />} />
                  </div>
                  <ClickAwayListener onClickAway={() => setisOpenDropDown(false)}>
                    <ul className="list list-inline mb-0 headerTabs">
                      <li className="list-inline-item">
                        <span>
                          <Image src={IconCompare} alt="Compare" />
                          <span className="badge bg-success rounded-circle">3</span>
                          Compare
                        </span>
                      </li>
                      <li className="list-inline-item">
                        <span>
                          <Image src={IconHeart} alt="Wishlist" />
                          <span className="badge bg-success rounded-circle">3</span>
                          Wishlist
                        </span>
                      </li>
                      <li className="list-inline-item">
                        <span>
                          <Link href="/cart">
                            <Image src={IconCart} alt="Cart" />
                            <span className="badge bg-success rounded-circle">
                              {context.cartItems?.length}
                            </span>
                            Cart
                          </Link>
                        </span>
                      </li>

                      {context.isLogin === "true" ? (
                        <li className="list-inline-item">
                          <span onClick={() => setisOpenDropDown(!isOpenDropDown)}>
                            <Image src={IconUser} alt="User" />
                            Account
                          </span>
                          {isOpenDropDown && (
                            <ul className="dropdownMenu">
                              <li><Button className="align-items-center"><Person2OutlinedIcon /> My Account</Button></li>
                              <li><Button><LocationOnOutlinedIcon /> Order Tracking</Button></li>
                              <li><Button><FavoriteBorderOutlinedIcon /> My Wishlist</Button></li>
                              <li><Button><SettingsOutlinedIcon /> Setting</Button></li>
                              <li><Button onClick={signOut}><LogoutOutlinedIcon /> Sign out</Button></li>
                            </ul>
                          )}
                        </li>
                      ) : (
                        <li className="list-inline-item">
                          <Link href="/signIn">
                            <Button className="btn btn-g">Sign In</Button>
                          </Link>
                        </li>
                      )}
                    </ul>
                  </ClickAwayListener>
                </div>
              </div>
            </div>
          </div>
        </header>

        {catData.length !== 0 && <Nav data={catData} openNav={isOpenNav} closeNav={closeNav} />}
      </div>

      <div className="afterHeader"></div>

      {isOpenAccDropDown && (
        <>
          <div className="navbarOverlay" onClick={closeNav}></div>
          <ul className="dropdownMenu dropdownMenuAcc" onClick={closeNav}>
            <li><Button className="align-items-center"><Link href=""><Person2OutlinedIcon /> My Account</Link></Button></li>
            <li><Button className="align-items-center"><Link href=""><Image src={IconCompare} alt="Compare" /> Compare</Link></Button></li>
            <li><Button className="align-items-center"><Link href=""><Image src={IconCart} alt="Cart" /> Cart</Link></Button></li>
            <li><Button><Link href=""><LocationOnOutlinedIcon /> Order Tracking</Link></Button></li>
            <li><Button><Link href=""><FavoriteBorderOutlinedIcon /> My Wishlist</Link></Button></li>
            <li><Button><Link href=""><SettingsOutlinedIcon /> Setting</Link></Button></li>
            <li><Button onClick={signOut}><Link href=""><LogoutOutlinedIcon /> Sign out</Link></Button></li>
          </ul>
        </>
      )}
    </>
  );
};

export default Header;
