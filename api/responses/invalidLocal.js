/**
 * invalidLocal.js
 *
 * A custom response.
 *
 * Example usage:
 * ```
 *     return res.invalidLocal();
 *     // -or-
 *     return res.invalidLocal(optionalData);
 * ```
 *
 * Or with actions2:
 * ```
 *     exits: {
 *       somethingHappened: {
 *         responseType: 'invalidLocal'
 *       }
 *     }
 * ```
 *
 * ```
 *     throw 'somethingHappened';
 *     // -or-
 *     throw { somethingHappened: optionalData }
 * ```
 */

module.exports = function invalidLocal(optionalData) {

  // Get access to `req` and `res`
  var req = this.req;
  var res = this.res;

  sails.log.verbose('Failied to create a new local');
  // Define the status code to send in the response.
  if (req.wantsJSON) {
    return res.sendStatus(401);
  }
  // Or log them out (if necessary) and then redirect to the login page.
  else {

    return res.redirect('/locales/crear');
  }

};
