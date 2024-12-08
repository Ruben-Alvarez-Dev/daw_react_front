import { useState } from 'react';
import { games } from '../data/games';
import '../styles/GameList.css';

const GameList = () => {
  const [selectedGame, setSelectedGame] = useState(null);

  return (
    <div className="game-list-container">
      <div className="game-list">
        {games.map(game => (
          <div 
            key={game.id}
            className={`game-item ${selectedGame === game.id ? 'active' : ''}`}
            onClick={() => setSelectedGame(game.id)}
          >
            <div className="game-header">
              <h3>{game.title}</h3>
              <span className="game-price">${game.price}</span>
            </div>
            <div className="game-info">
              <p>{game.genre} • {game.platform}</p>
              <div className="game-tags">
                {game.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
            <div className="game-footer">
              <span className="game-rating">★ {game.rating}</span>
              <span className={`game-stock ${game.inStock ? 'in-stock' : 'out-of-stock'}`}>
                {game.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>
        ))}
      </div>
      {selectedGame && (
        <div className="game-details">
          {/* Aquí podrías mostrar más detalles del juego seleccionado */}
          <h2>{games.find(g => g.id === selectedGame)?.title}</h2>
          <p>{games.find(g => g.id === selectedGame)?.description}</p>
        </div>
      )}
    </div>
  );
};

export default GameList;
