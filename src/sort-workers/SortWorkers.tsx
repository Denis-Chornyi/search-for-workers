import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { setSortCriteria } from '../state/workersSlice';
import closeIcon from '../images/close-x.svg';
import './sort-workers.scss';

interface SortWorkersProps {
  onClose: () => void;
  isSortOpen: boolean;
}

const SortWorkers: React.FC<SortWorkersProps> = ({ onClose, isSortOpen }) => {
  const dispatch = useDispatch();
  const activeButton = useSelector((state: RootState) => state.workers.sortCriteria);

  const handleButtonClick = (buttonType: 'alphabet' | 'birthday') => {
    dispatch(setSortCriteria(buttonType));
  };

  return (
    <div className="sort-wrapper">
      <div className={`sort-block ${isSortOpen ? 'sort-block_active' : ''}`}>
        <div className="sort-block__header">
          <button className="sort-block__close-btn" onClick={onClose}>
            <img src={closeIcon} alt="close" className="sort-block__close-icon" />
          </button>
          <h4 className="sort-block__title">Sorting</h4>
        </div>
        <div className="sort-block__content">
          <div className="sort-block__wrapper">
            <button
              className={`sort-block__button ${
                activeButton === 'alphabet' ? 'sort-block__button_active' : ''
              }`}
              onClick={() => handleButtonClick('alphabet')}
            />
            <p className="sort-block__description">Alphabetically</p>
          </div>
          <div className="sort-block__wrapper">
            <button
              className={`sort-block__button ${
                activeButton === 'birthday' ? 'sort-block__button_active' : ''
              }`}
              onClick={() => handleButtonClick('birthday')}
            />
            <p className="sort-block__description">By birthday</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortWorkers;
