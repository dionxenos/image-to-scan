import "./Navbar.css";

interface NavbarProps {
  title?: string;
  links?: Array<{ label: string; href: string }>;
}

export default function Navbar({
  title = "Image Scanner",
  links = [],
}: NavbarProps) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <span className="brand-icon">📸</span>
          <h1>{title}</h1>
        </div>

        {links.length > 0 && (
          <div className="navbar-links">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
