/**
 * Representation of Comment, where each Comment can contains a list of (child) Comments
 */
export interface Comment {
  id: number;
  message: string;
  readonly timestamp: Date;
  childComments: Comment[];
}
