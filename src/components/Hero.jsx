import './Hero.css';
import heroProcessor from '../assets/Homepage.webp';

export default function Hero() {
  return (
    <section className="hero sectionWrap">
      <div className="heroCopy">
        <p className="eyebrow">QUANTUM SYSTEMS-ON-CHIP</p>
        <h1>
          <span className="heroOutline">Engineering the</span>
          <span className="heroBlue">quantum core.</span>
        </h1>
        <p className="lead">
          Qintell is building scalable quantum systems-on-chip from the materials level upward-uniting
          qubit design, precision fabrication, cryogenic systems and intelligent control.
        </p>
        <div className="heroActions">
          <a className="button solid" href="/contact">Explore our Technology</a>
          <a className="button outline" href="/contact">Start a Conversation</a>
        </div>
      </div>
      <div className="heroImage">
        <img
          src={heroProcessor}
          width="1749"
          height="900"
          alt="Quantum processor inside a precision metal package"
        />
      </div>
    </section>
  );
}