import { socials } from '../../data/socials';

const getIcon = (icon) => {
  const iconProps = {
    width: '20',
    height: '20',
    viewBox: '0 0 24 24',
    fill: 'currentColor',
  };

  switch (icon) {
    case 'github':
      return (
        <svg {...iconProps}>
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg {...iconProps}>
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      );

    case 'email':
      return (
        <svg {...iconProps}>
          <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm10.754 0l4.623-3.746v9.458l-4.623-5.712zm-8.877 1.258l7.5-6.187h-15l7.5 6.187zm-.865.702l-4.49 5.539h15.71l-4.49-5.539-3.235 2.668-3.235-2.668z" />
        </svg>
      );

    case 'instagram':
      return (
        <svg {...iconProps}>
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      );
    default:
      return null;
  }
};

export default function Footer() {
  return (
    <>
      <style>{`
        .footer-line { height: 2px; background: var(--border); margin-top: 40px; }
        .footer { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px; padding: 30px 0; }
        .f-logo { font-size: 18px; font-weight: 900; color: var(--text-primary); text-decoration: none; text-transform: uppercase; }
        .f-logo span { color: var(--accent-blue); }
        .f-copy { font-size: 12px; color: var(--text-muted); font-family: monospace; }
        .social-row { display: flex; align-items: center; gap: 20px; }
        .soc { color: var(--text-secondary); transition: all 0.2s; display: flex; text-decoration: none; padding: 5px; border: 1px solid transparent; }
        .soc:hover { color: var(--accent-blue); transform: translateY(-3px); }
      `}</style>

      <div className="footer-line" />
      <footer className="footer">
        <a href="#beranda" className="f-logo">
          sakhi<span>ardra</span>
        </a>
        <p className="f-copy">© 2026 Sakhi Ardra Handaru</p>
        <div className="social-row">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="soc"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}>
              {getIcon(s.icon)}
            </a>
          ))}
        </div>
      </footer>
    </>
  );
}
