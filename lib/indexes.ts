import { MinecraftData, BlockTextures, ItemTextures, TextureContent } from '.';

export interface McDataIndexes {
  blocksByName: Map<string, BlockTextures>;
  itemsByName: Map<string, ItemTextures>;
  textureContentByName: Map<string, TextureContent>;
}

function GetProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key]; // Inferred type is T[K]
}

export function BuildIndexFromArray<T, K extends keyof T>(
  array: T[],
  fieldToIndex: K
): Map<T[K], T> {
  const output: Map<T[K], T> = new Map();
  return array.reduce((map, element) => {
    map.set(GetProperty(element, fieldToIndex), element);
    return map;
  }, output);
}

/**
 * Builds indexes out of the minecraft data for a given key.
 * @param mcData minecraft data to index
 * @returns built indexes
 */
export function BuildIndexes(mcData: MinecraftData): McDataIndexes {
  return {
    blocksByName: BuildIndexFromArray(mcData.blocksTextures, 'name'),
    itemsByName: BuildIndexFromArray(mcData.itemsTextures, 'name'),
    textureContentByName: BuildIndexFromArray(mcData.textureContent, 'name')
  };
}
