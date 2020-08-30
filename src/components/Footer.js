import React from 'react';
import "../css/FooterStyle.css"
import Typography from "@material-ui/core/Typography";

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
                <Typography
                    style={normalStyles}
                >
                    &copy; {new Date().getFullYear()} Copyright:
                    <a href="#"> Tattoo.com </a>
                </Typography>
            </div>
        );
    }
}

export default Footer;
