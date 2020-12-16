module.exports = {


  friendlyName: 'Local',


  description: 'Local crear.',


  inputs: {
    nombre: {
      type: 'string',
      required: true
    },
    corriente: {
      type: 'boolean',
      required: true
    },
  },


  exits: {
    success: {
      description: `The new local was created.`,
    },

    redirect: {
      responseType: 'redirect',
      description: ''
    },

    badParam: {
      description: `The provided name is empty or contain numbers.`,
      responseType: 'invalidLocal'
      // ^This uses the custom `unauthorized` response located in `api/responses/unauthorized.js`.
      // To customize the generic "unauthorized" response across this entire app, change that file
      // (see api/responses/unauthorized).
      //
      // To customize the response for _only this_ action, replace `responseType` with
      // something else.  For example, you might set `statusCode: 498` and change the
      // implementation below accordingly (see http://sailsjs.com/docs/concepts/controllers).
    }
  },


  fn: async function (inputs, exits) {

    if(!inputs.nombre){
      throw 'badParam';
    }

    let newLocal = {
      nombre_establecimiento: inputs.nombre,
      solo_corriente: inputs.corriente
    }

    await Local.create(newLocal);
    // All done.
    return exits.redirect('/admin/locales');

  }


};
