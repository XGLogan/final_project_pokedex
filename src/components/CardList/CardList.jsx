import Card from '../Card/Card';
import './CardList.css';

function CardList({ pokemons, onCardClick, isFavorite, onToggleFavorite }) {
  return (
    <ul className="card-list">
      {pokemons.map((pokemon) => (
        <Card
          key={pokemon.id}
          pokemon={pokemon}
          onCardClick={onCardClick}
          isFavorite={isFavorite}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </ul>
  );
}

export default CardList;
