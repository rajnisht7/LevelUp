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
    { title: "DeadShot", url: "https://deadshot.io/", imageUrl: "data:image/jpeg;base64,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" },
    { title: "Skribbl", url: "https://skribbl.io/", imageUrl: "data:image/jpeg;base64,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" },
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
