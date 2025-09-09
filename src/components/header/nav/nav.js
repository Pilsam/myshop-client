import React, { useEffect, useContext } from 'react';
import './nav.css';
import Link from 'next/link';
import Button from '@mui/material/Button';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import GridViewIcon from '@mui/icons-material/GridView';
import HeadphonesOutlinedIcon from '@mui/icons-material/HeadphonesOutlined';
import { useState } from 'react';
import { MyContext } from '../../../context/ThemeContext';

const Nav = (props) => {


    const [navData, setNavData] = useState([]);
    const [isOpenNav, setIsOpenNav] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const context = useContext(MyContext);

    useEffect(() => {
        setNavData(props.data.data);
    }, [])

    useEffect(() => {
        setIsOpenNav(props.openNav)
    }, [props.openNav])


    const closeNav = () => {
        props.closeNav();
    }

    return (
        <>
            {
                isOpenNav === true && <div className='navbarOverlay' onClick={props.closeNav}></div>
            }
            <div className={`nav d-flex align-items-center ${isOpenNav === true && 'click'}`}>
                <div className='container-fluid'>
                    <div className='row position-relative'>
                        <div className='col-sm-2 part1 d-flex align-items-center'>
                            <Button className='bg-g text-white catTab res-hide'>
                                <GridViewIcon /> &nbsp;Browse All Categories <KeyboardArrowDownIcon /></Button>
                        </div>

                        <div className='col-sm-8 part2 position-static'>
                            <nav className={isOpenNav === true ? 'open' : ''}>
                                <ul className='list list-inline mb-0'>
                                    <li className='list-inline-item'>
                                        <Button><Link href={'/'} onClick={props.closeNav}>Home</Link></Button>
                                    </li>

                                    {
                                        navData !== undefined && navData?.length !== 0 &&
                                        navData?.map((item, index) => {

                                            if (item.attributes.title !== undefined) {
                                                return (
                                                    <li className='list-inline-item' key={index}>

                                                        <Button onClick={props.closeNav}>
                                                            <Link href={`/category/${item.attributes.title !== undefined && item.attributes.title.toLowerCase()}`}
                                                                onClick={() => sessionStorage.setItem('cat', item.attributes.title !== undefined && item.attributes.title.toLowerCase())}
                                                            >{item.attributes.title !== undefined && item.attributes.title}  <KeyboardArrowDownIcon /></Link></Button>

                                                        {
                                                            item.attributes.sub_cats.data !== undefined && item.attributes.sub_cats.data.length !== 0 &&
                                                            <div className='dropdown_menu'>

                                                                <ul>
                                                                    {
                                                                        item.attributes.sub_cats.data.map((item_, index_) => {
                                                                            return (
                                                                                <li key={index_}>
                                                                                    <Button onClick={props.closeNav}>
                                                                                        <Link href={`/category/subcat/${item_.id !== undefined && item_.id}`}
                                                                                            onClick={() => {
                                                                                                sessionStorage.setItem('cat', item.attributes.title.toLowerCase())

                                                                                                sessionStorage.setItem('subCat', item_.attributes.title.toLowerCase())
                                                                                            }
                                                                                            }>
                                                                                            {
                                                                                                item_.attributes.title
                                                                                            }
                                                                                        </Link>
                                                                                    </Button>
                                                                                </li>
                                                                            )
                                                                        })
                                                                    }


                                                                </ul>
                                                            </div>
                                                        }

                                                    </li>
                                                )
                                            }
                                        })
                                    }




                                                                       <li className='list-inline-item position-static'>
                                        <Button onClick={props.closeNav}><Link href="#">Shop <KeyboardArrowDownIcon /></Link></Button>
                                        <div className='dropdown_menu megaMenu w-100'>
                                            <div className='row'>
                                                {
                                                    navData?.length !== 0 &&
                                                    navData?.map((item, index) => {
                                                        return (
                                                            <div className='col' key={index}>
                                                                <Link href={`/category/${item.attributes.title !== undefined && item.attributes.title.toLowerCase()}`}
                                                                    onClick={() => sessionStorage.setItem('cat', item.attributes.title !== undefined && item.attributes.title.toLowerCase())}
                                                                > <h4 className='text-g text-capitalize'>{item.attributes.title}</h4></Link>


                                                                {
                                                                    item.attributes.sub_cats.data !== undefined && item.attributes.sub_cats.data.length !== 0 &&
                                                                    <ul className='mt-4 mb-0'>

                                                                        {
                                                                            item.attributes.sub_cats.data.map((item_, index) => {
                                                                                return (
                                                                                    <li key={index} onClick={() => {
                                                                                        sessionStorage.setItem('cat', item.attributes.title.toLowerCase())

                                                                                        sessionStorage.setItem('subCat', item_.attributes.title.toLowerCase())
                                                                                    }
                                                                                    }>
                                                                                        <Link onClick={props.closeNav} href={`/category/subcat/${item_.id !== undefined && item_.id}`}
                                                                                            className='text-capitalize'>{item_.attributes.title}</Link>
                                                                                    </li>
                                                                                )
                                                                            })
                                                                        }
                                                                    </ul>
                                                                }
                                                            </div>
                                                        )
                                                    })
                                                }

                                                <div className='col'>
                                                    <img src="https://wp.alithemes.com/html/nest/demo/assets/imgs/banner/banner-menu.png" className='w-100' />
                                                </div>
                                            </div>
                                        </div>
                                    </li>

                                                                     <li className='list-inline-item'>
                                        <Button><Link href="#">Pages  <KeyboardArrowDownIcon /></Link>
                                        </Button>

                                        <div className='dropdown_menu'>
                                            <ul>
                                                <li><Button><Link href="/about">About Us</Link></Button></li>
                                                <li><Button><Link href="/about">Contact</Link></Button></li>
                                                <li><Button><Link href="/about">My Account</Link></Button></li>
                                                <li><Button><Link href="/about">Login</Link></Button></li>
                                                <li><Button><Link href="/about">Register</Link></Button></li>
                                                <li><Button><Link href="/about">Forgot password</Link></Button></li>
                                                <li><Button><Link href="/about">Reset password</Link></Button></li>
                                                <li><Button><Link href="/about">Purchase Guide</Link></Button></li>
                                                <li><Button><Link href="/about">Privacy Policy</Link></Button></li>
                                                <li><Button><Link href="/about">Terms of Service</Link></Button></li>
                                                <li><Button><Link href="/about">404 Page</Link></Button></li>
                                            </ul>
                                        </div>

                                    </li>
                                    <li className='list-inline-item'>
                                        <Button><Link href="#">Contact</Link></Button>
                                    </li>
                                </ul>

                                {
                                    windowWidth < 992 &&
                                    <>
                                        {
                                            context.isLogin !== "true" &&
                                            <div className='pl-3 pr-3'>
                                                <br />
                                                <Link href={'/signIn'}>
                                                    <Button className="btn btn-g btn-lg w-100" onClick={closeNav}>Sign In</Button>
                                                </Link>
                                            </div>
                                        }

                                    </>
                                }

                            </nav>
                        </div>

                        <div className='col-sm-2 part3 d-flex align-items-center'>
                            <div className='phNo d-flex align-items-center ml-auto'>
                                <span><HeadphonesOutlinedIcon /></span>
                                <div className='info ml-3'>
                                    <h3 className='text-g mb-0'>1900 - 888</h3>
                                    <p className='mb-0'>24/7 Support Center</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Nav;