const accountStatus = {
  1: 'Pending', // pending admin response
  2: 'Requested', // admin requested more information
  3: 'Updated', // user inputted requested information
  4: 'Approved', // user is approved
  99: 'Denied', // user is denied
};

/**
 * converts account status integer into text
 * @param {*} status takes in an integer from the status column of accounts
 * @return {*} displayable string representing status
 */
export function accountStatusToText(status) {
  return accountStatus.status;
}
