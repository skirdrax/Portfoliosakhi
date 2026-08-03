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

    const contribUrl = `https://ghchart.rshah.org/256eb/skirdrax?t=${Date.now()}`;
    const contribImg = new Image();
    contribImg.onload = () => {
      setContribImage(contribUrl);
      setContribLoaded(true);
    };
    contribImg.onerror = () => {
      setContribImage(
        'https://placehold.co/800x200/1a1a2e/3b82f6?text=Contributions+Graph',
      );
      setContribLoaded(true);
    };
    contribImg.src = contribUrl;

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

    const rollerUrls = [
      `https://github-readme-activity-graph.vercel.app/graph?username=skirdrax&theme=react-dark&bg_color=0d1117&color=3b82f6&line=2563eb&point=60a5fa&hide_border=true&t=${Date.now()}`,
      `https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=skirdrax&theme=github_dark&t=${Date.now()}`,
      `https://ghchart.rshah.org/skirdrax?t=${Date.now()}`,
    ];
    let currentIndex = 0;
    let loaded = false;
    const tryLoadRoller = () => {
      if (currentIndex >= rollerUrls.length || loaded) return;
      const img = new Image();
      img.onload = () => {
        if (!loaded) {
          setRollerImage(rollerUrls[currentIndex]);
          setRollerLoaded(true);
          loaded = true;
        }
      };
      img.onerror = () => {
        currentIndex++;
        tryLoadRoller();
      };
      img.src = rollerUrls[currentIndex];
    };
    tryLoadRoller();

    const timeout = setTimeout(() => {
      if (!loaded) {
        setRollerImage(
          'https://placehold.co/600x160/1e293b/3b82f6?text=Activity+Graph',
        );
        setRollerLoaded(true);
      }
    }, 8000);

    return () => clearTimeout(timeout);
  }, []);

  const monthlyData = [
    { month: 'Jan', value: 18, width: '15%' },
    { month: 'Feb', value: 4, width: '4%' },
    { month: 'Mar', value: 2, width: '2%' },
    { month: 'Apr', value: 16, width: '12%' },
    { month: 'Mei', value: 420, width: '85%' },
    { month: 'Jun', value: 120, width: '55%' },
  ];

  return (
    <div className="github-stats-container">
      <div
        className="github-graph-wrapper"
        data-aos="fade-up"
        data-aos-delay="50">
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

      <div className="github-bottom-grid">
        <div
          className="github-streak-wrapper"
          data-aos="fade-right"
          data-aos-delay="70">
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
                  style={{ fontSize: '13px' }}>
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

        <div
          className="github-roller-wrapper"
          data-aos="fade-left"
          data-aos-delay="90">
          <div className="github-roller-title">
            <h3>📈 GitHub Activity</h3>
          </div>
          <div className="scan-line"></div>
          <div className="vertical-scan"></div>
          {!rollerLoaded && (
            <div className="streak-loading" style={{ padding: '20px' }}>
              <div className="loading-spinner-small"></div>
              <p>Memuat activity graph...</p>
            </div>
          )}
          <img
            src={rollerImage}
            alt="Activity Graph"
            className="github-roller"
            style={{
              display: rollerLoaded ? 'block' : 'none',
              maxHeight: '160px',
              width: '100%',
              objectFit: 'cover',
            }}
          />
          <div className="roller-extra-stats">
            <div className="roller-extra-title">
              <span>📊 Monthly Contributions 1 Semester | scale: 500</span>
            </div>
            <div className="monthly-stats">
              {monthlyData.map((item) => (
                <div
                  key={item.month}
                  className="month-item"
                  style={{ cursor: 'default' }}>
                  <span className="month-name">{item.month}</span>
                  <div className="month-bar-container">
                    <div
                      className="month-bar"
                      style={{ width: item.width }}></div>
                  </div>
                  <span className="month-value">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="github-graph-footer" style={{ marginTop: '12px' }}>
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
