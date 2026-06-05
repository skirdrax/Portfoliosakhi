import { useState, useEffect } from 'react';

export default function GitHubStats() {
  const [streakData, setStreakData] = useState({
    totalContributions: '...',
    currentStreak: '...',
    longestStreak: '...',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ambil data streak dari API
    fetch('https://streak-stats.demolab.com/?user=skirdrax&mode=json')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.contributions) {
          setStreakData({
            totalContributions: data.totalContributions || '0',
            currentStreak: data.currentStreak || '0',
            longestStreak: data.longestStreak || '0',
          });
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching streak data:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="github-stats-container">
      {/* Contribution Graph (Full Width) */}
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

      {/* 2 Kolom */}
      <div className="github-bottom-grid">
        {/* Streak Stats */}
        <div className="github-streak-wrapper reveal d2">
          <div className="github-streak-title">
            <h3>🔥 GitHub Streak Stats</h3>
          </div>
          {loading ? (
            <div className="streak-loading">Loading streak data...</div>
          ) : (
            <div className="streak-stats-grid">
              <div className="streak-card">
                <div className="streak-icon">📊</div>
                <div className="streak-value">
                  {streakData.totalContributions}
                </div>
                <div className="streak-label">Total Contributions</div>
                <div className="streak-period">Last 365 days</div>
              </div>
              <div className="streak-card">
                <div className="streak-icon">🔥</div>
                <div className="streak-value">{streakData.currentStreak}</div>
                <div className="streak-label">Current Streak</div>
                <div className="streak-period">days</div>
              </div>
              <div className="streak-card">
                <div className="streak-icon">🏆</div>
                <div className="streak-value">{streakData.longestStreak}</div>
                <div className="streak-label">Longest Streak</div>
                <div className="streak-period">days</div>
              </div>
            </div>
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

        {/* Roller Coaster Graph */}
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
