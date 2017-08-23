import {
  DEVELOPMENT,
} from 'defines';
import endpointsDev from './endpoints.dev';
import endpointsProd from './endpoints.prod';

const configs = {};

if (process.env.NODE_ENV === DEVELOPMENT) {
  configs.endpoints = endpointsDev;
} else {
  configs.endpoints = endpointsProd;
}

// configs.endpoints = endpointsProd;

export default configs;
