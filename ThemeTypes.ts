import { Dispatch, SetStateAction } from "react";

export interface Theme {
  id: string;
  enabled: boolean; // used to be called checked
  name: string;
  author: string;
  bundled: boolean; // deprecated
  require: number;
  version: string;
  patches: Patch[];
  dependencies: string[];
  flags: Flags[];
  created: number;
  modified: number;
}

export interface ThemePatchComponent {
  name: string;
  on: string;
  type: string;
  value: string;
}

export interface Patch {
  default: string;
  name: string;
  type: "dropdown" | "checkbox" | "slider" | "none";
  value: string;
  options: string[];
  components: ThemePatchComponent[];
}

export enum Flags {
  "isPreset" = "PRESET",
  "dontDisableDeps" = "KEEP_DEPENDENCIES",
  "optionalDeps" = "OPTIONAL_DEPENDENCIES",
}

// API TYPES

export interface UserInfo {
  id: string;
  username: string;
  avatar: string;
}
export interface MinimalCSSThemeInfo {
  id: string;
  name: string;
  version: string;
  target: string;
  manifestVersion: number;
  specifiedAuthor: string;
  type: "Css" | "Audio";
}

export type BlobType = "Zip" | "Jpg";

export interface APIBlob {
  id: string;
  blobType: BlobType;
  uploaded: Date;
  downloadCount: number;
}

export interface PartialCSSThemeInfo extends MinimalCSSThemeInfo {
  images: APIBlob[];
  download: APIBlob;
  author: UserInfo;
  submitted: Date;
  updated: Date;
  starCount: number;
}

export interface FullCSSThemeInfo extends PartialCSSThemeInfo {
  dependencies: MinimalCSSThemeInfo[];
  approved: boolean;
  disabled: boolean;
  description: string;
  source?: string;
}

export enum Permissions {
  "editAny" = "EditAnyPost",
  "approveSubs" = "ApproveThemeSubmissions",
  "viewSubs" = "ViewThemeSubmissions",
  "admin" = "ManageApi",
}

export interface AccountData extends UserInfo {
  permissions: Permissions[];
}

export interface StarredThemeList {
  total: number;
  items: PartialCSSThemeInfo[];
}
