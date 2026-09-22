import './Stack.css';
import stackQubit from '../assets/QS_1.webp';
import stackFab from '../assets/QS_2.webp';
import stackCryo from '../assets/QS_3.webp';
import stackSoftware from '../assets/QS_4.webp';

const stackItems = [
  {
    id: '01',
    title: 'Qubit architecture',
    text: 'Superconducting circuits engineered for coherence, control and a path to scale.',
    image: stackQubit,
  },
  {
    id: '02',
    title: 'Precision fabrication',
    text: 'Low-loss materials, Josephson junctions and repeatable device processes.',
    image: stackFab,
  },
  {
    id: '03',
    title: 'Cryogenic integration',
    text: 'Microwave packaging, readout and control designed as one coherent system.',
    image: stackCryo,
  },
  {
    id: '04',
    title: 'Hardware-native software',
    text: 'Calibration, firmware and compilers built around the physics of the processor.',
    image: stackSoftware,
  },
];

export default function Stack() {
  return (
    <section id="platform" className="stack sectionWrap">
      <svg
        className="technicalDial"
        viewBox="0 0 380 260"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <pattern
            id="stackGrid"
            width="46"
            height="46"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 46 0 L 0 0 0 46"
              fill="none"
              stroke="var(--line)"
              strokeWidth="1"
            />
          </pattern>
        </defs>

        <rect
          x="0"
          y="0"
          width="380"
          height="260"
          fill="url(#stackGrid)"
        />

        <circle
          cx="255"
          cy="120"
          r="108"
          fill="none"
          stroke="var(--line)"
          strokeWidth="1.4"
        />

        <circle
          cx="255"
          cy="120"
          r="60"
          fill="none"
          stroke="var(--line)"
          strokeWidth="1.4"
        />

        <circle
          cx="255"
          cy="120"
          r="5"
          fill="var(--blue)"
          opacity="0.55"
        />

        <line
          x1="255"
          y1="120"
          x2="150"
          y2="46"
          stroke="var(--line)"
          strokeWidth="1.2"
        />

        <line
          x1="255"
          y1="120"
          x2="340"
          y2="18"
          stroke="var(--line)"
          strokeWidth="1.2"
        />

        <line
          x1="255"
          y1="120"
          x2="366"
          y2="150"
          stroke="var(--line)"
          strokeWidth="1.2"
        />

        <circle
          cx="150"
          cy="46"
          r="3.5"
          fill="var(--blue)"
          opacity="0.55"
        />

        <circle
          cx="340"
          cy="18"
          r="3"
          fill="#a7bad0"
        />

        <circle
          cx="366"
          cy="150"
          r="3"
          fill="#a7bad0"
        />
      </svg>

      <p className="eyebrow">The Qintell Stack</p>

      <h2>Built from the physics up.</h2>

      <div className="stackIntro">
        <p>
          Quantum performance depends on every layer working together. We engineer the qubits, fabrication processes, packaging, cryogenic environment, control electronics and software as one unified platform.
        </p>

        <p>
          By designing across the complete hardware stack, we can reduce system complexity, improve stability and create tighter integration between quantum devices and the technologies that operate them.
        </p>

        <p>
          This systems-level approach provides a clear pathway from fundamental physics to reliable, scalable quantum systems-on-chip.
        </p>
      </div>

      <div className="stackCards">
        {stackItems.map((item) => (
          <article key={item.id} className="stackCard">
            <span className="stackNumber">{item.id}</span>

            <img src={item.image} alt="" />

            <h3>{item.title}</h3>

            <p>{item.text}</p>

            <a
              href="#contact"
              className="stackArrow"
              aria-label={`Learn more about ${item.title}`}
            >
              ↗
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}