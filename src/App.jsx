import React, { useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  Award,
  BadgeCheck,
  BarChart3,
  Bell,
  BookOpen,
  Camera,
  Check,
  ChevronRight,
  CircleUserRound,
  Clock3,
  Flame,
  Gift,
  GraduationCap,
  HeartHandshake,
  Home,
  Leaf,
  LockKeyhole,
  MapPin,
  Medal,
  Play,
  Recycle,
  Search,
  Share2,
  ShieldCheck,
  Sparkles,
  Sprout,
  Star,
  Target,
  Trophy,
  Upload,
  Users,
  X,
  Zap,
} from 'lucide-react';

const challenges = [
  {
    id: 1,
    title: 'Plastic-Free School',
    organizer: 'EcoYouth Cambodia',
    category: 'Waste',
    progress: 64,
    participants: 1284,
    days: 12,
    xp: 350,
    icon: Recycle,
    tone: 'mint',
    description: 'Reduce single-use plastic at school and document your measurable impact.',
  },
  {
    id: 2,
    title: 'Plant 1,000 Trees',
    organizer: 'Green Future NGO',
    category: 'Nature',
    progress: 41,
    participants: 862,
    days: 20,
    xp: 500,
    icon: Sprout,
    tone: 'forest',
    description: 'Join local planting events and help restore community green spaces.',
  },
  {
    id: 3,
    title: 'River Guardian',
    organizer: 'Mekong Action Lab',
    category: 'Water',
    progress: 27,
    participants: 536,
    days: 8,
    xp: 420,
    icon: Sparkles,
    tone: 'blue',
    description: 'Learn about water pollution, then complete a verified cleanup mission.',
  },
];

const peopleLeaderboard = [
  { rank: 1, name: 'Sokha P.', school: 'Preah Sisowath HS', score: 4820, avatar: 'SP' },
  { rank: 2, name: 'Maly S.', school: 'AUPP', score: 4610, avatar: 'MS' },
  { rank: 3, name: 'Dara K.', school: 'Bak Touk HS', score: 4385, avatar: 'DK', current: true },
  { rank: 4, name: 'Rathana C.', school: 'RULE', score: 4170, avatar: 'RC' },
  { rank: 5, name: 'Sreyneang H.', school: 'Zaman International', score: 3990, avatar: 'SH' },
];

const schoolLeaderboard = [
  { rank: 1, name: 'Preah Sisowath High School', members: 226, score: 28440 },
  { rank: 2, name: 'American University of Phnom Penh', members: 174, score: 26180 },
  { rank: 3, name: 'Bak Touk High School', members: 198, score: 23920 },
  { rank: 4, name: 'Royal University of Phnom Penh', members: 152, score: 21870 },
];

const badges = [
  { icon: Recycle, name: 'Plastic Hero', detail: 'Reduced 10 kg of plastic' },
  { icon: Flame, name: '14-Day Streak', detail: 'Stayed active for 2 weeks' },
  { icon: Sprout, name: 'Tree Planter', detail: 'Planted 5 verified trees' },
  { icon: HeartHandshake, name: 'Community Helper', detail: 'Completed 10 volunteer hours' },
];

