import { Link } from 'react-router-dom';
import logoImg from '../assets/Qintell.png';
import './Footer.css';

function Logo({ light = false }) {
  return (
    <Link className={`logo ${light ? 'logoLight' : ''}`} to="/" aria-label="Qintell Quantum home">
      <img src={logoImg} alt="Qintell Quantum" className="logoImg" />
    </Link>
  );
}

function ArrowButton({ children, variant = 'solid' }) {
  return (
    <Link className={`button ${variant}`} to="/contact">
      <span>{children}</span>
      <span aria-hidden="true">↗</span>
    </Link>
  );
}

export default function Footer() {
  return (
    <footer id="contact" className="footer sectionWrap">
      <div className="footerLine"><span /></div>
      <div className="footerBrand">
        <Logo />
        <p>Engineering the Quantum Core.</p>
        <div className="footerSocial" aria-label="Social links">
          <a href="https://x.com/qintellquantum" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X">
            <span>X</span>
          </a>
          <a href="https://www.linkedin.com/company/qintell-quantum/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <span>in</span>
          </a>
        </div>
      </div>
      <div className="footerGroup">
        <h3>Explore</h3>
        <Link to="/#technology">Technology</Link>
        <Link to="/#roadmap">Roadmap</Link>
        <Link to="/#company">Company</Link>
      </div>
      <div className="footerGroup">
        <h3>Connect</h3>
        <a href="mailto: info@qintellquantum.com ">Email</a>
        <a href="#careers">Careers</a>
      </div>
      <div className="footerGroup footerPartners">
        <h3>Partnerships</h3>
        <a className="mail" href="mailto: info@qintellquantum.com "> info@qintellquantum.com </a>
        <p>India · Building for the world</p>
        {/* <ArrowButton>Subscribe</ArrowButton> */}
      </div>
      <div className="footerLegal">
        <span>© 2026 Qintell Advanced Systems Private Limited</span>
        <span>Privacy</span>
        <span>Terms</span>
      </div>
    </footer>
  );
}