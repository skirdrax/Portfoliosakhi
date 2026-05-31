export default function GitHubStats() {
  return (
    <div className="github-graph-section">
      <div className="github-graph-wrapper reveal d2">
        <div className="github-graph-title">
          <h3>GitHub Contributions</h3>
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
          <span>✨ Contribution graph from GitHub</span>
          <a
            href="https://github.com/skirdrax"
            target="_blank"
            rel="noopener noreferrer">
            View my GitHub →
          </a>
        </div>
      </div>
      <div
        className="github-streak-wrapper reveal d2"
        style={{ marginTop: '24px' }}>
        <div className="github-streak-title">
          <h3>🔥 GitHub Streak Stats</h3>
        </div>
        <img
          src="https://github-readme-streak-stats.herokuapp.com/?user=skirdrax&theme=blueberry&hide_border=true&stroke=2563eb&ring=2563eb&fire=3b82f6&currStreakNum=3b82f6&sideNums=3b82f6&currStreakLabel=3b82f6&sideLabels=3b82f6&dates=6e7681&background=0d1117"
          alt="GitHub Streak Stats"
          className="github-streak"
          style={{ width: '100%', height: 'auto', borderRadius: '16px' }}
        />
      </div>
    </div>
  );
}
