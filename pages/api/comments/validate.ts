export const validateQueryData: any = (data, operation) => {
  if(data?.length < 1 || !operation) {
    throw new Error('A valid query is required. Must have a query AND operation.');
  }

  switch (operation) {
    case 'getComments':
      return (!data.id || data.id === undefined) ? false : true
    case 'getCommentById':
      return !data.commentId ? false : true
    case 'getCommentsByDate':
      return !data.date ? false :true
    case 'getCommentsByUserId':
      return !data.userId ? false : true
    case 'postComment':
      return (!data.postId || !data.content) ? false : true
    case 'updateCommentMetadata':
      return (!data.id || !data.deleted || !data.edited || !data.flagged) ? false : true
    case 'updateComment':
      return (!data.id || !data.content) ? false : true
    default:
      return false
  }
}
