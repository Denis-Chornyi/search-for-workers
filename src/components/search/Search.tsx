import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import burgerMenu from '../../images/list-ui-alt.svg';
import './search.scss';

interface SearchProps {
  onBurgerMenuClick: () => void;
  onSearchChange?: (searchTerm: string) => void;
  isSortOpen: boolean;
}

const Search: React.FC<SearchProps> = ({ onBurgerMenuClick, onSearchChange, isSortOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState<string>(() => {
    const params = new URLSearchParams(location.search);
    return params.get('search') || '';
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (searchTerm) {
      params.set('search', searchTerm);
    } else {
      params.delete('search');
    }
    navigate({ search: params.toString() }, { replace: true });

    if (onSearchChange) {
      onSearchChange(searchTerm);
    }
  }, [searchTerm, onSearchChange, navigate, location.search]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  const clearInput = () => {
    setSearchTerm('');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  const iconStyle = isSortOpen
    ? {
        filter:
          'invert(54%) sepia(92%) saturate(7380%) hue-rotate(250deg) brightness(94%) contrast(94%)'
      }
    : {};

  return (
    <div className="search">
      <div className="container search__container">
        <form className="search__form">
          <input
            className="search__input"
            type="search"
            placeholder="Enter name, tag, email..."
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <button type="button" className="search__burger-menu" onClick={onBurgerMenuClick}>
            <img src={burgerMenu} alt="Menu" style={iconStyle} />
          </button>
        </form>
        {searchTerm && (
          <button type="button" className="search__clear" onClick={clearInput}>
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default Search;