function App() {
  const [tab, setTab] = useState('home');
  const [challenge, setChallenge] = useState(null);
  const [missionOpen, setMissionOpen] = useState(false);
  const [missionStep, setMissionStep] = useState(0);
  const [xp, setXp] = useState(1250);
  const [completedMission, setCompletedMission] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = (message) => {
    setToast(message);
    window.clearTimeout(window.__greenquestToast);
    window.__greenquestToast = window.setTimeout(() => setToast(''), 2400);
  };

  const openMission = () => {
    setChallenge(null);
    setMissionStep(completedMission ? 3 : 0);
    setMissionOpen(true);
  };

  const finishMission = () => {
    if (!completedMission) setXp((value) => value + 150);
    setCompletedMission(true);
    setMissionStep(3);
    showToast('Mission completed — 150 XP earned!');
  };

  return (
    <div className="app-shell">
      <div className="desktop-note">
        <Leaf size={18} /> Mobile-first prototype · resize your browser to test responsiveness
      </div>

      <main className="phone-app">
        <Header tab={tab} xp={xp} />

        <section className="screen" aria-live="polite">
          {tab === 'home' && (
            <HomeScreen
              xp={xp}
              completedMission={completedMission}
              onOpenMission={openMission}
              onOpenChallenge={setChallenge}
              onChangeTab={setTab}
            />
          )}
          {tab === 'challenges' && (
            <ChallengesScreen onOpenChallenge={setChallenge} />
          )}
          {tab === 'leaderboard' && <LeaderboardScreen />}
          {tab === 'passport' && <PassportScreen xp={xp} showToast={showToast} />}
        </section>

        <BottomNav tab={tab} setTab={setTab} />
      </main>

      {challenge && (
        <ChallengeSheet
          challenge={challenge}
          onClose={() => setChallenge(null)}
          onStart={openMission}
        />
      )}

      {missionOpen && (
        <MissionFlow
          step={missionStep}
          setStep={setMissionStep}
          onClose={() => setMissionOpen(false)}
          onFinish={finishMission}
          completed={completedMission}
        />
      )}

      {toast && (
        <div className="toast" role="status">
          <BadgeCheck size={19} /> {toast}
        </div>
      )}
    </div>
  );
}

function Header({ tab, xp }) {
  const titles = {
    home: 'GreenQuest',
    challenges: 'Challenges',
    leaderboard: 'Leaderboard',
    passport: 'Green Passport',
  };

  return (
    <header className="topbar">
      <div className="brand-group">
        <div className="brand-mark"><Leaf size={20} /></div>
        <div>
          <p className="eyebrow">MAKE IMPACT</p>
          <h1>{titles[tab]}</h1>
        </div>
      </div>
      <div className="top-actions">
        <div className="xp-pill"><Zap size={15} fill="currentColor" /> {xp.toLocaleString()}</div>
        <button className="icon-button" aria-label="Notifications"><Bell size={20} /></button>
      </div>
    </header>
  );
}

function HomeScreen({ xp, completedMission, onOpenMission, onOpenChallenge, onChangeTab }) {
  return (
    <div className="page-stack">
      <section className="welcome-card">
        <div className="welcome-copy">
          <p className="eyebrow light">GOOD AFTERNOON</p>
          <h2>Ready to make an impact, Dara?</h2>
          <div className="level-row">
            <span>Green Explorer · Level 12</span>
            <strong>{xp % 100}/100 XP</strong>
          </div>
          <div className="progress-track dark"><span style={{ width: `${xp % 100}%` }} /></div>
        </div>
        <div className="planet-badge" aria-hidden="true">🌍</div>
      </section>

      <section>
        <SectionHeading title="Your impact" action="View passport" onAction={() => onChangeTab('passport')} />
        <div className="impact-grid">
          <ImpactCard icon={Recycle} value="12.5 kg" label="Plastic reduced" />
          <ImpactCard icon={Clock3} value="18 hrs" label="Volunteer time" />
          <ImpactCard icon={Sprout} value="7" label="Trees planted" />
        </div>
      </section>

      <section className="daily-card">
        <div className="daily-topline">
          <span className="tag amber"><Flame size={14} /> DAILY MISSION</span>
          <span className="streak">🔥 14-day streak</span>
        </div>
        <div className="daily-content">
          <div className="mission-icon"><Recycle size={28} /></div>
          <div className="daily-copy">
            <h3>{completedMission ? 'Mission completed!' : 'Sort It Right'}</h3>
            <p>{completedMission ? 'Your Green Passport has been updated.' : 'Learn how to separate common household waste.'}</p>
            <span><Zap size={14} fill="currentColor" /> {completedMission ? '150 XP earned' : '+150 XP · 4 minutes'}</span>
          </div>
        </div>
        <button className="primary-button full" onClick={onOpenMission}>
          {completedMission ? 'Review mission' : 'Start mission'} <Play size={17} fill="currentColor" />
        </button>
      </section>

      <section>
        <SectionHeading title="Featured challenge" action="See all" onAction={() => onChangeTab('challenges')} />
        <ChallengeCard challenge={challenges[0]} onClick={() => onOpenChallenge(challenges[0])} featured />
      </section>

      <section>
        <SectionHeading title="Opportunities for you" />
        <div className="opportunity-card">
          <div className="opportunity-icon"><GraduationCap size={24} /></div>
          <div>
            <span className="tag soft">GREEN INNOVATION</span>
            <h3>Pitch your climate solution</h3>
            <p>Win mentorship and a scholarship interview.</p>
          </div>
          <ChevronRight size={22} />
        </div>
      </section>
    </div>
  );
}

