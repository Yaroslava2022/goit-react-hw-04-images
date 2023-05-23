
function fetchImages(newQuery, queryPage) {
    const key = '24900959-71ad91e9c5a66d7f732acf0b4';
    return fetch(
      `https://pixabay.com/api/?q=${newQuery}&page=${queryPage}&key=${key}&image_type=photo&orientation=horizontal&per_page=12`,
    ).then(response => {
      if (response.ok) {
        return response.json();
      }
      return Promise.reject(new Error(`Image ${newQuery} not found`));
    });
  }
  
  const api = {
    fetchImages,
  };
  
  export default api;


  