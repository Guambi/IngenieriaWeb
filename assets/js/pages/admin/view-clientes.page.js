parasails.registerPage('view-clientes', {
    //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
    //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
    //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
    data: {
      modal: '',
      editarModal: '',

      syncing: false,

    // Form data
    formData: {
      email: "",
      password: "",
      nombre: "",
      cedula: "",
      edad: "",
      trabajo: "",
      casa: "",
    },

    // For tracking client-side validation errors in our form.
    // > Has property set to `true` for each invalid property in `formData`.
    formErrors: { /* … */ },

    // A set of validation rules for our form.
    // > The form will not be submitted if these are invalid.
    formRules: {
      email: { required: true, isEmail: true },
      password: { required: true },
      nombre: {required: true},
      cedula: {required: true},
      edad: {required: true},
      trabajo: {required: true},
      casa: {required: true},

    },

    // Server error state for the form
    cloudError: '',
    },
  
    //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
    //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
    //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
    beforeMount: function() {
      //…
    },
    mounted: async function() {
      //…
    },
  
    //  ╦  ╦╦╦═╗╔╦╗╦ ╦╔═╗╦    ╔═╗╔═╗╔═╗╔═╗╔═╗
    //  ╚╗╔╝║╠╦╝ ║ ║ ║╠═╣║    ╠═╝╠═╣║ ╦║╣ ╚═╗
    //   ╚╝ ╩╩╚═ ╩ ╚═╝╩ ╩╩═╝  ╩  ╩ ╩╚═╝╚═╝╚═╝
    // Configure deep-linking (aka client-side routing)
    virtualPagesRegExp: /^\/admin\/cuentas\/?([^\/]+)?\/?/,
    afterNavigate: async function(virtualPageSlug){
      // `virtualPageSlug` is determined by the regular expression above, which
      // corresponds with `:unused?` in the server-side route for this page.
      switch (virtualPageSlug) {
        case 'crear':
          this.modal = 'abrir';
          break;
        case 'editar':
          this.editarModal = 'abrir';
        break;
        default:
          this.modal = '';
          this.editarModal = '';
      }
    },
  
    //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
    //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
    methods: {
  
      clickOpenModalButton: async function() {
        this.goto('/admin/cuentas/crear');
        // Or, without deep links, instead do:
        // ```
        //this.modal = 'example';
        // ```
      },

      clickOpenEditarModalButton: async function () {
        this.goto('/admin/cuentas/editar');
        // Or, without deep links, instead do:
        // ```
        //this.modal = 'example';
        // ```
      },
  
      closeExampleModal: async function() {
        this.goto('/admin/cuentas');
        // Or, without deep links, instead do:
        // ```
        this.modal = '';
        // ```
      },
      
      submittedForm: async function () {
        // Redirect to the logged-in dashboard on success.
        // > (Note that we re-enable the syncing state here.  This is on purpose--
        // > to make sure the spinner stays there until the page navigation finishes.)
        this.syncing = true;
        this.modal = '';
        window.location.href = '/admin/cuentas';
      },
    }
  });
  