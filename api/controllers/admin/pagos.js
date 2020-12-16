module.exports = {


  friendlyName: 'Pagos',


  description: 'Pagos admin.',


  inputs: {

  },



  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'pages/admin/view-pagos'
    },
  },

    fn: async function (inputs) {

      let pagos = await Pago.find().populate('transaccion');
      // All done.
      return {
        pagos: pagos
      };

    }

  
};
