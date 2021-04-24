import React from 'react';
import logo from '../assests/olx-logo.png';
import '../static/css/app.css';
class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div id="footer" className="container-fluid">

                <div id="footer-detail">
                    <img src={logo} alt="Logo" id="flogo" height="60" width="60" />
                    <small>&copy; Copyright 2021, IITG_EE390</small>
                    <div style={{ float: "right" }}>
                        <a href="">Location Map</a> <br></br>
                        <a href="">Privacy Policies</a> <br></br>
                        <a href="">Terms and conditions</a> <br></br>
                        <a href="">Contact Us</a>
                        
                    </div>

                </div>


            </div>


        );
    }
}

export default Footer;