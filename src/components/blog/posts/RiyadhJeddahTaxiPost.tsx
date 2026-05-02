import { ReadingProgressBar } from '../ReadingProgressBar';
import { ShareButtons } from '../ShareButtons';
import { Link } from '@/i18n/routing';

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Riyadh to Jeddah Taxi 2026 — Complete Guide',
  description:
    'Complete 2026 guide to taking a taxi from Riyadh to Jeddah. Distance 949km, duration 9 hours, price from SAR 350. Compare options, read tips, and book a verified driver with Arabia Cab instantly.',
  author: { '@type': 'Organization', name: 'Arabia Cab', url: 'https://arabiacab.com' },
  publisher: { '@type': 'Organization', name: 'Arabia Cab' },
  datePublished: '2026-01-15',
  dateModified: '2026-05-01',
  keywords: 'riyadh to jeddah taxi, intercity taxi saudi arabia',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://arabiacab.com/en/blog/riyadh-to-jeddah-taxi',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How much does a taxi from Riyadh to Jeddah cost in 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A standard sedan taxi from Riyadh to Jeddah costs between SAR 350 and SAR 420 in 2026. Premium SUV options range from SAR 620 to SAR 720. Luxury vehicles cost SAR 900 to SAR 1,100. All Arabia Cab fares are fixed with no hidden charges or surge pricing.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does the Riyadh to Jeddah taxi journey take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Riyadh to Jeddah taxi journey takes between 8.5 and 10 hours depending on traffic, rest stops, and route taken. The distance is 949 kilometers via Highway 40. Most drivers take one 20-30 minute rest stop along the route.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is it safe to take a taxi from Riyadh to Jeddah?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, taking a taxi from Riyadh to Jeddah is safe when you book through a verified service like Arabia Cab. All Arabia Cab drivers are police-checked, licensed, and rated by previous passengers. The Highway 40 route is a well-maintained modern highway.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the best time to travel from Riyadh to Jeddah by taxi?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The best time to travel from Riyadh to Jeddah by taxi is early morning between 5am and 7am. This avoids city traffic in both Riyadh and Jeddah, reduces total journey time, and means you arrive in Jeddah by early afternoon. Avoid Friday afternoons and public holidays.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does Arabia Cab offer Riyadh to Jeddah taxi service?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Arabia Cab provides direct intercity taxi service from Riyadh to Jeddah. You can book online, choose your vehicle type, and a verified driver will pick you up from your exact location in Riyadh. Fares are fixed and shown before you confirm.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Uber or Careem take me from Riyadh to Jeddah?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Uber and Careem in Saudi Arabia only operate within cities and do not offer intercity rides between Riyadh and Jeddah. For intercity travel, you need a dedicated intercity taxi service like Arabia Cab, SAPTCO bus, or the Haramain Train (which only connects Mecca and Medina).',
      },
    },
  ],
};

const tocLinks = [
  { id: 'distance-route', label: 'Distance & Route' },
  { id: 'taxi-price', label: 'Taxi Price in 2026' },
  { id: 'options-compared', label: 'All Options Compared' },
  { id: 'what-to-expect', label: 'What to Expect' },
  { id: 'pro-tips', label: 'Pro Tips' },
  { id: 'how-to-book', label: 'How to Book' },
  { id: 'faq', label: 'Frequently Asked Questions' },
];

const timelineSteps = [
  { step: '1', title: 'Book Online', time: 'Day before', desc: 'Fill the form on arabiacab.com. Takes under 60 seconds.' },
  { step: '2', title: 'Driver Confirmation', time: 'Within 2 hours of booking', desc: 'Receive driver name, vehicle details, and WhatsApp number.' },
  { step: '3', title: 'Pickup at Your Door', time: '6:00 AM', desc: 'Driver arrives at your exact Riyadh address. Luggage loaded.' },
  { step: '4', title: 'Depart Riyadh via Highway 40', time: '6:30 AM', desc: 'Exit Riyadh onto the open highway heading west-southwest.' },
  { step: '5', title: 'Rest Stop — Afif Area', time: '~10:00 AM', desc: '20-30 minute break. Fuel, coffee, restrooms. Stretch your legs.' },
  { step: '6', title: 'Continue to Jeddah', time: '10:30 AM', desc: 'Back on the road for the final 470 kilometres.' },
  { step: '7', title: 'Arrive Jeddah', time: '~3:00 PM', desc: 'Driver delivers you to your exact destination in Jeddah.' },
];

