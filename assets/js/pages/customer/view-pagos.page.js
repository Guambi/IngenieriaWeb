parasails.registerPage('view-pagos', {
    //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
    //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
    //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
    data: {
      modal: '',
  
      syncing: false,
  
      // Form data
      formData: {
        id:"",
        descripcion:"",
        valor:"",
        monto: "",
        valorFaltante: "",
      },
  
      // For tracking client-side validation errors in our form.
      // > Has property set to `true` for each invalid property in `formData`.
      formErrors: { /* … */ },
  
      // A set of validation rules for our form.
      // > The form will not be submitted if these are invalid.
      formRules: {
        id: {required:true},
        monto: {required:true}
      },
  
      // Server error state for the form
      cloudError: '',
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
    virtualPagesRegExp: /^\/customer\/pagos\/?([^\/]+)?\/?/,
    afterNavigate: async function (virtualPageSlug) {
      // `virtualPageSlug` is determined by the regular expression above, which
      // corresponds with `:unused?` in the server-side route for this page.
      switch (virtualPageSlug) {
        case 'pagar':
          this.modal = 'abrir';
          break;
        default:
          this.modal = '';
      }
    },
  
    //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
    //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
    methods: {
  
      clickOpenModalButton: async function () {
        this.goto('/customer/pagos/pagar');
        
      },
  
      closeModal: async function () {
        this.goto('/customer/pagos');

        this.modal = '';
        // ```
      },
  
      submittedForm: async function() {
        // Redirect to the logged-in dashboard on success.
        // > (Note that we re-enable the syncing state here.  This is on purpose--
        // > to make sure the spinner stays there until the page navigation finishes.)
        this.syncing = true;
        this.modal = '';
        window.location.href = '/customer/pagos';
      },

    }
  });
  