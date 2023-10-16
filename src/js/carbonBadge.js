// This code is adapted from https://gitlab.com/wholegrain/website-carbon-badges
async function handleCarbonBadge() {

  const wcID = (selector) => document.getElementById(selector);
  const wcU = encodeURIComponent(window.location.href);

  const newRequest = function (render = true) {

      // Run the API request because there is no cached result available
      fetch('https://api.websitecarbon.com/b?url=' + wcU)
          .then(function (r) {
              if (!r.ok) {
                  throw Error(r);
              }
              return r.json();
          })

          .then(function (r) {
              if (render) {
                  renderResult(r)
              }

              // Save the result into localStorage with a timestamp
              r.t = new Date().getTime()
              localStorage.setItem('wcb_'+wcU, JSON.stringify(r))
          })

          // Handle error responses
          .catch(function (e) {

              // wcID('wcb_g').innerHTML = 'Unavailable';
        //
              console.log("Live carbon footprint not available for url: ", window.location.href)
              let url = "https://sarahslab.netlify.app/"
              let page = encodeURIComponent(url)
              let cachedResponse = localStorage.getItem('wcb_' + wcU)
              cachedResponse = false
              if (cachedResponse) {
                console.log("Falling back to cached values for: ", url)
                const r = JSON.parse(cachedResponse)
                renderResult(r)
              } else {
                fetch('https://api.websitecarbon.com/b?url=' + wcU)
                .then(function (r){
                  console.log("Requesting carbon footprint for landingpage: ", url)
                  renderResult(r)
                })
                .catch(function(e){
                  console.log("Falling back to stored values for: ", url)
                  let default_values = {"c": 0.08,"p": 92, "url": "https://sarahslab.netlify.app"};
                  renderResult(default_values);
                });
              }

              // console.log("Live carbon footprint not available for url: ", window.location.href);
              // console.log("Displaying static values from landing page instead.");

              (console.error || console.log).call(console, e.stack || e);
              localStorage.removeItem('wcb_'+wcU)
          })
  }

  const renderResult = function (r) {
      wcID('wcb_g').innerHTML = r.c + 'g CO<sub>2</sub>e/view'
      wcID('wcb_2').insertAdjacentHTML('beforeEnd', 'Cleaner than ' + r.p + '% of pages tested')
  }

  const wcB = wcID('wcb');

  if (('fetch' in window)) { // If the fetch API is not available, don't do anything.

      // Add the badge markup
      wcB.insertAdjacentHTML('beforeEnd', '<div id="wcb_p"><span id="wcb_g">Measuring CO<sub>2</sub>&hellip;</span><a id="wcb_a" target="_blank" rel="noopener" href="https://websitecarbon.com">Website Carbon</a></div><div id="wcb_2"></div>');

      // Get result if it's saved
      let cachedResponse = localStorage.getItem('wcb_' + wcU)
      const t = new Date().getTime()

      // If there is a cached response, use it
      if (cachedResponse) {
          const r = JSON.parse(cachedResponse)
          renderResult(r)

          // If time since response was cached is over a day, then make a new request and update the cached result in the background
          // if ((t - r.t) > (86400000)) {
              newRequest(false)
          // }

      // If no cached response, then fetch from API
      } else {
          newRequest()
      }
  };
};

handleCarbonBadge();
