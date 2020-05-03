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
  pushed_at: Date;
  stargazers_count: number;
  license: License;
  language: string;
}