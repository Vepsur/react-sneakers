import React from 'react'
import AppContext from '../context'

const Info = ({ title, description, image, imageHeight, imageWidth }) => {
  const { setCartOpened } = React.useContext(AppContext);

  return (
    <>
      <div className="emptyCart">
        <img width={120} src={image} alt="Empty box" />
        <h2>{title}</h2>
        <p>{description}</p>
        <button onClick={() => setCartOpened(false)} className="greenButton">
          Вернуться назад<img
            className="arrow"
            src="/img/return_arrow.svg"
            alt="Arrow"
          />
        </button>
      </div>
    </>
  )
}

export default Info;