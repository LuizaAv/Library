import "./footer.css";

//function returns footer part of application
export default function Footer() {
  return (
    <div className="footerMainContainer">
      <div className="footerSecondContainer">
        <div id="footerContactUs" className="footerDiv">
          <h3>Contuct us</h3>
          <span>Azatutyun str 24/17 b. E plaza</span>
          <span>Yerevan, Arabkir</span>
          <span>Phone: (123) 456-7890</span>
          <span>Email: info@academy.com</span>
        </div>
        <div id="footerHours" className="footerDiv">
          <h3>Library hours</h3>
          <span>Monday - Friday: 9am - 5pm</span>
          <span>Saturday: 10am - 4pm</span>
          <span>Sunday: Closed</span>
        </div>
        <div id="helpfulLinks" className="footerDiv">
          <h3>Helpful links</h3>
          <a href="https://picsartacademy.am/" target="_blank">
            Academy website
          </a>
          <a href="https://www.linkedin.com/company/picsart-academy/">
            LinkedIn page
          </a>
          <a href="https://www.instagram.com/picsart__academy/" target="_blank">
            Instagram page
          </a>
        </div>
      </div>
    </div>
  );
}
