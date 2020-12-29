/***** Variables to help with api calls *****/

/* List of Helsinki metro stops (GTFS IDs are assumed to be persistent) */
const stops =
  [
    {
      'gtfsId': 'HSL:2222603',
      'name': 'Aalto-yliopisto',
      'direction': 'east',
    },
    {
      'gtfsId': 'HSL:2222604',
      'name': 'Aalto-yliopisto',
      'direction': 'west',
    },
    {
      'gtfsId': 'HSL:1111601',
      'name': 'Hakaniemi',
      'direction': 'east',
    },
    {
      'gtfsId': 'HSL:1111602',
      'name': 'Hakaniemi',
      'direction': 'west',
    },
    {
      'gtfsId': 'HSL:1020603',
      'name': 'Helsingin yliopisto',
      'direction': 'east',
    },
    {
      'gtfsId': 'HSL:1020604',
      'name': 'Helsingin yliopisto',
      'direction': 'west',
    },
    {
      'gtfsId': 'HSL:1431601',
      'name': 'Herttoniemi',
      'direction': 'east',
    },
    {
      'gtfsId': 'HSL:1431602',
      'name': 'Herttoniemi',
      'direction': 'west',
    },
    {
      'gtfsId': 'HSL:1453601',
      'name': 'Itäkeskus',
      'direction': 'east',
    },
    {
      'gtfsId': 'HSL:1453602',
      'name': 'Itäkeskus',
      'direction': 'west',
    },
    {
      'gtfsId': 'HSL:1100601',
      'name': 'Kalasatama',
      'direction': 'east',
    },
    {
      'gtfsId': 'HSL:1100602',
      'name': 'Kalasatama',
      'direction': 'west',
    },{
      'gtfsId': 'HSL:1040601',
      'name': 'Kamppi',
      'direction': 'east',
    },
    {
      'gtfsId': 'HSL:1040602',
      'name': 'Kamppi',
      'direction': 'west',
    },
    {
      'gtfsId': 'HSL:2222601',
      'name': 'Keilaniemi',
      'direction': 'east',
    },
    {
      'gtfsId': 'HSL:2222602',
      'name': 'Keilaniemi',
      'direction': 'west',
    },
    {
      'gtfsId': 'HSL:1310603',
      'name': 'Koivusaari',
      'direction': 'east',
    },
    {
      'gtfsId': 'HSL:1310604',
      'name': 'Koivusaari',
      'direction': 'west',
    },
    {
      'gtfsId': 'HSL:1473601',
      'name': 'Kontula',
      'direction': 'east',
    },
    {
      'gtfsId': 'HSL:1473602',
      'name': 'Kontula',
      'direction': 'west',
    },
    {
      'gtfsId': 'HSL:1420601',
      'name': 'Kulosaari',
      'direction': 'east',
    },
    {
      'gtfsId': 'HSL:1420602',
      'name': 'Kulosaari',
      'direction': 'west',
    },
    {
      'gtfsId': 'HSL:1310601',
      'name': 'Lauttasaari',
      'direction': 'east',
    },
    {
      'gtfsId': 'HSL:1310602',
      'name': 'Lauttasaari',
      'direction': 'west',
    },
    {
      'gtfsId': 'HSL:2314601',
      'name': 'Matinkylä',
      'direction': 'east',
    },
    {
      'gtfsId': 'HSL:2314602',
      'name': 'Matinkylä',
      'direction': 'west',
    },
    {
      'gtfsId': 'HSL:1473603',
      'name': 'Mellunmäki',
      'direction': 'east',
    },
    {
      'gtfsId': 'HSL:1473604',
      'name': 'Mellunmäki',
      'direction': 'west',
    },
    {
      'gtfsId': 'HSL:1454601',
      'name': 'Myllypuro',
      'direction': 'east',
    },
    {
      'gtfsId': 'HSL:1454602',
      'name': 'Myllypuro',
      'direction': 'west',
    },
    {
      'gtfsId': 'HSL:2214603',
      'name': 'Niittykumpu',
      'direction': 'east',
    },
    {
      'gtfsId': 'HSL:2214604',
      'name': 'Niittykumpu',
      'direction': 'west',
    },
    {
      'gtfsId': 'HSL:1452601',
      'name': 'Puotila',
      'direction': 'east',
    },
    {
      'gtfsId': 'HSL:1452602',
      'name': 'Puotila',
      'direction': 'west',
    },
    {
      'gtfsId': 'HSL:1541601',
      'name': 'Rastila',
      'direction': 'east',
    },
    {
      'gtfsId': 'HSL:1541602',
      'name': 'Rastila',
      'direction': 'west',
    },
    {
      'gtfsId': 'HSL:1020601',
      'name': 'Rautatientori',
      'direction': 'east',
    },
    {
      'gtfsId': 'HSL:1020602',
      'name': 'Rautatientori',
      'direction': 'west',
    },
    {
      'gtfsId': 'HSL:1201601',
      'name': 'Ruoholahti',
      'direction': 'east',
    },
    {
      'gtfsId': 'HSL:1201602',
      'name': 'Ruoholahti',
      'direction': 'west',
    },
    {
      'gtfsId': 'HSL:1431603',
      'name': 'Siilitie',
      'direction': 'east',
    },
    {
      'gtfsId': 'HSL:1431604',
      'name': 'Siilitie',
      'direction': 'west',
    },
    {
      'gtfsId': 'HSL:1121601',
      'name': 'Sörnäinen',
      'direction': 'east',
    },
    {
      'gtfsId': 'HSL:1121602',
      'name': 'Sörnäinen',
      'direction': 'west',
    },
    {
      'gtfsId': 'HSL:2211601',
      'name': 'Tapiola',
      'direction': 'east',
    },
    {
      'gtfsId': 'HSL:2211602',
      'name': 'Tapiola',
      'direction': 'west',
    },
    {
      'gtfsId': 'HSL:2214601',
      'name': 'Urheilupuisto',
      'direction': 'east',
    },
    {
      'gtfsId': 'HSL:2214602',
      'name': 'Urheilupuisto',
      'direction': 'west',
    },
    {
      'gtfsId': 'HSL:1541603',
      'name': 'Vuosaari',
      'direction': 'east',
    },
    {
      'gtfsId': 'HSL:1541604',
      'name': 'Vuosaari',
      'direction': 'west',
    },
  ]