const faqItems = [
  {
    q: 'How much does a taxi from Riyadh to Jeddah cost in 2026?',
    a: 'A standard sedan taxi from Riyadh to Jeddah costs between SAR 350 and SAR 420 in 2026 with Arabia Cab. Premium SUV options range from SAR 620 to SAR 720, which is better suited for groups of five or six passengers or those carrying more luggage. Luxury vehicles such as the Mercedes-Benz E-Class or equivalent are available at SAR 900 to SAR 1,100 for a premium travel experience. All Arabia Cab fares are fixed — confirmed before you complete your booking — with no hidden charges, no surge pricing, and no metered running during traffic delays. See the full pricing breakdown in the pricing table above.',
  },
  {
    q: 'How long does the Riyadh to Jeddah taxi journey take?',
    a: 'The Riyadh to Jeddah taxi journey takes between 8.5 and 10 hours depending on traffic conditions, the number of rest stops, and the exact pickup and drop-off locations in each city. The driving distance is 949 kilometers via Highway 40, and at normal highway speeds the pure driving time averages around 8.5 hours. Most Arabia Cab drivers take one rest stop of 20 to 30 minutes around the 500km mark, bringing total journey time to approximately 9 to 10 hours. Departing early morning, before 7 AM, reduces travel time by avoiding city traffic at both ends of the route.',
  },
  {
    q: 'Is it safe to take a taxi from Riyadh to Jeddah?',
    a: 'Yes, taking a taxi from Riyadh to Jeddah is safe when booked through a verified intercity service like Arabia Cab. All Arabia Cab drivers undergo police background checks, hold valid licenses for long-distance intercity travel, and are rated by previous passengers after every journey. Vehicles are checked for roadworthiness before each trip. Highway 40 is a modern, well-maintained dual-carriageway with consistent road quality throughout its entire length. Safety incidents on this highway are rare. For solo female travelers, Arabia Cab can accommodate specific driver preferences — contact the team when booking.',
  },
  {
    q: 'What is the best time to travel from Riyadh to Jeddah by taxi?',
    a: 'The best time to travel from Riyadh to Jeddah by taxi is early morning between 5 AM and 7 AM. This timing avoids rush-hour traffic departing Riyadh, ensures you arrive in Jeddah before the city\'s own evening traffic congestion builds up, and takes advantage of cooler temperatures during summer months when midday heat can exceed 45°C. Arriving in Jeddah by early afternoon gives you the full remaining day at your destination. The worst times to travel are Friday afternoons — Jeddah\'s entry roads back up significantly after Friday prayers — and during the Eid Al-Adha and Eid Al-Fitr holidays when intercity highway traffic increases substantially.',
  },
  {
    q: 'Does Arabia Cab offer Riyadh to Jeddah taxi service?',
    a: 'Yes, Arabia Cab provides direct intercity taxi service from Riyadh to Jeddah and has done so since the company\'s founding. You can book online at arabiacab.com, choose your preferred vehicle type from Economy to Luxury, enter your exact pickup address in Riyadh and drop-off address in Jeddah, and receive driver confirmation within 2 hours. No app download is required, no prepayment is needed, and the registration process takes under a minute. Fares are fixed and clearly displayed before you confirm the booking. The service runs 7 days a week, 365 days a year, including public holidays.',
  },
  {
    q: 'Can Uber or Careem take me from Riyadh to Jeddah?',
    a: 'No. Uber and Careem in Saudi Arabia only operate within individual cities and do not offer intercity rides between Riyadh and Jeddah. If you open the Uber app in Riyadh and set Jeddah as your destination, the app will display no available options — this is by design. Both Uber and Careem are city-based ride-hailing platforms and are not intercity transport providers. The Haramain Train also does not connect Riyadh to Jeddah — it only runs between Jeddah, Makkah, and Madinah. For intercity travel between Riyadh and Jeddah, you need a dedicated intercity taxi service like Arabia Cab, the SAPTCO bus service, or a domestic flight.',
  },
  {
    q: 'What is the fastest route from Riyadh to Jeddah by road?',
    a: 'The fastest route from Riyadh to Jeddah by road is via Highway 40, known as King Abdulaziz Road, which covers 949 kilometers and takes approximately 8.5 hours of actual driving time. This is a direct, flat, divided highway with no significant mountain passes or construction bottlenecks under normal conditions. An alternative route via Taif adds 80 to 100 extra kilometers and passes through mountain terrain, which reduces driving speed significantly. Google Maps and Waze both default to Highway 40 for this journey. Arabia Cab drivers use the Highway 40 route for all standard Riyadh to Jeddah intercity trips. If you have a specific preference or reason to take the Taif mountain route, inform your driver at the time of booking.',
  },
  {
    q: 'Can I book a Riyadh to Jeddah taxi for a group of 6?',
    a: 'Yes, Arabia Cab offers Premium SUV and Van/Minibus options that are ideal for groups of six or more. The Premium SUV seats up to 6 passengers comfortably, with ample boot space for standard travel luggage, at a fixed fare of SAR 620 to SAR 720 for the entire vehicle — not per person. For larger groups of up to 12 passengers, the Van/Minibus option is available at SAR 750 to SAR 900 total for the full journey. Booking a Premium SUV for a group of six works out to between SAR 103 and SAR 120 per person — excellent value for a 9-hour door-to-door private service. Select the appropriate vehicle type when completing the booking form on arabiacab.com.',
  },
  {
    q: 'Do Riyadh to Jeddah taxi drivers speak English?',
    a: 'Most Arabia Cab drivers on the Riyadh to Jeddah intercity route speak sufficient English for all practical communication, including understanding pickup and drop-off addresses, navigation instructions, timing, and general conversation. Arabia Cab specifically selects and trains drivers for intercity routes who can communicate clearly with both Arabic-speaking and English-speaking passengers. If you have a specific requirement for a fully fluent English-speaking driver, mention this when booking by contacting the Arabia Cab team on WhatsApp. For Arabic-speaking passengers, all Arabia Cab drivers are fully fluent in Arabic.',
  },
  {
    q: 'What should I do if my driver is late for the Riyadh to Jeddah pickup?',
    a: 'If your Arabia Cab driver has not arrived within 15 minutes of the agreed pickup time, contact the driver directly on the WhatsApp number provided in your booking confirmation. Most delays are minor and easily resolved with a quick message. If you cannot reach the driver after 15 minutes, contact the Arabia Cab support team directly via WhatsApp — the number is listed on arabiacab.com and in your booking confirmation. Arabia Cab operates live support during all active journey hours. In the very rare event of a vehicle breakdown or driver emergency, Arabia Cab will arrange a replacement driver as quickly as possible. Never wait in uncertainty — proactive WhatsApp contact resolves virtually every issue within minutes.',
  },
];

