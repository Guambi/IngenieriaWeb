parasails.registerPage('view-solicitud', {
    //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
    //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
    //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
    data: {
  
      syncing: false,
  
      // Form data
      formData: {
        transaccion: '',
        cuotas:''
      },
  
      // For tracking client-side validation errors in our form.
      // > Has property set to `true` for each invalid property in `formData`.
      formErrors: { /* … */ },
  
      // A set of validation rules for our form.
      // > The form will not be submitted if these are invalid.
      formRules: {
        transaccion: {required:true},
        cuotas: {required:true},
      },
  
      // Server error state for the form
      cloudError: '',

      success: '',
    },
  
    //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
    //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
    //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
    beforeMount: function () {
      //…
    },
    mounted: async function () {
      //…
    },
  
    //  ╦  ╦╦╦═╗╔╦╗╦ ╦╔═╗╦    ╔═╗╔═╗╔═╗╔═╗╔═╗
    //  ╚╗╔╝║╠╦╝ ║ ║ ║╠═╣║    ╠═╝╠═╣║ ╦║╣ ╚═╗
    //   ╚╝ ╩╩╚═ ╩ ╚═╝╩ ╩╩═╝  ╩  ╩ ╩╚═╝╚═╝╚═╝
    // Configure deep-linking (aka client-side routing)
    // virtualPagesRegExp: /^\/customer\/pagos\/?([^\/]+)?\/?/,
    // afterNavigate: async function (virtualPageSlug) {
    //   // `virtualPageSlug` is determined by the regular expression above, which
    //   // corresponds with `:unused?` in the server-side route for this page.
    //   switch (virtualPageSlug) {
    //     case 'pagar':
    //       this.modal = 'abrir';
    //       break;
    //     default:
    //       this.modal = '';
    //   }
    // },
  
    //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
    //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
    methods: {
  
      submittedForm: async function() {
        // > (Note that we re-enable the syncing state here.  This is on purpose--
        // > to make sure the spinner stays there until the page navigation finishes.)
        this.syncing = true;

        console.log(this.success);
        if(this.success == 1){
          window.location.href = '/customer/solicitudAprovada';
        }else{
          window.location.href = '/customer/solicitudNegada';
        }
        
      },

    }
  });
  