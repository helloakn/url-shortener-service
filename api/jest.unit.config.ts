import type {Config} from '@jest/types';
// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  preset:'ts-jest',
  testRegex: "(/src/.*\\.unit.test)\\.(jsx?|tsx?|ts|js)$",
  transform: {
  '^.+\\.ts?$': 'ts-jest',
  },
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1"
  }
};
export default config;