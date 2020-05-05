import { Owner } from "./Owner";
import { License } from "./License";
/**
 * Representation of a GitHub Repository
 */
export interface Repository {
  id: number;
  name: string;
  full_name: string;
  owner: Owner;
  description: string;
  created_at: Date;
  updated_at: Date;
  // how long has the repo been updated (e.g., 1 month ago, 1 day ago, etc.)
  updatedTime: string;
  isActive: boolean;
  pushed_at: Date;
  stargazers_count: number;
  license: License;
  language: string;
}

export interface RepoDTO {
  id: number;
  name: string;
  full_name: string;
  owner: Owner;
  description: string;
  created_at: string;
  updated_at: string;
  // how long has the repo been updated (e.g., 1 month ago, 1 day ago, etc.)
  updatedTime: string;
  isActive: boolean;
  pushed_at: string;
  stargazers_count: number;
  license: License;
  language: string;
}

/**
 * Convert RepoDTO to Repository
 * @param dto
 */
export function toRepository(dto: RepoDTO): Repository {
  return {
    id: dto.id,
    name: dto.name,
    full_name: dto.full_name,
    owner: dto.owner,
    description: dto.description,
    created_at: toDate(dto.created_at),
    updated_at: toDate(dto.updated_at),
    updatedTime: "",
    isActive: dto.isActive,
    pushed_at: toDate(dto.pushed_at),
    stargazers_count: dto.stargazers_count,
    license: dto.license,
    language: dto.language,
  };
}

function toDate(dateStr: string): Date {
  return new Date(dateStr.substring(0, dateStr.length - 5));
}
