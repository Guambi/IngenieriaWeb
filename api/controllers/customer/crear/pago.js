module.exports = {


  friendlyName: 'Pago',


  description: 'Pago crear.',


  inputs: {
    id:{
      type: 'number',
      required: true
    },
    monto:{
      type: 'number',
      required: true
    }
  },


  exits: {
    success: {
      description: 'El pago fue hecho',
    },

    redirect: {
      responseType: 'redirect',
      description: 'Redirige a la pagina'
    },

    invalid: {
      statusCode: 409,
      description: 'The provided mont is incorrect.',
    },
  },


  fn: async function (inputs, exits) {
    
    let pago = await Pago.findOne({
      id: inputs.id
    }).populate('transaccion');

    if((inputs.monto + pago.valor_pagado) > pago.transaccion.valor){
      sails.log.warn('Valor incorrecto');
      // return res.badRequest(
      //   'Transaction limit exceeded. Please try again with an amount less than value.'
      // );
      throw 'invalid';
    }

    let valorPagado = inputs.monto + pago.valor_pagado;

    let porcentaje = (valorPagado*100)/pago.transaccion.valor;

    porcentaje = porcentaje.toFixed(2);

    let pagoRealizado = await Pago.updateOne({
      id: inputs.id
    }).set({
      valor_pagado: valorPagado,
      porcentaje_pagado: porcentaje,
      fondos_licitos: true
    });

    // All done.
    return exits.redirect('/customer/pagos');

  }


};
