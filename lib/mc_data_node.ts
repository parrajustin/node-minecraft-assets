import { readFileSync } from 'fs';
import { join } from 'path';
import {
  BlockTextures,
  ItemTextures,
  MinecraftData,
  TextureContent,
  BlockStates,
  BlockModel
} from '.';
import { BuildIndexes, McDataIndexes } from './indexes';

export class McDataNode {
  /**
   * Indexes of blocks/items/textures by name.
   */
  public indexes: McDataIndexes;
  /** Minecraft version string. */
  public mcVersion: string;
  /** Array of items textures. */
  public itemsArray: ItemTextures[];
  /** Array of texture contents. */
  public textureContentArray: TextureContent[];
  /** Array of block states. */
  public blockStates: Record<string, BlockStates | null>;
  /** Array of block models. */
  public blocksModels: Record<string, BlockModel>;
  /** Directory of minecraft assets data. */
  public directory: string;

  constructor(mcData: MinecraftData, mcVersion: string) {
    this.indexes = BuildIndexes(mcData);
    this.mcVersion = mcVersion;

    this.itemsArray = mcData.itemsTextures;
    this.textureContentArray = mcData.textureContent;
    this.blockStates = mcData.blocksStates;
    this.blocksModels = mcData.blocksModels;
    this.directory = join(__dirname, '/../minecraft-assets/data/', mcVersion, '/');
  }

  /** Attempt to find an item or block by name. */
  public findItemOrBlockByName(name: string): ItemTextures | BlockTextures | undefined {
    const item = this.indexes.itemsByName.get(name);
    if (item !== undefined) {
      return item;
    }
    return this.indexes.blocksByName.get(name);
  }

  public getTexture(name: string): string | undefined {
    const texture = this.findItemOrBlockByName(name);
    if (texture === undefined) {
      return undefined;
    }
    return texture.texture ? texture.texture : undefined;
  }

  public getImageContent(name: string): string | undefined {
    const texture = this.getTexture(name);
    if (texture === null || texture === undefined) {
      return undefined;
    }
    return `data:image/png;base64,${readFileSync(
      join(__dirname, '/../minecraft-assets/data/', this.mcVersion, '/', texture, '.png'),
      'base64'
    )}`;
  }
}
