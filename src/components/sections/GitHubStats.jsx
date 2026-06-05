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
  const [streakLoaded, setStreakLoaded] = useState(false);
  const [rollerLoaded, setRollerLoaded] = useState(false);
  const [timeoutError, setTimeoutError] = useState(false);

  // GitHub Stats dari API (cepat)
  useEffect(() => {
    fetch('https://api.github.com/users/skirdrax')
      .then((res) => {
        if (!res.ok) throw new Error('Gagal mengambil data');
        return res.json();
      })
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
      .catch((err) => {
        console.error('Error fetching GitHub stats:', err);
        setStats((prev) => ({ ...prev, loading: false, error: true }));
      });
  }, []);

  // Timeout untuk image streak (10 detik)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!streakLoaded) {
        setTimeoutError(true);
        const fallback = document.getElementById('streak-fallback');
        if (fallback) fallback.style.display = 'block';
      }
    }, 10000);
    return () => clearTimeout(timer);
  }, [streakLoaded]);

  const streakImageUrl = `https://github-readme-streak-stats.herokuapp.com/?user=skirdrax&theme=blueberry&hide_border=true&stroke=2563eb&ring=2563eb&fire=3b82f6&currStreakNum=3b82f6&sideNums=3b82f6&currStreakLabel=3b82f6&sideLabels=3b82f6&dates=6e7681&background=0d1117&t=${Date.now()}`;
  const contribGraphUrl = `https://ghchart.rshah.org/skirdrax?t=${Date.now()}`;

  return (
    <div className="github-stats-container">
      {/* Contribution Graph - Full Width */}
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
        <img
          src={contribGraphUrl}
          alt="GitHub Contribution Graph"
          className="github-graph"
          onError={(e) => {
            e.target.src =
              'https://via.placeholder.com/800x200/1e293b/3b82f6?text=Contributions+Graph';
          }}
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
        {/* KIRI: Streak + 4 Statistik */}
        <div className="github-streak-wrapper">
          <div className="github-streak-title">
            <h3>🔥 GitHub Streak & Stats</h3>
          </div>

          {/* Loading indicator untuk streak */}
          {!streakLoaded && !timeoutError && (
            <div className="streak-loading">
              <div className="loading-spinner-small"></div>
              <p>Memuat data streak...</p>
            </div>
          )}

          <div
            className="streak-image-container"
            style={{ display: streakLoaded ? 'block' : 'none' }}>
            <img
              src={streakImageUrl}
              alt="GitHub Streak Stats"
              className="streak-image"
              onLoad={() => setStreakLoaded(true)}
              onError={(e) => {
                e.target.style.display = 'none';
                const fallback = document.getElementById('streak-fallback');
                if (fallback) fallback.style.display = 'block';
              }}
            />
          </div>

          <div
            id="streak-fallback"
            className="streak-fallback"
            style={{ display: 'none' }}>
            <p>Gagal memuat streak stats</p>
            <button
              onClick={() => window.location.reload()}
              className="retry-btn">
              Refresh
            </button>
          </div>

          {/* 4 Statistik (langsung muncul, cepat) */}
          {stats.loading ? (
            <div className="streak-loading">Memuat data statistik...</div>
          ) : stats.error ? (
            <div className="streak-error">
              <p>Gagal memuat data statistik</p>
              <button
                onClick={() => window.location.reload()}
                className="retry-btn">
                Coba Lagi
              </button>
            </div>
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

          {/* Loading indicator untuk roller */}
          {!rollerLoaded && (
            <div className="streak-loading">
              <div className="loading-spinner-small"></div>
              <p>Memuat activity graph...</p>
            </div>
          )}

          <img
            src={`https://github-readme-activity-graph.vercel.app/graph?username=skirdrax&theme=react-dark&bg_color=0d1117&color=3b82f6&line=2563eb&point=60a5fa&hide_border=true&t=${Date.now()}`}
            alt="GitHub Activity Graph"
            className="github-roller"
            style={{ display: rollerLoaded ? 'block' : 'none' }}
            onLoad={() => setRollerLoaded(true)}
            onError={(e) => {
              e.target.style.display = 'none';
              const fallback = document.getElementById('roller-fallback');
              if (fallback) fallback.style.display = 'block';
            }}
          />
          <div
            id="roller-fallback"
            className="roller-fallback"
            style={{ display: 'none' }}>
            <p>Kunjungi GitHub untuk melihat aktivitas lengkap:</p>
            <a
              href="https://github.com/skirdrax"
              target="_blank"
              rel="noopener noreferrer"
              className="roller-link">
              github.com/skirdrax →
            </a>
          </div>
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
