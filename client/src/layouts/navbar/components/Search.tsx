import React from 'react';
import { BsSearch } from 'react-icons/bs';

const Search = () => {
  return (
    <div className='navbar__search'>
      <div className='navbar__search-icon'>
        <BsSearch />
      </div>

      <input type='text' placeholder='Пошук' />
    </div>
  );
};

export default Search;