function ChallengesScreen({ onOpenChallenge }) {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Waste', 'Nature', 'Water'];
  const filtered = filter === 'All' ? challenges : challenges.filter((item) => item.category === filter);

  return (
    <div className="page-stack">
      <div className="search-box">
        <Search size={19} />
        <input aria-label="Search challenges" placeholder="Search challenges or organizers" />
      </div>

      <div className="filter-row" role="tablist" aria-label="Challenge categories">
        {filters.map((item) => (
          <button
            key={item}
            className={`filter-chip ${filter === item ? 'active' : ''}`}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="challenge-banner">
        <div>
          <span className="tag glass"><Trophy size={14} /> SCHOOL CUP</span>
          <h2>Compete together.<br />Impact more.</h2>
          <p>Your school is currently ranked #3.</p>
        </div>
        <div className="banner-medal">🏆</div>
      </div>

      <section>
        <SectionHeading title={`${filtered.length} active challenges`} action="Newest" />
        <div className="card-list">
          {filtered.map((item) => (
            <ChallengeCard key={item.id} challenge={item} onClick={() => onOpenChallenge(item)} />
          ))}
        </div>
      </section>
    </div>
  );
}

function ChallengeCard({ challenge, onClick, featured = false }) {
  const Icon = challenge.icon;
  return (
    <button className={`challenge-card ${featured ? 'featured' : ''}`} onClick={onClick}>
      <div className={`challenge-visual ${challenge.tone}`}>
        <Icon size={featured ? 42 : 34} />
        <span>{challenge.category}</span>
      </div>
      <div className="challenge-body">
        <div className="challenge-meta">
          <span className="tag soft"><ShieldCheck size={13} /> VERIFIED</span>
          <span>{challenge.days} days left</span>
        </div>
        <h3>{challenge.title}</h3>
        <p>by {challenge.organizer}</p>
        <div className="progress-track"><span style={{ width: `${challenge.progress}%` }} /></div>
        <div className="challenge-stats">
          <span><Users size={15} /> {challenge.participants.toLocaleString()}</span>
          <span><Zap size={15} fill="currentColor" /> {challenge.xp} XP</span>
          <strong>{challenge.progress}%</strong>
        </div>
      </div>
    </button>
  );
}

function LeaderboardScreen() {
  const [mode, setMode] = useState('People');
  const data = mode === 'People' ? peopleLeaderboard : schoolLeaderboard;

  return (
    <div className="page-stack">
      <div className="segmented-control">
        {['People', 'Schools'].map((item) => (
          <button key={item} className={mode === item ? 'active' : ''} onClick={() => setMode(item)}>
            {item === 'People' ? <CircleUserRound size={17} /> : <Users size={17} />} {item}
          </button>
        ))}
      </div>

      <section className="league-card">
        <div>
          <p className="eyebrow light">JULY GREEN LEAGUE</p>
          <h2>You are in the top 8%</h2>
          <p>Keep completing verified actions to climb.</p>
        </div>
        <div className="league-rank">#3</div>
      </section>

      {mode === 'People' && (
        <div className="podium">
          <PodiumPerson person={peopleLeaderboard[1]} position="second" />
          <PodiumPerson person={peopleLeaderboard[0]} position="first" />
          <PodiumPerson person={peopleLeaderboard[2]} position="third" />
        </div>
      )}

      <div className="ranking-list">
        {data.map((item) => (
          <div className={`ranking-row ${item.current ? 'current' : ''}`} key={item.name}>
            <span className="rank-number">{item.rank}</span>
            {mode === 'People' ? (
              <div className="avatar">{item.avatar}</div>
            ) : (
              <div className="avatar school"><GraduationCap size={18} /></div>
            )}
            <div className="rank-copy">
              <strong>{item.name}{item.current ? ' · You' : ''}</strong>
              <span>{mode === 'People' ? item.school : `${item.members} active members`}</span>
            </div>
            <div className="rank-score"><Leaf size={14} /> {item.score.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PodiumPerson({ person, position }) {
  return (
    <div className={`podium-person ${position}`}>
      <div className="podium-avatar">{person.avatar}</div>
      {position === 'first' && <span className="crown">👑</span>}
      <strong>{person.name.split(' ')[0]}</strong>
      <small>{person.score.toLocaleString()}</small>
      <div className="podium-block">{person.rank}</div>
    </div>
  );
}

function PassportScreen({ xp, showToast }) {
  return (
    <div className="page-stack passport-page">
      <section className="passport-hero">
        <div className="passport-header-row">
          <span className="tag glass"><BadgeCheck size={14} /> VERIFIED PROFILE</span>
          <button className="icon-button glass-button" onClick={() => showToast('Share link copied')} aria-label="Share passport"><Share2 size={18} /></button>
        </div>
        <div className="profile-avatar">DK<span><Check size={13} /></span></div>
        <h2>Dara Kim</h2>
        <p>Green Explorer · Phnom Penh, Cambodia</p>
        <div className="passport-level">
          <div><strong>Level 12</strong><span>{xp.toLocaleString()} lifetime XP</span></div>
          <div className="progress-track dark"><span style={{ width: `${xp % 100}%` }} /></div>
        </div>
      </section>

      <section>
        <SectionHeading title="Impact overview" />
        <div className="passport-stats">
          <div><strong>12.5<span>kg</span></strong><small>Plastic reduced</small></div>
          <div><strong>18<span>hrs</span></strong><small>Volunteer time</small></div>
          <div><strong>7</strong><small>Trees planted</small></div>
          <div><strong>9</strong><small>Challenges</small></div>
        </div>
      </section>

      <section>
        <SectionHeading title="Achievement badges" action="8 total" />
        <div className="badge-list">
          {badges.map((badge) => {
            const Icon = badge.icon;
            return (
              <div className="badge-row" key={badge.name}>
                <div className="badge-symbol"><Icon size={22} /></div>
                <div><strong>{badge.name}</strong><span>{badge.detail}</span></div>
                <ChevronRight size={19} />
              </div>
            );
          })}
        </div>
      </section>

      <section className="certificate-card">
        <div className="certificate-icon"><Award size={27} /></div>
        <div>
          <span className="tag amber">NEW CERTIFICATE</span>
          <h3>Plastic-Free School Contributor</h3>
          <p>Issued by EcoYouth Cambodia · July 2026</p>
        </div>
        <ChevronRight size={20} />
      </section>
    </div>
  );
}

function ChallengeSheet({ challenge, onClose, onStart }) {
  const Icon = challenge.icon;
  return (
    <div className="overlay" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <article className="bottom-sheet">
        <div className="sheet-handle" />
        <button className="sheet-close" onClick={onClose} aria-label="Close"><X size={20} /></button>
        <div className={`sheet-hero ${challenge.tone}`}>
          <Icon size={52} />
          <span>{challenge.category} challenge</span>
        </div>
        <div className="sheet-content">
          <span className="tag soft"><ShieldCheck size={13} /> VERIFIED ORGANIZER</span>
          <h2>{challenge.title}</h2>
          <p className="organizer">by {challenge.organizer}</p>
          <p>{challenge.description}</p>

          <div className="detail-grid">
            <div><Users size={19} /><strong>{challenge.participants.toLocaleString()}</strong><span>Participants</span></div>
            <div><Clock3 size={19} /><strong>{challenge.days} days</strong><span>Remaining</span></div>
            <div><Zap size={19} /><strong>{challenge.xp} XP</strong><span>Total reward</span></div>
          </div>

          <div className="mission-preview">
            <div className="mission-number">1</div>
            <div><strong>Learn the basics</strong><span>Complete a short interactive quiz</span></div>
            <BadgeCheck size={20} />
          </div>
          <div className="mission-preview">
            <div className="mission-number">2</div>
            <div><strong>Take real action</strong><span>Collect and sort plastic waste</span></div>
            <LockKeyhole size={19} />
          </div>
          <div className="mission-preview">
            <div className="mission-number">3</div>
            <div><strong>Submit evidence</strong><span>Upload a photo for review</span></div>
            <LockKeyhole size={19} />
          </div>

          <button className="primary-button full" onClick={onStart}>Join challenge <ChevronRight size={18} /></button>
        </div>
      </article>
    </div>
  );
}

function MissionFlow({ step, setStep, onClose, onFinish, completed }) {
  const questions = [
    {
      title: 'Which bin should this bottle go into?',
      description: 'Tap the best answer.',
      visual: '🥤',
      answers: ['Organic waste', 'Recyclable plastic', 'Hazardous waste'],
      correct: 1,
    },
    {
      title: 'How long can a plastic bottle take to decompose?',
      description: 'Choose the closest answer.',
      visual: '⏳',
      answers: ['About 5 years', 'About 50 years', 'Around 450 years'],
      correct: 2,
    },
  ];

  return (
    <div className="mission-modal">
      <div className="mission-topbar">
        <button className="icon-button" onClick={onClose}><ArrowLeft size={20} /></button>
        <div className="mission-progress">
          <span>Mission {Math.min(step + 1, 3)} of 3</span>
          <div className="progress-track"><span style={{ width: `${Math.min((step + 1) * 33.34, 100)}%` }} /></div>
        </div>
        <button className="icon-button" onClick={onClose}><X size={20} /></button>
      </div>

      <div className="mission-screen">
        {step < 2 && (
          <QuizStep
            key={step}
            question={questions[step]}
            onContinue={() => setStep(step + 1)}
          />
        )}
        {step === 2 && <EvidenceStep onFinish={onFinish} />}
        {step === 3 && <MissionComplete onClose={onClose} completed={completed} />}
      </div>
    </div>
  );
}

function QuizStep({ question, onContinue }) {
  const [answer, setAnswer] = useState(null);
  const [checked, setChecked] = useState(false);
  const isCorrect = answer === question.correct;

  const submit = () => {
    if (answer === null) return;
    if (!checked) setChecked(true);
    else if (isCorrect) onContinue();
  };

  return (
    <div className="quiz-layout">
      <div className="quiz-visual">{question.visual}</div>
      <div>
        <span className="tag soft"><BookOpen size={13} /> QUICK LEARNING</span>
        <h2>{question.title}</h2>
        <p>{question.description}</p>
      </div>
      <div className="answer-list">
        {question.answers.map((item, index) => {
          const selected = answer === index;
          const state = checked && selected ? (isCorrect ? 'correct' : 'wrong') : '';
          return (
            <button
              key={item}
              className={`answer-button ${selected ? 'selected' : ''} ${state}`}
              onClick={() => { if (!checked) setAnswer(index); }}
            >
              <span>{String.fromCharCode(65 + index)}</span>
              {item}
              {checked && selected && (isCorrect ? <Check size={20} /> : <X size={20} />)}
            </button>
          );
        })}
      </div>

      {checked && (
        <div className={`feedback-box ${isCorrect ? 'success' : 'error'}`}>
          {isCorrect ? <BadgeCheck size={21} /> : <X size={21} />}
          <div>
            <strong>{isCorrect ? 'Great job!' : 'Not quite yet'}</strong>
            <p>{isCorrect ? 'You earned 30 XP for this question.' : 'Review the choices and try again.'}</p>
          </div>
        </div>
      )}

      <button
        className="primary-button full mission-cta"
        disabled={answer === null}
        onClick={checked && !isCorrect ? () => { setChecked(false); setAnswer(null); } : submit}
      >
        {checked ? (isCorrect ? 'Continue' : 'Try again') : 'Check answer'} <ChevronRight size={18} />
      </button>
    </div>
  );
}

function EvidenceStep({ onFinish }) {
  const inputRef = useRef(null);
  const [fileName, setFileName] = useState('');
  const [note, setNote] = useState('');

  return (
    <div className="evidence-layout">
      <div className="evidence-heading">
        <span className="tag soft"><Camera size={13} /> REAL-WORLD ACTION</span>
        <h2>Show your impact</h2>
        <p>Upload a clear photo of your sorted plastic. An organizer will review it with AI assistance.</p>
      </div>

      <button className={`upload-box ${fileName ? 'uploaded' : ''}`} onClick={() => inputRef.current?.click()}>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(event) => setFileName(event.target.files?.[0]?.name || '')}
        />
        {fileName ? <BadgeCheck size={36} /> : <Upload size={36} />}
        <strong>{fileName || 'Upload evidence photo'}</strong>
        <span>{fileName ? 'Ready to submit' : 'JPG or PNG · max 10 MB'}</span>
      </button>

      <label className="field-label">
        What did you do?
        <textarea
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="Example: I collected and sorted plastic bottles from my classroom..."
          rows="4"
        />
      </label>

      <div className="verification-note">
        <ShieldCheck size={20} />
        <div><strong>Verified impact</strong><span>Your photo, note, and timestamp help prevent false submissions.</span></div>
      </div>

      <button className="primary-button full mission-cta" disabled={!fileName || note.trim().length < 10} onClick={onFinish}>
        Submit mission <Sparkles size={18} />
      </button>
    </div>
  );
}

function MissionComplete({ onClose }) {
  return (
    <div className="complete-layout">
      <div className="completion-rings">
        <div className="completion-icon"><Trophy size={50} /></div>
      </div>
      <span className="tag amber">MISSION COMPLETE</span>
      <h2>You made a real difference!</h2>
      <p>Your submission is marked as pending review. Your learning XP has already been added.</p>
      <div className="reward-card">
        <div><Zap size={22} fill="currentColor" /><strong>+150 XP</strong><span>Mission reward</span></div>
        <div><Star size={22} fill="currentColor" /><strong>+1 action</strong><span>Green Passport</span></div>
      </div>
      <button className="primary-button full" onClick={onClose}>Back to home <Home size={18} /></button>
    </div>
  );
}

function BottomNav({ tab, setTab }) {
  const items = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'challenges', label: 'Challenges', icon: Target },
    { id: 'leaderboard', label: 'Ranks', icon: BarChart3 },
    { id: 'passport', label: 'Passport', icon: CircleUserRound },
  ];

  return (
    <nav className="bottom-nav" aria-label="Primary navigation">
      {items.map(({ id, label, icon: Icon }) => (
        <button key={id} className={tab === id ? 'active' : ''} onClick={() => setTab(id)}>
          <Icon size={21} strokeWidth={tab === id ? 2.7 : 2} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}

function SectionHeading({ title, action, onAction }) {
  return (
    <div className="section-heading">
      <h2>{title}</h2>
      {action && <button onClick={onAction}>{action} <ChevronRight size={16} /></button>}
    </div>
  );
}

function ImpactCard({ icon: Icon, value, label }) {
  return (
    <div className="impact-card">
      <div className="impact-icon"><Icon size={19} /></div>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

export default App;
