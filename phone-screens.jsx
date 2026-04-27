// Phone screen mocks — simplified versions of the three screens

const FolioColors = {
  paper: '#F2EDE2',
  paper2: '#EAE3D3',
  ink: '#1A1815',
  inkMute: '#6B645A',
  amber: '#B8884A',
  amberSoft: '#D9BE8E',
  card: '#FFFFFF',
};

const Pill = ({ children, active, icon }) => (
  <div style={{
    display: 'inline-flex', alignItems: 'center', gap: 4,
    padding: '7px 12px', borderRadius: 999,
    background: active ? FolioColors.ink : FolioColors.card,
    color: active ? FolioColors.paper : FolioColors.ink,
    fontSize: 13, fontWeight: 500,
    border: active ? 'none' : '1px solid rgba(0,0,0,0.06)',
  }}>
    {icon && <span style={{fontSize: 13}}>{icon}</span>}
    {children}
  </div>
);

const TabBar = ({ active }) => (
  <div style={{
    display: 'flex', justifyContent: 'space-around',
    padding: '14px 24px 26px', borderTop: '1px solid rgba(0,0,0,0.06)',
    background: FolioColors.paper,
  }}>
    {[
      {id: 'explore', label: '探索', icon: '◐'},
      {id: 'create', label: '建立', icon: '⊕'},
      {id: 'me', label: '我的', icon: '○'},
    ].map(t => (
      <div key={t.id} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4}}>
        <div style={{
          width: 28, height: 28, borderRadius: '50%',
          background: active === t.id ? 'rgba(0,0,0,0.06)' : 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16, color: FolioColors.ink,
        }}>{t.icon}</div>
        <div style={{fontSize: 10, color: active === t.id ? FolioColors.ink : FolioColors.inkMute}}>{t.label}</div>
      </div>
    ))}
  </div>
);

// Screen 1 — Explore
function ExploreScreen() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', height: '100%', background: FolioColors.paper}}>
      <div style={{padding: '24px 22px 0'}}>
        <h1 style={{fontSize: 28, fontWeight: 700, margin: 0, color: FolioColors.ink}}>探索</h1>
        <p style={{fontSize: 12, color: FolioColors.inkMute, margin: '4px 0 18px'}}>找到和你目標相同的夥伴</p>
        <div style={{display: 'flex', gap: 7, marginBottom: 18}}>
          <Pill>全部</Pill>
          <Pill active icon="📚">書</Pill>
          <Pill icon="📝">考試</Pill>
          <Pill icon="🎓">課程</Pill>
        </div>
      </div>
      <div style={{padding: '0 22px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1}}>
        {[
          {title: '原子習慣', body: '我拖延了三年，想用這本書改變習慣，希望找個夥伴互相監督，每週分享進度。', time: '約 2 小時 前', milestones: 4},
          {title: '人類大命運', body: '讀完《人類大歷史》後意猶未盡，想和同樣喜歡宏觀思考的人一起繼續。', time: '約 2 日 前', milestones: 4},
        ].map(c => (
          <div key={c.title} style={{
            background: FolioColors.card, borderRadius: 14, padding: 16,
            border: '1px solid rgba(0,0,0,0.04)',
          }}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10}}>
              <div style={{display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 999, background: FolioColors.paper2, fontSize: 11, fontWeight: 500}}>
                📚 書
              </div>
              <span style={{fontSize: 10, color: FolioColors.inkMute}}>{c.time}</span>
            </div>
            <h3 style={{margin: '0 0 6px', fontSize: 17, fontWeight: 700}}>{c.title}</h3>
            <p style={{margin: '0 0 10px', fontSize: 12, color: FolioColors.inkMute, lineHeight: 1.5}}>{c.body}</p>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(0,0,0,0.04)', paddingTop: 8, fontSize: 11, color: FolioColors.inkMute}}>
              <span>⚑ {c.milestones} 個里程碑</span>
              <span>›</span>
            </div>
          </div>
        ))}
      </div>
      <TabBar active="explore" />
    </div>
  );
}

