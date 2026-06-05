import { useState, useEffect } from 'react';

export default function GitHubStats() {
  const [stats, setStats] = useState({
    publicRepos: 0,
    followers: 0,
    following: 0,
    createdAt: '',
    loading: true,
    error: false,
  });
  const [contribImage, setContribImage] = useState('');
  const [streakImage, setStreakImage] = useState('');
  const [rollerImage, setRollerImage] = useState('');
  const [contribLoaded, setContribLoaded] = useState(false);
  const [streakLoaded, setStreakLoaded] = useState(false);
  const [rollerLoaded, setRollerLoaded] = useState(false);

  useEffect(() => {
    // GitHub Stats API
    fetch('https://api.github.com/users/skirdrax')
      .then((res) => res.json())
      .then((data) => {
        setStats({
          publicRepos: data.public_repos || 0,
          followers: data.followers || 0,
          following: data.following || 0,
          createdAt: data.created_at
            ? new Date(data.created_at).toLocaleDateString('id-ID')
            : '-',
          loading: false,
          error: false,
        });
      })
      .catch(() => {
        setStats((prev) => ({ ...prev, loading: false, error: true }));
      });

    // Contribution Graph
    const contribUrl = `https://github-contributions-api.deno.dev/skirdrax.svg?t=${Date.now()}`;
    const contribImg = new Image();
    contribImg.onload = () => {
      setContribImage(contribUrl);
      setContribLoaded(true);
    };
    contribImg.onerror = () => {
      setContribImage(
        'https://placehold.co/800x200/1e293b/22c55e?text=Contributions+Graph',
      );
      setContribLoaded(true);
    };
    contribImg.src = contribUrl;

    // Streak Stats
    const streakUrl = `https://github-readme-streak-stats.herokuapp.com/?user=skirdrax&theme=blueberry&hide_border=true&stroke=2563eb&ring=2563eb&fire=3b82f6&currStreakNum=3b82f6&sideNums=3b82f6&currStreakLabel=3b82f6&sideLabels=3b82f6&dates=6e7681&background=0d1117&t=${Date.now()}`;
    const streakImg = new Image();
    streakImg.onload = () => {
      setStreakImage(streakUrl);
      setStreakLoaded(true);
    };
    streakImg.onerror = () => {
      setStreakImage(
        'https://placehold.co/400x150/1e293b/3b82f6?text=Streak+Stats',
      );
      setStreakLoaded(true);
    };
    streakImg.src = streakUrl;

    // Roller Coaster
    const rollerUrl = `https://github-readme-activity-graph.vercel.app/graph?username=skirdrax&theme=react-dark&bg_color=0d1117&color=3b82f6&line=2563eb&point=60a5fa&hide_border=true&t=${Date.now()}`;
    const rollerImg = new Image();
    rollerImg.onload = () => {
      setRollerImage(rollerUrl);
      setRollerLoaded(true);
    };
    rollerImg.onerror = () => {
      setRollerImage(
        'https://placehold.co/600x300/1e293b/3b82f6?text=Activity+Graph',
      );
      setRollerLoaded(true);
    };
    rollerImg.src = rollerUrl;
  }, []);

  return (
    <div className="github-stats-container">
      {/* Contribution Graph */}
      <div className="github-graph-wrapper">
        <div className="github-graph-title">
          <h3>📊 GitHub Contributions</h3>
        </div>
        <div className="github-graph-stats">
          <div className="github-stat">
            <span>📅</span> Last 365 days
          </div>
          <div className="github-stat">
            <span>💚</span> Total contributions
          </div>
        </div>

        {!contribLoaded && (
          <div className="streak-loading">
            <div className="loading-spinner-small"></div>
            <p>Memuat contribution graph...</p>
          </div>
        )}

        <img
          src={contribImage}
          alt="GitHub Contributions"
          className="github-graph"
          style={{ display: contribLoaded ? 'block' : 'none' }}
        />
        <div className="github-graph-footer">
          <a
            href="https://github.com/skirdrax"
            target="_blank"
            rel="noopener noreferrer">
            View my GitHub →
          </a>
        </div>
      </div>

      {/* 2 Kolom */}
      <div className="github-bottom-grid">
        {/* KIRI: Streak + Stats */}
        <div className="github-streak-wrapper">
          <div className="github-streak-title">
            <h3>🔥 GitHub Streak & Stats</h3>
          </div>

          {!streakLoaded && (
            <div className="streak-loading">
              <div className="loading-spinner-small"></div>
              <p>Memuat streak stats...</p>
            </div>
          )}

          <img
            src={streakImage}
            alt="Streak Stats"
            className="streak-image"
            style={{ display: streakLoaded ? 'block' : 'none' }}
          />

          {stats.loading ? (
            <div className="streak-loading">Memuat data statistik...</div>
          ) : (
            <div className="stats-grid-inline">
              <div className="stats-item-inline">
                <div className="stats-icon-inline">📚</div>
                <div className="stats-value-inline">{stats.publicRepos}</div>
                <div className="stats-label-inline">PUBLIC REPOS</div>
              </div>
              <div className="stats-divider-inline"></div>
              <div className="stats-item-inline">
                <div className="stats-icon-inline">👥</div>
                <div className="stats-value-inline">{stats.followers}</div>
                <div className="stats-label-inline">FOLLOWERS</div>
              </div>
              <div className="stats-divider-inline"></div>
              <div className="stats-item-inline">
                <div className="stats-icon-inline">👤</div>
                <div className="stats-value-inline">{stats.following}</div>
                <div className="stats-label-inline">FOLLOWING</div>
              </div>
              <div className="stats-divider-inline"></div>
              <div className="stats-item-inline">
                <div className="stats-icon-inline">📅</div>
                <div
                  className="stats-value-inline"
                  style={{ fontSize: '14px' }}>
                  {stats.createdAt}
                </div>
                <div className="stats-label-inline">BERGABUNG</div>
              </div>
            </div>
          )}

          <div className="github-graph-footer" style={{ marginTop: '16px' }}>
            <a
              href="https://github.com/skirdrax?tab=overview"
              target="_blank"
              rel="noopener noreferrer">
              View detailed stats →
            </a>
          </div>
        </div>

        {/* KANAN: Roller Coaster */}
        <div className="github-roller-wrapper">
          <div className="github-roller-title">
            <h3>📈 GitHub Activity Roller Coaster</h3>
          </div>

          {!rollerLoaded && (
            <div className="streak-loading">
              <div className="loading-spinner-small"></div>
              <p>Memuat activity graph...</p>
            </div>
          )}

          <img
            src={rollerImage}
            alt="Activity Graph"
            className="github-roller"
            style={{ display: rollerLoaded ? 'block' : 'none' }}
          />
          <div className="github-graph-footer" style={{ marginTop: '16px' }}>
            <a
              href="https://github.com/skirdrax?tab=overview"
              target="_blank"
              rel="noopener noreferrer">
              View activity graph →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
