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
    { title: "Skribbl", url: "https://skribbl.io/", imageUrl: "https://www.google.com/imgres?q=skribble&imgurl=https%3A%2F%2Fskribbl.io%2Fimg%2Fthumbnail.png&imgrefurl=https%3A%2F%2Fskribbl.io%2F&docid=GFlgmF06967TVM&tbnid=PffMae1ZjR-Q2M&vet=12ahUKEwiYs_j57fKMAxV8yDgGHZB3JV0QM3oECBkQAA..i&w=768&h=436&hcb=2&ved=2ahUKEwiYs_j57fKMAxV8yDgGHZB3JV0QM3oECBkQAA" },
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
