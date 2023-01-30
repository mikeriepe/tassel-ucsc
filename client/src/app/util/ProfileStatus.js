const profileStatus = {
  1: 'Pending', // pending admin response
  2: 'Requested', // admin requested more information
  3: 'Updated', // user inputted requested information
  4: 'Approved', // user is approved
  99: 'Denied', // user is denied
};

/**
 * converts profile status integer into text
 * @param {*} status takes in an integer from the status column of profiles
 * @return {*} displayable string representing status
 */
export function profileStatusToText(status) {
  return profileStatus[status];
}
