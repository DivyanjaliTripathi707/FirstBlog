import { useState } from 'react';
import './App.css';
import sherlockImage from './assets/Sherlock Holmes.png';
import silenceImage from './assets/Silence.png';
import launchpadImage from './assets/Launchpad.png';
import oliverImage from './assets/Oliver Twist.png';

const localBlogs = [
  {
    id: 1,
    title: 'The Complete Sherlock Holmes',
    author: 'Arthur Conan Doyle',
    category: 'Mystery',
    year: 1892,
    image: sherlockImage,
    description: 'A timeless collection of detective stories that introduced Sherlock Holmes and Dr. Watson.',
    details: 'Classic mystery with unforgettable characters and clever deductions that still inspire readers today.',
    insight: 'Follow Holmes and Watson through London’s fog, from the clever “Speckled Band” to the dramatic “Final Problem” where Holmes faces his arch-nemesis Moriarty.',
    link: '/hound-of-baskervilles.html',
    date: 'Oct 23',
    readTime: '5 min read',
  },
  {
    id: 2,
    title: 'Oliver Twist',
    author: 'Charles Dickens',
    category: 'Victorian',
    year: 1838,
    image: oliverImage,
    description: 'A gripping Victorian tale about hardship, hope, and the search for a better life.',
    details: 'A powerful story of an orphan boy navigating London and Dickens’s critique of society.',
    insight: 'Watch Oliver move from the harsh workhouse to the criminal underworld, meeting kind souls like Mr. Brownlow and the sinister Fagin along the way.',
    link: '/oliver-twist.html',
    date: 'Sep 18',
    readTime: '7 min read',
  },
  {
    id: 3,
    title: 'Power of Silence',
    author: 'Tyler Hayward',
    category: 'Mindset',
    year: 2021,
    image: silenceImage,
    description: 'A modern guide on using silence to build confidence, focus, and clarity.',
    details: 'Practical lessons for readers who want better mental balance and quiet strength.',
    insight: 'Explore how quiet reflection shapes decisions, improves listening, and turns silence into a strategic advantage in work and relationships.',
    link: '/power-of-silence.html',
    date: 'Nov 02',
    readTime: '4 min read',
  },
  {
    id: 4,
    title: 'Launchpad',
    author: 'Emma Carter',
    category: 'Personal Growth',
    year: 2024,
    image: launchpadImage,
    description: 'An inspiring read about momentum, habits, and turning big ideas into action.',
    details: 'A fresh personal growth book blog pick for readers building better routines and creative momentum.',
    insight: 'Learn the routines and mindset shifts that help ambitious readers launch new projects, turn ideas into action, and stay motivated when progress is slow.',
    link: '/launchpad.html',
    date: 'Dec 05',
    readTime: '6 min read',
  },
];

const categories = ['All', ...Array.from(new Set(localBlogs.map((blog) => blog.category)))];

function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filteredBlogs = localBlogs.filter((blog) => {
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    const matchesSearch = !normalizedSearch || blog.title.toLowerCase().includes(normalizedSearch);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="app-container">
      <header className="page-header">
        <div className="hero-copy">
          <p className="eyebrow">Book Blog</p>
          <h1>Books Worth Reading</h1>
          <p className="hero-description">
            Curated book reviews and reading notes for stories that inspire, teach, and entertain.
          </p>
        </div>
      </header>

      <nav className="top-nav">
        <div className="nav-left">Bookshelf Journal</div>

        <div className="nav-center">
          <input
            type="search"
            className="search-input"
            placeholder="Search books by title..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        <div className="nav-right">
          <button type="button" className="nav-action nav-action-outline">About</button>
          <button type="button" className="nav-action nav-action-primary">Latest Picks</button>
        </div>
      </nav>

      <div className="filter-row">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`filter-pill ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="cards-grid">
        {filteredBlogs.length === 0 ? (
          <div className="empty-message">No books matched your search.</div>
        ) : (
          filteredBlogs.map((blog) => {
            const isCardLink = Boolean(blog.link);
            const cardInner = (
              <>
                <div className="card-image-wrapper">
                  <img src={blog.image} alt={blog.title} className="card-image" />
                </div>
                <div className="card-content">
                  <span className="pill">{blog.category}</span>
                  <h2>{blog.title}</h2>
                  <p className="meta">{blog.author} · {blog.year}</p>
                  <p className="description">{blog.description}</p>
                  <p className="details">{blog.details}</p>
                  <p className="insight">{blog.insight}</p>
                </div>
                <div className="card-footer-row">
                  <span>{blog.date}</span>
                  <span>{blog.readTime}</span>
                </div>
              </>
            );

            return (
              <article className={`card ${isCardLink ? 'card-clickable' : ''}`} key={blog.id}>
                {isCardLink ? (
                  <a
                    href={blog.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-link"
                    aria-label={`Open ${blog.title} details in a new tab`}
                  >
                    {cardInner}
                  </a>
                ) : (
                  cardInner
                )}
              </article>
            );
          })
        )}
      </div>

      <footer className="newsletter-section">
        <div className="newsletter-copy">
          <p className="eyebrow">Newsletter</p>
          <p>Get fresh book insights, reading lists, and short reviews straight to your inbox.</p>
        </div>
        <form className="newsletter-form" onSubmit={(event) => event.preventDefault()}>
          <input type="email" placeholder="Your email address" aria-label="Email address" />
          <button type="submit">Subscribe to reading notes</button>
        </form>
      </footer>
    </div>
  );
}

export default App;