/* List of station names */
const allStops = stops.map(item => item.name);
export const stations = [ ...new Set(allStops) ];

export const apiURL = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql';

/* Boolean to help keep track of when to fetch new data from api immediately
 * (when station or direction changes), and when is it ok to set
 * interval for it (when fetching new data using the old station and direction state).
 * TODO: Find out a better way to do this
 */
let newDataNow = false;

export const getNewDataNow = () => {
  return newDataNow;
}

export const setNewDataNow = (value) => {
  newDataNow = value;
}


/***** Create api queries *****/

/* Create query string to get departing metros from the designated station
 * to the designated direction
 */
const getQueryString = (stationName, direction) => {
  const stop = stops.find(item => (item.name === stationName && item.direction === direction));

  if (stop !== undefined) {
    const query = `{
                      stop(id: "${stop.gtfsId}") {
                        name
                        stoptimesWithoutPatterns {
                          realtimeDeparture
                          headsign
                          trip {
                            id
                          }
                        }
                      }
                   }`;

    return query;
  }
  else {
    console.error('Stop not found');
    return '';
  }
}

/* Create api query init object */
const initializeQuery = (query) => {
  const init =
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/graphql'
      },
      body: query
    }
  return init;
}

/* Create api query to get metros */
export const createMetroQuery = (stationName, direction) => {
  const metroQuery = getQueryString(stationName, direction);
  if (metroQuery !== '') {
    return initializeQuery(metroQuery);
  }
  else {
    return '';
  }
}

// Create default api query
export const defaultQuery = createMetroQuery('Tapiola', 'east');