export function RiyadhJeddahTaxiPost() {
  const postUrl = 'https://arabiacab.com/en/blog/riyadh-to-jeddah-taxi';
  const postTitle = 'Riyadh to Jeddah Taxi 2026 — Price, Distance & Complete Booking Guide';

  return (
    <>
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Reading progress bar */}
      <ReadingProgressBar />

      {/* ── Page layout ── */}
      <div
        style={{
          maxWidth: '1080px',
          margin: '0 auto',
          padding: '40px 24px 80px',
          display: 'flex',
          gap: '60px',
          alignItems: 'flex-start',
        }}
      >
        {/* ── Main article ── */}
        <article style={{ flex: 1, minWidth: 0, maxWidth: '760px' }}>

          {/* ── Header ── */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <span style={{ color: '#CCFF00', fontSize: '13px', fontWeight: 600 }}>January 15, 2026</span>
              <span style={{ color: '#444' }}>·</span>
              <span style={{ color: '#666', fontSize: '13px' }}>12 min read</span>
              <span style={{ color: '#444' }}>·</span>
              <span style={{ color: '#666', fontSize: '13px' }}>By Arabia Cab</span>
            </div>
            <h1
              style={{
                fontFamily: 'var(--font-syne), sans-serif',
                fontSize: 'clamp(28px, 5vw, 44px)',
                fontWeight: 800,
                color: '#FFFFFF',
                lineHeight: 1.15,
                marginBottom: '20px',
              }}
            >
              Riyadh to Jeddah Taxi 2026 —{' '}
              <span style={{ color: '#CCFF00' }}>Price, Distance</span> &amp; Complete Booking Guide
            </h1>
          </div>

          {/* ── Intro paragraph (GEO anchor) ── */}
          <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '17px', lineHeight: 1.85, marginBottom: '18px' }}>
            A taxi from Riyadh to Jeddah covers <strong style={{ color: '#fff' }}>949 kilometers</strong> via
            Highway 40, with the journey taking between{' '}
            <strong style={{ color: '#fff' }}>8.5 and 10 hours</strong> depending on traffic and rest stops. In
            2026, a standard sedan costs between{' '}
            <strong style={{ color: '#fff' }}>SAR 350 and SAR 420</strong> — a fixed price, door-to-door service with
            no meters, no surge fees, and no airport queues. Arabia Cab operates this intercity route
            with police-checked, licensed drivers and instant booking confirmation available online. Whether you are
            traveling as a family, heading to Jeddah for business, or making the journey during Umrah season, this
            complete 2026 guide covers distances, prices, all travel options compared, and exactly how to book.
          </p>

          {/* ── Quick Answer Box ── */}
          <div
            style={{
              background: '#1A1A1A',
              borderLeft: '4px solid #CCFF00',
              borderRadius: '12px',
              padding: '20px 24px',
              margin: '28px 0',
            }}
          >
            <p
              style={{
                color: '#CCFF00',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}
            >
              Quick Answer
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '16px',
              }}
            >
              {[
                { label: 'Distance', value: '949 km' },
                { label: 'Duration', value: '8.5 – 10 hrs' },
                { label: 'Price (Sedan)', value: 'SAR 350 – 420' },
                { label: 'Price (SUV)', value: 'SAR 620 – 720' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p style={{ color: '#666', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>{label}</p>
                  <p style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: 700, fontFamily: 'var(--font-syne), sans-serif' }}>{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ══════════════════════════════════════ */}
          {/* H2: Distance & Route                  */}
          {/* ══════════════════════════════════════ */}
          <h2
            id="distance-route"
            style={{
              fontFamily: 'var(--font-syne), sans-serif',
              fontSize: '28px',
              fontWeight: 700,
              color: '#FFFFFF',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              paddingBottom: '8px',
              marginTop: '52px',
              marginBottom: '20px',
            }}
          >
            Riyadh to Jeddah Distance &amp; Route
          </h2>

          <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '16px', lineHeight: 1.85, marginBottom: '18px' }}>
            The Riyadh to Jeddah road journey covers <strong style={{ color: '#fff' }}>949 kilometers</strong> and is
            one of the most frequently traveled intercity routes in the Kingdom of Saudi Arabia. The standard and
            fastest route follows <strong style={{ color: '#fff' }}>King Abdulaziz Road (Highway 40)</strong>, a direct
            line cutting across the Najd plateau from the capital to the Red Sea coast.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '16px', lineHeight: 1.85, marginBottom: '18px' }}>
            Highway 40 is a modern, divided dual-carriageway with multiple lanes in each direction, clear road
            markings, and well-maintained tarmac throughout. Road quality is consistently high, suitable for all
            vehicle types. Starting from Riyadh at GPS coordinates{' '}
            <strong style={{ color: '#fff' }}>24.7136° N, 46.6753° E</strong>, the route heads west-southwest
            through the central region.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '16px', lineHeight: 1.85, marginBottom: '18px' }}>
            The first major town along the route is <strong style={{ color: '#fff' }}>Al-Dawadimi</strong>, located
            approximately 310 kilometers from central Riyadh — a common fuel and rest stop. <strong style={{ color: '#fff' }}>Afif</strong>{' '}
            follows at around 480 kilometers, offering further services. As the route approaches Jeddah
            (21.3891° N, 39.8579° E), the flat Najd terrain gradually transitions toward the Hejaz region.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '16px', lineHeight: 1.85, marginBottom: '18px' }}>
            An <strong style={{ color: '#fff' }}>alternative route via Taif</strong> adds approximately 80–100
            kilometers and passes through the scenic Hijaz Mountains. While visually striking, the Taif route
            takes considerably longer and is not recommended when speed matters. All Arabia Cab intercity drivers
            default to the direct Highway 40 route unless instructed otherwise.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '16px', lineHeight: 1.85, marginBottom: '28px' }}>
            Fuel stops are plentiful throughout the journey. Petrol stations with convenience shops and restroom
            facilities appear regularly — particularly near Al-Dawadimi and Afif. Arabia Cab drivers are
            experienced on this route and know the best-maintained rest stops.
          </p>

          {/* ── Route Map CSS Infographic ── */}
          <div
            style={{
              background: '#1A1A1A',
              borderRadius: '16px',
              padding: '28px 24px',
              margin: '28px 0',
              overflow: 'hidden',
            }}
          >
            <p style={{ color: '#666', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '24px', textAlign: 'center' }}>
              Route Overview
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0', position: 'relative' }}>
              {/* Riyadh */}
              <div style={{ flexShrink: 0, textAlign: 'center' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    background: '#CCFF00',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0A0A0A',
                    fontWeight: 800,
                    fontSize: '11px',
                    fontFamily: 'var(--font-syne), sans-serif',
                    textAlign: 'center',
                    lineHeight: 1.2,
                  }}
                >
                  Riyadh
                </div>
              </div>

              {/* Line with milestones */}
              <div style={{ flex: 1, position: 'relative', height: '64px', margin: '0 4px' }}>
                {/* Dashed line */}
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '0',
                    right: '0',
                    transform: 'translateY(-50%)',
                    borderTop: '2px dashed rgba(204,255,0,0.4)',
                  }}
                />
                {/* Car arrow */}
                <div
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: '#CCFF00',
                    fontSize: '22px',
                    zIndex: 2,
                  }}
                >
                  ➤
                </div>
                {/* Al-Dawadimi */}
                <div style={{ position: 'absolute', left: '33%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 3, textAlign: 'center' }}>
                  <div style={{ width: '10px', height: '10px', background: '#fff', borderRadius: '50%', margin: '0 auto 4px' }} />
                  <div style={{ fontSize: '9px', color: '#888', whiteSpace: 'nowrap', lineHeight: 1.3 }}>
                    Al-Dawadimi<br />310 km
                  </div>
                </div>
                {/* Afif */}
                <div style={{ position: 'absolute', left: '55%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 3, textAlign: 'center' }}>
                  <div style={{ width: '10px', height: '10px', background: '#fff', borderRadius: '50%', margin: '0 auto 4px' }} />
                  <div style={{ fontSize: '9px', color: '#888', whiteSpace: 'nowrap', lineHeight: 1.3 }}>
                    Afif<br />480 km
                  </div>
                </div>
                {/* Rest area */}
                <div style={{ position: 'absolute', left: '67%', top: '50%', transform: 'translate(-50%, -50%)', zIndex: 3, textAlign: 'center' }}>
                  <div style={{ width: '10px', height: '10px', background: '#CCFF00', borderRadius: '50%', margin: '0 auto 4px' }} />
                  <div style={{ fontSize: '9px', color: '#CCFF00', whiteSpace: 'nowrap', lineHeight: 1.3 }}>
                    Rest Area<br />600 km
                  </div>
                </div>
              </div>

              {/* Jeddah */}
              <div style={{ flexShrink: 0, textAlign: 'center' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    background: '#CCFF00',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0A0A0A',
                    fontWeight: 800,
                    fontSize: '11px',
                    fontFamily: 'var(--font-syne), sans-serif',
                  }}
                >
                  Jeddah
                </div>
              </div>
            </div>
            <p style={{ textAlign: 'center', color: '#666', fontSize: '13px', marginTop: '24px' }}>
              949 km · Highway 40 · ~9 hours
            </p>
          </div>

          {/* ══════════════════════════════════════ */}
          {/* H2: Taxi Price 2026                   */}
          {/* ══════════════════════════════════════ */}
          <h2
            id="taxi-price"
            style={{
              fontFamily: 'var(--font-syne), sans-serif',
              fontSize: '28px',
              fontWeight: 700,
              color: '#FFFFFF',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              paddingBottom: '8px',
              marginTop: '52px',
              marginBottom: '20px',
            }}
          >
            Riyadh to Jeddah Taxi Price in 2026
          </h2>

          <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '16px', lineHeight: 1.85, marginBottom: '18px' }}>
            Understanding the fare before you book is essential. In 2026, Arabia Cab operates on a fully
            transparent <strong style={{ color: '#fff' }}>fixed-price model</strong> — meaning there are no meters
            ticking during traffic, no surge pricing during holidays, and no surprise charges at the end of the
            journey. The price you see when you book is the price you pay. Fixed pricing gives passengers
            complete certainty before departure, making it far preferable to metered taxis where the final cost
            is unknown until you arrive.
          </p>

          {/* Pricing Table */}
          <div style={{ overflowX: 'auto', margin: '24px 0 8px' }}>
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, fontSize: '14px' }}>
              <thead>
                <tr>
                  {['Vehicle', 'Passengers', 'Price (SAR)', 'Duration'].map((h, i) => (
                    <th
                      key={h}
                      style={{
                        background: '#CCFF00',
                        color: '#0A0A0A',
                        padding: '12px 16px',
                        textAlign: 'left',
                        fontWeight: 700,
                        borderRadius: i === 0 ? '8px 0 0 0' : i === 3 ? '0 8px 0 0' : undefined,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { vehicle: 'Economy Hatchback', pax: '1–3', price: '280 – 340', popular: false, bg: '#1A1A1A' },
                  { vehicle: 'Standard Sedan', pax: '1–4', price: '350 – 420', popular: true, bg: '#111111' },
                  { vehicle: 'Premium SUV', pax: '1–6', price: '620 – 720', popular: false, bg: '#1A1A1A' },
                  { vehicle: 'Luxury Car', pax: '1–4', price: '900 – 1,100', popular: false, bg: '#111111' },
                  { vehicle: 'Van / Minibus', pax: '1–12', price: '750 – 900', popular: false, bg: '#1A1A1A' },
                ].map(({ vehicle, pax, price, popular, bg }, idx, arr) => (
                  <tr
                    key={vehicle}
                    style={{
                      background: bg,
                      borderLeft: popular ? '3px solid #CCFF00' : undefined,
                      borderBottom: idx < arr.length - 1 ? '1px solid rgba(255,255,255,0.05)' : undefined,
                    }}
                  >
                    <td style={{ padding: '13px 16px', color: '#CCC', borderRadius: idx === arr.length - 1 ? '0 0 0 8px' : undefined }}>
                      {vehicle}
                      {popular && (
                        <span
                          style={{
                            display: 'inline-block',
                            marginLeft: '8px',
                            background: 'rgba(204,255,0,0.12)',
                            color: '#CCFF00',
                            border: '1px solid rgba(204,255,0,0.3)',
                            borderRadius: '100px',
                            padding: '2px 8px',
                            fontSize: '10px',
                            fontWeight: 700,
                            verticalAlign: 'middle',
                          }}
                        >
                          Most Popular
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '13px 16px', color: '#888' }}>{pax}</td>
                    <td style={{ padding: '13px 16px', color: '#fff', fontWeight: 700 }}>SAR {price}</td>
                    <td style={{ padding: '13px 16px', color: '#888', borderRadius: idx === arr.length - 1 ? '0 0 8px 0' : undefined }}>9 hrs</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ color: '#666', fontSize: '12px', marginBottom: '24px', paddingLeft: '4px' }}>
            Prices as of 2026. All fares are fixed — confirmed before booking. No surge pricing.{' '}
            <Link href="/pricing" style={{ color: '#CCFF00', textDecoration: 'none' }}>View full pricing page →</Link>
          </p>

          <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '16px', lineHeight: 1.85, marginBottom: '18px' }}>
            All Arabia Cab fares from Riyadh to Jeddah <strong style={{ color: '#fff' }}>include</strong>: door-to-door
            pickup and drop-off, a professional licensed driver, air conditioning throughout the journey, and
            sufficient luggage space for standard travel bags and suitcases. There are no additional charges for
            traffic delays or weather conditions.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '16px', lineHeight: 1.85, marginBottom: '18px' }}>
            <strong style={{ color: '#fff' }}>Not included</strong>: personal meals or snacks purchased during
            rest stops, and any exceptional extra stops beyond the standard mid-journey rest.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '16px', lineHeight: 1.85, marginBottom: '18px' }}>
            <strong style={{ color: '#fff' }}>How does a taxi compare to flying?</strong> A direct flight from
            Riyadh (RUH) to Jeddah (KAIA) costs between SAR 200 and SAR 500 per person in 2026. However, factor
            in arriving at the airport 90 minutes early, the one-hour flight, baggage collection, and a taxi
            to your final Jeddah destination — and door-to-door flying often takes 5 to 6 hours anyway, at
            significantly higher combined cost for a family. For a family of four sharing a Standard Sedan, the
            per-person taxi cost is just{' '}
            <strong style={{ color: '#fff' }}>SAR 87–105</strong> — less than the cheapest available flight per
            seat, with far more convenience.
          </p>

          {/* ══════════════════════════════════════ */}
          {/* H2: Options Compared                  */}
          {/* ══════════════════════════════════════ */}
          <h2
            id="options-compared"
            style={{
              fontFamily: 'var(--font-syne), sans-serif',
              fontSize: '28px',
              fontWeight: 700,
              color: '#FFFFFF',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              paddingBottom: '8px',
              marginTop: '52px',
              marginBottom: '20px',
            }}
          >
            Riyadh to Jeddah — All Your Options Compared
          </h2>

          <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '16px', lineHeight: 1.85, marginBottom: '24px' }}>
            When planning a trip between Saudi Arabia's two largest cities, travelers have four main options.
            Understanding each option clearly saves time and prevents expensive mistakes.
          </p>

          {/* Comparison Table */}
          <div style={{ overflowX: 'auto', margin: '0 0 24px' }}>
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, fontSize: '13px', minWidth: '560px' }}>
              <thead>
                <tr>
                  {['', 'Intercity Taxi', 'Haramain Train', 'SAPTCO Bus', 'Flight'].map((h, i) => (
                    <th
                      key={i}
                      style={{
                        background: i === 1 ? '#CCFF00' : '#1A1A1A',
                        color: i === 1 ? '#0A0A0A' : i === 0 ? '#666' : '#fff',
                        padding: '11px 14px',
                        textAlign: 'left',
                        fontWeight: 700,
                        borderRadius: i === 0 ? '8px 0 0 0' : i === 4 ? '0 8px 0 0' : undefined,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Price (total)', 'SAR 350–420', '❌ Not available', 'SAR 100–150 /person', 'SAR 200–500 /person'],
                  ['Door-to-door time', '9–10 hrs', '—', '10–12 hrs', '5–6 hrs'],
                  ['Departs when you want', '✓ Yes', '—', '✗ Fixed schedule', '✗ Fixed schedule'],
                  ['Luggage allowance', 'Unlimited', '—', '1 bag, 20 kg', '20–23 kg'],
                  ['Comfort', '★★★★★', '—', '★★★☆☆', '★★★☆☆'],
                  ['Riyadh → Jeddah route', '✓ Yes', '✗ No (Makkah/Madinah only)', '✓ Yes', '✓ Yes'],
                  ['Pre-booking required', 'Recommended', '—', 'Required', 'Required'],
                  ['Best for', 'Families, groups', '—', 'Solo budget travel', 'Solo business travel'],
                ].map(([label, ...cells], rIdx) => (
                  <tr
                    key={label}
                    style={{
                      background: rIdx % 2 === 0 ? '#111111' : '#1A1A1A',
                      borderBottom: '1px solid rgba(255,255,255,0.04)',
                    }}
                  >
                    <td style={{ padding: '11px 14px', color: '#888', fontWeight: 600, whiteSpace: 'nowrap' }}>{label}</td>
                    {cells.map((cell, cIdx) => (
                      <td
                        key={cIdx}
                        style={{
                          padding: '11px 14px',
                          color: cIdx === 0 ? '#fff' : cell.startsWith('✗') || cell === '—' ? '#555' : '#CCC',
                          fontWeight: cIdx === 0 ? 600 : 400,
                        }}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3
            style={{
              fontFamily: 'var(--font-syne), sans-serif',
              fontSize: '20px',
              fontWeight: 700,
              color: '#CCFF00',
              marginTop: '32px',
              marginBottom: '12px',
            }}
          >
            Why the Haramain Train Does Not Run to Riyadh
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '16px', lineHeight: 1.85, marginBottom: '18px' }}>
            One of the most common misconceptions among travelers planning this journey is that the
            Haramain High Speed Railway connects Riyadh to Jeddah. It does not. The Haramain train
            operates exclusively between <strong style={{ color: '#fff' }}>Jeddah, Makkah, and Madinah</strong>.
            The only rail service departing Riyadh is the SAR Railway, which travels east to Dammam — not
            west to Jeddah. Anyone searching for a &ldquo;Riyadh to Jeddah train&rdquo; will find that no
            such route exists, and will need to choose between road and air travel.
          </p>

          <h3
            style={{
              fontFamily: 'var(--font-syne), sans-serif',
              fontSize: '20px',
              fontWeight: 700,
              color: '#CCFF00',
              marginTop: '28px',
              marginBottom: '12px',
            }}
          >
            Can Uber or Careem Go from Riyadh to Jeddah?
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '16px', lineHeight: 1.85, marginBottom: '18px' }}>
            A common question is whether Uber or Careem goes from Riyadh to Jeddah. The answer is
            definitively <strong style={{ color: '#fff' }}>no</strong> — both services only operate within
            individual cities in Saudi Arabia. If you open Uber in Riyadh and set Jeddah as your destination,
            the app will show no available options for that trip. Careem functions identically. Both platforms
            are city-based ride-hailing services, not intercity transport providers. For intercity rides
            between Riyadh and Jeddah, you need a dedicated intercity taxi service like{' '}
            <Link href="/booking" style={{ color: '#CCFF00', textDecoration: 'none' }}>Arabia Cab</Link>,
            the SAPTCO bus, or a domestic flight.
          </p>

          <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '16px', lineHeight: 1.85, marginBottom: '18px' }}>
            <strong style={{ color: '#fff' }}>When the bus makes sense:</strong> For a solo traveler with light
            luggage, the SAPTCO bus at SAR 100–150 is a viable budget option. It departs from designated
            terminals, runs on fixed schedules, and takes 10–12 hours with multiple stops. For families,
            groups, or anyone with luggage, a private taxi is overwhelmingly the better choice.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '16px', lineHeight: 1.85, marginBottom: '18px' }}>
            <strong style={{ color: '#fff' }}>When flying makes sense:</strong> Flying makes the most sense for
            solo business travelers whose company covers the fare and who are traveling with only a cabin bag.
            For everyone else — particularly families and those with checked luggage — the taxi wins on
            convenience, overall cost, and the absence of airport stress.
          </p>

          {/* ══════════════════════════════════════ */}
          {/* H2: What to Expect                    */}
          {/* ══════════════════════════════════════ */}
          <h2
            id="what-to-expect"
            style={{
              fontFamily: 'var(--font-syne), sans-serif',
              fontSize: '28px',
              fontWeight: 700,
              color: '#FFFFFF',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              paddingBottom: '8px',
              marginTop: '52px',
              marginBottom: '20px',
            }}
          >
            What to Expect on Your Journey
          </h2>

          <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '16px', lineHeight: 1.85, marginBottom: '18px' }}>
            Booking an Arabia Cab from Riyadh to Jeddah is a straightforward, comfortable experience from the
            moment you confirm online to the moment you arrive at your Jeddah destination. Here is exactly what
            the journey looks like, step by step.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '16px', lineHeight: 1.85, marginBottom: '18px' }}>
            <strong style={{ color: '#fff' }}>Before departure:</strong> After booking online, you receive
            confirmation within 2 hours including your driver&apos;s name, vehicle registration, and a direct
            WhatsApp contact number. On the evening before travel, message your driver to confirm the exact
            pickup time and address. Arabia Cab drivers are professional, punctual, and experienced on the
            Riyadh–Jeddah route.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '16px', lineHeight: 1.85, marginBottom: '18px' }}>
            <strong style={{ color: '#fff' }}>The highway experience:</strong> Highway 40 is wide, smooth, and
            largely flat through the Najd plateau. The landscape is open and arid — ideal for sleeping, reading,
            or watching content on your phone. Modern Arabia Cab vehicles have functioning air conditioning and
            are maintained before each journey. You are the only passenger — no shared rides, no detours.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '16px', lineHeight: 1.85, marginBottom: '18px' }}>
            <strong style={{ color: '#fff' }}>The rest stop:</strong> Most drivers take one 20–30 minute rest
            stop around the 500km mark near Afif. This is a good opportunity to use the restrooms, stretch
            your legs, refuel, and grab coffee or snacks from the petrol station. If you are traveling with
            children, this break is a welcome pause in the journey.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '16px', lineHeight: 1.85, marginBottom: '28px' }}>
            <strong style={{ color: '#fff' }}>Arrival in Jeddah:</strong> Your driver delivers you directly
            to your exact address in Jeddah — hotel, apartment, office, or King Abdulaziz International
            Airport. No detours, no shared passengers. If you depart Riyadh at 6:00 AM, you will typically
            arrive in Jeddah by 3:00 PM.
          </p>

          {/* ── Journey Timeline ── */}
          <div
            style={{
              background: '#1A1A1A',
              borderRadius: '16px',
              padding: '28px 24px',
              margin: '0 0 40px',
            }}
          >
            <p style={{ color: '#CCFF00', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '24px' }}>
              Journey Timeline
            </p>
            {timelineSteps.map((s, i) => (
              <div key={s.step} style={{ display: 'flex', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      background: '#CCFF00',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#0A0A0A',
                      fontWeight: 800,
                      fontSize: '13px',
                      fontFamily: 'var(--font-syne), sans-serif',
                      flexShrink: 0,
                    }}
                  >
                    {s.step}
                  </div>
                  {i < timelineSteps.length - 1 && (
                    <div
                      style={{
                        width: '2px',
                        flex: 1,
                        minHeight: '28px',
                        background: 'rgba(204,255,0,0.25)',
                        margin: '4px 0',
                      }}
                    />
                  )}
                </div>
                <div style={{ paddingBottom: i < timelineSteps.length - 1 ? '4px' : '0', paddingTop: '6px' }}>
                  <p style={{ color: '#fff', fontWeight: 700, fontSize: '14px', fontFamily: 'var(--font-syne), sans-serif', marginBottom: '2px' }}>
                    {s.title}
                  </p>
                  <p style={{ color: '#CCFF00', fontSize: '11px', marginBottom: '4px' }}>{s.time}</p>
                  <p style={{ color: '#888', fontSize: '13px', marginBottom: i < timelineSteps.length - 1 ? '16px' : '0' }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ══════════════════════════════════════ */}
          {/* H2: Pro Tips                          */}
          {/* ══════════════════════════════════════ */}
          <h2
            id="pro-tips"
            style={{
              fontFamily: 'var(--font-syne), sans-serif',
              fontSize: '28px',
              fontWeight: 700,
              color: '#FFFFFF',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              paddingBottom: '8px',
              marginTop: '52px',
              marginBottom: '20px',
            }}
          >
            Pro Tips for Riyadh to Jeddah Taxi Travel
          </h2>

          {[
            {
              num: '01',
              title: 'Book at least 24 hours in advance',
              body: 'Arabia Cab allocates its intercity drivers based on advance bookings. Booking the day before guarantees driver availability, gives the driver time to plan the route, and means you receive your driver\'s contact details well before departure. Same-day bookings may be possible but are not guaranteed, particularly during Eid holidays and the Hajj season when intercity demand surges significantly.',
            },
            {
              num: '02',
              title: 'Depart early morning — between 5 AM and 7 AM',
              body: 'Early morning departures avoid rush-hour traffic leaving Riyadh and ensure you arrive in Jeddah before the city\'s own evening congestion builds. This timing is also cooler — critical in Saudi summer when midday temperatures exceed 45°C. Departing at 6 AM typically delivers you to Jeddah by 3 PM, with most of the afternoon free. Avoid Friday afternoons when Jeddah\'s approach roads become particularly congested.',
            },
            {
              num: '03',
              title: 'Share your exact pickup address — not just the area name',
              body: 'Do not just tell your driver "Al Malaz" or "Al Olaya." Share a full address with your building name or number, street name, and any nearby landmarks. Screenshot your precise Google Maps pin and send it to your driver on WhatsApp the evening before travel. This eliminates any pickup confusion and saves time on the morning of departure.',
            },
            {
              num: '04',
              title: 'Confirm your driver\'s WhatsApp the evening before',
              body: 'After booking, Arabia Cab provides your driver\'s WhatsApp number. Send a brief message the night before to confirm pickup time and address. This early contact means both you and the driver are fully coordinated before the day starts — no uncertainty, no delays.',
            },
            {
              num: '05',
              title: 'Pack snacks and water for the road',
              body: 'Highway petrol station selections are practical but limited. If you have dietary preferences or are traveling with children, bring a bag with snacks, sandwiches, and extra water. The journey is 9 hours — your comfort depends on being well-nourished and hydrated. The one rest stop gives you access to petrol station shops, but packing your own ensures you are set regardless.',
            },
            {
              num: '06',
              title: 'Wear comfortable clothing',
              body: 'Sitting in business attire for 9 hours is uncomfortable. Wear loose, comfortable clothes for the journey. Bring a light jacket or travel blanket — the vehicle\'s air conditioning can become cool after extended highway driving, especially if you sleep. You can always change into professional clothing when you arrive at your destination.',
            },
            {
              num: '07',
              title: 'Charge all devices before departure',
              body: 'Your phone should be fully charged before leaving. You will use it for navigation monitoring, entertainment, communication with family, and emergency contact if needed. Most Arabia Cab vehicles have USB charging ports, but starting with a full battery is always the safer approach on a 9-hour journey.',
            },
            {
              num: '08',
              title: 'Keep important documents accessible',
              body: 'Your national ID, Iqama, or passport should be in a front bag or jacket pocket throughout the journey — not buried deep in checked luggage. Police checkpoints on Highway 40 are infrequent, but being prepared means you handle any stop confidently and quickly without inconveniencing your driver or delaying the journey.',
            },
          ].map((tip) => (
            <div
              key={tip.num}
              style={{
                display: 'flex',
                gap: '16px',
                marginBottom: '20px',
                padding: '20px',
                background: '#111111',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <div
                style={{
                  color: '#CCFF00',
                  fontFamily: 'var(--font-syne), sans-serif',
                  fontSize: '13px',
                  fontWeight: 800,
                  flexShrink: 0,
                  paddingTop: '2px',
                  letterSpacing: '0.05em',
                }}
              >
                {tip.num}
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-syne), sans-serif',
                    fontSize: '16px',
                    fontWeight: 700,
                    color: '#fff',
                    marginBottom: '8px',
                  }}
                >
                  {tip.title}
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', lineHeight: 1.75, margin: 0 }}>
                  {tip.body}
                </p>
              </div>
            </div>
          ))}

          {/* Pros & Cons */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '16px',
              margin: '12px 0 40px',
            }}
          >
            <div
              style={{
                background: 'rgba(46,204,113,0.06)',
                border: '1px solid rgba(46,204,113,0.2)',
                borderRadius: '12px',
                padding: '20px',
              }}
            >
              <p style={{ color: '#2ECC71', fontWeight: 700, fontSize: '13px', marginBottom: '14px', fontFamily: 'var(--font-syne), sans-serif' }}>
                WHY TAXI WINS
              </p>
              {[
                'Door-to-door — no terminals',
                'Fixed price, no surprises',
                'Depart whenever you want',
                'No luggage weight limits',
                'Perfect for families with children',
                'No airport queues or check-in',
                'One vehicle, private and direct',
              ].map((p) => (
                <p key={p} style={{ color: 'rgba(255,255,255,0.75)', fontSize: '14px', marginBottom: '8px', display: 'flex', gap: '8px' }}>
                  <span style={{ color: '#2ECC71', flexShrink: 0 }}>✓</span> {p}
                </p>
              ))}
            </div>
            <div
              style={{
                background: '#111111',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '12px',
                padding: '20px',
              }}
            >
              <p style={{ color: '#888', fontWeight: 700, fontSize: '13px', marginBottom: '14px', fontFamily: 'var(--font-syne), sans-serif' }}>
                CONSIDER ALTERNATIVES IF…
              </p>
              {[
                'Traveling solo on a tight budget → bus',
                'Solo business traveler, company pays → flight',
                'Connecting to Makkah or Madinah → Haramain Train from Jeddah',
                'Need to arrive at a precise departure time → fly',
              ].map((p) => (
                <p key={p} style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px', marginBottom: '8px', display: 'flex', gap: '8px' }}>
                  <span style={{ color: '#666', flexShrink: 0 }}>→</span> {p}
                </p>
              ))}
            </div>
          </div>

          {/* ══════════════════════════════════════ */}
          {/* H2: How to Book                       */}
          {/* ══════════════════════════════════════ */}
          <h2
            id="how-to-book"
            style={{
              fontFamily: 'var(--font-syne), sans-serif',
              fontSize: '28px',
              fontWeight: 700,
              color: '#FFFFFF',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              paddingBottom: '8px',
              marginTop: '52px',
              marginBottom: '20px',
            }}
          >
            How to Book Riyadh to Jeddah Taxi with Arabia Cab
          </h2>

          {/* Booking Steps */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '16px',
              margin: '28px 0',
            }}
          >
            {[
              {
                step: '1',
                title: 'Fill the Form',
                body: 'Enter your Riyadh pickup address, Jeddah destination, travel date, and preferred time.',
                icon: '📋',
              },
              {
                step: '2',
                title: 'Choose Your Vehicle',
                body: 'Select Sedan, SUV, Luxury, or Minibus based on your group size and budget.',
                icon: '🚗',
              },
              {
                step: '3',
                title: 'Confirm & Relax',
                body: 'Driver confirmed within 2 hours. Pay cash or by transfer on arrival in Jeddah.',
                icon: '✓',
              },
            ].map((s) => (
              <div
                key={s.step}
                style={{
                  background: '#1A1A1A',
                  borderRadius: '16px',
                  padding: '24px',
                  border: '1px solid rgba(255,255,255,0.06)',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    background: '#CCFF00',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0A0A0A',
                    fontFamily: 'var(--font-syne), sans-serif',
                    fontWeight: 800,
                    fontSize: '18px',
                    margin: '0 auto 16px',
                  }}
                >
                  {s.step}
                </div>
                <p style={{ color: '#fff', fontWeight: 700, fontSize: '15px', fontFamily: 'var(--font-syne), sans-serif', marginBottom: '10px' }}>
                  {s.title}
                </p>
                <p style={{ color: '#888', fontSize: '13px', lineHeight: 1.65 }}>{s.body}</p>
              </div>
            ))}
          </div>

          <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '16px', lineHeight: 1.85, marginBottom: '18px' }}>
            Booking takes under 60 seconds at{' '}
            <Link href="/booking" style={{ color: '#CCFF00', textDecoration: 'none', fontWeight: 600 }}>
              arabiacab.com/booking
            </Link>. No app download required, no account creation needed for first-time
            riders. After submission, you receive confirmation within 2 hours with your driver&apos;s name,
            vehicle details, and a direct WhatsApp number.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '16px', lineHeight: 1.85, marginBottom: '18px' }}>
            <strong style={{ color: '#fff' }}>Payment:</strong> Arabia Cab accepts cash payment to the driver
            at the end of the journey. In most cases, bank transfer or online payment is also available —
            confirm with your driver at booking if you prefer cashless. No upfront payment is required to
            secure your booking.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '16px', lineHeight: 1.85, marginBottom: '18px' }}>
            <strong style={{ color: '#fff' }}>Cancellations</strong> are free up to 6 hours before the
            scheduled departure time. Message the Arabia Cab team directly on WhatsApp if you need to cancel
            or reschedule. For groups larger than 4 passengers, select the Premium SUV or Van/Minibus option
            during booking — these operate on the same fixed-price model with no hidden group surcharge.
          </p>

          <div style={{ textAlign: 'center', margin: '32px 0' }}>
            <Link
              href="/booking"
              style={{
                display: 'inline-block',
                background: '#CCFF00',
                color: '#0A0A0A',
                fontWeight: 700,
                fontSize: '15px',
                fontFamily: 'var(--font-syne), sans-serif',
                borderRadius: '14px',
                padding: '14px 32px',
                textDecoration: 'none',
              }}
            >
              Book takes less than 60 seconds →
            </Link>
          </div>

          {/* ══════════════════════════════════════ */}
          {/* H2: FAQ                               */}
          {/* ══════════════════════════════════════ */}
          <h2
            id="faq"
            style={{
              fontFamily: 'var(--font-syne), sans-serif',
              fontSize: '28px',
              fontWeight: 700,
              color: '#FFFFFF',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              paddingBottom: '8px',
              marginTop: '52px',
              marginBottom: '24px',
            }}
          >
            Frequently Asked Questions — Riyadh to Jeddah Taxi
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {faqItems.map((item, i) => (
              <details
                key={i}
                style={{
                  background: '#111111',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.06)',
                  overflow: 'hidden',
                }}
              >
                <summary
                  style={{
                    padding: '16px 20px',
                    cursor: 'pointer',
                    listStyle: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: '15px',
                    fontFamily: 'var(--font-syne), sans-serif',
                    userSelect: 'none',
                  }}
                >
                  <span style={{ paddingRight: '16px' }}>{item.q}</span>
                  <span
                    style={{
                      color: '#CCFF00',
                      fontSize: '22px',
                      fontWeight: 300,
                      flexShrink: 0,
                      lineHeight: 1,
                    }}
                  >
                    +
                  </span>
                </summary>
                <div
                  style={{
                    padding: '0 20px 18px',
                    color: 'rgba(255,255,255,0.75)',
                    fontSize: '15px',
                    lineHeight: 1.8,
                  }}
                >
                  {item.a}
                </div>
              </details>
            ))}
          </div>

          {/* ══════════════════════════════════════ */}
          {/* Final CTA                             */}
          {/* ══════════════════════════════════════ */}
          <div
            style={{
              background: 'linear-gradient(135deg, #0A0A0A 0%, #1A2200 100%)',
              border: '1px solid rgba(204,255,0,0.25)',
              borderRadius: '20px',
              padding: '40px 32px',
              textAlign: 'center',
              margin: '52px 0 40px',
            }}
          >
            {/* Urgency badge */}
            <div style={{ marginBottom: '20px' }}>
              <span
                style={{
                  display: 'inline-block',
                  background: 'rgba(204,255,0,0.1)',
                  color: '#CCFF00',
                  border: '1px solid rgba(204,255,0,0.3)',
                  borderRadius: '100px',
                  padding: '5px 14px',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                }}
              >
                Limited spots available this week
              </span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-syne), sans-serif',
                fontSize: 'clamp(22px, 4vw, 28px)',
                fontWeight: 800,
                color: '#fff',
                marginBottom: '12px',
                lineHeight: 1.25,
              }}
            >
              Book Your Riyadh to Jeddah Ride Today
            </h2>
            <p style={{ color: '#888', fontSize: '15px', marginBottom: '28px', lineHeight: 1.6 }}>
              Verified drivers · Fixed SAR 350 price · Instant confirmation · Book in 60 seconds
            </p>

            <Link
              href="/booking"
              style={{
                display: 'inline-block',
                background: '#CCFF00',
                color: '#0A0A0A',
                fontFamily: 'var(--font-syne), sans-serif',
                fontWeight: 800,
                fontSize: '16px',
                borderRadius: '14px',
                padding: '16px 36px',
                textDecoration: 'none',
                letterSpacing: '0.01em',
              }}
            >
              Book Riyadh to Jeddah Taxi Now →
            </Link>

            <p
              style={{
                color: 'rgba(255,255,255,0.3)',
                fontSize: '12px',
                marginTop: '20px',
                lineHeight: 1.8,
              }}
            >
              ✓ No upfront payment &nbsp;·&nbsp; ✓ Free cancellation &nbsp;·&nbsp; ✓ Verified driver &nbsp;·&nbsp; ✓ Fixed price
            </p>

            {/* Social proof */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                marginTop: '24px',
                paddingTop: '24px',
                borderTop: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div style={{ display: 'flex', gap: '-4px' }}>
                {['SA', 'MK', 'RA'].map((initials, i) => (
                  <div
                    key={initials}
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: `hsl(${80 + i * 40}, 60%, 30%)`,
                      border: '2px solid #0A0A0A',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '9px',
                      fontWeight: 700,
                      color: '#fff',
                      marginLeft: i > 0 ? '-6px' : '0',
                      position: 'relative',
                      zIndex: 3 - i,
                    }}
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <p style={{ color: '#888', fontSize: '13px' }}>
                Join <strong style={{ color: '#fff' }}>50,000+</strong> riders who trust Arabia Cab &nbsp;⭐⭐⭐⭐⭐
              </p>
            </div>
          </div>

          {/* ── Share Buttons ── */}
          <div
            style={{
              paddingTop: '32px',
              borderTop: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <ShareButtons
              url={postUrl}
              title={postTitle}
            />
          </div>

          {/* ── Related links ── */}
          <div style={{ marginTop: '40px', padding: '20px', background: '#111111', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <p style={{ color: '#666', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>More from Arabia Cab</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {[
                { href: '/pricing', label: 'View all prices' },
                { href: '/cities', label: 'All cities we serve' },
                { href: '/blog', label: 'More travel guides' },
                { href: '/booking', label: 'Book a ride now' },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href as any}
                  style={{
                    display: 'inline-block',
                    background: '#1A1A1A',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '100px',
                    padding: '7px 14px',
                    color: '#CCFF00',
                    fontSize: '13px',
                    fontWeight: 500,
                    textDecoration: 'none',
                  }}
                >
                  {label} →
                </Link>
              ))}
            </div>
          </div>

        </article>

        {/* ── Sticky TOC (desktop) ── */}
        <aside
          style={{
            width: '220px',
            flexShrink: 0,
            position: 'sticky',
            top: '88px',
            display: 'none',
            alignSelf: 'flex-start',
          }}
          className="hidden xl:block"
        >
          <div
            style={{
              background: '#111111',
              borderRadius: '12px',
              padding: '16px',
              border: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            <p
              style={{
                color: '#666',
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: '12px',
              }}
            >
              Contents
            </p>
            <nav>
              {tocLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className="block hover:text-[#CCFF00] transition-colors duration-150"
                  style={{
                    color: 'rgba(255,255,255,0.5)',
                    fontSize: '13px',
                    padding: '6px 8px',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    lineHeight: 1.4,
                    marginBottom: '2px',
                  }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>
      </div>
    </>
  );
}
