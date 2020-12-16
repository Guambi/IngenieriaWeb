module.exports = {


  friendlyName: 'Local',


  description: 'Local admin.',


  inputs: {

  },


  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'pages/admin/view-locales'
    },
  },


  fn: async function (inputs) {
    let locales = await Local.find();
    // All done.
    return{
      locales: locales
    };

  }


};
