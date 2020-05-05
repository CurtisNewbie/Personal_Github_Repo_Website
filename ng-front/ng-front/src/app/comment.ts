import { toDate } from "./date.util";

/**
 * Representation of Comment, where each Comment can contains a list of (child) Comments
 */
export interface Comment {
  id: number;
  message: string;
  readonly timestamp: Date;
  childComments: Comment[];
}

export interface CommentDTO {
  id: number;
  message: string;
  readonly timestamp: string;
  childComments: CommentDTO[];
}

export interface PostCommentDTO {
  message: string;
  parentCommentId: number;
}

/**
 * Convert a CommentDTO to a Comment
 * @param dto
 */
export function toComment(dto: CommentDTO): Comment {
  let list: Comment[] = [];
  for (let c of dto.childComments) {
    list.push(toComment(c));
  }
  return {
    id: dto.id,
    message: dto.message,
    timestamp: toDate(dto.timestamp),
    childComments: list,
  };
}

/**
 * Convert a list of CommentDTO to a list of Comment
 * @param dto
 */
export function toComments(dtos: CommentDTO[]): Comment[] {
  let list: Comment[] = [];
  for (let c of dtos) {
    list.push(toComment(c));
  }
  return list;
}
