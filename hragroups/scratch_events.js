function Wi(){let[e,t]=(0,x.useState)([]),[n,r]=(0,x.useState)(`ALL`),[i,a]=(0,x.useState)(!0),[o,s]=(0,x.useState)(``);(0,x.useEffect)(()=>{let e=!0;return(async()=>{try{a(!0),s(``);let n=await mr(),r=(Array.isArray(n)?n:Array.isArray(n?.events)?n.events:Array.isArray(n?.data)?n.data:[]).map(Bi).filter(e=>String(e.status).toLowerCase()!==`draft`);e&&t(r)}catch(t){console.error(t),e&&s(t?.message||`Unable to load events.`)}finally{e&&a(!1)}})(),()=>{e=!1}},[]);let c=(0,x.useMemo)(()=>[`ALL`,...new Set(e.map(e=>e.category).filter(Boolean).map(e=>e.toUpperCase()))],[e]),l=(0,x.useMemo)(()=>n===`ALL`?e:e.filter(e=>String(e.category).toUpperCase()===n),[e,n]),u=l.filter(e=>e.mediaType!==`video`),d=l.filter(e=>e.mediaType===`video`),f=u[0],p=u.slice(1);return(0,j.jsxs)(`main`,{className:`events-modern-page`,children:[(0,j.jsx)(`style`,{children:`

        @import url(
          'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600&display=swap'
        );

        .events-modern-page {
          --bg: #06111f;
          --bg2: #091a2d;
          --surface: #0c2035;
          --surface2: #102943;

          --blue: #4d9cff;
          --blue-soft: #79b5ff;

          --gold: #c8aa6e;
          --gold-soft: #e0c98e;

          --white: #f5f7fa;
          --muted: #91a2b5;
          --muted2: #61758b;

          --line: rgba(148,180,215,.14);

          min-height: 100vh;

          background:
            radial-gradient(
              circle at 85% 5%,
              rgba(77,156,255,.13),
              transparent 28%
            ),
            radial-gradient(
              circle at 10% 45%,
              rgba(200,170,110,.06),
              transparent 28%
            ),
            linear-gradient(
              180deg,
              #06111f 0%,
              #071525 55%,
              #06111f 100%
            );

          color: var(--white);

          font-family:
            "Manrope",
            "DM Sans",
            Arial,
            sans-serif;
        }

        .events-wrap {
          width: min(
            1320px,
            calc(100% - 72px)
          );

          margin: auto;
        }

        /* =====================================
           HERO
        ===================================== */

        .events-hero {
          position: relative;

          min-height: 760px;

          display: flex;
          align-items: center;

          border-bottom:
            1px solid var(--line);

          overflow: hidden;
        }

        .hero-lines {
          position: absolute;
          inset: 0;

          background-image:
            linear-gradient(
              rgba(255,255,255,.025) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,.025) 1px,
              transparent 1px
            );

          background-size: 80px 80px;

          mask-image:
            linear-gradient(
              to bottom,
              black,
              transparent 85%
            );
        }

        .hero-glow {
          position: absolute;

          width: 520px;
          height: 520px;

          right: -180px;
          top: 90px;

          border-radius: 50%;

          background:
            radial-gradient(
              circle,
              rgba(77,156,255,.16),
              transparent 65%
            );
        }

        .hero-ring {
          position: absolute;

          width: 470px;
          height: 470px;

          right: -155px;
          top: 110px;

          border:
            1px solid
            rgba(77,156,255,.17);

          border-radius: 50%;
        }

        .hero-content {
          position: relative;
          z-index: 2;
        }

        .hero-mini {
          display: flex;
          align-items: center;
          gap: 13px;

          color: var(--blue-soft);

          font-size: 10px;
          font-weight: 700;

          letter-spacing: .3em;
          text-transform: uppercase;
        }

        .hero-mini-line {
          width: 45px;
          height: 1px;

          background:
            linear-gradient(
              90deg,
              var(--blue),
              transparent
            );
        }

        .hero-title {
          max-width: 1050px;

          margin: 32px 0 0;

          font-family:
            "Playfair Display",
            Georgia,
            serif;

          font-size:
            clamp(
              65px,
              10vw,
              145px
            );

          line-height: .88;

          font-weight: 500;

          letter-spacing:
            -.055em;
        }

        .hero-title span {
          display: block;

          margin-left: 11%;

          color: var(--blue-soft);

          font-style: italic;
        }

        .hero-description {
          max-width: 580px;

          margin: 42px 0 0;

          color: var(--muted);

          font-size: 15px;
          line-height: 1.9;
        }

        .hero-bottom {
          position: absolute;

          bottom: 35px;
          left: 0;
          right: 0;

          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .hero-scroll {
          display: flex;
          align-items: center;
          gap: 12px;

          color: var(--muted2);

          font-size: 9px;
          font-weight: 700;

          letter-spacing: .22em;
          text-transform: uppercase;
        }

        .hero-scroll-line {
          width: 55px;
          height: 1px;

          background: var(--gold);
        }

        .hero-number {
          color: var(--gold);

          font-family:
            "Playfair Display",
            Georgia,
            serif;

          font-size: 22px;
        }

        /* =====================================
           INTRO
        ===================================== */

        .intro {
          display: grid;

          grid-template-columns:
            .75fr
            1.25fr;

          gap: 120px;

          padding:
            120px 0;

          border-bottom:
            1px solid var(--line);
        }

        .section-label {
          color: var(--gold);

          font-size: 9px;
          font-weight: 700;

          letter-spacing: .25em;
          text-transform: uppercase;
        }

        .intro-title {
          margin: 18px 0 0;

          font-family:
            "Playfair Display",
            Georgia,
            serif;

          font-size:
            clamp(
              42px,
              5vw,
              68px
            );

          line-height: .96;

          font-weight: 500;

          letter-spacing: -.04em;
        }

        .intro-title span {
          color: var(--gold-soft);
          font-style: italic;
        }

        .intro-copy {
          max-width: 620px;

          align-self: end;

          color: var(--muted);

          font-size: 15px;

          line-height: 2;
        }

        /* =====================================
           NAV
        ===================================== */

        .event-navigation {
          padding: 65px 0 35px;
        }

        .event-nav-top {
          display: flex;

          justify-content: space-between;

          align-items: end;

          gap: 30px;
        }

        .event-nav-heading {
          margin: 10px 0 0;

          font-family:
            "Playfair Display",
            Georgia,
            serif;

          font-size: 38px;

          font-weight: 500;
        }

        .category-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .category-button {
          border:
            1px solid
            var(--line);

          background:
            rgba(255,255,255,.015);

          color: var(--muted);

          padding:
            10px 17px;

          cursor: pointer;

          font-family:
            "Manrope",
            sans-serif;

          font-size: 9px;
          font-weight: 700;

          letter-spacing: .14em;

          transition:
            all .25s ease;
        }

        .category-button:hover,
        .category-button.active {
          color: var(--white);

          border-color:
            rgba(77,156,255,.55);

          background:
            rgba(77,156,255,.08);
        }

        .category-button.active {
          box-shadow:
            inset 0 -2px 0
            var(--blue);
        }

        /* =====================================
           IMAGE SECTION
        ===================================== */

        .media-section {
          padding:
            35px 0
            105px;
        }

        .section-heading {
          display: flex;

          justify-content: space-between;

          align-items: end;

          margin-bottom: 28px;
        }

        .section-heading-left {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .section-index {
          color: var(--gold);

          font-family:
            "Playfair Display",
            Georgia,
            serif;

          font-size: 20px;
        }

        .section-heading h2 {
          margin: 0;

          font-family:
            "Playfair Display",
            Georgia,
            serif;

          font-size: 38px;

          font-weight: 500;
        }

        .section-heading-right {
          color: var(--muted2);

          font-size: 10px;

          letter-spacing: .16em;
          text-transform: uppercase;
        }

        /* FEATURE */

        .featured-event {
          display: grid;

          grid-template-columns:
            1.25fr
            .75fr;

          min-height: 570px;

          background:
            linear-gradient(
              135deg,
              #0d2238,
              #091a2d
            );

          border:
            1px solid var(--line);

          overflow: hidden;
        }

        .featured-media {
          position: relative;

          min-height: 570px;

          overflow: hidden;
        }

        .featured-media .event-image,
        .featured-media .drive-media,
        .featured-media .media-placeholder {
          width: 100%;
          height: 100%;
          min-height: 570px;

          object-fit: cover;
        }

        .event-image {
          display: block;

          transition:
            transform
            .9s
            cubic-bezier(.2,.7,.2,1);
        }

        .featured-event:hover
        .event-image {
          transform: scale(1.035);
        }

        .drive-media {
          border: 0;
          display: block;
        }

        .media-overlay {
          position: absolute;
          inset: 0;

          background:
            linear-gradient(
              90deg,
              rgba(5,15,28,.02),
              rgba(5,15,28,.2)
            );

          pointer-events: none;
        }

        .featured-info {
          position: relative;

          display: flex;
          flex-direction: column;
          justify-content: center;

          padding:
            65px;
        }

        .event-type {
          color: var(--blue-soft);

          font-size: 9px;
          font-weight: 700;

          letter-spacing: .24em;
          text-transform: uppercase;
        }

        .featured-title {
          margin: 20px 0 0;

          font-family:
            "Playfair Display",
            Georgia,
            serif;

          font-size:
            clamp(
              42px,
              4.5vw,
              68px
            );

          line-height: .94;

          font-weight: 500;

          letter-spacing: -.04em;
        }

        .featured-description {
          max-width: 470px;

          margin: 28px 0 0;

          color: var(--muted);

          font-size: 13px;

          line-height: 1.9;
        }

        .featured-details {
          display: grid;

          grid-template-columns:
            1fr 1fr;

          gap: 25px;

          margin-top: 50px;

          padding-top: 23px;

          border-top:
            1px solid var(--line);
        }

        .detail-label {
          display: block;

          margin-bottom: 7px;

          color: var(--muted2);

          font-size: 8px;
          font-weight: 700;

          letter-spacing: .18em;
          text-transform: uppercase;
        }

        .detail-value {
          color: var(--white);

          font-size: 12px;
        }

        .featured-number {
          position: absolute;

          right: 35px;
          bottom: 25px;

          color:
            rgba(200,170,110,.09);

          font-family:
            "Playfair Display",
            Georgia,
            serif;

          font-size: 100px;

          line-height: 1;
        }

        /* GRID */

        .image-grid {
          display: grid;

          grid-template-columns:
            repeat(3, 1fr);

          gap: 18px;

          margin-top: 18px;
        }

        .image-card {
          position: relative;

          min-height: 420px;

          background: var(--surface);

          border:
            1px solid var(--line);

          overflow: hidden;
        }

        .image-card:nth-child(2) {
          transform: translateY(55px);
        }

        .image-card:nth-child(3) {
          transform: translateY(110px);
        }

        .image-card-media {
          position: absolute;
          inset: 0;
        }

        .image-card .event-image,
        .image-card .drive-media,
        .image-card .media-placeholder {
          width: 100%;
          height: 100%;

          object-fit: cover;
        }

        .image-card-overlay {
          position: absolute;
          inset: 0;

          background:
            linear-gradient(
              180deg,
              transparent 30%,
              rgba(3,10,19,.86) 100%
            );
        }

        .image-card-info {
          position: absolute;

          left: 25px;
          right: 25px;
          bottom: 25px;

          z-index: 2;
        }

        .image-card-category {
          color: var(--gold-soft);

          font-size: 8px;
          font-weight: 700;

          letter-spacing: .2em;
          text-transform: uppercase;
        }

        .image-card-title {
          margin-top: 8px;

          font-family:
            "Playfair Display",
            Georgia,
            serif;

          font-size: 28px;
          line-height: 1;

          font-weight: 500;
        }

        .image-card-date {
          margin-top: 12px;

          color: #b1bdc9;

          font-size: 10px;
        }

        /* =====================================
           VIDEO SECTION
        ===================================== */

        .video-section {
          position: relative;

          margin-top: 110px;

          padding:
            115px 0
            130px;

          background:
            linear-gradient(
              180deg,
              #08192b,
              #06111f
            );

          border-top:
            1px solid var(--line);

          border-bottom:
            1px solid var(--line);
        }

        .video-header {
          display: grid;

          grid-template-columns:
            .8fr
            1.2fr;

          gap: 80px;

          margin-bottom: 55px;
        }

        .video-label {
          color: var(--gold);

          font-size: 9px;
          font-weight: 700;

          letter-spacing: .25em;
          text-transform: uppercase;
        }

        .video-title {
          margin: 15px 0 0;

          font-family:
            "Playfair Display",
            Georgia,
            serif;

          font-size:
            clamp(
              48px,
              6vw,
              80px
            );

          line-height: .9;

          font-weight: 500;

          letter-spacing: -.045em;
        }

        .video-title span {
          color: var(--blue-soft);
          font-style: italic;
        }

        .video-intro {
          max-width: 560px;

          align-self: end;

          color: var(--muted);

          font-size: 14px;

          line-height: 2;
        }

        .video-grid {
          display: grid;

          grid-template-columns:
            repeat(2, 1fr);

          gap: 24px;
        }

        .video-card {
          background: #09192b;

          border:
            1px solid var(--line);

          overflow: hidden;
        }

        .video-media-wrap {
          position: relative;

          aspect-ratio: 16 / 9;

          background: #020b15;
        }

        .video-player {
          width: 100%;
          height: 100%;

          border: 0;

          display: block;

          object-fit: cover;
        }

        .video-card-info {
          padding: 25px 28px 30px;
        }

        .video-card-category {
          color: var(--gold);

          font-size: 8px;
          font-weight: 700;

          letter-spacing: .22em;
          text-transform: uppercase;
        }

        .video-card-title {
          margin: 10px 0 0;

          font-family:
            "Playfair Display",
            Georgia,
            serif;

          font-size: 30px;

          font-weight: 500;
        }

        .video-card-description {
          margin: 12px 0 0;

          color: var(--muted);

          font-size: 12px;

          line-height: 1.8;
        }

        /* =====================================
           EMPTY / LOADING
        ===================================== */

        .media-placeholder {
          display: flex;

          flex-direction: column;

          align-items: center;
          justify-content: center;

          background:
            radial-gradient(
              circle,
              rgba(77,156,255,.1),
              transparent 55%
            ),
            #091a2c;

          color: var(--gold);

          font-family:
            "Playfair Display",
            Georgia,
            serif;

          font-size: 30px;
        }

        .media-placeholder small {
          margin-top: 8px;

          color: var(--muted2);

          font-family:
            "Manrope",
            sans-serif;

          font-size: 8px;

          letter-spacing: .25em;
        }

        .video-placeholder {
          width: 100%;
          height: 100%;

          display: flex;

          flex-direction: column;

          align-items: center;
          justify-content: center;

          gap: 12px;

          color: var(--muted2);

          font-size: 9px;
          letter-spacing: .2em;
        }

        .video-placeholder-icon {
          width: 50px;
          height: 50px;

          display: flex;
          align-items: center;
          justify-content: center;

          border:
            1px solid var(--gold);

          border-radius: 50%;

          color: var(--gold);
        }

        .loading {
          padding: 100px 0;

          color: var(--gold);

          font-family:
            "Playfair Display",
            Georgia,
            serif;

          text-align: center;

          font-size: 28px;
        }

        .error {
          padding: 20px;

          border:
            1px solid
            rgba(200,170,110,.25);

          background:
            rgba(200,170,110,.04);

          color: var(--gold-soft);

          font-size: 13px;
        }

        .empty {
          padding: 90px 20px;

          border:
            1px solid var(--line);

          text-align: center;

          color: var(--muted);
        }

        /* =====================================
           FOOTER STATEMENT
        ===================================== */

        .closing {
          padding: 135px 0;

          text-align: center;
        }

        .closing-label {
          color: var(--gold);

          font-size: 9px;
          font-weight: 700;

          letter-spacing: .3em;
          text-transform: uppercase;
        }

        .closing h2 {
          max-width: 850px;

          margin: 25px auto 0;

          font-family:
            "Playfair Display",
            Georgia,
            serif;

          font-size:
            clamp(
              50px,
              7vw,
              100px
            );

          line-height: .9;

          font-weight: 500;

          letter-spacing: -.05em;
        }

        .closing h2 span {
          color: var(--blue-soft);
          font-style: italic;
        }

        .closing-line {
          width: 100px;
          height: 1px;

          margin:
            40px auto 0;

          background:
            linear-gradient(
              90deg,
              transparent,
              var(--gold),
              transparent
            );
        }

        /* =====================================
           RESPONSIVE
        ===================================== */

        @media (max-width: 1000px) {

          .events-wrap {
            width:
              min(
                calc(100% - 42px),
                1320px
              );
          }

          .intro {
            grid-template-columns: 1fr;
            gap: 35px;
          }

          .event-nav-top {
            flex-direction: column;
            align-items: flex-start;
          }

          .featured-event {
            grid-template-columns: 1fr;
          }

          .featured-media,
          .featured-media .event-image,
          .featured-media .drive-media,
          .featured-media .media-placeholder {
            min-height: 430px;
          }

          .image-grid {
            grid-template-columns:
              repeat(2, 1fr);
          }

          .image-card:nth-child(2),
          .image-card:nth-child(3) {
            transform: none;
          }

          .video-header {
            grid-template-columns: 1fr;
            gap: 30px;
          }
        }

        @media (max-width: 650px) {

          .events-wrap {
            width:
              calc(100% - 28px);
          }

          .events-hero {
            min-height: 650px;
          }

          .hero-title {
            font-size: 70px;
          }

          .hero-title span {
            margin-left: 3%;
          }

          .hero-description {
            font-size: 13px;
          }

          .hero-glow {
            right: -260px;
          }

          .intro {
            padding: 80px 0;
          }

          .intro-title {
            font-size: 48px;
          }

          .event-navigation {
            padding-top: 55px;
          }

          .category-list {
            width: 100%;
          }

          .category-button {
            flex: 1;
          }

          .media-section {
            padding-bottom: 75px;
          }

          .featured-media,
          .featured-media .event-image,
          .featured-media .drive-media,
          .featured-media .media-placeholder {
            min-height: 300px;
          }

          .featured-info {
            padding: 38px 25px 45px;
          }

          .featured-title {
            font-size: 46px;
          }

          .featured-details {
            margin-top: 35px;
          }

          .image-grid {
            grid-template-columns: 1fr;
          }

          .image-card {
            min-height: 370px;
          }

          .video-section {
            margin-top: 55px;

            padding:
              80px 0
              85px;
          }

          .video-grid {
            grid-template-columns: 1fr;
          }

          .video-title {
            font-size: 55px;
          }

          .closing {
            padding: 90px 0;
          }

          .closing h2 {
            font-size: 56px;
          }
        }
      `}),(0,j.jsxs)(`section`,{className:`events-hero`,children:[(0,j.jsx)(`div`,{className:`hero-lines`}),(0,j.jsx)(`div`,{className:`hero-glow`}),(0,j.jsx)(`div`,{className:`hero-ring`}),(0,j.jsxs)(`div`,{className:`events-wrap hero-content`,children:[(0,j.jsxs)(`div`,{className:`hero-mini`,children:[(0,j.jsx)(`span`,{className:`hero-mini-line`}),`HRA GROUPS / EVENTS`]}),(0,j.jsxs)(`h1`,{className:`hero-title`,children:[`Experiences`,(0,j.jsx)(`span`,{children:`worth remembering.`})]}),(0,j.jsx)(`p`,{className:`hero-description`,children:`Explore the moments, conversations, challenges and collaborations that bring the HRA Groups ecosystem together.`})]}),(0,j.jsxs)(`div`,{className:`events-wrap hero-bottom`,children:[(0,j.jsxs)(`div`,{className:`hero-scroll`,children:[(0,j.jsx)(`span`,{className:`hero-scroll-line`}),`Explore collection`]}),(0,j.jsx)(`div`,{className:`hero-number`,children:String(e.length).padStart(2,`0`)})]})]}),(0,j.jsxs)(`section`,{className:`events-wrap intro`,children:[(0,j.jsxs)(`div`,{children:[(0,j.jsx)(`div`,{className:`section-label`,children:`01 / EVENTS`}),(0,j.jsxs)(`h2`,{className:`intro-title`,children:[`More than`,(0,j.jsx)(`br`,{}),(0,j.jsx)(`span`,{children:`an event.`})]})]}),(0,j.jsxs)(`div`,{className:`intro-copy`,children:[`From national hackathons to workshops, bootcamps and industry conversations, our events are designed to create meaningful spaces for people to connect, learn and create.`,(0,j.jsx)(`br`,{}),(0,j.jsx)(`br`,{}),`Browse the collection below and explore the stories behind the experiences.`]})]}),!i&&e.length>0&&(0,j.jsx)(`section`,{className:`events-wrap event-navigation`,children:(0,j.jsxs)(`div`,{className:`event-nav-top`,children:[(0,j.jsxs)(`div`,{children:[(0,j.jsx)(`div`,{className:`section-label`,children:`COLLECTION`}),(0,j.jsx)(`h2`,{className:`event-nav-heading`,children:`Explore events`})]}),(0,j.jsx)(`div`,{className:`category-list`,children:c.map(e=>(0,j.jsx)(`button`,{className:`category-button ${n===e?`active`:``}`,onClick:()=>r(e),children:e},e))})]})}),(0,j.jsxs)(`section`,{className:`events-wrap media-section`,children:[(0,j.jsxs)(`div`,{className:`section-heading`,children:[(0,j.jsxs)(`div`,{className:`section-heading-left`,children:[(0,j.jsx)(`span`,{className:`section-index`,children:`01`}),(0,j.jsx)(`h2`,{children:`Event Moments`})]}),(0,j.jsx)(`div`,{className:`section-heading-right`,children:`Photography / Gallery`})]}),i&&(0,j.jsx)(`div`,{className:`loading`,children:`Loading experiences...`}),!i&&o&&(0,j.jsx)(`div`,{className:`error`,children:o}),!i&&!o&&u.length===0&&(0,j.jsx)(`div`,{className:`empty`,children:`No event images available.`}),!i&&!o&&f&&(0,j.jsxs)(j.Fragment,{children:[(0,j.jsxs)(`article`,{className:`featured-event`,children:[(0,j.jsxs)(`div`,{className:`featured-media`,children:[(0,j.jsx)(Hi,{event:f}),(0,j.jsx)(`div`,{className:`media-overlay`})]}),(0,j.jsxs)(`div`,{className:`featured-info`,children:[(0,j.jsx)(`div`,{className:`event-type`,children:f.category}),(0,j.jsx)(`h3`,{className:`featured-title`,children:f.title}),(0,j.jsx)(`p`,{className:`featured-description`,children:f.description||`A memorable HRA Groups experience bringing people, ideas and technology together.`}),(0,j.jsxs)(`div`,{className:`featured-details`,children:[(0,j.jsxs)(`div`,{children:[(0,j.jsx)(`span`,{className:`detail-label`,children:`Date`}),(0,j.jsx)(`span`,{className:`detail-value`,children:Vi(f.date)})]}),(0,j.jsxs)(`div`,{children:[(0,j.jsx)(`span`,{className:`detail-label`,children:`Format`}),(0,j.jsx)(`span`,{className:`detail-value`,children:`Live Experience`})]})]}),(0,j.jsx)(`div`,{className:`featured-number`,children:`01`})]})]}),p.length>0&&(0,j.jsx)(`div`,{className:`image-grid`,children:p.map((e,t)=>(0,j.jsxs)(`article`,{className:`image-card`,children:[(0,j.jsx)(`div`,{className:`image-card-media`,children:(0,j.jsx)(Hi,{event:e})}),(0,j.jsx)(`div`,{className:`image-card-overlay`}),(0,j.jsxs)(`div`,{className:`image-card-info`,children:[(0,j.jsx)(`div`,{className:`image-card-category`,children:e.category}),(0,j.jsx)(`div`,{className:`image-card-title`,children:e.title}),(0,j.jsx)(`div`,{className:`image-card-date`,children:Vi(e.date)})]})]},e.id))})]})]}),!i&&!o&&(0,j.jsx)(`section`,{className:`video-section`,children:(0,j.jsxs)(`div`,{className:`events-wrap`,children:[(0,j.jsxs)(`div`,{className:`video-header`,children:[(0,j.jsxs)(`div`,{children:[(0,j.jsx)(`div`,{className:`video-label`,children:`02 / VIDEO STORIES`}),(0,j.jsxs)(`h2`,{className:`video-title`,children:[`Watch the`,(0,j.jsx)(`br`,{}),(0,j.jsx)(`span`,{children:`experience.`})]})]}),(0,j.jsx)(`p`,{className:`video-intro`,children:`Go beyond the photographs. Discover event highlights, conversations, presentations and moments captured on video.`})]}),d.length===0?(0,j.jsx)(`div`,{className:`empty`,children:`No event videos available yet.`}):(0,j.jsx)(`div`,{className:`video-grid`,children:d.map(e=>(0,j.jsxs)(`article`,{className:`video-card`,children:[(0,j.jsx)(`div`,{className:`video-media-wrap`,children:(0,j.jsx)(Ui,{event:e})}),(0,j.jsxs)(`div`,{className:`video-card-info`,children:[(0,j.jsx)(`div`,{className:`video-card-category`,children:e.category}),(0,j.jsx)(`h3`,{className:`video-card-title`,children:e.title}),e.description&&(0,j.jsx)(`p`,{className:`video-card-description`,children:e.description})]})]},e.id))})]})}),(0,j.jsx)(`section`,{className:`closing`,children:(0,j.jsxs)(`div`,{className:`events-wrap`,children:[(0,j.jsx)(`div`,{className:`closing-label`,children:`HRA GROUPS / COMMUNITY`}),(0,j.jsxs)(`h2`,{children:[`Where ideas meet`,(0,j.jsx)(`br`,{}),(0,j.jsx)(`span`,{children:`people.`})]}),(0,j.jsx)(`div`,{className:`closing-line`})]})})]})}var Gi=`/assets/Hacakthon1winners-BIE5bY7A.png`,Ki=`/assets/Hackathon2winners-C8RN2uJw.png`;