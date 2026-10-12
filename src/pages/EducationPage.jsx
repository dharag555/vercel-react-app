import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function EducationPage() {
  const [activeSection, setActiveSection] = useState('four-cs');

  useEffect(() => {
    const sections = ['four-cs', 'natural-vs-lab', 'certification', 'choosing', 'shapes', 'care'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      history.replaceState(null, '', '#' + id);
    }
  };

  return (
    <main id="main">
      <section className="page-hero">
        <div className="container">
          <nav aria-label="Breadcrumb">
            <ol className="crumbs">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li aria-current="page">Diamond Education</li>
            </ol>
          </nav>
          <h1>
            Learn About <em>Diamonds</em>
          </h1>
          <p className="lead">
            A considered guide to understanding diamonds — so every decision you make feels informed, calm and
            confident.
          </p>
        </div>
      </section>

      <div className="container article">
        <aside className="toc" aria-label="On this page">
          <h2>On this page</h2>
          <ul data-toc>
            <li>
              <a
                href="#four-cs"
                className={activeSection === 'four-cs' ? 'is-active' : ''}
                onClick={(e) => scrollTo(e, 'four-cs')}
              >
                The 4Cs
              </a>
            </li>
            <li>
              <a
                href="#natural-vs-lab"
                className={activeSection === 'natural-vs-lab' ? 'is-active' : ''}
                onClick={(e) => scrollTo(e, 'natural-vs-lab')}
              >
                Natural vs Lab-Grown
              </a>
            </li>
            <li>
              <a
                href="#certification"
                className={activeSection === 'certification' ? 'is-active' : ''}
                onClick={(e) => scrollTo(e, 'certification')}
              >
                Diamond Certification
              </a>
            </li>
            <li>
              <a
                href="#choosing"
                className={activeSection === 'choosing' ? 'is-active' : ''}
                onClick={(e) => scrollTo(e, 'choosing')}
              >
                How to Choose a Diamond
              </a>
            </li>
            <li>
              <a
                href="#shapes"
                className={activeSection === 'shapes' ? 'is-active' : ''}
                onClick={(e) => scrollTo(e, 'shapes')}
              >
                Diamond Shapes
              </a>
            </li>
            <li>
              <a
                href="#care"
                className={activeSection === 'care' ? 'is-active' : ''}
                onClick={(e) => scrollTo(e, 'care')}
              >
                Diamond Care
              </a>
            </li>
          </ul>
        </aside>

        <article className="prose">
          {/* Chapter 1: The 4Cs */}
          <section id="four-cs" aria-labelledby="h-4cs">
            <span className="eyebrow">Chapter I</span>
            <h2 id="h-4cs" style={{ marginTop: '1rem' }}>
              The 4Cs of Diamonds
            </h2>
            <p>
              The 4Cs — cut, colour, clarity and carat — are the universal language used to describe a diamond's
              quality. No single C defines beauty; it is the balance between them that makes a diamond exceptional.
            </p>
            <h3>Cut</h3>
            <p>
              Cut refers to the quality of a diamond's proportions, symmetry and polish. A well-cut diamond reflects
              light internally and returns it through the top as brilliance (white light), fire (flashes of colour) and
              scintillation (sparkle as it moves). Cut has the greatest influence on how lively a diamond looks.
            </p>
            <h3>Colour</h3>
            <p>
              For white diamonds, colour is graded on a scale from D (colourless) to Z (light yellow or brown). D–F are
              colourless, G–J near-colourless. In a yellow or rose gold setting, a near-colourless diamond can look
              beautifully white while offering greater value.
            </p>
            <h3>Clarity</h3>
            <p>
              Clarity grades the size, number and position of inclusions and blemishes, from Flawless (FL) to Included
              (I). Many diamonds graded VS2 or SI1 appear "eye-clean" — free of visible inclusions without
              magnification.
            </p>
            <h3>Carat</h3>
            <p>
              Carat is a measure of weight: one carat equals 0.2 grams. Because larger diamonds are rarer, rarity and value increase
              more than proportionally with weight. A diamond's cut and shape affect how large it appears face-up.
            </p>
            <figure>
              <img
                src="/assets/img/education.webp"
                alt="Loose diamonds in round, pear, marquise, emerald, heart and cushion shapes on grading paper"
                loading="lazy"
                width="1024"
                height="1536"
              />
              <figcaption>Different shapes of similar weight can appear quite different in size.</figcaption>
            </figure>
          </section>

          {/* Chapter 2: Natural vs Lab */}
          <section id="natural-vs-lab" aria-labelledby="h-nvl">
            <span className="eyebrow">Chapter II</span>
            <h2 id="h-nvl" style={{ marginTop: '1rem' }}>
              Natural vs Lab-Grown Diamonds
            </h2>
            <p>
              Natural and laboratory-grown diamonds share the same chemical composition and physical properties. They
              differ in origin: natural diamonds formed deep within the earth over billions of years, while lab-grown
              diamonds are created in controlled environments over a matter of weeks.
            </p>
            <div className="table-scroll">
              <table className="cmp">
                <thead>
                  <tr>
                    <th scope="col" />
                    <th scope="col">Natural</th>
                    <th scope="col">Lab-Grown</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Composition</th>
                    <td>Crystallised carbon</td>
                    <td>Crystallised carbon</td>
                  </tr>
                  <tr>
                    <th scope="row">Origin</th>
                    <td>Formed in the earth over billions of years</td>
                    <td>Grown in a laboratory (HPHT or CVD)</td>
                  </tr>
                  <tr>
                    <th scope="row">Appearance</th>
                    <td colSpan={2}>Visually identical; distinguished only with specialist equipment</td>
                  </tr>
                  <tr>
                    <th scope="row">Rarity</th>
                    <td>Finite and rare</td>
                    <td>Can be produced to demand</td>
                  </tr>

                </tbody>
              </table>
            </div>
            <div className="callout">
              <p>
                At SVK, every diamond is clearly identified as natural or lab-grown. Our specialists are happy to talk
                through which option best suits your priorities.
              </p>
            </div>
          </section>

          {/* Chapter 3: Certification */}
          <section id="certification" aria-labelledby="h-cert">
            <span className="eyebrow">Chapter III</span>
            <h2 id="h-cert" style={{ marginTop: '1rem' }}>
              Diamond Certification
            </h2>
            <p>
              A diamond grading report — often called a certificate — is an independent assessment of a diamond's
              characteristics, issued by a gemological laboratory. It typically records the shape, measurements, carat
              weight, colour, clarity, cut (for round brilliants), polish, symmetry and fluorescence.
            </p>
            <h3>What to check on a report</h3>
            <ul className="dots">
              <li>The laboratory name and report number — most laboratories allow you to verify a report online.</li>
              <li>Whether the diamond is identified as natural or laboratory-grown.</li>
              <li>A laser inscription on the girdle, where present, that matches the report number.</li>
              <li>Measurements and carat weight that correspond to the stone in front of you.</li>
            </ul>
            <p>
              Grading standards can vary between laboratories, so it is worth comparing like with like. Our specialists
              will walk you through any report line by line.
            </p>
          </section>

          {/* Chapter 4: Choosing */}
          <section id="choosing" aria-labelledby="h-choose">
            <span className="eyebrow">Chapter IV</span>
            <h2 id="h-choose" style={{ marginTop: '1rem' }}>
              How to Choose a Diamond
            </h2>
            <ul className="dots">
              <li>
                <strong>Start with shape.</strong> It defines the look of the piece more than any other choice.
              </li>
              <li>
                <strong>Prioritise cut.</strong> An excellent cut makes a diamond appear brighter and often larger.
              </li>
              <li>
                <strong>Find your balance of colour and clarity.</strong> Near-colourless and eye-clean grades can
                offer outstanding value.
              </li>
              <li>
                <strong>Consider the setting.</strong> Metal colour and design influence how white and how large a
                diamond appears.
              </li>
              <li>
                <strong>Decide on natural or lab-grown.</strong> Both are real diamonds; the choice is about origin,
                rarity and budget.
              </li>
              <li>
                <strong>See it for yourself.</strong> Photographs help, but viewing a diamond in person or on video is
                invaluable.
              </li>
            </ul>
          </section>

          {/* Chapter 5: Shapes */}
          <section id="shapes" aria-labelledby="h-shapes">
            <span className="eyebrow">Chapter V</span>
            <h2 id="h-shapes" style={{ marginTop: '1rem' }}>
              Diamond Shapes
            </h2>
            <div className="table-scroll">
              <table className="cmp">
                <thead>
                  <tr>
                    <th scope="col">Shape</th>
                    <th scope="col">Character</th>
                    <th scope="col">Good to know</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Round</th>
                    <td>Classic, maximum brilliance</td>
                    <td>The only shape with a standard cut grade from most laboratories.</td>
                  </tr>
                  <tr>
                    <th scope="row">Oval</th>
                    <td>Elegant, elongating</td>
                    <td>Look for a pleasing length-to-width ratio (around 1.35–1.50).</td>
                  </tr>
                  <tr>
                    <th scope="row">Princess</th>
                    <td>Modern, geometric</td>
                    <td>Protect the pointed corners with a secure setting.</td>
                  </tr>
                  <tr>
                    <th scope="row">Emerald</th>
                    <td>Architectural, serene</td>
                    <td>Step facets reveal clarity — higher clarity grades are often preferred.</td>
                  </tr>
                  <tr>
                    <th scope="row">Pear</th>
                    <td>Graceful, distinctive</td>
                    <td>Symmetry of the shoulders and point matters.</td>
                  </tr>
                  <tr>
                    <th scope="row">Marquise</th>
                    <td>Regal, dramatic</td>
                    <td>Offers one of the largest face-up appearances per carat.</td>
                  </tr>
                  <tr>
                    <th scope="row">Cushion</th>
                    <td>Romantic, soft</td>
                    <td>Available in varied outlines from square to rectangular.</td>
                  </tr>
                  <tr>
                    <th scope="row">Radiant</th>
                    <td>Vibrant, versatile</td>
                    <td>Combines step-cut lines with brilliant-cut sparkle.</td>
                  </tr>
                  <tr>
                    <th scope="row">Heart</th>
                    <td>Symbolic, expressive</td>
                    <td>Best appreciated at 0.70 ct and above for a clear outline.</td>
                  </tr>
                  <tr>
                    <th scope="row">Coffin</th>
                    <td>Avant-garde, geometric, dramatic</td>
                    <td>
                      An edgy hexagonal cut with architectural facets; best set in a custom bezel or protective V-prongs.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p style={{ marginTop: '1.5rem' }}>
              <Link className="link-arrow" to="/#shapes">
                Browse diamonds by shape{' '}
                <svg aria-hidden="true">
                  <use href="#i-arrow" />
                </svg>
              </Link>
            </p>
          </section>

          {/* Chapter 6: Care */}
          <section id="care" aria-labelledby="h-care">
            <span className="eyebrow">Chapter VI</span>
            <h2 id="h-care" style={{ marginTop: '1rem' }}>
              Diamond Care
            </h2>
            <p>
              Diamonds are the hardest natural material, yet everyday life can dull their sparkle and loosen settings over
              time. A few simple habits keep your jewellery brilliant.
            </p>
            <ul className="dots">
              <li>
                Clean gently with warm water, a drop of mild soap and a soft brush; rinse and pat dry with a lint-free
                cloth.
              </li>
              <li>Remove jewellery before exercise, gardening, cleaning or swimming in chlorinated water.</li>
              <li>
                Store each piece separately in a soft pouch — diamonds can scratch other diamonds and metals.
              </li>
              <li>Have claws and settings checked by a jeweller periodically.</li>
            </ul>
            <div className="callout">
              <p>
                Questions about caring for a SVK piece?{' '}
                <Link to="/#contact" style={{ textDecoration: 'underline' }}>
                  Contact our specialists
                </Link>
                .
              </p>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}
