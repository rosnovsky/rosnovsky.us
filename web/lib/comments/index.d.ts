const OPERATIONS = [
  'getComments',
  'getCommentById',
  'getCommentsByDate',
  'getCommentsByUserId',
  'postComment',
  'updateComment',
  'updateCommentMetadata',
  'deleteComment',
  'flagComment',
] as const;

type Operations = typeof OPERATIONS[number];

interface ValidateQueryData {
  validateUUID: (uuid: string) => boolean;
  validateQueryData: (queryData: any, operation: Operations) => boolean;
  data: {
    id?: string;
    commentId?: string;
    date?: string;
    postId?: string;
    content?: string;
    userId?: string;
    deleted?: boolean;
    edited?: boolean;
    flagged?: boolean;
  };
}
