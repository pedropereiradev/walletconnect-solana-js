import { createConfig } from 'fuels';

import dotenv from 'dotenv';

dotenv.config();

export default createConfig({
  predicates: ['./predicate'],
  scripts: ['./verification-script'],
  // contracts: ['./src/contract'],
  providerUrl:'http://localhost:4000/v1/graphql',
  // privateKey: process.env.PRIVATE_KEY,
  output: './src/generated',
  useBuiltinForc: false,
  useBuiltinFuelCore: false,
});
