import './Roadmap.css';
import roadmapChip from '../assets/roadmap.webp';

const roadmap = [
  ['1', '01 / Phase', 'Architecture', 'Define the qubit, circuit and performance targets.'],
  ['2', '02 / Phase', 'Prototype', 'Fabricate, package and integrate the first devices.'],
  ['3', '03 / Phase', 'Characterize', 'Measure coherence, fidelity, crosstalk and stability.'],
  ['4', '04 / Phase', 'Scale', 'Improve fabrication yield, interconnects, control architecture and system-level performance.'],
];

export default function Roadmap() {
  return (
    <section id="roadmap" className="roadmap sectionWrap">
      <div className="roadmapCopy">
        <p className="eyebrow">Development Roadmap</p>
        <h2>
          From first principles
          <span>to the first quantum</span>
          <span className="roadmapNoWrap">system-on-chip.</span>
        </h2>
        <p>
          Our focused development programme moves through four connected phases-each designed to
          produce measurable learning and defensible quantum-hardware IP.
        </p>
      </div>

      <div className="roadmapTimeline">
        <div className="roadmapSteps">
          {roadmap.map(([number, phase, title, text], index) => (
            <article key={number} className={index === 0 ? 'active' : ''}>
              <div className="marker">{number}</div>
              <div>
                <p>{phase}</p>
                <h3>{title}</h3>
                <span>{text}</span>
              </div>
            </article>
          ))}
        </div>

        <img src={roadmapChip} alt="Packaged quantum processor" />
      </div>
    </section>
  );
}