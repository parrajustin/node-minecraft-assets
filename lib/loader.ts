import { McDataNode } from './mc_data_node';
import { MinecraftData } from './minecraft_data_types';

const cache: Record<string, McDataNode> = {};

/**
 * Keys of the avalaible data. The keys are minecraft versions.
 */
export const Keys = [
  '1.8.8',
  '1.9',
  '1.10',
  '1.11.2',
  '1.12',
  '1.13',
  '1.13.2',
  '1.14.4',
  '1.15.2',
  '1.16.1',
  '1.16.4',
  '1.17.1'
];

function GetVersion(mcVersion: string): null | McDataNode {
  // Check if there is an already cached version of the data node.
  if (cache[mcVersion]) {
    return cache[mcVersion];
  }

  // Try to find the minecraft data.
  const mcData = Data[mcVersion];
  if (mcData == null) {
    return null;
  }

  // Create the data node.
  const nmcData = new McDataNode(mcData, mcVersion);
  cache[mcVersion] = nmcData;
  return nmcData;
}

function ToMajor(version: string) {
  const [a, b] = (version + '.0').split('.');
  return a + '.' + b;
}

function Minor(version: string) {
  const [, , c] = (version + '.0.0').split('.');
  return parseInt(c, 10);
}

export function Loader(mcVersion: string): McDataNode | null {
  // Check exact version first
  let assets = GetVersion(mcVersion);
  if (assets) {
    return assets;
  }
  // If not found, resort to the last of major
  assets = GetVersion(lastOfMajor[ToMajor(mcVersion)]);
  return assets;
}

import * as blocks_textures_1_8_8 from '../minecraft-assets/data/1.8.8/blocks_textures.json';
import * as items_textures_1_8_8 from '../minecraft-assets/data/1.8.8/items_textures.json';
import * as texture_content_1_8_8 from '../minecraft-assets/data/1.8.8/texture_content.json';
import * as blocks_states_1_8_8 from '../minecraft-assets/data/1.8.8/blocks_states.json';
import * as blocks_models_1_8_8 from '../minecraft-assets/data/1.8.8/blocks_models.json';
import * as blocks_textures_1_9 from '../minecraft-assets/data/1.9/blocks_textures.json';
import * as items_textures_1_9 from '../minecraft-assets/data/1.9/items_textures.json';
import * as texture_content_1_9 from '../minecraft-assets/data/1.9/texture_content.json';
import * as blocks_states_1_9 from '../minecraft-assets/data/1.9/blocks_states.json';
import * as blocks_models_1_9 from '../minecraft-assets/data/1.9/blocks_models.json';
import * as blocks_textures_1_10 from '../minecraft-assets/data/1.10/blocks_textures.json';
import * as items_textures_1_10 from '../minecraft-assets/data/1.10/items_textures.json';
import * as texture_content_1_10 from '../minecraft-assets/data/1.10/texture_content.json';
import * as blocks_states_1_10 from '../minecraft-assets/data/1.10/blocks_states.json';
import * as blocks_models_1_10 from '../minecraft-assets/data/1.10/blocks_models.json';
import * as blocks_textures_1_11_2 from '../minecraft-assets/data/1.11.2/blocks_textures.json';
import * as items_textures_1_11_2 from '../minecraft-assets/data/1.11.2/items_textures.json';
import * as texture_content_1_11_2 from '../minecraft-assets/data/1.11.2/texture_content.json';
import * as blocks_states_1_11_2 from '../minecraft-assets/data/1.11.2/blocks_states.json';
import * as blocks_models_1_11_2 from '../minecraft-assets/data/1.11.2/blocks_models.json';
import * as blocks_textures_1_12 from '../minecraft-assets/data/1.12/blocks_textures.json';
import * as items_textures_1_12 from '../minecraft-assets/data/1.12/items_textures.json';
import * as texture_content_1_12 from '../minecraft-assets/data/1.12/texture_content.json';
import * as blocks_states_1_12 from '../minecraft-assets/data/1.12/blocks_states.json';
import * as blocks_models_1_12 from '../minecraft-assets/data/1.12/blocks_models.json';
import * as blocks_textures_1_13 from '../minecraft-assets/data/1.13/blocks_textures.json';
import * as items_textures_1_13 from '../minecraft-assets/data/1.13/items_textures.json';
import * as texture_content_1_13 from '../minecraft-assets/data/1.13/texture_content.json';
import * as blocks_states_1_13 from '../minecraft-assets/data/1.13/blocks_states.json';
import * as blocks_models_1_13 from '../minecraft-assets/data/1.13/blocks_models.json';
import * as blocks_textures_1_13_2 from '../minecraft-assets/data/1.13.2/blocks_textures.json';
import * as items_textures_1_13_2 from '../minecraft-assets/data/1.13.2/items_textures.json';
import * as texture_content_1_13_2 from '../minecraft-assets/data/1.13.2/texture_content.json';
import * as blocks_states_1_13_2 from '../minecraft-assets/data/1.13.2/blocks_states.json';
import * as blocks_models_1_13_2 from '../minecraft-assets/data/1.13.2/blocks_models.json';
import * as blocks_textures_1_14_4 from '../minecraft-assets/data/1.14.4/blocks_textures.json';
import * as items_textures_1_14_4 from '../minecraft-assets/data/1.14.4/items_textures.json';
import * as texture_content_1_14_4 from '../minecraft-assets/data/1.14.4/texture_content.json';
import * as blocks_states_1_14_4 from '../minecraft-assets/data/1.14.4/blocks_states.json';
import * as blocks_models_1_14_4 from '../minecraft-assets/data/1.14.4/blocks_models.json';
import * as blocks_textures_1_15_2 from '../minecraft-assets/data/1.15.2/blocks_textures.json';
import * as items_textures_1_15_2 from '../minecraft-assets/data/1.15.2/items_textures.json';
import * as texture_content_1_15_2 from '../minecraft-assets/data/1.15.2/texture_content.json';
import * as blocks_states_1_15_2 from '../minecraft-assets/data/1.15.2/blocks_states.json';
import * as blocks_models_1_15_2 from '../minecraft-assets/data/1.15.2/blocks_models.json';
import * as blocks_textures_1_16_1 from '../minecraft-assets/data/1.16.1/blocks_textures.json';
import * as items_textures_1_16_1 from '../minecraft-assets/data/1.16.1/items_textures.json';
import * as texture_content_1_16_1 from '../minecraft-assets/data/1.16.1/texture_content.json';
import * as blocks_states_1_16_1 from '../minecraft-assets/data/1.16.1/blocks_states.json';
import * as blocks_models_1_16_1 from '../minecraft-assets/data/1.16.1/blocks_models.json';
import * as blocks_textures_1_16_4 from '../minecraft-assets/data/1.16.4/blocks_textures.json';
import * as items_textures_1_16_4 from '../minecraft-assets/data/1.16.4/items_textures.json';
import * as texture_content_1_16_4 from '../minecraft-assets/data/1.16.4/texture_content.json';
import * as blocks_states_1_16_4 from '../minecraft-assets/data/1.16.4/blocks_states.json';
import * as blocks_models_1_16_4 from '../minecraft-assets/data/1.16.4/blocks_models.json';
import * as blocks_textures_1_17_1 from '../minecraft-assets/data/1.17.1/blocks_textures.json';
import * as items_textures_1_17_1 from '../minecraft-assets/data/1.17.1/items_textures.json';
import * as texture_content_1_17_1 from '../minecraft-assets/data/1.17.1/texture_content.json';
import * as blocks_states_1_17_1 from '../minecraft-assets/data/1.17.1/blocks_states.json';
import * as blocks_models_1_17_1 from '../minecraft-assets/data/1.17.1/blocks_models.json';

