import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { debounce } from "lodash";

import styles from "./Search.module.scss"
import { changeSearchInput, cleanseSearchInput, getSearchInput } from '../../redux/slices/filterSlice'

const Search = () => {
  const searchValue = useSelector((state) => state.search.value);
  const dispatch = useDispatch();
  const inputRef = React.useRef();

  const onChangeInput = (e) => {
    dispatch(changeSearchInput(e.target.value));
    updateSearchValue(e.target.value);
  };

  const updateSearchValue = React.useCallback(
    debounce((str) => dispatch(getSearchInput(str)), 250), []
  );

  const onCleanInput = () => {
    dispatch(cleanseSearchInput());
    inputRef.current.focus();
  };


  return (
    <div className={styles.searchBlock}>
      <img src="img/search.svg" alt="Search" />
      <input
        id="searchInput"
        ref={inputRef}
        onChange={onChangeInput}
        value={searchValue}
        placeholder="Поиск..." />
      {searchValue &&
        <img
          onClick={onCleanInput}
          className={styles.clearBtn}
          src="img/close.svg"
          alt="Clear"
        />
      }
    </div>
  )
};

export { Search };