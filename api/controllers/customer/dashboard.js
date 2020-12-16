module.exports = {


  friendlyName: 'View Dashboard',


  description: 'Dashboard customer.',


  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'pages/customer/dashboard/welcome',
    },

    redirect: {
      description: 'The requesting user is already logged in.',
      responseType: 'redirect'
    }

  },


  fn: async function () {

    // All done.

    return {};

  }


};
