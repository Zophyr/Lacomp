import config from './config'
import {KEY} from './key'

const API_VERSION = 's6'

export const API_WEATHER_FORECAST = config.server + '/' + API_VERSION + '/' + 'weather/forecast?key=' + KEY + '&location=';
export const API_WEATHER_NOW = config.server + '/' + API_VERSION + '/' + 'weather/now?key=' + KEY + '&location=';
export const API_WEATHER_LIFESTYLE = config.server + '/' + API_VERSION + '/' + 'weather/lifestyle?key=' + KEY + '&location=';
export const API_AIR_NOW = config.server + '/' + API_VERSION + '/' + 'air/now?key=' + KEY + '&location=';
export const API_AIR_FORECAST = config.server + '/' + API_VERSION + '/' + 'air/forecast?key=' + KEY + '&location=';
export const API_SUNRISE_SUNSET = config.server + '/' + API_VERSION + '/' + 'solar/sunrise-sunset?key=' + KEY + '&location=';

export const IMAGE_SERVER = "http://p02kj3zy3.bkt.clouddn.com/";
