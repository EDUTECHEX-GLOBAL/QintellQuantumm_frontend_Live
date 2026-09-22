import './Purpose.css';

import purposeFabrication from '../assets/Fabrication.webp';
import purposeCryo from '../assets/Cryogenics.webp';

export default function Purpose() {
  return (
    <section id="vision" className="purpose sectionWrap">

      {/* =====================================================
          INTRO TEXT + RIGHT-SIDE ARCHITECTURAL GRID
          Wrapped together so the grid's height always stretches
          to match the intro text's height, keeping the grid's
          own bottom line perfectly merged with the section
          divider line below it, at any screen size or content
          length.
          ===================================================== */}

      <div className="purposeTop">

        <div className="purposeIntro">

          <p className="eyebrow">
            Our purpose
          </p>

          <h2>
            Turning fragile quantum effects
            <span>
              into scalable computing systems.
            </span>
          </h2>

          <p className="purposeIntroText">
            We are building foundational quantum systems-on-chip that translates fundamental quantum physics into engineered systems - designed for precise control, repeatable performance and a clear path to scale.
          </p>

        </div>

        <div className="purposeCircuit" aria-hidden="true">

          {/* Top-left large cell */}
          <div className="circuitCell">
            <span className="circuitDots" />
          </div>

          {/* Top-right large cell */}
          <div className="circuitCell">
            <span className="circuitDots" />
          </div>

          {/* Middle-left large cell */}
          <div className="circuitCell">
            <span className="circuitDots" />
          </div>

          {/* Middle-right large cell */}
          <div className="circuitCell">
            <span className="circuitDots" />
          </div>

          {/* Blue engineering markers */}
          <span className="circuitCorner cornerTL" />
          <span className="circuitCorner cornerTM" />
          <span className="circuitCorner cornerTR" />

          <span className="circuitCorner cornerML" />
          <span className="circuitCorner cornerMR" />

          <span className="circuitCorner cornerBL" />
          <span className="circuitCorner cornerBM" />
          <span className="circuitCorner cornerBR" />

        </div>

      </div>


      {/* =====================================================
          ENGINEERING AT EVERY SCALE
          ===================================================== */}

      <div className="purposeScale">

        <p className="eyebrow">
          Engineering at every scale
        </p>

        <h3>
          From nanometres
          <span>
            to millikelvin..
          </span>
        </h3>

        <p className="purposeScaleText">
          A quantum system-on-chip is a carefully engineered environment in which materials, device geometry, packaging, cryogenics and control must work together with exceptional precision.
        </p>

      </div>


      {/* =====================================================
          PURPOSE CARDS
          ===================================================== */}

      <div className="purposeCards">

        {/* ===================================================
            CARD 01
            =================================================== */}

        <article className="purposeCard">

          <div className="purposeCardInfo">

            <div className="purposeNumber">
              <strong>01</strong>
              {/* <span>/</span> */}
            </div>

            <div className="purposeCardText">
              <h4>
                Fabrication
              </h4>

              <p>
                Precision at the device layer
              </p>
            </div>

          </div>

          <div className="purposeImage">
            <img
              src={purposeFabrication}
              alt="Fabricated quantum chip close-up"
            />
          </div>

        </article>


        {/* ===================================================
            CARD 02
            =================================================== */}

        <article className="purposeCard">

          <div className="purposeCardInfo">

            <div className="purposeNumber">
              <strong>02</strong>
              {/* <span>/</span> */}
            </div>

            <div className="purposeCardText">
              <h4>
                Cryogenics
              </h4>

              <p>
                Control at the edge of absolute zero
              </p>
            </div>

          </div>

          <div className="purposeImage">
            <img
              src={purposeCryo}
              alt="Cryogenic quantum hardware wiring"
            />
          </div>

        </article>

      </div>

    </section>
  );
}