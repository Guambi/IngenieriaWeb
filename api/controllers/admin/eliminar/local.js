module.exports = {


  friendlyName: 'Local',


  description: 'Local eliminar.',


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
    
    let idLocal = inputs.id
    await Transaccion.update({local: idLocal}).set({
      local: null
    });
    let localDeleted = await Local.destroyOne({id: idLocal});

  
    return exits.redirect('/admin/locales');

  }


};
