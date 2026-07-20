import React, { useMemo, useRef, useState, useEffect } from 'react';
import {
  ArrowDown,
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
  Gem,
  GraduationCap,
  HeartHandshake,
  Home,
  Leaf,
  LockKeyhole,
  Medal,
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

const roadmapSections = [
  {
    id: 1,
    title: 'Eco Basics',
    desc: 'Waste, reuse & the 3 Rs',
    icon: Leaf,
    tone: 'mint',
    lessonXp: 40,
    lessons: [
      { id: 1, title: 'The 3 Rs', visual: '♻️', question: 'What does the first "R" in Reduce, Reuse, Recycle mean?', answers: ['Buy less to create less waste', 'Sort your trash into bins', 'Throw items away'], correct: 0 },
      { id: 2, title: 'Sorting Trash', visual: '🍌', question: 'Which bin does a banana peel go into?', answers: ['Recycling', 'Organic waste', 'Hazardous waste'], correct: 1 },
      { id: 3, title: 'Composting 101', visual: '🌱', question: 'Composting mainly turns food scraps into...', answers: ['Plastic', 'Nutrient-rich soil', 'Clean water'], correct: 1 },
      { id: 4, title: 'Single-Use Plastic', visual: '🥤', question: 'Which item is single-use plastic?', answers: ['A plastic straw', 'A metal water bottle', 'A cotton tote bag'], correct: 0 },
      { id: 5, title: 'Recycling Labels', visual: '🔎', question: 'What does the number inside a recycling symbol usually tell you?', answers: ["The item's price", 'The type of plastic resin', 'The manufacture date'], correct: 1 },
    ],
    review: {
      title: 'Eco Basics Review',
      xp: 120,
      badge: 'Eco Basics Champion',
      questions: [
        { visual: '♻️', question: 'Which action reduces waste the most?', answers: ['Recycling more', 'Buying less in the first place', 'Burning plastic'], correct: 1 },
        { visual: '🍌', question: 'Food scraps should go in the ___ bin.', answers: ['Organic', 'Recycling', 'Landfill-only'], correct: 0 },
        { visual: '⏳', question: 'A plastic bottle can take about how long to decompose?', answers: ['5 years', '50 years', '450 years'], correct: 2 },
      ],
    },
  },
  {
    id: 2,
    title: 'Recycling Ranger',
    desc: 'Sorting & recycling science',
    icon: Recycle,
    tone: 'forest',
    lessonXp: 45,
    lessons: [
      { id: 1, title: 'Materials 101', visual: '🥫', question: 'Which material can typically be recycled endlessly without losing quality?', answers: ['Glass & metal', 'Plastic film', 'Styrofoam'], correct: 0 },
      { id: 2, title: 'Paper & Cardboard', visual: '📦', question: 'Greasy pizza boxes should be...', answers: ['Recycled as-is', 'Composted or trashed, not recycled', 'Burned at home'], correct: 1 },
      { id: 3, title: 'Contamination', visual: '🚫', question: 'What happens when food waste contaminates a recycling bin?', answers: ['Nothing changes', 'It can spoil the whole batch of recyclables', 'It gets cleaned automatically'], correct: 1 },
      { id: 4, title: 'E-Waste', visual: '🔋', question: 'Old phones and batteries should be...', answers: ['Thrown in regular trash', 'Taken to an e-waste collection point', 'Buried in the garden'], correct: 1 },
      { id: 5, title: 'Upcycling', visual: '🔨', question: 'Upcycling means...', answers: ['Throwing items away faster', 'Turning waste into something of higher value', 'Sending waste overseas'], correct: 1 },
    ],
    review: {
      title: 'Recycling Ranger Review',
      xp: 130,
      badge: 'Recycling Ranger',
      questions: [
        { visual: '🥫', question: 'Which of these is NOT usually recyclable curbside?', answers: ['Cardboard', 'Greasy pizza box', 'Aluminum can'], correct: 1 },
        { visual: '🔋', question: 'Why should e-waste never go in regular trash?', answers: ['It\'s too heavy', 'It contains toxic materials that can leak', "It's too colorful"], correct: 1 },
        { visual: '🔨', question: 'Upcycling an old jar into a plant pot is an example of...', answers: ['Reducing', 'Recycling', 'Reusing / upcycling'], correct: 2 },
      ],
    },
  },
  {
    id: 3,
    title: 'Climate Guardian',
    desc: 'Systems & long-term change',
    icon: Sparkles,
    tone: 'blue',
    lessonXp: 50,
    lessons: [
      { id: 1, title: 'Carbon Footprint', visual: '🌍', question: 'A "carbon footprint" measures...', answers: ['Your shoe size', 'The greenhouse gases your actions produce', 'Distance walked'], correct: 1 },
      { id: 2, title: 'Renewable Energy', visual: '☀️', question: 'Which is a renewable energy source?', answers: ['Coal', 'Solar power', 'Natural gas'], correct: 1 },
      { id: 3, title: 'Water Conservation', visual: '💧', question: 'A simple way to save water at home is...', answers: ['Leaving the tap running', 'Taking shorter showers', 'Watering plants at noon'], correct: 1 },
      { id: 4, title: 'Deforestation', visual: '🌳', question: 'Cutting down forests mainly contributes to climate change by...', answers: ['Releasing stored carbon dioxide', 'Cooling the planet', 'Increasing rainfall everywhere'], correct: 0 },
      { id: 5, title: 'Community Action', visual: '🤝', question: 'What amplifies individual climate action the most?', answers: ['Acting entirely alone', 'Organizing with your community', 'Waiting for others to start'], correct: 1 },
    ],
    review: {
      title: 'Climate Guardian Review',
      xp: 150,
      badge: 'Climate Guardian',
      questions: [
        { visual: '☀️', question: 'Solar and wind are examples of...', answers: ['Fossil fuels', 'Renewable energy', 'Non-renewable energy'], correct: 1 },
        { visual: '🌳', question: 'Deforestation increases atmospheric CO2 because trees...', answers: ['Store carbon that gets released when cut', 'Produce plastic', 'Absorb sunlight only'], correct: 0 },
        { visual: '🤝', question: 'Climate action is most effective when...', answers: ['Only governments act', 'Individuals and communities act together', 'Nobody changes habits'], correct: 1 },
      ],
    },
  },
];

const roadmapDecor = [
  [{ e: '🌱', t: 10, l: 82 }, { e: '🌍', t: 44, l: 12 }, { e: '♻️', t: 78, l: 84 }],
  [{ e: '💧', t: 12, l: 14 }, { e: '🔋', t: 48, l: 86 }, { e: '🧴', t: 82, l: 16 }],
  [{ e: '☀️', t: 10, l: 84 }, { e: '🌳', t: 46, l: 12 }, { e: '🤝', t: 80, l: 80 }],
];

function App() {
  const [tab, setTab] = useState('home');
  const [challenge, setChallenge] = useState(null);
  const [missionOpen, setMissionOpen] = useState(false);
  const [missionStep, setMissionStep] = useState(0);
  const [xp, setXp] = useState(1250);
  const [roadmap, setRoadmap] = useState(() => {
    const fallback = { completedLessons: [], completedReviews: [], badges: [], streak: 0, lastActiveDate: null };
    try {
      return { ...fallback, ...(JSON.parse(localStorage.getItem('greenquest_roadmap')) || {}) };
    } catch (e) {
      return fallback;
    }
  });
  const [activeLesson, setActiveLesson] = useState(null);
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

  useEffect(() => {
    try { localStorage.setItem('greenquest_roadmap', JSON.stringify(roadmap)); } catch (e) {}
  }, [roadmap]);

  const lessonKey = (sectionId, lessonId) => `${sectionId}-${lessonId}`;
  const isLessonDone = (sectionId, lessonId) => roadmap.completedLessons.includes(lessonKey(sectionId, lessonId));
  const isReviewDone = (sectionId) => roadmap.completedReviews.includes(sectionId);
  const isSectionUnlocked = (sectionIndex) => sectionIndex === 0 || isReviewDone(roadmapSections[sectionIndex - 1].id);
  const isLessonUnlocked = (sectionIndex, lessonIndex) => {
    if (!isSectionUnlocked(sectionIndex)) return false;
    if (lessonIndex === 0) return true;
    const section = roadmapSections[sectionIndex];
    return isLessonDone(section.id, section.lessons[lessonIndex - 1].id);
  };
  const isReviewUnlocked = (sectionIndex) => {
    if (!isSectionUnlocked(sectionIndex)) return false;
    const section = roadmapSections[sectionIndex];
    return section.lessons.every((lesson) => isLessonDone(section.id, lesson.id));
  };

  const openLesson = (sectionIndex, lessonIndex) => {
    if (!isLessonUnlocked(sectionIndex, lessonIndex)) return showToast('Complete the previous lesson to unlock this one');
    setActiveLesson({ sectionIndex, lessonIndex, kind: 'lesson' });
  };

  const openReview = (sectionIndex) => {
    if (!isReviewUnlocked(sectionIndex)) return showToast('Finish all 5 lessons to unlock the review');
    setActiveLesson({ sectionIndex, kind: 'review' });
  };

  const closeLesson = () => setActiveLesson(null);

  const withDailyStreak = (prev) => {
    const today = new Date().toISOString().slice(0, 10);
    if (prev.lastActiveDate === today) return prev;
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    const streak = prev.lastActiveDate === yesterday ? (prev.streak || 0) + 1 : 1;
    return { ...prev, lastActiveDate: today, streak };
  };

  const completeLesson = (sectionIndex, lessonIndex) => {
    const section = roadmapSections[sectionIndex];
    const lesson = section.lessons[lessonIndex];
    const key = lessonKey(section.id, lesson.id);
    if (!roadmap.completedLessons.includes(key)) {
      setXp((v) => v + section.lessonXp);
      setRoadmap((prev) => withDailyStreak({ ...prev, completedLessons: [...prev.completedLessons, key] }));
    }
    showToast(`${lesson.title} complete — +${section.lessonXp} XP`);
  };

  const completeReview = (sectionIndex) => {
    const section = roadmapSections[sectionIndex];
    if (!roadmap.completedReviews.includes(section.id)) {
      setXp((v) => v + section.review.xp);
      setRoadmap((prev) => withDailyStreak({
        ...prev,
        completedReviews: [...prev.completedReviews, section.id],
        badges: [...prev.badges, section.review.badge],
      }));
    }
    showToast(`${section.title} complete — +${section.review.xp} XP · Badge: ${section.review.badge}`);
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
        <Header tab={tab} xp={xp} streak={roadmap.streak || 0} />

        <section className="screen" aria-live="polite">
          {tab === 'home' && (
            <RoadmapScreen
              roadmap={roadmap}
              isLessonUnlocked={isLessonUnlocked}
              isLessonDone={isLessonDone}
              isReviewUnlocked={isReviewUnlocked}
              isReviewDone={isReviewDone}
              isSectionUnlocked={isSectionUnlocked}
              onOpenLesson={openLesson}
              onOpenReview={openReview}
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

      {activeLesson && (
        <LessonFlow
          section={roadmapSections[activeLesson.sectionIndex]}
          kind={activeLesson.kind}
          lessonIndex={activeLesson.lessonIndex}
          onClose={closeLesson}
          onFinishLesson={() => { completeLesson(activeLesson.sectionIndex, activeLesson.lessonIndex); closeLesson(); }}
          onFinishReview={() => { completeReview(activeLesson.sectionIndex); closeLesson(); }}
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

function Header({ tab, xp, streak }) {
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
        <div className="stat-pill streak"><Flame size={15} fill="currentColor" /> {streak}</div>
        <div className="stat-pill gems"><Gem size={15} fill="currentColor" /> {xp.toLocaleString()}</div>
        <button className="icon-button" aria-label="Notifications"><Bell size={20} /></button>
      </div>
    </header>
  );
}

function RoadmapScreen({ roadmap, isLessonUnlocked, isLessonDone, isReviewUnlocked, isReviewDone, isSectionUnlocked, onOpenLesson, onOpenReview }) {
  const totalNodes = roadmapSections.length * 6;
  const doneNodes = roadmap.completedLessons.length + roadmap.completedReviews.length;

  let current = null;
  for (let sIndex = 0; sIndex < roadmapSections.length && !current; sIndex++) {
    if (!isSectionUnlocked(sIndex)) break;
    const section = roadmapSections[sIndex];
    const lessonIndex = section.lessons.findIndex((l) => !isLessonDone(section.id, l.id));
    if (lessonIndex !== -1) {
      current = { kind: 'lesson', sectionIndex: sIndex, lessonIndex, title: section.lessons[lessonIndex].title, label: `SECTION ${section.id} · LESSON ${lessonIndex + 1}/5` };
    } else if (!isReviewDone(section.id)) {
      current = { kind: 'review', sectionIndex: sIndex, title: section.review.title, label: `SECTION ${section.id} · REVIEW` };
    }
  }

  const jumpToCurrent = () => {
    document.querySelector('.road-node.current')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <div className="page-stack roadmap-page">
      <section className="roadmap-banner">
        {current ? (
          <button
            className="roadmap-banner-inner"
            onClick={() => (current.kind === 'lesson' ? onOpenLesson(current.sectionIndex, current.lessonIndex) : onOpenReview(current.sectionIndex))}
          >
            <div>
              <p className="roadmap-banner-eyebrow">{current.label}</p>
              <h2>{current.title}</h2>
            </div>
            <span className="roadmap-banner-go"><ChevronRight size={20} /></span>
          </button>
        ) : (
          <div className="roadmap-banner-inner static">
            <div>
              <p className="roadmap-banner-eyebrow">ALL SECTIONS COMPLETE</p>
              <h2>You finished the whole path! 🎉</h2>
            </div>
          </div>
        )}
        <div className="roadmap-banner-progress">
          <div className="progress-track"><span style={{ width: `${(doneNodes / totalNodes) * 100}%` }} /></div>
          <span>{doneNodes}/{totalNodes} steps</span>
        </div>
      </section>

      {roadmapSections.map((section, sectionIndex) => (
        <RoadmapSection
          key={section.id}
          section={section}
          sectionIndex={sectionIndex}
          unlocked={isSectionUnlocked(sectionIndex)}
          decor={roadmapDecor[sectionIndex % roadmapDecor.length]}
          isLessonUnlocked={isLessonUnlocked}
          isLessonDone={isLessonDone}
          isReviewUnlocked={isReviewUnlocked}
          isReviewDone={isReviewDone}
          onOpenLesson={onOpenLesson}
          onOpenReview={onOpenReview}
        />
      ))}

      <div className="jump-fab-wrap">
        <span className="jump-fab-tip">CONTINUE?</span>
        <button className="jump-fab" onClick={jumpToCurrent} aria-label="Jump to current lesson">
          <ArrowDown size={22} />
        </button>
      </div>
    </div>
  );
}

function RoadmapSection({ section, sectionIndex, unlocked, decor, isLessonUnlocked, isLessonDone, isReviewUnlocked, isReviewDone, onOpenLesson, onOpenReview }) {
  const Icon = section.icon;
  const lessonsDone = section.lessons.filter((l) => isLessonDone(section.id, l.id)).length;
  const reviewDone = isReviewDone(section.id);
  const positions = ['pos-c', 'pos-r', 'pos-l', 'pos-r', 'pos-c'];

  return (
    <section className={`roadmap-section ${unlocked ? '' : 'locked'}`}>
      <div className="roadmap-section-head">
        <div className={`roadmap-section-icon ${section.tone}`}><Icon size={20} /></div>
        <div className="roadmap-section-copy">
          <h3>Section {section.id} · {section.title}</h3>
          <p>{section.desc}</p>
        </div>
        <span className="roadmap-section-count">{lessonsDone}/5</span>
      </div>

      {!unlocked && (
        <div className="roadmap-lock-banner">
          <LockKeyhole size={16} /> Complete Section {section.id - 1}'s review to unlock
        </div>
      )}

      {unlocked && (
        <div className="road-path" style={{ minHeight: 560 }}>
          {decor.map((d, i) => (
            <span key={i} className="road-deco" style={{ top: `${d.t}%`, left: `${d.l}%` }} aria-hidden="true">{d.e}</span>
          ))}
          {section.lessons.map((lesson, lessonIndex) => (
            <RoadmapNode
              key={lesson.id}
              position={positions[lessonIndex]}
              icon={BookOpen}
              done={isLessonDone(section.id, lesson.id)}
              locked={!isLessonUnlocked(sectionIndex, lessonIndex)}
              current={isLessonUnlocked(sectionIndex, lessonIndex) && !isLessonDone(section.id, lesson.id)}
              onClick={() => onOpenLesson(sectionIndex, lessonIndex)}
            />
          ))}
          <RoadmapNode
            position="pos-c"
            icon={Trophy}
            review
            done={reviewDone}
            locked={!isReviewUnlocked(sectionIndex)}
            current={isReviewUnlocked(sectionIndex) && !reviewDone}
            onClick={() => onOpenReview(sectionIndex)}
          />
        </div>
      )}
    </section>
  );
}

function RoadmapNode({ position, icon: Icon, done, locked, current, review, onClick }) {
  return (
    <div className={`road-node-wrap ${position}`}>
      <button
        className={`road-node ${review ? 'review' : ''} ${done ? 'done' : ''} ${locked ? 'locked' : ''} ${current ? 'current' : ''}`}
        onClick={onClick}
      >
        {done ? <Check size={review ? 26 : 20} /> : locked ? <LockKeyhole size={review ? 22 : 17} /> : <Icon size={review ? 26 : 20} />}
      </button>
      {current && <span className="road-node-caption">{review ? 'REVIEW' : 'START'}</span>}
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
        <SectionHeading title="Achievement badges" action="View all" />
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
          {/* show earned badges from journey */}
          {JSON.parse(localStorage.getItem('greenquest_roadmap') || '{}').badges?.map((b) => (
            <div className="badge-row" key={b}>
              <div className="badge-symbol"><Medal size={22} /></div>
              <div><strong>{b}</strong><span>Earned in your journey</span></div>
              <ChevronRight size={19} />
            </div>
          ))}
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

function LessonFlow({ section, kind, lessonIndex, onClose, onFinishLesson, onFinishReview }) {
  const questions = kind === 'lesson' ? [section.lessons[lessonIndex]] : section.review.questions;
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const total = questions.length;
  const title = kind === 'lesson' ? section.lessons[lessonIndex].title : section.review.title;
  const xp = kind === 'lesson' ? section.lessonXp : section.review.xp;

  const handleContinue = () => {
    if (step + 1 < total) setStep(step + 1);
    else setDone(true);
  };

  const handleFinish = () => (kind === 'lesson' ? onFinishLesson() : onFinishReview());

  return (
    <div className="mission-modal">
      <div className="mission-topbar">
        <button className="icon-button" onClick={onClose}><ArrowLeft size={20} /></button>
        <div className="mission-progress">
          <span>{done ? title : `Question ${step + 1} of ${total}`}</span>
          <div className="progress-track"><span style={{ width: `${done ? 100 : (step / total) * 100}%` }} /></div>
        </div>
        <button className="icon-button" onClick={onClose}><X size={20} /></button>
      </div>

      <div className="mission-screen">
        {!done && (
          <LessonQuizStep key={step} question={questions[step]} onContinue={handleContinue} />
        )}
        {done && (
          <div className="complete-layout">
            <div className="completion-rings">
              <div className="completion-icon">{kind === 'review' ? <Trophy size={50} /> : <BadgeCheck size={50} />}</div>
            </div>
            <span className="tag amber">{kind === 'review' ? 'SECTION COMPLETE' : 'LESSON COMPLETE'}</span>
            <h2>{title} done!</h2>
            <p>{kind === 'review' ? `You unlocked the next section and earned the "${section.review.badge}" badge.` : 'Nice work — keep the path going.'}</p>
            <div className="reward-card">
              <div><Zap size={22} fill="currentColor" /><strong>+{xp} XP</strong><span>{kind === 'review' ? 'Review reward' : 'Lesson reward'}</span></div>
              {kind === 'review' ? (
                <div><Trophy size={22} fill="currentColor" /><strong>Badge</strong><span>{section.review.badge}</span></div>
              ) : (
                <div><Star size={22} fill="currentColor" /><strong>Step {lessonIndex + 1}/5</strong><span>{section.title}</span></div>
              )}
            </div>
            <button className="primary-button full" onClick={handleFinish}>Continue <ChevronRight size={18} /></button>
          </div>
        )}
      </div>
    </div>
  );
}

function LessonQuizStep({ question, onContinue }) {
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
        <span className="tag soft"><BookOpen size={13} /> QUICK QUIZ</span>
        <h2>{question.question}</h2>
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
            <p>{isCorrect ? 'Correct answer.' : 'Review the choices and try again.'}</p>
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

export default App;
