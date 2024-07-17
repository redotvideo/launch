import {makeProject} from '@revideo/core';
import intro from './scenes/intro?scene';
import './global.css'

export default makeProject({
  experimentalFeatures: true,
  scenes: [intro],
});
