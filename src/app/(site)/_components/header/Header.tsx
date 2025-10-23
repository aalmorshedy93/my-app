'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  FaBars,
  FaHome,
  FaInfo,
  FaRegNewspaper,
  FaSearch,
  FaSignInAlt,
  FaTimes,
  FaUser,
  FaMoon,
  FaSun,
} from 'react-icons/fa';
import { useTheme } from 'next-themes';
import styles from './header.module.css';

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const leftLinks = [
    { label: 'Home', path: '/home', icon: <FaHome /> },
    { label: 'About', path: '/about', icon: <FaInfo /> },
    { label: 'Articles', path: '/articles', icon: <FaRegNewspaper /> },
    { label: 'Search', path: '/articles/search', icon: <FaSearch /> },
  ];

  const rightLinks = [
    { label: 'Register', path: '/register', icon: <FaUser /> },
    { label: 'Login', path: '/login', icon: <FaSignInAlt /> },
  ];

  const checkActive = (path: string) => {
    if (path === '/articles')
      return pathname === '/articles' && !pathname.includes('/articles/search');
    return pathname === path;
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">🌀 MyApp</Link>
      </div>

      {/* ✅ Theme Toggle */}
      {mounted && (
        <button
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
          className={styles.themeToggle}
          aria-label="Toggle Theme"
        >
          {theme === 'light' ? <FaMoon /> : <FaSun />}
        </button>
      )}

      <div className={styles.menuIcon} onClick={() => setMenuOpen((prev) => !prev)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <nav
        className={`${styles.nav} ${menuOpen ? styles.showMenu : ''}`}
        onClick={() => setMenuOpen(false)}
      >
        <div className={styles.left}>
          {leftLinks.map((link) => {
            const isActive = checkActive(link.path);
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`${styles.link} ${isActive ? styles.active : ''}`}
              >
                <span className={styles.icon}>{link.icon}</span>
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className={styles.right}>
          {rightLinks.map((link) => {
            const isActive = checkActive(link.path);
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`${styles.link} ${isActive ? styles.active : ''}`}
              >
                <span className={styles.icon}>{link.icon}</span>
                {link.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
