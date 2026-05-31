export default function GitHubStats() {
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
          <div className="streak-stats-grid">
            <div className="streak-card">
              <div className="streak-icon">📊</div>
              <div className="streak-value">464</div>
              <div className="streak-label">Total Contributions</div>
              <div className="streak-period">Dec 12, 2024 - Present</div>
            </div>
            <div className="streak-card">
              <div className="streak-icon">🔥</div>
              <div className="streak-value">1</div>
              <div className="streak-label">Current Streak</div>
              <div className="streak-period">May 30</div>
            </div>
            <div className="streak-card">
              <div className="streak-icon">🏃‍♂️‍➡️</div>
              <div className="streak-value">20</div>
              <div className="streak-label">Longest Streak</div>
              <div className="streak-period">May 9 - May 28</div>
            </div>
          </div>
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
