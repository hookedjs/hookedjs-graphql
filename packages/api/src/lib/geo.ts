/**
 * Warning: geoip-lite takes up 100mb of ram and 7ms of CPU time for each lookup
 */
// @ts-ignore
import geoip from 'geoip-lite'

export function isIpv4(ip: string) {
  return /(\d+).(\d+).(\d+).(\d+)/.test(ip)
}

export function fromIp(ip: string) {
  const res = geoip.lookup(ip) as Geo
  return res
}

interface Geo {
  range: [number, number],
  country: string,                 // 2 letter ISO-3166-1 country code
  region: string,                  // Up to 3 alphanumeric variable length characters as ISO 3166-2 code
                                   // For US states this is the 2 letter state
                                   // For the United Kingdom this could be ENG as a country like “England
                                   // FIPS 10-4 subcountry code
  eu: string,                      // '1' if the country is a member state of the European Union, '0' otherwise.
  timezone: string,                // Timezone from IANA Time Zone Database
  city: string,                    // This is the full city name
  ll: [number, number],            // The latitude and longitude of the city
  metro: number,                   // Metro code
  area: number,                   // The approximate accuracy radius (km), around the latitude and longitude
}
