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
          src={`https://ghchart.rshah.org/skirdrax?t=${Date.now()}`}
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

      {/* 2 Kolom: GitHub Stats (Kiri) + Roller Coaster (Kanan) */}
      <div className="github-bottom-grid">
        {/* KOLOM KIRI: GitHub Stats */}
        <div className="github-streak-wrapper">
          <div className="github-streak-title">
            <h3>📊 GitHub Stats</h3>
          </div>
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
            <div className="streak-stats-grid-custom">
              <div className="streak-card-custom">
                <div className="streak-icon-custom">📚</div>
                <div className="streak-value-custom">{stats.publicRepos}</div>
                <div className="streak-label-custom">Public Repos</div>
              </div>
              <div className="streak-card-custom">
                <div className="streak-icon-custom">👥</div>
                <div className="streak-value-custom">{stats.followers}</div>
                <div className="streak-label-custom">Followers</div>
              </div>
              <div className="streak-card-custom">
                <div className="streak-icon-custom">👤</div>
                <div className="streak-value-custom">{stats.following}</div>
                <div className="streak-label-custom">Following</div>
              </div>
              <div className="streak-card-custom">
                <div className="streak-icon-custom">📅</div>
                <div
                  className="streak-value-custom"
                  style={{ fontSize: '18px' }}>
                  {stats.createdAt}
                </div>
                <div className="streak-label-custom">Bergabung</div>
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

        {/* KOLOM KANAN: Roller Coaster Graph */}
        <div className="github-roller-wrapper">
          <div className="github-roller-title">
            <h3>📈 GitHub Activity Roller Coaster</h3>
          </div>
          <img
            src={`https://github-readme-activity-graph.vercel.app/graph?username=skirdrax&theme=react-dark&bg_color=0d1117&color=3b82f6&line=2563eb&point=60a5fa&hide_border=true&t=${Date.now()}`}
            alt="GitHub Activity Graph"
            className="github-roller"
            onError={(e) => {
              e.target.style.display = 'none';
              document.getElementById('roller-fallback').style.display =
                'block';
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
