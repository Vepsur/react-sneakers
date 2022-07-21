import React from "react";
import { useSelector } from "react-redux";
import { debounce } from "lodash";

import styles from "./Search.module.scss"
import { changeSearchInput, cleanseSearchInput, getSearchInput } from '../../redux/slices/filterSlice'
import { RootState, useAppDispatch } from "src/redux/store";

const Search = React.memo(() => {
  const searchValue = useSelector((state: RootState) => state.search.value);
  const dispatch = useAppDispatch();
  const inputRef = React.useRef<HTMLInputElement>(null);
  
  // eslint-disable-next-line
  const updateSearchValue = React.useCallback(debounce(() => dispatch(getSearchInput()), 250), []); 

  const onChangeInput = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeSearchInput(event.target.value));
    updateSearchValue();
  }, [updateSearchValue, dispatch]);

  const onCleanInput = React.useCallback(() => {
    dispatch(cleanseSearchInput());
    inputRef.current?.focus();
  }, [dispatch]);


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
});

export { Search };