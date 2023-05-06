import { useState, useEffect } from 'react';
import style from './with-fetch.module.css';
import {  } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

const withFetch = ({ url, validationFunc=null, transformFunc=null }) => WrappedComponent => () => {
    const [wasFetched, setWasFetched] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [hasError, setHasError] = useState(false)
    const [data, setData] = useState([])

    const getData = () => {
      setIsLoading(true)
      setHasError(false)
      sleep(0)
        .then(() => fetch(url))
        .then((response) => response.json())
        .then((data) => {
          if ((typeof validationFunc === 'function') && (!validationFunc(data))) {
            throw new Error(data)
          }
          return data
        })
        .then((data) => {
          if (typeof transformFunc === 'function') {
            return transformFunc(data)
          }
          return data
        })
        .then((data) => {
          setData(data)
          setIsLoading(false)
          setWasFetched(true)
        })
        .catch((e) => {
          console.log(e)
          setHasError(true)
          setIsLoading(false)
          setWasFetched(true)
        });
    }

    useEffect(getData, [])

    return (
        <>
          {(isLoading || !wasFetched) && <div className={style.screen}><span className="text text_type_main-large">Загрузка</span></div>}
          {hasError && <div className={style.screen}><span className="text text_type_main-large">Произошла ошибка<br />Обновите страницу</span></div>}
          {!isLoading && !hasError && wasFetched && <WrappedComponent data={data} />}
        </>
    );
};

withFetch.propTypes = {
  url: PropTypes.string.isRequired,
  validationFunc: PropTypes.func,
  transformFunc: PropTypes.func
}
export default withFetch;