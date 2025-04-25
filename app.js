import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import ReactDOM from 'react-dom/client';

const NavBar = ({ isGameModalOpen, onOpenModal }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    !isGameModalOpen && (
      <nav className="navbar">
        <div className="navbar-content">
          <button className="hamburger" aria-label="Toggle Menu" onClick={toggleMenu}>
            ☰
          </button>
          <ul className={`items ${isMenuOpen ? 'show' : ''}`}>
            <li>Home</li>
            <li onClick={() => onOpenModal('about')}>About</li>
            <li onClick={() => onOpenModal('contact')}>Contact</li>
            <li onClick={() => onOpenModal('suggestion')}>Suggest</li>
          </ul>
        </div>
      </nav>
    )
  );
};

const GameCard = ({ gameUrl, onClick, title, imageUrl, isTop }) => {
  return (
    <div className={`game-card ${isTop ? 'top-card' : ''}`} onClick={onClick}>
      {isTop && <span className="rank-badge">1</span>}
      <img src={imageUrl} alt={`${title} Logo`} />
      <div className="game-preview">{title}</div>
    </div>
  );
};

const GameContainer = ({ setIsGameModalOpen, searchTerm }) => {
  const [selectedGameUrl, setSelectedGameUrl] = useState('');
  const games = [
    { title: "DeadShot", url: "https://deadshot.io/", imageUrl: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIABwAHAMBEQACEQEDEQH/xAAbAAACAQUAAAAAAAAAAAAAAAACBAUAAQMGB//EACUQAAICAQMEAgMBAAAAAAAAAAECAxEEACExEhNRYQVBIjJxI//EABcBAQEBAQAAAAAAAAAAAAAAAAABAgP/xAAoEQEAAQMDAwMEAwAAAAAAAAABEQACITFBURJh8HGh4SKx0fEDMoH/2gAMAwEAAhEDEQA/AOb/ABmLiZ0TquV28hELFHAUD2STx5q65Nalr9XSmvnmjsCxNRhTaPx5ttOaqbFkxXCzJVgMpBBDA8EEbEexrUYkZOfTzI5Nyp2q7BemhQ86hSlHWzd86tKCEyQS93Gk7cqgi6BDD7BB2IPg6iTr8npQYrYIcqfGgxpJMCNo3BkbEmTuLENt1sWgbc17B3sahbfdatrC8bxv06ScmsOhIrukem75O0/nnmWkczF7eOmVjuz4ruU/IflG1X0t9ccEc0dhwN9R/I3XBCam2dzttnNrBmRZ/VB8+fJqOarNk6zVoXBcHoNE8HSgoyVJR/N5q5UUsihU6zJOuOxQzOQR1MTf2br9edtzrHR9IcRrwRB7ROujKhVYZ4Z9/wB44rInzEk8OQ8UcULwuf8AAqCjQGgFbYddH75F3/N5bolnCO4g9We+qaOTeLomOp3Wfuem+TOlIzHHkKyRXArrfbc30n0fHi9610sC4m5h9nv29NJ0xgzdIx5/tLKb1zrVExNDSlL9TR5AdDRog7Agg8g6OlBiSjJLEljZJ3OlJr//2Q==" },
    { title: "Skribbl", url: "https://skribbl.io/", imageUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAq1BMVEVHcEwkUZUjUZUkUZUfR40kUZUiUJUAPYwhT5QkUZUkUZUkUZUkUZWElrvV2+ckUZVXc6ckUZUkUZUAAAD///8TSZEeTpTQ0tc4NDePn8DteCj39/hQLhWqts+ZTRm/xM/aoWZEZZ8lISN2i7ROTk6rVh3cfb7a3uU8IAzbbiXt7vHLZyJ8R2uKRRdmPh9/f3+3t7atgFGPj4+vZJeYmJhra2ufn5+ZeI+MZ0JjXhRsAAAAEnRSTlMAi+VzIQ4t/roy0fZd+C5B8FMuIrhmAAAB+0lEQVQ4jVVTaZeiQAwEAWkB15kkHHLICCKKt+7M2///yzbdzeHUe3yhqpOqpNswRizsGYRbovWHLXzHeMfcslYrEwDCOst+Miq2rnjn+STM+ANwC9rh7kld7AqJQeCDRlhThhL3rv2IQgCvVwS9wC25QHJWkqyohWlpXngjX1Z43r+kpKRsqWmzPw5RlLXMnPeMBLGjdSizLEZ+29Jf5eD12u9xl8UugHAMJwgs7XBJP4ib5opYnc/comUBLFQKXaFmh3hKN5hvEG9EEAGY7y3KLsHD6YTIGryT7CAr2IMA6MkdUu6QNlgRbSP50zZmQwFgi/kxRWyOiC0VioeZIYSeo0sl4iU9cJcGd5TVoT4o56T4mmIunuYsQox7B0rw6esIlCh7h+OFI2TagRT0a1oTyYwXtpHjkzJdwPe8SXBnjslmg1VMhXYg9z0KKmzY4oa77PSQJAKjj8mCRO2h4UF907KPIMY5Q9wLkKdIo8CzHD3qiO9qkj8e/5SG2jGDXJY5CK5fjFwOoRiGADDvl8W7TnLmH4fq1r3xXMERo8n86yrP08TPAr5Tlj+mqBQ/OGTo52NPMeWI3IlXF8YwvEkQUznV9wQE6sY5o4D56bhvOLbusJqbUnD7jn/5B7De3oXcZleA4k3zt8BZzBl/GPIRg8d11Z/5QmX4D7PaSjyIwtzwAAAAAElFTkSuQmCC" },
    { title: "Racing Game", url: "https://example-itch-io-game.com/racing-game.html", imageUrl: "https://via.placeholder.com/50?text=Racing" },
    { title: "Puzzle Challenge", url: "https://example-itch-io-game.com/puzzle-challenge.html", imageUrl: "https://via.placeholder.com/50?text=Puzzle" },
    { title: "Platformer Fun", url: "https://example-itch-io-game.com/platformer-fun.html", imageUrl: "https://via.placeholder.com/50?text=Platform" },
    { title: "Arcade Classic", url: "https://example-itch-io-game.com/arcade-classic.html", imageUrl: "https://via.placeholder.com/50?text=Arcade" },
    { title: "Maze Runner", url: "https://example-itch-io-game.com/maze-runner.html", imageUrl: "https://via.placeholder.com/50?text=Maze" },
    { title: "Tower Defense", url: "https://example-itch-io-game.com/tower-defense.html", imageUrl: "https://via.placeholder.com/50?text=Tower" },
    { title: "DeadShot", url: "https://deadshot.io/", imageUrl: "https://via.placeholder.com/50?text=DeadShot", isTop: true },
    { title: "Pixel Adventure", url: "https://example-itch-io-game.com/pixel-adventure.html", imageUrl: "https://via.placeholder.com/50?text=Pixel" },
    { title: "Racing Game", url: "https://example-itch-io-game.com/racing-game.html", imageUrl: "https://via.placeholder.com/50?text=Racing" },
    { title: "Puzzle Challenge", url: "https://example-itch-io-game.com/puzzle-challenge.html", imageUrl: "https://via.placeholder.com/50?text=Puzzle" },
    { title: "Platformer Fun", url: "https://example-itch-io-game.com/platformer-fun.html", imageUrl: "https://via.placeholder.com/50?text=Platform" },
    { title: "Arcade Classic", url: "https://example-itch-io-game.com/arcade-classic.html", imageUrl: "https://via.placeholder.com/50?text=Arcade" },
    { title: "Maze Runner", url: "https://example-itch-io-game.com/maze-runner.html", imageUrl: "https://via.placeholder.com/50?text=Maze" },
    { title: "Tower Defense", url: "https://example-itch-io-game.com/tower-defense.html", imageUrl: "https://via.placeholder.com/50?text=Tower" },
    { title: "DeadShot", url: "https://deadshot.io/", imageUrl: "https://via.placeholder.com/50?text=DeadShot", isTop: true },
    { title: "Pixel Adventure", url: "https://example-itch-io-game.com/pixel-adventure.html", imageUrl: "https://via.placeholder.com/50?text=Pixel" },
    { title: "Racing Game", url: "https://example-itch-io-game.com/racing-game.html", imageUrl: "https://via.placeholder.com/50?text=Racing" },
    { title: "Puzzle Challenge", url: "https://example-itch-io-game.com/puzzle-challenge.html", imageUrl: "https://via.placeholder.com/50?text=Puzzle" },
    { title: "Platformer Fun", url: "https://example-itch-io-game.com/platformer-fun.html", imageUrl: "https://via.placeholder.com/50?text=Platform" },
    { title: "Arcade Classic", url: "https://example-itch-io-game.com/arcade-classic.html", imageUrl: "https://via.placeholder.com/50?text=Arcade" },
    { title: "Maze Runner", url: "https://example-itch-io-game.com/maze-runner.html", imageUrl: "https://via.placeholder.com/50?text=Maze" },
    { title: "Tower Defense", url: "https://example-itch-io-game.com/tower-defense.html", imageUrl: "https://via.placeholder.com/50?text=Tower" }
  ];

  const openGameModal = (url) => {
    setSelectedGameUrl(url);
    if (setIsGameModalOpen) setIsGameModalOpen(true);
  };

  const closeGameModal = () => {
    if (setIsGameModalOpen) setIsGameModalOpen(false);
    setSelectedGameUrl('');
  };

  const filteredGames = games.filter(game =>
    game.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="gamecontainer">
      {filteredGames.map((game, i) => (
        <GameCard key={i} gameUrl={game.url} onClick={() => openGameModal(game.url)} title={game.title} imageUrl={game.imageUrl} isTop={game.isTop} />
      ))}
      {selectedGameUrl && (
        <div className="game-modal-overlay" onClick={closeGameModal}>
          <div className="game-modal-content" onClick={(e) => e.stopPropagation()}>
            <iframe src={selectedGameUrl} title="Game Modal" frameBorder="0" loading="lazy"></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

const AboutModal = ({ isOpen, onClose }) => {
  const aboutContent = `
    # About Us
    Welcome to Game-World, the ultimate destination for gaming enthusiasts! We are dedicated to bringing you the best collection of browser-based games, from action-packed shooters to mind-bending puzzles. Our mission is to create a fun and engaging experience for players of all ages.

    ## Our Vision
    To revolutionize online gaming with a seamless, immersive, and accessible platform.

    ## Contact
    For more information, reach out to us via the Contact section.
  `;

  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>About Us</h3>
        <pre>{aboutContent}</pre>
        <button type="button" onClick={onClose}>Close</button>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

const ContactModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', description: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Contact Us</h3>
        <form action="https://formsubmit.co/tssraj4102@gmail.com" method="POST">
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_subject" value="New Contact Form Submission" />
          <input type="hidden" name="_autoresponse" value="Thank you for your submission!" />
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
          <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" required />
          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required></textarea>
          <input type="hidden" name="_subject" value="Contact Form Submitted" />
          <button type="submit">Submit</button>
          <button type="button" onClick={onClose}>Close</button>
        </form>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

const SuggestionModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ email: '', gameName: '', gameDescription: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Suggest a Game</h3>
        <form action="https://formsubmit.co/tssraj4102@gmail.com" method="POST">
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
          <input type="text" name="gameName" value={formData.gameName} onChange={handleChange} placeholder="Game Name" required />
          <textarea name="gameDescription" value={formData.gameDescription} onChange={handleChange} placeholder="Game Description" required></textarea>
          <input type="hidden" name="_subject" value="New Game Suggested" />
          <button type="submit">Submit</button>
          <button type="button" onClick={onClose}>Close</button>
        </form>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

const BugReportModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ email: '', description: '', file: null });

  const handleChange = (e) => {
    if (e.target.name === 'file') {
      setFormData({ ...formData, file: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Report a Bug</h3>
        <form action="https://formsubmit.co/tssraj4102@gmail.com" method="POST">
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required></textarea>
          <input type="file" name="file" onChange={handleChange} />
          <input type="hidden" name="_subject" value="Bug Reported" />
          <button type="submit">Submit</button>
          <button type="button" onClick={onClose}>Close</button>
        </form>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

const Footer = ({ isGameModalOpen, onOpenModal }) => {
  const [isModalOpen, setIsModalOpen] = useState({ contact: false, suggestion: false, bug: false });
  const [isFooterVisible, setIsFooterVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const openModal = (type) => {
    setIsModalOpen({ contact: false, suggestion: false, bug: false, [type]: true });
  };

  const closeModal = () => {
    setIsModalOpen({ contact: false, suggestion: false, bug: false });
  };

  const termsContent = `
    Android Software Development Kit License Agreement
    1. Introduction
    1.1 The Android Software Development Kit (referred to as the "SDK") is licensed to you subject to the terms of the License Agreement.

    2. Accepting this License Agreement
    2.1 In order to use the SDK, you must first agree to the License Agreement.

    3. SDK License from Google
    3.1 Subject to the terms, Google grants you a limited license to use the SDK.
  `;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 50 && !isGameModalOpen && !Object.values(isModalOpen).some(Boolean)) {
        setIsFooterVisible(true);
      } else if (currentScrollY < lastScrollY && !isGameModalOpen && !Object.values(isModalOpen).some(Boolean)) {
        setIsFooterVisible(true);
      } else {
        setIsFooterVisible(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isGameModalOpen, isModalOpen]);

  useEffect(() => {
    const modalRoot = document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(modalRoot);

    return () => {
      if (document.getElementById('modal-root')) {
        document.body.removeChild(modalRoot);
      }
    };
  }, []);

  return (
    <>
      {!isGameModalOpen && (
        <div className={`footer-container ${isFooterVisible ? 'visible' : 'hidden'}`}>
          <div className="first-half">
            <h6 onClick={() => openModal('contact')}>Contact</h6>
            <h6 onClick={() => openModal('suggestion')}>Suggest</h6>
            <h6 onClick={() => openModal('bug')}>Report an Issue!</h6>
          </div>
          <div className="second-half">
            <h6>Game-World</h6>
            <p>New Era of Gaming</p>
          </div>
        </div>
      )}
      <AboutModal isOpen={isModalOpen.about} onClose={closeModal} />
      <ContactModal isOpen={isModalOpen.contact} onClose={closeModal} />
      <SuggestionModal isOpen={isModalOpen.suggestion} onClose={closeModal} />
      <BugReportModal isOpen={isModalOpen.bug} onClose={closeModal} />
    </>
  );
};

const AppLayout = () => {
  const [isGameModalOpen, setIsGameModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const openModal = (type) => {
    setModalType(type);
  };

  const closeModal = () => {
    setModalType(null);
  };

  return (
    <div>
      <NavBar isGameModalOpen={isGameModalOpen} onOpenModal={openModal} />
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search games..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <GameContainer setIsGameModalOpen={setIsGameModalOpen} searchTerm={searchTerm} />
      <Footer isGameModalOpen={isGameModalOpen} onOpenModal={openModal} />
      {modalType === 'about' && <AboutModal isOpen={true} onClose={closeModal} />}
      {modalType === 'contact' && <ContactModal isOpen={true} onClose={closeModal} />}
      {modalType === 'suggestion' && <SuggestionModal isOpen={true} onClose={closeModal} />}
      {modalType === 'bug' && <BugReportModal isOpen={true} onClose={closeModal} />}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
if (root) {
  root.render(<AppLayout />);
}

// Dynamic stars generation
const starsContainer = document.querySelector('.stars-container');
if (starsContainer) {
  const isMobile = window.innerWidth <= 768;
  const starCount = isMobile ? 50 : 100;

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = `${Math.random() * 100}vw`;
    star.style.top = `${Math.random() * 100}vh`;
    star.style.width = `${Math.random() * 3 + 1}px`;
    star.style.height = star.style.width;
    star.style.animationDuration = `${Math.random() * 20 + 10}s`;
    star.style.animationDelay = `${Math.random() * 5}s`;
    starsContainer.appendChild(star);
  }
}