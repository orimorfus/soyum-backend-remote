const axios = require('axios');

module.exports = async (config, queryString, searchCache, reply) => {
  let result = searchCache.get(queryString);

  if (result) {
    reply.send(result);
  } else {
    const response = await axios(config);
    const filteredData = response.data.hits.filter(hit => hit.recipe.instructionLines.length > 0);
    result = {
      ...response.data,
      hits: filteredData.slice(0, 4).map(hit => ({
        ...hit,
        recipe: {
          ...hit.recipe,
          id: hit.recipe.uri.split('#recipe_')[1],
          label: hit.recipe.label.replace(/ Recipe$/, ''),
        },
      })),
    };
    searchCache.set(queryString, result, 120);
    reply.send(result);
  }
};