// Screen 2 — Create
function CreateScreen() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', height: '100%', background: FolioColors.paper}}>
      <div style={{padding: '24px 22px 18px', flex: 1, overflow: 'hidden'}}>
        <h1 style={{fontSize: 26, fontWeight: 700, margin: 0}}>建立貼文</h1>
        <p style={{fontSize: 12, color: FolioColors.inkMute, margin: '4px 0 22px'}}>寫下你的學習動機，找到對的夥伴</p>

        <label style={{fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 8}}>類型</label>
        <div style={{display: 'flex', gap: 7, marginBottom: 18}}>
          <Pill active icon="📚">書</Pill>
          <Pill icon="📝">考試</Pill>
          <Pill icon="🎓">課程</Pill>
        </div>

        <label style={{fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 8}}>書名 / 考試 / 課程</label>
        <div style={{padding: '13px 14px', background: FolioColors.card, borderRadius: 12, fontSize: 13, color: FolioColors.inkMute, marginBottom: 16}}>
          例：原子習慣、多益 900 分、Andrew N…
        </div>

        <label style={{fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4}}>為什麼要學這個？</label>
        <p style={{fontSize: 11, color: FolioColors.inkMute, margin: '0 0 8px'}}>這就是你的自我介紹，誠實地寫</p>
        <div style={{padding: '14px', background: FolioColors.card, borderRadius: 12, fontSize: 13, color: FolioColors.inkMute, height: 86, marginBottom: 16, lineHeight: 1.5}}>
          你希望從這本書/課程/考試得到什麼？為什麼現在？
        </div>

        <label style={{fontSize: 12, fontWeight: 600, display: 'block', marginBottom: 4}}>里程碑數量</label>
        <p style={{fontSize: 11, color: FolioColors.inkMute, margin: '0 0 8px'}}>完成幾個里程碑後可以選擇揭露身份</p>
        <div style={{display: 'flex', gap: 8}}>
          {[4,6,8,12].map((n,i) => (
            <div key={n} style={{
              width: 44, height: 44, borderRadius: 10,
              background: i === 0 ? FolioColors.ink : FolioColors.card,
              color: i === 0 ? FolioColors.paper : FolioColors.ink,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 600, fontSize: 15,
            }}>{n}</div>
          ))}
        </div>
      </div>
      <TabBar active="create" />
    </div>
  );
}

// Screen 3 — Me
function MeScreen() {
  return (
    <div style={{display: 'flex', flexDirection: 'column', height: '100%', background: FolioColors.paper}}>
      <div style={{padding: '24px 22px', flex: 1}}>
        <div style={{fontSize: 18, fontWeight: 700, marginBottom: 22, color: FolioColors.ink}}>Folio</div>

        <div style={{fontSize: 14, fontWeight: 600, marginBottom: 12}}>學習配對</div>
        <div style={{
          background: FolioColors.card, borderRadius: 14, padding: 16, marginBottom: 22,
        }}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8}}>
            <div style={{display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 999, background: FolioColors.paper2, fontSize: 11, fontWeight: 500}}>🎓 課程</div>
            <div style={{padding: '4px 10px', borderRadius: 999, background: 'rgba(184,136,74,0.15)', fontSize: 11, color: FolioColors.amber, fontWeight: 500}}>夥伴 A</div>
          </div>
          <h3 style={{margin: '0 0 10px', fontSize: 16, fontWeight: 700}}>Andrew Ng 機器學習課程</h3>
          <div style={{height: 4, background: 'rgba(0,0,0,0.06)', borderRadius: 2, marginBottom: 8, overflow: 'hidden'}}>
            <div style={{width: '33%', height: '100%', background: FolioColors.amber}} />
          </div>
          <div style={{fontSize: 11, color: FolioColors.inkMute}}>2 / 6 里程碑</div>
        </div>

        <div style={{fontSize: 14, fontWeight: 600, marginBottom: 12}}>我的貼文</div>
        <div style={{
          background: FolioColors.card, borderRadius: 14, padding: '14px 16px',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 999, background: FolioColors.paper2, fontSize: 11, fontWeight: 500}}>📚 書</div>
          <span style={{fontSize: 14, fontWeight: 600, flex: 1}}>刻意練習</span>
          <span style={{padding: '4px 10px', borderRadius: 999, background: 'rgba(184,136,74,0.15)', fontSize: 11, color: FolioColors.amber}}>2 個申請</span>
          <span style={{color: FolioColors.inkMute}}>›</span>
        </div>
      </div>
      <TabBar active="me" />
    </div>
  );
}

window.ExploreScreen = ExploreScreen;
window.CreateScreen = CreateScreen;
window.MeScreen = MeScreen;
