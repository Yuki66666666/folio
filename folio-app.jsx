// Folio Landing Page — main React app

const { useState, useEffect, useRef } = React;

// ─────────────────────────────────────────────────────────────
// Tiny iPhone frame
// ─────────────────────────────────────────────────────────────
function MiniPhone({ children, scale = 1, onClick }) {
  const W = 280, H = 580;
  return (
    <div
      onClick={onClick}
      style={{
        width: W * scale, height: H * scale,
        position: 'relative', cursor: onClick ? 'pointer' : 'default',
        transform: `scale(${scale})`, transformOrigin: 'top center',
        marginBottom: scale < 1 ? -(H * (1 - scale)) : 0,
      }}
    >
      <div style={{
        width: W, height: H,
        borderRadius: 42,
        background: '#1A1815',
        padding: 8,
        boxShadow: '0 30px 60px -20px rgba(26,24,21,0.35), 0 0 0 1px rgba(0,0,0,0.1)',
        position: 'relative',
      }}>
        <div style={{
          width: '100%', height: '100%',
          borderRadius: 34,
          overflow: 'hidden',
          background: '#F2EDE2',
          position: 'relative',
        }}>
          {/* Notch */}
          <div style={{
            position: 'absolute', top: 6, left: '50%',
            transform: 'translateX(-50%)',
            width: 96, height: 26, borderRadius: 14,
            background: '#1A1815', zIndex: 10,
          }} />
          {/* Status bar */}
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            padding: '12px 24px 6px',
            fontSize: 12, fontWeight: 600,
            position: 'relative', zIndex: 5,
          }}>
            <span>9:43</span>
            <span style={{display: 'flex', gap: 4, alignItems: 'center'}}>
              <span style={{fontSize: 9}}>●●●●</span>
              <span>📶</span>
              <span>🔋</span>
            </span>
          </div>
          <div style={{height: 'calc(100% - 36px)', overflow: 'hidden', position: 'relative'}}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Reveal wrapper — fades in on scroll
