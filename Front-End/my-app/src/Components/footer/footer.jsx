import React, { useEffect, useState } from "react";
import axios from "axios";
import pic1 from "../../assets/app.jpg";
import pic2 from "../../assets/play.jpg";
import pic3 from "../../assets/pay.png";
import logo from '../../assets/logo.png';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import "./footer.css"



const Footer = () => {

    return(
        <div className="footerContainer">
                    <div className="footer">

                        <div className="footer1">
                            <img className="logo" src={logo} alt="" />
                            <p><strong>Address</strong> San Francisco</p>
                            <p><strong>Phone:</strong>+01 2222 365/(+91) 01 2345 6789</p>
                            <p><strong>Hours:</strong>10:00 - 18:00, Mon - Fri</p>
                            <div className="social">
                                <h4>Follow Us</h4>
                                <div className="media">
                                    <FaFacebook />
                                    <FaTwitter />
                                    <FaInstagram />
                                    <FaYoutube />
                                    <FaTiktok />
                                </div>
                            </div>
                        </div>
                        <div className="footer1">
                            <h4>About</h4>
                            <a href="">About Us</a>
                            <a href="">Delivery Information</a>
                            <a href="">Privacy Policy</a>
                            <a href="">Terms $ Conditions</a>
                            <a href="">Contact Us</a>
                        </div>
                        <div className="footer1">
                            <h4>My Account</h4>
                            <a href="">Sign In</a>
                            <a href="">View Cart</a>
                            <a href="">My Wishlist</a>
                            <a href="">Track My Order</a>
                            <a href="">Help</a>
                        </div>

                        <div className="footer1">
                            <h4>Install App</h4>
                            <p>From App Store or Google Play</p>
                            <div class="row">
                                <img src={pic1} alt="" />
                                <img src={pic2} alt="" />
                            </div>
                            <p>Secure Payment Gateway</p>
                            <img src={pic3} alt=""/>
                        </div>
                    </div>
            <div className="copyright">
                <p>copyright 2021, Anime Figure sell website</p>
            </div>

        </div>


        

        
    )
}

export default Footer;