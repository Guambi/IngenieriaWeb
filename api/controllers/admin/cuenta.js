module.exports = {


  friendlyName: 'Cuenta',


  description: 'Cuenta admin.',


  inputs: {

  },


  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'pages/admin/view-clientes'
    }
  },


  fn: async function (inputs) {
    let clientes = await Cuenta.find().populate('cliente');
    // All done.
    return{
      cuentas: clientes
    };

  }


};