// ─────────────────────────────────────────────────────────────
function Reveal({ children, stagger = false, threshold = 0.18, className = '', style, as: Tag = 'div' }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setShown(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return (
    <Tag
      ref={ref}
      className={`${stagger ? 'reveal-stagger' : 'reveal'} ${shown ? 'in' : ''} ${className}`}
      style={style}
    >
      {children}
    </Tag>
  );
}

// ─────────────────────────────────────────────────────────────
// HERO — book that opens as you scroll
// ─────────────────────────────────────────────────────────────
function Hero() {
  const stageRef = useRef(null);
  const [openness, setOpenness] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = stageRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh * 0.6;
      const progressed = Math.max(0, vh * 0.2 - rect.top);
      const k = Math.min(1, Math.max(0, progressed / total * 1.6));
      setOpenness(k);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const coverRot = -openness * 168;
  const liftY = -openness * 16;
  const titleOpacity = Math.max(0, 1 - openness * 1.6);

  return (
    <section className="hero" ref={stageRef}>
      <div className="hero-stage">
        <div
          className="book"
          style={{
            transform: `translateY(${liftY}px) rotateX(${openness * -2}deg)`,
            transition: 'transform 0.4s ease-out',
          }}
        >
          {/* Left page (visible once book opens) */}
          <div className="book-page book-page-left">
            <div>
              <div style={{fontFamily: 'var(--garamond)', fontStyle: 'italic', fontSize: 13, color: 'var(--ink-mute)', letterSpacing: '0.18em', marginBottom: 24}}>
                — i —
              </div>
              <div style={{fontFamily: 'var(--garamond)', fontStyle: 'italic', fontSize: 13, color: 'var(--ink-mute)', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 14}}>
                Preface
              </div>
              <h1 className="hero-h1">
                你讀的書，<br/>
                <span className="ital">就是你的</span><br/>
                自我介紹。
              </h1>
              <p className="hero-tagline" style={{marginTop: 24}}>
                Folio 是一個讀書交友 app。<br/>
                先匿名，一起讀完一本書，<br/>
                再決定要不要認識彼此。
              </p>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end'}}>
              <span style={{fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.3em', color: 'var(--ink-mute)'}}>EST. 2026</span>
              <span style={{fontFamily: 'var(--garamond)', fontStyle: 'italic', fontSize: 12, color: 'var(--ink-mute)'}}>i</span>
            </div>
          </div>

          {/* Right cover that opens */}
          <div
            className="book-cover"
            style={{
              transform: `rotateY(${coverRot}deg)`,
              transition: 'transform 0.5s cubic-bezier(.2,.7,.2,1)',
            }}
          >
            {/* Front face */}
            <div style={{
              position: 'absolute', inset: 0,
              padding: '38px 40px',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              backfaceVisibility: 'hidden',
              opacity: titleOpacity,
              background: 'linear-gradient(180deg, rgba(0,0,0,0.04), transparent 30%, rgba(0,0,0,0.05)), var(--paper-deep)',
            }}>
              <div>
                <div className="cover-tag">A reading-first social app</div>
                <div className="cover-rule" style={{marginTop: 14, marginBottom: 36}} />
                <h2 className="cover-title">
                  Folio<span className="amp">.</span>
                </h2>
                <p style={{
                  marginTop: 18,
                  fontFamily: 'var(--garamond)',
                  fontStyle: 'italic',
                  fontSize: 17,
                  color: 'var(--ink-soft)',
                }}>
                  for those who'd rather <br/>finish a book together.
                </p>
              </div>
              <div className="cover-meta">
                <span>Vol. 01 — Spring '26</span>
                <span>Closed beta · waitlist open</span>
              </div>
            </div>
            {/* Back of cover (inside) */}
            <div className="book-cover-inner">
              <div style={{fontFamily: 'var(--garamond)', fontStyle: 'italic', fontSize: 13, color: 'var(--ink-mute)', letterSpacing: '0.18em'}}>
                — endpaper —
              </div>
              <div style={{
                fontFamily: 'var(--serif)', fontSize: 22, lineHeight: 1.5,
                fontWeight: 400, color: 'var(--ink-soft)',
                fontStyle: 'italic',
              }}>
                "We read to know <br/>we are not alone."
              </div>
              <div style={{
                fontFamily: 'var(--garamond)', fontStyle: 'italic',
                fontSize: 12, color: 'var(--ink-mute)',
              }}>
                — C.S. Lewis (apocryphal)
              </div>
            </div>
          </div>

          <div className="book-spine" style={{opacity: 1 - openness * 0.6}} />
        </div>

        {openness < 0.2 && (
          <div className="scroll-hint">
            <span>Scroll to open</span>
            <div className="line" />
          </div>
        )}

        {/* Edge bookmark ribbon */}
        <div style={{
          position: 'absolute',
          right: 'calc(50% - min(820px, 88vw)/2 + 60px)',
          top: 0,
          width: 12,
          height: 240,
          background: 'var(--amber)',
          opacity: openness > 0.5 ? 1 : 0,
          transition: 'opacity 0.6s',
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 90%, 0 100%)',
          zIndex: 5,
          pointerEvents: 'none',
        }} />
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// Two-column intro
// ─────────────────────────────────────────────────────────────
function Intro() {
  return (
    <section className="section">
      <Reveal>
        <div className="section-num">CHAPTER ONE</div>
        <div className="two-col" style={{marginTop: 32}}>
          <div className="left">
            <div className="eyebrow">the premise</div>
            <h2 className="h-section">
              交友軟體告訴你<br/>
              <span style={{fontFamily: 'var(--garamond)', fontStyle: 'italic', color: 'var(--amber)'}}>長相</span>。<br/>
              Folio 想知道<br/>
              你在<span style={{fontFamily: 'var(--garamond)', fontStyle: 'italic', color: 'var(--amber)'}}>讀什麼</span>。
            </h2>
          </div>
          <div className="right">
            <p className="body-lg dropcap">
              我們相信，一個人正在讀的書，比他十張自拍說得更多。在 Folio，你不是先看到一張臉、再決定要不要聊天——你是先選一本你想讀完的書，然後在書裡找到一個願意跟你慢慢讀的人。
            </p>
            <p className="body-lg" style={{marginTop: 24}}>
              讀完之前，沒有名字、沒有照片、沒有 Instagram。只有你們約好一起翻的那 280 頁，和路上忍不住想分享的句子。
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// HOW IT WORKS — three steps
// ─────────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    {
      n: 'I',
      title: '挑一本書，貼出邀請',
      body: '寫下你想讀的書、為什麼想讀、希望幾天讀完。這就是你的自我介紹——比履歷誠實，比 bio 有趣。',
    },
    {
      n: 'II',
      title: '匿名配對，一起翻頁',
      body: '想讀同一本書的人會看到你。配對成功後你們以「夥伴 A / B」相稱，每天（或每週）共讀一個章節，可以聊書、聊別的，但不能交換身份。',
    },
    {
      n: 'III',
      title: '讀完了，再決定要不要認識',
      body: '到達最後一個里程碑時，你們各自選擇是否揭露身份。雙方同意，才看見對方的名字、照片、聯絡方式。',
    },
  ];
  return (
    <section className="section" id="how">
      <Reveal>
        <div className="section-num">CHAPTER TWO</div>
        <div className="eyebrow" style={{marginTop: 24}}>how it works</div>
        <h2 className="h-section">三件事，<span style={{fontFamily: 'var(--garamond)', fontStyle: 'italic', color: 'var(--amber)'}}>不多不少</span>。</h2>
      </Reveal>
      <Reveal stagger>
        <div className="steps">
          {steps.map(s => (
            <div key={s.n} className="step">
              <div className="step-num">{s.n}</div>
              <h3 className="step-title">{s.title}</h3>
              <p className="step-body">{s.body}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// WHY ANONYMOUS — dialogue
// ─────────────────────────────────────────────────────────────
function WhyAnonymous() {
  return (
    <section className="section" id="why">
      <Reveal>
        <div className="section-num">CHAPTER THREE</div>
        <div className="eyebrow" style={{marginTop: 24}}>why anonymous</div>
        <h2 className="h-section">先讀完，<br/>再相認。</h2>
      </Reveal>
      <Reveal stagger>
        <div className="dialogue">
          <div className="col">
            <div className="label">— 一般 dating app —</div>
            <p className="quote crossed">
              先看臉，<br/>
              再看 bio，<br/>
              再決定要不要聊。
            </p>
            <p className="attr">三秒鐘的判斷，三句話的對話。</p>
          </div>
          <div className="col">
            <div className="label">— Folio —</div>
            <p className="quote">
              先一起讀，<br/>
              再一起想，<br/>
              <span style={{fontFamily: 'var(--garamond)', fontStyle: 'italic', color: 'var(--amber)'}}>讀完才相認。</span>
            </p>
            <p className="attr">用一本書的時間，認識一個人的腦袋。</p>
          </div>
        </div>
      </Reveal>
      <Reveal>
        <p className="body-lg" style={{maxWidth: 680, marginTop: 80, marginInline: 'auto', textAlign: 'center', fontStyle: 'italic', fontFamily: 'var(--serif)'}}>
          匿名不是要你藏起來。是讓你不必先包裝自己——讓對方先聽見你怎麼想，再看見你長怎樣。
        </p>
      </Reveal>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// MILESTONES — chapter rail
// ─────────────────────────────────────────────────────────────
function Milestones() {
  const railRef = useRef(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setActive(true); obs.disconnect(); }
    }, { threshold: 0.4 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const stops = [
    { label: 'Ch. 1', name: '配對成立', pct: 0, top: '夥伴 A 接受你的邀請' },
    { label: 'Ch. 2', name: '第一個里程碑', pct: 25, top: '讀到 25%' },
    { label: 'Ch. 3', name: '第二個里程碑', pct: 50, top: '讀到 50%' },
    { label: 'Ch. 4', name: '第三個里程碑', pct: 75, top: '讀到 75%' },
    { label: 'Ch. 5', name: '完成 · 揭露', pct: 100, top: '雙方同意 → 認識本人' },
  ];

  return (
    <section className="section" id="milestones">
      <Reveal>
        <div className="section-num">CHAPTER FOUR</div>
        <div className="eyebrow" style={{marginTop: 24}}>milestones</div>
        <h2 className="h-section">每一章，都是一次<br/><span style={{fontFamily: 'var(--garamond)', fontStyle: 'italic', color: 'var(--amber)'}}>更靠近</span>。</h2>
        <p className="body-lg" style={{maxWidth: 620, marginTop: 24}}>
          建立貼文時，你決定要把這本書切成幾個里程碑（4 / 6 / 8 / 12）。每完成一個，雙方都會收到一個提示——你們可以選擇繼續匿名，或在最後一站決定揭露彼此。
        </p>
      </Reveal>
      <div className="chapter-rail" ref={railRef}>
        <div className="rail-line" />
        <div className="rail-progress" style={{ transform: active ? 'scaleX(1)' : 'scaleX(0)' }} />
        <div className="rail-stops">
          {stops.map((s, i) => (
            <div
              key={i}
              className={`stop ${active && i < 4 ? 'done' : ''} ${active && i === 4 ? 'reveal' : ''}`}
              style={{ transitionDelay: `${i * 0.18}s` }}
            >
              <div className="stop-top">{s.top}</div>
              <div className="stop-dot" style={{ transitionDelay: `${i * 0.18}s` }} />
              <div className="stop-label">{s.label}</div>
              <div className="stop-name">{s.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// PHONES SHOWCASE — scroll-pinned single-phone reveal
// ─────────────────────────────────────────────────────────────
function PhonesShowcase() {
  const screens = [
    { title: '探索', sub: '看到所有正在等夥伴的書、考試、課程貼文。', component: 'ExploreScreen' },
    { title: '建立', sub: '寫下你想讀什麼、為什麼、要切成幾個里程碑。', component: 'CreateScreen' },
    { title: '我的', sub: '正在配對中的書、累積的進度、收到的申請。', component: 'MeScreen' },
  ];

  const wrapRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.min(total, Math.max(0, -rect.top));
      const k = (scrolled / total) * screens.length;
      setProgress(Math.max(0, Math.min(screens.length - 0.0001, k)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [screens.length]);

  const renderScreen = (name) => {
    const C = window[name];
    return C ? <C /> : null;
  };

  return (
    <section
      id="screens"
      ref={wrapRef}
      style={{
        position: 'relative',
        height: `${100 + screens.length * 100}vh`,
      }}
    >
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <div style={{
          maxWidth: 1280, width: '100%',
          padding: '0 40px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 80,
          alignItems: 'center',
        }}>
          {/* Left: title + scrolling captions */}
          <div style={{position: 'relative'}}>
            <div className="section-num">CHAPTER FIVE</div>
            <div className="eyebrow" style={{marginTop: 24}}>the app</div>
            <h2 className="h-section" style={{marginBottom: 12}}>
              三個畫面，<br/>
              <span style={{fontFamily: 'var(--garamond)', fontStyle: 'italic', color: 'var(--amber)'}}>一條線</span>串起來。
            </h2>
            <div style={{
              display: 'inline-block',
              padding: '6px 12px',
              border: '1px solid var(--amber)',
              color: 'var(--amber)',
              fontFamily: 'var(--mono)',
              fontSize: 11,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginTop: 8,
              marginBottom: 32,
            }}>
              ● 目前進度 — 開發中
            </div>

            {/* Stacked captions */}
            <div style={{position: 'relative', height: 200}}>
              {screens.map((s, i) => {
                const dist = progress - i;
                const opacity = Math.max(0, 1 - Math.abs(dist) * 1.4);
                const y = dist * -40;
                return (
                  <div
                    key={i}
                    style={{
                      position: 'absolute',
                      top: 0, left: 0, right: 0,
                      opacity,
                      transform: `translateY(${y}px)`,
                      transition: 'opacity 0.4s, transform 0.4s',
                      pointerEvents: opacity > 0.5 ? 'auto' : 'none',
                    }}
                  >
                    <div style={{
                      fontFamily: 'var(--garamond)',
                      fontStyle: 'italic',
                      fontSize: 14,
                      color: 'var(--amber)',
                      marginBottom: 8,
                      letterSpacing: '0.05em',
                    }}>— {String(i + 1).padStart(2, '0')} / {String(screens.length).padStart(2, '0')} —</div>
                    <h3 style={{
                      fontFamily: 'var(--serif)',
                      fontSize: 36,
                      fontWeight: 500,
                      margin: '0 0 12px',
                      letterSpacing: '-0.01em',
                    }}>{s.title}</h3>
                    <p style={{
                      fontFamily: 'var(--sans)',
                      fontSize: 16,
                      lineHeight: 1.7,
                      color: 'var(--ink-soft)',
                      fontWeight: 300,
                      maxWidth: 360,
                      margin: 0,
                    }}>{s.sub}</p>
                  </div>
                );
              })}
            </div>

            {/* Progress dots */}
            <div style={{display: 'flex', gap: 10, marginTop: 32}}>
              {screens.map((_, i) => {
                const isActive = Math.round(progress) === i;
                const isPast = progress > i + 0.5;
                return (
                  <div key={i} style={{
                    width: isActive ? 28 : 8,
                    height: 2,
                    background: isPast || isActive ? 'var(--ink)' : 'rgba(26,24,21,0.25)',
                    transition: 'all 0.4s',
                  }} />
                );
              })}
            </div>
          </div>

          {/* Right: phone stack */}
          <div style={{
            position: 'relative',
            height: 600,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            {screens.map((s, i) => {
              const dist = progress - i;
              const abs = Math.abs(dist);
              const opacity = Math.max(0, 1 - abs * 1.2);
              const scale = 1 - abs * 0.08;
              const y = dist * -60;
              const z = 10 - Math.round(abs * 10);
              return (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    opacity,
                    transform: `translateY(${y}px) scale(${scale})`,
                    transition: 'opacity 0.5s, transform 0.5s',
                    zIndex: z,
                    pointerEvents: abs < 0.5 ? 'auto' : 'none',
                  }}
                >
                  <MiniPhone scale={1}>
                    {renderScreen(s.component)}
                  </MiniPhone>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// WAITLIST
// ─────────────────────────────────────────────────────────────
function Waitlist() {
  const [email, setEmail] = useState('');
  const [book, setBook] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };
  return (
    <section className="waitlist" id="waitlist">
      <div className="waitlist-inner">
        <Reveal>
          <div className="section-num">EPILOGUE</div>
          <div className="eyebrow" style={{marginTop: 24, justifyContent: 'center'}}>join the waitlist</div>
          <h2>
            把你想讀的<br/>
            <span className="ital">第一本書</span>，<br/>
            告訴我們。
          </h2>
          <p className="body-lg" style={{marginTop: 20, maxWidth: 520, marginInline: 'auto'}}>
            Folio 春季開放小規模 beta。我們會根據大家提交的書名挑選第一批共讀組，並寄出邀請。
          </p>
        </Reveal>

        {!submitted ? (
          <Reveal>
            <form className="form-card" onSubmit={onSubmit}>
              <div className="field">
                <label>Email</label>
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="field">
                <label>你想讀的第一本書</label>
                <input
                  type="text"
                  placeholder="《原子習慣》、Sapiens、any title…"
                  value={book}
                  onChange={e => setBook(e.target.value)}
                />
              </div>
              <button className="btn-submit" type="submit">
                <span>送出 — Reserve my seat</span>
                <span className="arrow">→</span>
              </button>
              <p style={{
                fontFamily: 'var(--garamond)', fontStyle: 'italic',
                fontSize: 13, color: 'var(--ink-mute)', textAlign: 'center', marginTop: 4,
              }}>
                我們不寄行銷信。只在 beta 開放時通知你。
              </p>
            </form>
          </Reveal>
        ) : (
          <div className="thanks">
            <div className="seal">F</div>
            <h3>登記完成。</h3>
            <p>
              我們收到了。{book && <React.Fragment>會替你留意 <span style={{color: 'var(--ink)'}}>「{book}」</span> 的共讀組。</React.Fragment>}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// TopFrame + Colophon
// ─────────────────────────────────────────────────────────────
function TopFrame() {
  return (
    <header className="topframe">
      <div className="brand">Folio<span className="dot">.</span></div>
      <nav className="nav">
        <a href="#how">How it works</a>
        <a href="#why">Why anonymous</a>
        <a href="#milestones">Milestones</a>
        <a href="#waitlist" style={{color: 'var(--ink)'}}>Join waitlist →</a>
      </nav>
    </header>
  );
}

function Colophon() {
  return (
    <footer>
      <div className="colophon">
        <div>
          <div className="brand-block">Folio.</div>
          <p style={{fontFamily: 'var(--garamond)', fontStyle: 'italic', marginTop: 6, fontSize: 14}}>
            A reading-first social app. Spring 2026.
          </p>
        </div>
        <div className="meta">
          <span>Set in Noto Serif TC<br/>& EB Garamond</span>
          <span>© MMXXVI</span>
        </div>
      </div>
    </footer>
  );
}

function Corners() {
  const Mark = () => (
    <svg viewBox="0 0 18 18">
      <path d="M0 0 H18 M0 0 V18" stroke="currentColor" strokeWidth="0.8" fill="none" />
    </svg>
  );
  return (
    <React.Fragment>
      <div className="corner tl"><Mark/></div>
      <div className="corner tr"><Mark/></div>
      <div className="corner bl"><Mark/></div>
      <div className="corner br"><Mark/></div>
    </React.Fragment>
  );
}

// ─────────────────────────────────────────────────────────────
// APP ROOT
// ─────────────────────────────────────────────────────────────
function FolioLanding() {
  return (
    <div className="folio-root">
      <Corners />
      <TopFrame />
      <Hero />
      <div className="divider"><div className="line"/><span className="ornament">❦</span><div className="line"/></div>
      <Intro />
      <div className="divider"><div className="line"/><span className="ornament">§</span><div className="line"/></div>
      <HowItWorks />
      <div className="divider"><div className="line"/><span className="ornament">❦</span><div className="line"/></div>
      <WhyAnonymous />
      <div className="divider"><div className="line"/><span className="ornament">§</span><div className="line"/></div>
      <Milestones />
      <div className="divider"><div className="line"/><span className="ornament">❦</span><div className="line"/></div>
      <PhonesShowcase />
      <Waitlist />
      <Colophon />
    </div>
  );
}

window.FolioLanding = FolioLanding;