export const Data: Record<string, MinecraftData> = {
  '1.8.8': {
    blocksTextures: blocks_textures_1_8_8,
    itemsTextures: items_textures_1_8_8,
    textureContent: texture_content_1_8_8,
    blocksStates: blocks_states_1_8_8,
    blocksModels: blocks_models_1_8_8
  },
  '1.9': {
    blocksTextures: blocks_textures_1_9,
    itemsTextures: items_textures_1_9,
    textureContent: texture_content_1_9,
    blocksStates: blocks_states_1_9,
    blocksModels: blocks_models_1_9
  },
  '1.10': {
    blocksTextures: blocks_textures_1_10,
    itemsTextures: items_textures_1_10,
    textureContent: texture_content_1_10,
    blocksStates: blocks_states_1_10,
    blocksModels: blocks_models_1_10
  },
  '1.11.2': {
    blocksTextures: blocks_textures_1_11_2,
    itemsTextures: items_textures_1_11_2,
    textureContent: texture_content_1_11_2,
    blocksStates: blocks_states_1_11_2,
    blocksModels: blocks_models_1_11_2
  },
  '1.12': {
    blocksTextures: blocks_textures_1_12,
    itemsTextures: items_textures_1_12,
    textureContent: texture_content_1_12,
    blocksStates: blocks_states_1_12,
    blocksModels: blocks_models_1_12
  },
  '1.13': {
    blocksTextures: blocks_textures_1_13,
    itemsTextures: items_textures_1_13,
    textureContent: texture_content_1_13,
    blocksStates: blocks_states_1_13,
    blocksModels: blocks_models_1_13
  },
  '1.13.2': {
    blocksTextures: blocks_textures_1_13_2,
    itemsTextures: items_textures_1_13_2,
    textureContent: texture_content_1_13_2,
    blocksStates: blocks_states_1_13_2,
    blocksModels: blocks_models_1_13_2
  },
  '1.14.4': {
    blocksTextures: blocks_textures_1_14_4,
    itemsTextures: items_textures_1_14_4,
    textureContent: texture_content_1_14_4,
    blocksStates: blocks_states_1_14_4,
    blocksModels: blocks_models_1_14_4
  },
  '1.15.2': {
    blocksTextures: blocks_textures_1_15_2,
    itemsTextures: items_textures_1_15_2,
    textureContent: texture_content_1_15_2,
    blocksStates: blocks_states_1_15_2,
    blocksModels: blocks_models_1_15_2
  },
  '1.16.1': {
    blocksTextures: blocks_textures_1_16_1,
    itemsTextures: items_textures_1_16_1,
    textureContent: texture_content_1_16_1,
    blocksStates: blocks_states_1_16_1,
    blocksModels: blocks_models_1_16_1
  },
  '1.16.4': {
    blocksTextures: blocks_textures_1_16_4,
    itemsTextures: items_textures_1_16_4,
    textureContent: texture_content_1_16_4,
    blocksStates: blocks_states_1_16_4,
    blocksModels: blocks_models_1_16_4
  },
  '1.17.1': {
    blocksTextures: blocks_textures_1_17_1,
    itemsTextures: items_textures_1_17_1,
    textureContent: texture_content_1_17_1,
    blocksStates: blocks_states_1_17_1,
    blocksModels: blocks_models_1_17_1
  }
};

const lastOfMajor: Record<string, string> = {};
for (const version in Data) {
  const major = ToMajor(version);
  if (lastOfMajor[major]) {
    if (Minor(lastOfMajor[major]) < Minor(version)) {
      lastOfMajor[major] = version;
    }
  } else {
    lastOfMajor[major] = version;
  }
}
