module.exports = {


  friendlyName: 'View Customer login',


  description: 'Display "Login" page.',


  exits: {

    success: {
      responseType: 'view',
      viewTemplatePath: 'pages/customer/entrance/login',
    },

    redirect: {
      description: 'The requesting user is already logged in.',
      responseType: 'redirect'
    }

  },


  fn: async function () {

    if (this.req.me) {
      throw {redirect: '/'};
    }

    return {};

  }

};
