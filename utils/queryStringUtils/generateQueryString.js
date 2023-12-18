function generateQueryString(params) {
  let queryString = '';
  for (const key in params) {
    if (Array.isArray(params[key])) {
      params[key].forEach(value => {
        queryString += `${key}=${value}&`;
      });
    } else {
      queryString += `${key}=${params[key]}&`;
    }
  }

  queryString = queryString.slice(0, -1);

  return queryString;
}

module.exports = generateQueryString;
