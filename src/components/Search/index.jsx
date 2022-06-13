import styles from "./Search.module.scss"

const Search = ({onChangeSearchInput, setSearchValue, searchValue}) => {
  return (
  <div className={styles.searchBlock}>
          <img src="img/search.svg" alt="Search" />
          <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..." />
          {searchValue &&
            <img
              onClick={() => setSearchValue('')}
              className={styles.clearBtn}
              src="img/remove.svg"
              alt="Clear"
            />
          }
        </div>
  )
};

export { Search };