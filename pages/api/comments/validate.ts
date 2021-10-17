import validator from 'validator';
/**
 * Validates whether a value is a UUID.
 * @param uuid The value to validate.
**/
export const validateUUID = (uuid: string) => {
  if (!uuid || uuid.length < 1) {
    return false;
  }
  return validator.isUUID(uuid);
}

export const validateQueryData = (data: any, operation: string) => {
  if (data?.length < 1 || !operation) {
    throw new Error('A valid query is required. Must have a query AND operation.');
  }

  console.log(data);

  switch (operation) {
    case 'getComments':
      return (!data.id || data.id === undefined) ? false : true;
    case 'getCommentById':
      return !data.commentId ? false : validateUUID(data.commentId)
    case 'getCommentsByDate':
      return !data.date ? false : validator.isDate(data.date)
    case 'getCommentsByUserId':
      return !data.userId ? false : true
    case 'postComment':
      console.log(data.postId, data.content)
      return (!data.postId || !data.content) ? false : true
    case 'updateCommentMetadata':
      return (!data.id || !data.deleted || !data.edited || !data.flagged) ? false : validateUUID(data.id)
    case 'updateComment':
      return (!data.id || !data.content) ? false : validateUUID(data.id)
    default:
      return false
  }
}
