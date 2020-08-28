import React from 'react';
import "../css/FooterStyle.css"

import {MDBContainer, MDBFooter} from "mdbreact";

class Footer extends React.Component {
    render() {
        let normalStyles = {
            backgroundColor: "#343a40",
            padding: "1rem",
            textAlign: "center",
            color: "white",
            lineHeight: 0.5
        }

        return (
            <div>
                <MDBFooter style={normalStyles}
                           className="font-small pt-4 mt-4">
                    <div className="footer-copyright text-center py-3">
                        <MDBContainer fluid>
                            &copy; {new Date().getFullYear()} Copyright: <a
                            href="#"> Tattoo.com </a>
                        </MDBContainer>
                    </div>
                </MDBFooter>
            </div>
        );
    }
}

export default Footer;
