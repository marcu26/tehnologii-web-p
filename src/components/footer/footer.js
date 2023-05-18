import React from "react"
import fblogo from '../../images/fb.png'
import instalogo from '../../images/insta.png'
import twitterlogo from '../../images/twitter.png'
import './footer.css'

function Footer() {
    return (
        <footer className="page-footer font-small blue pt-5 text-white classFooter">
            <div className="container-fluid text-center text-md-left">
                <div className="row">
                    <div className="col-md-6 mt-md-0 mt-3">
                        <h5 className="text-uppercase">About Us</h5>
                        <p>We connect professionals and businesses worldwide.</p>
                        <p>Discover new opportunities and grow your career.</p>
                    </div>

                    <hr className="clearfix w-100 d-md-none pb-0" />

                    <div className="col-md-3 mb-md-0 mb-3">
                        <h5 className="text-uppercase">Social media</h5>
                        <ul className="list-unstyled">
                            <li><a href="https://www.facebook.com/"><img src={fblogo} alt="Facebook" className="logoSize"/></a></li>
                            <li><a href="https://www.instagram.com/"><img src={instalogo} alt="Instagram" className="logoSize"/></a></li>
                            <li><a href="https://www.twitter.com/"><img src={twitterlogo} alt="Twitter" className="logoSize"/></a></li>
                        </ul>
                    </div>

                    <div className="col-md-3 mb-md-0 mb-3">
                        <h5 className="text-uppercase">Address</h5>
                        <ul className="list-unstyled">
                            <li>Cristelec,</li>
                            <li>Str. Principala,</li>
                            <li>Nr.115</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="text-center py-3">© 2023 Tema tehnologii web</div>
        </footer>);
}; export default Footer
