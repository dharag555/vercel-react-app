/* SVK — illustrative diamond inventory.
   Replace with SVK's verified stock, pricing and grading report details before launch. */

export const SHAPES = {
  Round: { ratio: 1.0, depth: 61.8, table: 57, blurb: 'The most brilliant of all cuts, engineered for maximum light return.' },
  Oval: { ratio: 1.4, depth: 62.4, table: 58, blurb: 'Elongated elegance with brilliance that flatters the hand.' },
  Princess: { ratio: 1.0, depth: 70.2, table: 68, blurb: 'Crisp square lines with a modern, faceted sparkle.' },
  Emerald: { ratio: 1.42, depth: 66.1, table: 64, blurb: 'Step-cut clarity and a hall-of-mirrors glow.' },
  Pear: { ratio: 1.55, depth: 61.9, table: 58, blurb: 'A graceful teardrop that balances round and marquise.' },
  Marquise: { ratio: 2.0, depth: 60.8, table: 57, blurb: 'Regal and elongated, with the largest visual spread.' },
  Cushion: { ratio: 1.05, depth: 64.3, table: 61, blurb: 'Soft pillowed corners and a romantic, vintage fire.' },
  Radiant: { ratio: 1.25, depth: 65.8, table: 63, blurb: 'The outline of an emerald with the fire of a brilliant.' },
  Heart: { ratio: 0.98, depth: 60.9, table: 58, blurb: 'The enduring symbol of love, cut with precision.' },
  Coffin: { ratio: 1.65, depth: 64.2, table: 62, blurb: 'An avant-garde geometric silhouette with architectural lines and bold individuality.' },
  'Half Moon': { ratio: 2.0, depth: 55.4, table: 60, blurb: 'A semi-circular silhouette with one flat edge and a graceful curved arc.' },
  'Trillion Curved': { ratio: 1.02, depth: 42.5, table: 61, blurb: 'A brilliant triangular outline softened with convex curved sides.' },
  Calf: { ratio: 1.15, depth: 63.8, table: 64, blurb: 'A five-sided architectural cut tapering into a crisp modern point.' },
  Seminavette: { ratio: 1.85, depth: 61.2, table: 59, blurb: 'A hybrid cut blending pointed marquise elegance with a softened base.' },
  Epaulette: { ratio: 1.25, depth: 62.0, table: 65, blurb: 'A regal five-sided step cut with stepped shoulders and sharp geometry.' },
  Hexagon: { ratio: 1.15, depth: 63.5, table: 62, blurb: 'A striking six-sided geometric silhouette with clean symmetry.' },
  Octagon: { ratio: 1.0, depth: 64.0, table: 63, blurb: 'An eight-sided faceted marvel radiating structured brilliance.' },
  Triangle: { ratio: 1.0, depth: 52.0, table: 59, blurb: 'Crisp triangular lines with sharp edges and vibrant fire.' },
  Kite: { ratio: 1.6, depth: 62.5, table: 61, blurb: 'A four-sided elongated diamond cut inspired by soaring geometric lines.' },
  Baguette: { ratio: 2.2, depth: 65.0, table: 66, blurb: 'A timeless rectangular step-cut featuring clean parallel facets.' },
  'Tapered Baguette': { ratio: 2.0, depth: 64.5, table: 65, blurb: 'A classic trapezoidal step-cut narrowing gracefully from top to bottom.' }
};

export const SHAPE_NAMES = Object.keys(SHAPES);

export function getShapeSlug(shape) {
  return shape.toLowerCase().replace(/\s+/g, '-');
}

