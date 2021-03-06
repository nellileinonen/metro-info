/* List of Helsinki metro stops */
const stops =
  [
    {
      'gtfsId': 'HSL:2222603',
      'name': 'Aalto-yliopisto',
      'direction': 'Mellumäki/Vuosaari',
    },
    {
      'gtfsId': 'HSL:2222604',
      'name': 'Aalto-yliopisto',
      'direction': 'Matinkylä/Tapiola',
    },
    {
      'gtfsId': 'HSL:1111601',
      'name': 'Hakaniemi',
      'direction': 'Mellumäki/Vuosaari',
    },
    {
      'gtfsId': 'HSL:1111602',
      'name': 'Hakaniemi',
      'direction': 'Matinkylä/Tapiola',
    },
    {
      'gtfsId': 'HSL:1020603',
      'name': 'Helsingin yliopisto',
      'direction': 'Mellumäki/Vuosaari',
    },
    {
      'gtfsId': 'HSL:1020604',
      'name': 'Helsingin yliopisto',
      'direction': 'Matinkylä/Tapiola',
    },
    {
      'gtfsId': 'HSL:1431601',
      'name': 'Herttoniemi',
      'direction': 'Mellumäki/Vuosaari',
    },
    {
      'gtfsId': 'HSL:1431602',
      'name': 'Herttoniemi',
      'direction': 'Matinkylä/Tapiola',
    },
    {
      'gtfsId': 'HSL:1453601',
      'name': 'Itäkeskus',
      'direction': 'Mellumäki/Vuosaari',
    },
    {
      'gtfsId': 'HSL:1453602',
      'name': 'Itäkeskus',
      'direction': 'Matinkylä/Tapiola',
    },
    {
      'gtfsId': 'HSL:1100601',
      'name': 'Kalasatama',
      'direction': 'Mellumäki/Vuosaari',
    },
    {
      'gtfsId': 'HSL:1100602',
      'name': 'Kalasatama',
      'direction': 'Matinkylä/Tapiola',
    },{
      'gtfsId': 'HSL:1040601',
      'name': 'Kamppi',
      'direction': 'Mellumäki/Vuosaari',
    },
    {
      'gtfsId': 'HSL:1040602',
      'name': 'Kamppi',
      'direction': 'Matinkylä/Tapiola',
    },
    {
      'gtfsId': 'HSL:2222601',
      'name': 'Keilaniemi',
      'direction': 'Mellumäki/Vuosaari',
    },
    {
      'gtfsId': 'HSL:2222602',
      'name': 'Keilaniemi',
      'direction': 'Matinkylä/Tapiola',
    },
    {
      'gtfsId': 'HSL:1310603',
      'name': 'Koivusaari',
      'direction': 'Mellumäki/Vuosaari',
    },
    {
      'gtfsId': 'HSL:1310604',
      'name': 'Koivusaari',
      'direction': 'Matinkylä/Tapiola',
    },
    {
      'gtfsId': 'HSL:1473601',
      'name': 'Kontula',
      'direction': 'Mellumäki/Vuosaari',
    },
    {
      'gtfsId': 'HSL:1473602',
      'name': 'Kontula',
      'direction': 'Matinkylä/Tapiola',
    },
    {
      'gtfsId': 'HSL:1420601',
      'name': 'Kulosaari',
      'direction': 'Mellumäki/Vuosaari',
    },
    {
      'gtfsId': 'HSL:1420602',
      'name': 'Kulosaari',
      'direction': 'Matinkylä/Tapiola',
    },
    {
      'gtfsId': 'HSL:1310601',
      'name': 'Lauttasaari',
      'direction': 'Mellumäki/Vuosaari',
    },
    {
      'gtfsId': 'HSL:1310602',
      'name': 'Lauttasaari',
      'direction': 'Matinkylä/Tapiola',
    },
    {
      'gtfsId': 'HSL:2314601',
      'name': 'Matinkylä',
      'direction': 'Mellumäki/Vuosaari',
    },
    {
      'gtfsId': 'HSL:2314602',
      'name': 'Matinkylä',
      'direction': 'Matinkylä/Tapiola',
    },
    {
      'gtfsId': 'HSL:1473603',
      'name': 'Mellunmäki',
      'direction': 'Mellumäki/Vuosaari',
    },
    {
      'gtfsId': 'HSL:1473604',
      'name': 'Mellunmäki',
      'direction': 'Matinkylä/Tapiola',
    },
    {
      'gtfsId': 'HSL:1454601',
      'name': 'Myllypuro',
      'direction': 'Mellumäki/Vuosaari',
    },
    {
      'gtfsId': 'HSL:1454602',
      'name': 'Myllypuro',
      'direction': 'Matinkylä/Tapiola',
    },
    {
      'gtfsId': 'HSL:2214603',
      'name': 'Niittykumpu',
      'direction': 'Mellumäki/Vuosaari',
    },
    {
      'gtfsId': 'HSL:2214604',
      'name': 'Niittykumpu',
      'direction': 'Matinkylä/Tapiola',
    },
    {
      'gtfsId': 'HSL:1452601',
      'name': 'Puotila',
      'direction': 'Mellumäki/Vuosaari',
    },
    {
      'gtfsId': 'HSL:1452602',
      'name': 'Puotila',
      'direction': 'Matinkylä/Tapiola',
    },
    {
      'gtfsId': 'HSL:1541601',
      'name': 'Rastila',
      'direction': 'Mellumäki/Vuosaari',
    },
    {
      'gtfsId': 'HSL:1541602',
      'name': 'Rastila',
      'direction': 'Matinkylä/Tapiola',
    },
    {
      'gtfsId': 'HSL:1020601',
      'name': 'Rautatientori',
      'direction': 'Mellumäki/Vuosaari',
    },
    {
      'gtfsId': 'HSL:1020602',
      'name': 'Rautatientori',
      'direction': 'Matinkylä/Tapiola',
    },
    {
      'gtfsId': 'HSL:1201601',
      'name': 'Ruoholahti',
      'direction': 'Mellumäki/Vuosaari',
    },
    {
      'gtfsId': 'HSL:1201602',
      'name': 'Ruoholahti',
      'direction': 'Matinkylä/Tapiola',
    },
    {
      'gtfsId': 'HSL:1431603',
      'name': 'Siilitie',
      'direction': 'Mellumäki/Vuosaari',
    },
    {
      'gtfsId': 'HSL:1431604',
      'name': 'Siilitie',
      'direction': 'Matinkylä/Tapiola',
    },
    {
      'gtfsId': 'HSL:1121601',
      'name': 'Sörnäinen',
      'direction': 'Mellumäki/Vuosaari',
    },
    {
      'gtfsId': 'HSL:1121602',
      'name': 'Sörnäinen',
      'direction': 'Matinkylä/Tapiola',
    },
    {
      'gtfsId': 'HSL:2211601',
      'name': 'Tapiola',
      'direction': 'Mellumäki/Vuosaari',
    },
    {
      'gtfsId': 'HSL:2211602',
      'name': 'Tapiola',
      'direction': 'Matinkylä/Tapiola',
    },
    {
      'gtfsId': 'HSL:2214601',
      'name': 'Urheilupuisto',
      'direction': 'Mellumäki/Vuosaari',
    },
    {
      'gtfsId': 'HSL:2214602',
      'name': 'Urheilupuisto',
      'direction': 'Matinkylä/Tapiola',
    },
    {
      'gtfsId': 'HSL:1541603',
      'name': 'Vuosaari',
      'direction': 'Mellumäki/Vuosaari',
    },
    {
      'gtfsId': 'HSL:1541604',
      'name': 'Vuosaari',
      'direction': 'Matinkylä/Tapiola',
    },
  ]

/* List of station names */
const allStops = stops.map(item => item.name);
export const stations = [ ...new Set(allStops) ];

export const apiURL = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql';

/***** Api queries *****/

/* Create query string to get departing metros */
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
