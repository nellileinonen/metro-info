/***** Variables to help with api calls *****/

export const stations =
  [
    // Note: GraphQL query does not work with '-' (e.g. 'Aalto-yliopisto')
    'Aalto-yliopisto',
    'Hakaniemi',
    'Helsingin yliopisto',
    'Herttoniemi',
    'Itäkeskus',
    'Kalasatama',
    // For some reason, Kamppi can't be found from the api. No mention of this in the docs.
    // Need to check this later. Excluding Kamppi for now
    //'Kamppi',
    'Keilaniemi',
    'Koivusaari',
    'Kontula',
    'Kulosaari',
    'Lauttasaari',
    'Matinkylä',
    'Mellunmäki',
    'Myllypuro',
    'Niittykumpu',
    'Puotila',
    'Rastila',
    'Rautatientori',
    'Ruoholahti',
    'Siilitie',
    'Sörnäinen',
    'Tapiola',
    'Urheilupuisto',
    'Vuosaari'
  ]

export const apiURL = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql';

// Array of objects holding station names and ids
let stationsInfo = [];

export const setStationsInfo = (newArr) => {
  stationsInfo = newArr;
}

// Boolean to help keep track of when to fetch new data from api
// immediately (when station or direction changes), and when is it ok to set
// interval for it (when fetching new data using the old query string).
// TODO: Find out a better way to do this
let newDataNow = false;

export const getNewDataNow = () => {
  return newDataNow;
}

export const setNewDataNow = (value) => {
  newDataNow = value;
}


/***** Create api queries and init objects for them *****/

const getStopsQueryString = () => {
  // GraphQL query does not work with '-' (e.g. 'Aalto-yliopisto') so remove it
  let stationsForQuery = [...stations];
  stationsForQuery[0] = 'Aalto yliopisto';

  let query = `{`;
  for (let i = 0; i < stationsForQuery.length; i++) {
    query = query + `stops${i+1}: stops(name:"${stationsForQuery[i]}") {
                       gtfsId
                       name
                       vehicleType
                     }`;
  }
  query = query + '}';

  return query;
}

/* Default query string for Tapiola */
/* Might be unstable because stop id might change (documentation didn't tell) */
const defaultQuery =
  `{
    stop1: stop(id: "HSL:2211601") {
      name
      stoptimesWithoutPatterns {
        realtimeDeparture
        headsign
        trip {
          id
        }
      }
    }
    stop2: stop(id: "HSL:2211602") {
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

/* Query string for station */
const getQueryString = (stationName) => {
  const temp = stationsInfo.filter(item => item.name === stationName);
  const stationIds = temp.map(item => item.id);

  let query = `{`;
  for (let i = 0; i < stationIds.length; i++) {
    query = query + `stop${i+1}: stop(id: "${stationIds[i]}") {
                        name
                        stoptimesWithoutPatterns {
                          realtimeDeparture
                          headsign
                          trip {
                            id
                          }
                        }
                      }`;
  }
  query = query + '}';

  return query;
}

/* Add query string to init object */
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

export const createStationsQuery = () => {
  const stopsQuery = getStopsQueryString();
  return initializeQuery(stopsQuery);
}

export const createDefaultQuery = () => {
  return initializeQuery(defaultQuery);
}

export const createMetroQuery = (stationName) => {
  const metroQuery = getQueryString(stationName);
  return initializeQuery(metroQuery);
}
