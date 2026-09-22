import './NextEra.css';
import nextEraProcessor from '../assets/Mainera.webp';

function ArrowButton({ children, variant = 'solid' }) {
  return (
    <a className={`button ${variant}`} href="/contact">
      <span>{children}</span>
      <span aria-hidden="true">↗</span>
    </a>
  );
}

export default function NextEra() {
  return (
    <section id="application" className="nextEra sectionWrap">
      <div className="nextCopy">
        <p className="eyebrow">The next era of computing</p>
        <h2>
          Beyond the limits of <span>classical computing.</span>
        </h2>
        <p>
          Quantum systems-on-chip could transform materials discovery, chemistry, energy systems and complex scientific simulation. Qintell is building the foundational hardware needed to turn that potential into practical computing capability.
        </p>
        <ArrowButton>BUILD THE FUTURE WITH US</ArrowButton>
      </div>
      <div className="nextImage">
        <img src={nextEraProcessor} alt="Quantum processor package in a circular frame" />
      </div>
    </section>
  );
}