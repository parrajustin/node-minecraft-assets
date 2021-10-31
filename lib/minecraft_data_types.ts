/**
 * Minecraft block textures json.
 */
export interface BlockTextures {
  /** Name of the block. */
  name: string;
  /** Block state (usually same as name of the block). */
  blockState: string;
  /** Block model name. */
  model: string | null;
  /** Block texture name. */
  texture: string | null;
}

/**
 * Minecraft items json.
 */
export interface ItemTextures {
  /** Name of the item. */
  name: string;
  /** Item model name. */
  model: string | null;
  /** Item texture name. */
  texture: string | null;
}

/**
 * Minecraft texture content.
 */
export interface TextureContent {
  /** Texture name. */
  name: string;
  /** Texture content in base64 dataurl encoding. */
  texture: string | null;
}

export interface BlockVarientState {
  model: string;
  y?: number;
}

export interface BlockWhenStatement {
  south?: string | boolean;
  east?: string | boolean;
  west?: string | boolean;
  north?: string | boolean;
  up?: string | boolean;
  down?: string | boolean;
}

export interface BlockWhenOrPart {
  OR: BlockWhenStatement[];
}

export interface BlockWhenExtraStates {
  has_bottle_0?: string;
  has_bottle_1?: string;
  has_bottle_2?: string;
  age?: string;
  leaves?: string;
  level?: string;
}

export interface ApplyPart {
  model: string;
  y?: number;
  uvlock?: boolean;
}

export interface BlockPart {
  when?: BlockWhenStatement | BlockWhenOrPart | BlockWhenExtraStates;
  apply: ApplyPart | ApplyPart[];
}

/**
 * Block states.
 */
export interface BlockStates {
  /** Different block varients, default is "". ex: "snowy=false" for block "podzol". */
  variants?: Record<string, BlockVarientState | BlockVarientState[]>;
  /** Different parts of block. */
  multipart?: BlockPart[];
}

export interface ModelDisplayPart {
  rotation?: number[];
  translation: number[];
  scale?: number[];
}

export interface ElementFace {
  uv?: number[];
  texture: string;
  rotation?: number;
  cullface?: string;
}

export interface BlockElements {
  __comment?: string;
  from: number[];
  to: number[];
  faces: {
    south?: ElementFace;
    east?: ElementFace;
    west?: ElementFace;
    north?: ElementFace;
    up?: ElementFace;
    down?: ElementFace;
  };
  shade?: boolean;
}

export interface BlockModel {
  parent?: string;
  display?: Record<string, ModelDisplayPart>;
  textures?: {
    texture?: string;
    top?: string;
    bottom?: string;
    all?: string;
    end?: string;
    side?: string;
    cross?: string;
    rail?: string;
    particle?: string;
    bars?: string;
    edge?: string;
    crop?: string;
    wall?: string;
    plant?: string;
    torch?: string;
    stem?: string;
    upperstem?: string;
    pane?: string;
    line?: string;
    fan?: string;
    wool?: string;
    pattern?: string;
    fire?: string;
    lit_log?: string;
    lantern?: string;
    tendrils?: string;
  };
  ambientocclusion?: boolean;
  elements?: BlockElements[];
}

export interface MinecraftData {
  blocksTextures: BlockTextures[];
  itemsTextures: ItemTextures[];
  textureContent: TextureContent[];
  blocksStates: Record<string, BlockStates | null>;
  blocksModels: Record<string, BlockModel>;
}
