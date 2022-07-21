import React from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import ContentLoader from 'react-content-loader';

import { Item } from 'src/redux/slices/itemsSlice';
import AppContext from 'src/context';

import styles from "./SneakersInfo.module.scss"

const SneakersInfo = React.memo(() => {
  const { cartItemCheck, favoriteItemCheck, onAddToCart, onAddToFavorites, isLoading, setIsLoading } = React.useContext(AppContext);
  const [info, setInfo] = React.useState<Item>();
  const { id } = useParams();
  const mainImg = React.useRef<HTMLImageElement>(null);

  React.useEffect(() => {
    async function fetchInfo() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`https://629f57ac8b939d3dc2959500.mockapi.io/items/${id}`);
        setInfo(data);
        setIsLoading(false);
      } catch (error) {
        alert('Произошла ошибка при загрузке данных. Пожалуйста, обновите страницу или повторите позже.');
        console.log('Error in data response', error);
      }
    }
    fetchInfo();
  }, [id, setIsLoading])

  const imgPath = React.useCallback((info: Item, str: string) => {
    return info.imageUrl.slice(0, info.imageUrl.length - 4) + str + info.imageUrl.slice(-4)
  }, []);

  const onClickImage = React.useCallback((event: React.MouseEvent<HTMLImageElement>) => {
    mainImg.current!.src = (event.target as HTMLImageElement).src;
    document.querySelector(".invisible")?.classList.remove('invisible');
    (event.target as HTMLImageElement).classList.add('invisible');
  }, [])

  return (
    <div className={styles.sneakersInfo}>
      <div className={styles.infoImages}>
        {isLoading ? (
          <ContentLoader
            speed={2}
            width="100%"
            height="100%"
            viewBox="0 0 500 460"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="350" rx="2" ry="2" width="150" height="115" />
            <rect x="341" y="350" rx="0" ry="0" width="350" height="115" />
            <rect x="0" y="0" rx="0" ry="0" width="500" height="310" />
            <rect x="170" y="350" rx="0" ry="0" width="150" height="115" />
          </ContentLoader>
        ) : (
          <>
            <div className={styles.mainImg}>
              {info &&
                (
                  <>
                    <div className={styles.favorite}>
                      <img
                        src={favoriteItemCheck(info.title) ? "img/heart_checked.svg" : "img/heart_unchecked.svg"}
                        alt="Uliked"
                        width={32}
                        height={32}
                        onClick={() => onAddToFavorites(info)}
                      />
                    </div>
                    < img ref={mainImg} className={styles.sneakersImg} src={info?.imageUrl} alt="SneakersImg" />
                  </>
                )}
            </div>
            <div className={styles.otherImg}>
              <img className="invisible" onClick={onClickImage} src={info?.imageUrl} alt="SideImg" />
              <img onClick={onClickImage} src={info && imgPath(info, '_side')} alt="SideImg" />
              <img onClick={onClickImage} src={info && imgPath(info, '_top')} alt="TopImg" />
              <img onClick={onClickImage} src={info && imgPath(info, '_back')} alt="BackImg" />
            </div>
          </>
        )}
      </div>
      <div className={styles.sneakersText}>
        {isLoading ? (
          <ContentLoader
            speed={2}
            width="100%"
            height="100%"
            viewBox="0 0 500 420"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="20" rx="0" ry="0" width="500" height="30" />
            <rect x="0" y="60" rx="0" ry="0" width="500" height="30" />
            <rect x="0" y="130" rx="0" ry="0" width="500" height="20" />
            <rect x="0" y="170" rx="0" ry="0" width="500" height="20" />
            <rect x="0" y="190" rx="0" ry="0" width="500" height="20" />
            <rect x="0" y="290" rx="0" ry="0" width="200" height="25" />
            <rect x="125" y="350" rx="20" ry="20" width="250" height="50" />
            <rect x="0" y="290" rx="0" ry="0" width="500" height="20" />
          </ContentLoader>
        ) : (
          <>
            <h2>{info?.title}</h2>
            <span>Описание:</span>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit quaerat quae minus sequi possimus, repudiandae eaque praesentium, assumenda accusantium ad inventore voluptatum consequatur eligendi maxime cumque accusamus eos perspiciatis aspernatur.</p>
            <b>{info?.price} руб.</b>
            <div className='d-flex justify-center align-center'>
              {info &&
                (<button
                  onClick={() => onAddToCart(info)}
                  disabled={cartItemCheck(info.title)}
                  className='greenButton infoBtn mt-30'>
                  {cartItemCheck(info.title) ? "В корзине" : "Добавить в корзину"}
                </button>)
              }
            </div>
          </>
        )}
      </div>
    </div>
  )
});

export default SneakersInfo;