const RAW = [
  ['DM-R101', 'Round', 1.02, 'Excellent', 'E', 'VVS2', 'GIA', 'Natural', 742000, 'None', 'Excellent', 'Excellent'],
  ['DM-R102', 'Round', 1.51, 'Excellent', 'G', 'VS1', 'GIA', 'Natural', 1385000, 'Faint', 'Excellent', 'Excellent'],
  ['DM-R103', 'Round', 2.03, 'Ideal', 'F', 'VS1', 'IGI', 'Lab-Grown', 214000, 'None', 'Excellent', 'Excellent'],
  ['DM-R104', 'Round', 0.72, 'Very Good', 'H', 'SI1', 'IGI', 'Natural', 262000, 'None', 'Very Good', 'Excellent'],
  ['DM-O201', 'Oval', 1.21, 'Excellent', 'F', 'VS2', 'GIA', 'Natural', 812000, 'None', 'Excellent', 'Very Good'],
  ['DM-O202', 'Oval', 2.54, 'Ideal', 'E', 'VVS2', 'IGI', 'Lab-Grown', 268000, 'None', 'Excellent', 'Excellent'],
  ['DM-O203', 'Oval', 0.9, 'Very Good', 'G', 'SI1', 'IGI', 'Natural', 368000, 'Faint', 'Very Good', 'Very Good'],
  ['DM-P301', 'Princess', 1.05, 'Excellent', 'G', 'VS1', 'GIA', 'Natural', 534000, 'None', 'Excellent', 'Excellent'],
  ['DM-P302', 'Princess', 1.8, 'Ideal', 'F', 'VVS1', 'IGI', 'Lab-Grown', 176000, 'None', 'Excellent', 'Excellent'],
  ['DM-E401', 'Emerald', 1.52, 'Excellent', 'D', 'VVS1', 'GIA', 'Natural', 1690000, 'None', 'Excellent', 'Excellent'],
  ['DM-E402', 'Emerald', 3.01, 'Excellent', 'F', 'VS1', 'IGI', 'Lab-Grown', 318000, 'None', 'Excellent', 'Very Good'],
  ['DM-E403', 'Emerald', 1.01, 'Very Good', 'H', 'VS2', 'HRD', 'Natural', 418000, 'Faint', 'Very Good', 'Very Good'],
  ['DM-PR501', 'Pear', 1.11, 'Excellent', 'E', 'VS1', 'GIA', 'Natural', 702000, 'None', 'Excellent', 'Very Good'],
  ['DM-PR502', 'Pear', 2.02, 'Ideal', 'D', 'VVS2', 'IGI', 'Lab-Grown', 236000, 'None', 'Excellent', 'Excellent'],
  ['DM-M601', 'Marquise', 1.0, 'Excellent', 'F', 'VS2', 'GIA', 'Natural', 498000, 'None', 'Excellent', 'Excellent'],
  ['DM-M602', 'Marquise', 1.72, 'Very Good', 'G', 'VS1', 'IGI', 'Lab-Grown', 149000, 'None', 'Very Good', 'Very Good'],
  ['DM-C701', 'Cushion', 1.32, 'Excellent', 'G', 'VS1', 'GIA', 'Natural', 786000, 'Faint', 'Excellent', 'Very Good'],
  ['DM-C702', 'Cushion', 2.21, 'Ideal', 'E', 'VS1', 'IGI', 'Lab-Grown', 204000, 'None', 'Excellent', 'Excellent'],
  ['DM-C703', 'Cushion', 3.05, 'Excellent', 'D', 'IF', 'GIA', 'Natural', 5850000, 'None', 'Excellent', 'Excellent'],
  ['DM-RA801', 'Radiant', 1.41, 'Excellent', 'F', 'VS1', 'GIA', 'Natural', 864000, 'None', 'Excellent', 'Excellent'],
  ['DM-RA802', 'Radiant', 2.6, 'Ideal', 'E', 'VVS2', 'IGI', 'Lab-Grown', 259000, 'None', 'Excellent', 'Excellent'],
  ['DM-H901', 'Heart', 1.01, 'Excellent', 'F', 'VS2', 'GIA', 'Natural', 566000, 'None', 'Excellent', 'Very Good'],
  ['DM-H902', 'Heart', 1.5, 'Very Good', 'G', 'VS1', 'IGI', 'Lab-Grown', 138000, 'None', 'Very Good', 'Very Good'],
  ['DM-CF1001', 'Coffin', 1.54, 'Excellent', 'E', 'VVS1', 'GIA', 'Natural', 1420000, 'None', 'Excellent', 'Excellent'],
  ['DM-CF1002', 'Coffin', 2.15, 'Ideal', 'D', 'VS1', 'IGI', 'Lab-Grown', 275000, 'None', 'Excellent', 'Excellent'],
  ['DM-R105', 'Round', 4.02, 'Ideal', 'D', 'FL', 'GIA', 'Natural', 12400000, 'None', 'Excellent', 'Excellent'],
  ['DM-HM1101', 'Half Moon', 1.05, 'Excellent', 'E', 'VS1', 'GIA', 'Natural', 680000, 'None', 'Excellent', 'Very Good'],
  ['DM-TC1201', 'Trillion Curved', 1.30, 'Ideal', 'F', 'VVS2', 'IGI', 'Lab-Grown', 185000, 'None', 'Excellent', 'Excellent'],
  ['DM-CF1301', 'Calf', 1.15, 'Excellent', 'D', 'VS1', 'GIA', 'Natural', 820000, 'None', 'Excellent', 'Excellent'],
  ['DM-SN1401', 'Seminavette', 1.42, 'Excellent', 'F', 'VVS1', 'GIA', 'Natural', 960000, 'Faint', 'Excellent', 'Excellent'],
  ['DM-EP1501', 'Epaulette', 1.25, 'Excellent', 'E', 'VS2', 'IGI', 'Lab-Grown', 195000, 'None', 'Very Good', 'Excellent'],
  ['DM-HX1601', 'Hexagon', 1.60, 'Ideal', 'D', 'VVS2', 'GIA', 'Natural', 1150000, 'None', 'Excellent', 'Excellent'],
  ['DM-OC1701', 'Octagon', 1.75, 'Ideal', 'E', 'VS1', 'GIA', 'Natural', 1280000, 'None', 'Excellent', 'Excellent'],
  ['DM-TR1801', 'Triangle', 1.10, 'Excellent', 'G', 'VS1', 'IGI', 'Lab-Grown', 145000, 'None', 'Excellent', 'Very Good'],
  ['DM-KT1901', 'Kite', 1.35, 'Excellent', 'E', 'VVS1', 'GIA', 'Natural', 890000, 'None', 'Excellent', 'Excellent'],
  ['DM-BG2001', 'Baguette', 0.95, 'Excellent', 'F', 'VVS2', 'GIA', 'Natural', 620000, 'None', 'Excellent', 'Excellent'],
  ['DM-TB2101', 'Tapered Baguette', 0.85, 'Excellent', 'D', 'VS1', 'GIA', 'Natural', 540000, 'None', 'Excellent', 'Excellent']
];

