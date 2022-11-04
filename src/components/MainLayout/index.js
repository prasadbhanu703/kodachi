import React from 'react'
import Footer from '../Footer';
import HeaderNavbar from '../HeaderNavbar';
import MainNavbar from '../MainNavbar';

const MainLayout = ({ children }) => {
    return (
        <div className="main-layout-container">
            <HeaderNavbar />
            <div className="main-layout-wrapper">
                {/* <SideBar /> */}
                <MainNavbar />

                <div className="main-layout-children">
                    {children}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default MainLayout;