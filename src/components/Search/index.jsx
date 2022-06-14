import { useSelector, useDispatch } from "react-redux";

import styles from "./Search.module.scss"
import { changeSearchInput, cleanseSearchInput } from '../../redux/slices/filterSlice'

const Search = () => {
  const searchValue = useSelector((state) => state.search.value);
  const dispatch = useDispatch();

  return (
  <div className={styles.searchBlock}>
          <img src="img/search.svg" alt="Search" />
          <input onChange={(e) => dispatch(changeSearchInput(e.target.value))} value={searchValue} placeholder="Поиск..." />
          {
            <img
              onClick={() => dispatch(cleanseSearchInput())}
              className={styles.clearBtn}
              src="img/remove.svg"
              alt="Clear"
            />
          }
        </div>
  )
};

export { Search };