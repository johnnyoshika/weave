import {Type} from '../../../../../../core';
import {Call} from '../../../Browse2/callTree';

export interface WFProject extends ProjectOwned {
  type: (name: string) => Promise<WFType | null>;
  types: () => Promise<WFType[]>;
  op: (name: string) => Promise<WFOp | null>;
  ops: () => Promise<WFOp[]>;
  object: (name: string) => Promise<WFObject | null>;
  objects: () => Promise<WFObject[]>;
  typeVersion: (name: string, version: string) => Promise<WFTypeVersion | null>;
  typeVersions: () => Promise<WFTypeVersion[]>;
  opVersion: (refUriStr: string) => Promise<WFOpVersion | null>;
  opVersions: () => Promise<WFOpVersion[]>;
  objectVersion: (refUriStr: string) => Promise<WFObjectVersion | null>;
  objectVersions: () => Promise<WFObjectVersion[]>;
  call: (callID: string) => Promise<WFCall | null>;
  calls: () => Promise<WFCall[]>;
  // a bit hacky here:
  traceRoots: (traceID: string) => Promise<WFCall[]>;
  opCategories: () => HackyOpCategory[];
  typeCategories: () => HackyTypeCategory[];
}

interface ProjectOwned {
  entity: () => string;
  project: () => string;
}

export interface ReferencedObject extends ProjectOwned {
  filePath: () => string;
  refExtraPath: () => null | string;
  refUri: () => string;
  parentObject: () => ReferencedObject;
  childObject: (
    refExtraEdgeType: string,
    refExtraEdgeName: string
  ) => ReferencedObject;
  name: () => string;
  commitHash: () => string;
  versionIndex: () => number;
  aliases: () => string[];
}

export interface WFType extends ProjectOwned {
  name: () => string;
  typeVersions: () => WFTypeVersion[];
}

export interface WFOp extends ProjectOwned {
  name: () => string;
  opVersions: () => WFOpVersion[];
}

export interface WFObject extends ProjectOwned {
  name: () => string;
  objectVersions: () => WFObjectVersion[];
}

export type HackyTypeTree = string | {[propName: string]: HackyTypeTree};
export type HackyTypeCategory = 'model' | 'dataset';

export interface WFTypeVersion extends ProjectOwned {
  type: () => WFType;
  version: () => string;
  rawWeaveType: () => Type;
  propertyTypeTree: () => HackyTypeTree;
  // properties: () => {[propName: string]: WFTypeVersion};
  parentTypeVersion: () => WFTypeVersion | null;
  childTypeVersions: () => WFTypeVersion[];
  inputTo: () => WFOpVersion[];
  outputFrom: () => WFOpVersion[];
  objectVersions: () => WFObjectVersion[];
  typeCategory: () => HackyTypeCategory | null; // not technically part of data model since it is derived from the op details
}

export type HackyOpCategory =
  | 'train'
  | 'predict'
  | 'score'
  | 'evaluate'
  | 'tune';

export interface WFOpVersion extends ProjectOwned, ReferencedObject {
  op: () => WFOp;
  inputTypesVersions: () => WFTypeVersion[]; // {[argName: string]: WFTypeVersion};
  outputTypeVersions: () => WFTypeVersion[]; // WFTypeVersion
  invokes: () => WFOpVersion[];
  invokedBy: () => WFOpVersion[];
  calls: () => WFCall[];
  opCategory: () => HackyOpCategory | null; // not technically part of data model since it is derived from the op details
  createdAtMs: () => number;
}

export interface WFObjectVersion extends ProjectOwned, ReferencedObject {
  object: () => WFObject;
  typeVersion: () => null | WFTypeVersion;
  inputTo: () => WFCall[]; // Array<{argName: string; opVersion: WFCall}>;
  outputFrom: () => WFCall[];
  createdAtMs: () => number;
}

export interface WFCall extends ProjectOwned {
  callID: () => string;
  traceID: () => string;
  opVersion: () => WFOpVersion | null;
  inputs: () => WFObjectVersion[]; // {[argName: string]: WFObjectVersion};
  output: () => WFObjectVersion[]; // WFObjectVersion;
  parentCall: () => WFCall | null;
  childCalls: () => WFCall[];
  spanName: () => string; // not technically part of data model since it is derived from the span details
  rawCallSpan: () => Call; // add on
}
