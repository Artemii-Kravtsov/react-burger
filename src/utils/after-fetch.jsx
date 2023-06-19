export function afterFetch(promise, 
                           {onError,
                            onSuccess, 
                            onFinish}={}) {
    return promise
    .then((response) => {
        if (response.ok === false) return response.json().then((x) => Promise.reject(x))
        if (response.ok) return response.json()  // когда в промисе fetch, он возвращает объект Response
        return response                          // когда в промисе afterFetch, он уже возвращает json
    })
    .then((data) => {
        if (!data['success']) {
            return Promise.reject(JSON.stringify(data).substring(0, 500))
        }
        if (typeof onSuccess === 'function') {
            onSuccess(data)
        }
        return data
    })
    .catch((error) => {
        if (typeof onError === 'function') {
            return onError(error)
        } else {
            return Promise.reject(error)
        }
    })
    .finally(() => {
        if (typeof onFinish === 'function') {
            onFinish()
        }
    })
}