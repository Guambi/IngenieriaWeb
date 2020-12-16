module.exports = {


  friendlyName: 'Pagos',


  description: 'Muestra los pagos que se hicieron o no del cliente',


  inputs: {

  },


  exits: {
    success: {
      responseType: 'view',
      viewTemplatePath: 'pages/customer/views/view-pagos'
    },
    notFound: {
      description: 'No user with the specified ID was found in the database.',
      responseType: 'notFound'
    }
  },


  fn: async function () {

    //Transacciones del estado cuenta
    let cuenta = await EstadoCuenta.findOne({
      cuenta: this.req.me.id
    });

    let transacciones = await Transaccion.find({
      where: {estado_cuenta: cuenta.id},
      select:[]
    });
    
    let transaccionesIds = new Array();
    transacciones.forEach(element => {
      transaccionesIds.push(element.id);
    });

    let pagosCuenta = await Pago.find({
      transaccion: transaccionesIds
    }).populate('transaccion');

    sails.log.info(pagosCuenta);
    //Transacciones del estado movimiento
    let movimiento = await EstadoMovimiento.findOne({
      cuenta: this.req.me.id
    });

    transacciones = await Transaccion.find({
      where: {estado_movimiento: movimiento.id},
      select:[]
    });

    transaccionesIds = new Array();
    transacciones.forEach(element => {
      transaccionesIds.push(element.id);
    });

    let pagosMovimiento = await Pago.find({
      transaccion: transaccionesIds
    }).populate('transaccion');

    // sails.log.info(pagosMovimiento);

    // var SQLMovimiento = `
    // SELECT pago.id as pagoID, pago.valor_pagado, pago.porcentaje_pagado,  
    // transaccion.id as transaccionID, transaccion.n_transaccion, transaccion.descripcion, transaccion.valor,
    // diferido.cuota, diferido.porcentaje_diferido
    // FROM pago 
    // INNER JOIN transaccion ON pago.transaccion = transaccion.id 
    // INNER JOIN diferido ON transaccion.diferido = diferido.id
    // WHERE transaccion.estado_movimiento = $1`;
    // let pagosMovDiferido = await sails.sendNativeQuery(SQLMovimiento, [movimiento.id]);
    
    // sails.log.info(pagosMovDiferido);
    
    // All done.
    return{
      pagosCuenta: pagosCuenta,
      pagosMovimiento: pagosMovimiento,
      // pagosMovDiferido: pagosMovDiferido
    };

  }


};
