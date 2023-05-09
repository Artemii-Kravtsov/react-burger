import { useState } from "react";


export function useFetch({url, 
                          validationFunc=null, 
                          transformFunc=null, 
                          onSuccess=null, 
                          onError=null, 
                          defaultData=null}) {

    const [isLoading, setIsLoading] = useState(false)
    const [hasError, setHasError] = useState(false)
    const [data, setData] = useState(defaultData || [])

    const fetchFunc = () => {
        setIsLoading(true)
        setHasError(false)
        fetch(url)
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(`Ошибка ${response.status}`)
        })
        .then((data) => {
            if ((typeof validationFunc === 'function') && (!validationFunc(data))) {
                const msg = `Ошибка при валидации ответа: ${JSON.stringify(data).substring(0, 500)}`
                return Promise.reject(msg)
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
        })
        .finally(() => {
            setIsLoading(false)
        })
        .then(() => {
            if (typeof onSuccess === 'function') {
                onSuccess()
            }
        })
        .catch((error) => {
            setHasError(true)
            if (typeof onError === 'function') {
                onError(error)
            }
        });
    }

  return {
    isLoading,
    hasError,
    data,
    fetchFunc
  };
};