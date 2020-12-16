const transaccion = require("../crear/transaccion");

module.exports = {


  friendlyName: 'Transaccion',


  
  inputs: {
    id:{
      type: 'number',
      required: true
    }
  },


  exits: {
    redirect: {
      responseType: 'redirect',
      description: ''
    },
  },


  fn: async function (inputs, exits) {

    let idTrans = inputs.id

    let transaccion = await Transaccion.destroyOne({id: idTrans});
    await Diferido.destroyOne({id: transaccion.diferido});
    if(transaccion.pago != null){
      await Pago.destroyOne({id: transaccion.pago});
    }
  
    return exits.redirect('/admin/transaccion');;

  }

};
