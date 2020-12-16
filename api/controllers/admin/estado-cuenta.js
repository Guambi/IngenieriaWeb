module.exports = {


  friendlyName: 'Estado cuenta',


  description: '',


  inputs: {

  },


  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'pages/admin/view-cuentas'
    },
    notFound: {
      description: 'No user with the specified ID was found in the database.',
      responseType: 'notFound'
    }
  },


  fn: async function (inputs) {
    
    let estados_cuentas = await EstadoCuenta.find().populate('cuenta');
    let cuentas = await Cuenta.find().populate('cliente');
    return{
      cuentas: estados_cuentas,
      clientes: cuentas
    };

  }


};
