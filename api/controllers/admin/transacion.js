module.exports = {


  friendlyName: 'Transacion',


  description: 'Transacion cuenta.',


  inputs: {

  },


  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'pages/admin/view-transacciones'
    },
    notFound: {
      description: 'No user with the specified ID was found in the database.',
      responseType: 'notFound'
    }
  },


  fn: async function (inputs) {
    let transacciones = await Transaccion.find().populate('local').populate('diferido');
    let locales = await Local.find();
    let movimientos = await EstadoMovimiento.find().populate('cuenta');
    // All done.
    return{
      transacciones: transacciones,
      locales: locales,
      movimientos: movimientos
    };

  }


};