function measurements(shape, carat) {
  const s = SHAPES[shape];
  const base = 6.45 * Math.cbrt(carat);
  const len = base * Math.sqrt(s.ratio) * (shape === 'Round' ? 1 : 0.98);
  const wid = len / s.ratio;
  const dep = Math.min(len, wid) * s.depth / 100;
  return shape === 'Round'
    ? `${len.toFixed(2)} – ${(len * 1.006).toFixed(2)} × ${dep.toFixed(2)} mm`
    : `${len.toFixed(2)} × ${wid.toFixed(2)} × ${dep.toFixed(2)} mm`;
}

const FEATURED = ['DM-R102', 'DM-O201', 'DM-CF1001', 'DM-E401', 'DM-C703', 'DM-PR501', 'DM-RA801', 'DM-R103', 'DM-CF1002', 'DM-HX1601', 'DM-HM1101'];

export const DIAMONDS = RAW.map((r, i) => {
  const [id, shape, carat, cut, color, clarity, cert, origin, price, fluo, polish, sym] = r;
  const slug = getShapeSlug(shape);
  const fi = FEATURED.indexOf(id);
  return {
    id, shape, carat, cut, color, clarity, cert, origin, price,
    fluorescence: fluo, polish, symmetry: sym,
    depth: SHAPES[shape].depth, table: SHAPES[shape].table,
    measurements: measurements(shape, carat),
    ratio: SHAPES[shape].ratio.toFixed(2),
    image: `/assets/img/s-${slug}.webp`,
    thumb: `/assets/img/s-${slug}-sm.webp`,
    featured: fi === -1 ? 100 + i : fi,
    title: `${carat.toFixed(2)} ct ${shape} ${origin === 'Lab-Grown' ? 'Lab-Grown ' : ''}Diamond`
  };
});

export const ORDER = {
  cut: ['Ideal', 'Excellent', 'Very Good', 'Good'],
  color: ['D', 'E', 'F', 'G', 'H', 'I', 'J'],
  clarity: ['FL', 'IF', 'VVS1', 'VVS2', 'VS1', 'VS2', 'SI1', 'SI2'],
  cert: ['GIA', 'IGI', 'HRD']
};

const fmt = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
export function formatPrice(n) { return fmt.format(n); }
export function formatShort(n) {
  if (n >= 10000000) return '₹' + (n / 10000000).toFixed(n % 10000000 ? 1 : 0) + ' Cr';
  if (n >= 100000) return '₹' + (n / 100000).toFixed(n % 100000 ? 1 : 0) + ' L';
  return '₹' + Math.round(n / 1000) + 'K';
}

export const WHATSAPP = '917718880577';
