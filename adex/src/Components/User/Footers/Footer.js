import React from "react";
import { Row, Container } from "reactstrap";

function Footer() {
  return (
    <footer style = {{backgroundColor: "#3c0d0d", borderTop: "1px solid black"}} className="footer">
      <Container>
        <Row>
          <div className="credits" style = {{textAlign: "center", width: "100%",}}>
            <span style = {{color: "white"}} className="copyright">
              © {new Date().getFullYear()}, made with{" "}
              <i className="fa fa-heart heart" /> by ADEX TEAM
            </span>
          </div>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
