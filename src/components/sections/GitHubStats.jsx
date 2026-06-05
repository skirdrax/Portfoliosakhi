import { useState, useEffect } from 'react';

export default function GitHubStats() {
  const [streakImage, setStreakImage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Streak Stats URL dengan timestamp agar tidak cache
    const streakUrl = `https://github-readme-streak-stats.herokuapp.com/?user=skirdrax&theme=blueberry&hide_border=true&stroke=2563eb&ring=2563eb&fire=3b82f6&currStreakNum=3b82f6&sideNums=3b82f6&currStreakLabel=3b82f6&sideLabels=3b82f6&dates=6e7681&background=0d1117&t=${Date.now()}`;
    setStreakImage(streakUrl);
    setLoading(false);
  }, []);

  return (
    <div className="github-stats-container">
      {/* Bagian 1: Contribution Graph (Full Width) */}
      <div className="github-graph-wrapper reveal d2">
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
          src="https://ghchart.rshah.org/skirdrax"
          alt="GitHub Contribution Graph"
          className="github-graph"
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

      {/* Bagian 2: 2 Kolom (Streak Stats + Roller Coaster) */}
      <div className="github-bottom-grid">
        {/* Kolom Kiri: Streak Stats */}
        <div className="github-streak-wrapper reveal d2">
          <div className="github-streak-title">
            <h3>🔥 GitHub Streak Stats</h3>
          </div>
          {loading ? (
            <div className="streak-loading">Memuat data streak...</div>
          ) : (
            <img
              src={streakImage}
              alt="GitHub Streak Stats"
              className="github-streak-img"
              style={{ width: '100%', height: 'auto', borderRadius: '16px' }}
            />
          )}
          <div className="github-graph-footer" style={{ marginTop: '16px' }}>
            <a
              href="https://github.com/skirdrax"
              target="_blank"
              rel="noopener noreferrer">
              View detailed stats →
            </a>
          </div>
        </div>

        {/* Kolom Kanan: Roller Coaster Graph */}
        <div className="github-roller-wrapper reveal d2">
          <div className="github-roller-title">
            <h3>📈 GitHub Activity Roller Coaster</h3>
          </div>
          <img
            src="https://github-readme-activity-graph.vercel.app/graph?username=skirdrax&theme=react-dark&bg_color=0d1117&color=3b82f6&line=2563eb&point=60a5fa&hide_border=true"
            alt="GitHub Activity Graph"
            className="github-roller"
            style={{ width: '100%', height: 'auto', borderRadius: '16px' }}
          />
          <div className="github-graph-footer" style={{ marginTop: '16px' }}>
            <a
              href="https://github.com/skirdrax"
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
