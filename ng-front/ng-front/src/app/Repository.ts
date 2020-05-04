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
