const fetchOpt = {                          
    key: 'key=a21bbc1401c94828958202032220803', 
    url: 'http://api.weatherapi.com/v1',        
    methodes: {
      search: '/search.json',
      forecast: '/forecast.json',
      current: '/current.json'
    },
    query: 'q='     
  };
  
  window.addEventListener('load', onHTMLParsingFinished);

  function getFetchUrl(fetchOpt, methode, query) {
    return `${fetchOpt.url}${fetchOpt.methodes[methode]}?${fetchOpt.key}&${fetchOpt.query}${query}` 
  }
  
  
  function onHTMLParsingFinished() { 
    document.getElementById('root').insertAdjacentHTML('beforeend',
    `
    <div class="title">
      <h1>Hot Potatoes' Wheather App</h1>
    </div>
    <div class="input">
      <form id="form-weather" class="js-form-weather">
        <div class="autocomplete" >
          <input autocomplete=off id="city" list="list-city" name="city" form="form-weather" placeholder="Choose your city">
        </div>    
        <datalist id="list-city"></datalist>
        <button class="js-selected-city" type="button">Search</button>
       
      </form>
    </div>        
    <article id="card">
    
    </article>`);

    document.getElementById('city').addEventListener('keyup', async e => { 
        const value = e.target.value;
    
        if (value.length >= 3) { 
            await fetch(getFetchUrl(fetchOpt, 'search', value)) 
            .then(result => { 
              return result.json()
            })
            .then(result => { 
              document.getElementById('list-city').innerHTML = result.reduce((p, curr) => p + `<option value="${curr.name}">${curr.name}, ${curr.country}</option>`, '');
            })
            .catch(e => console.log(e)); 
        }
      });





  }