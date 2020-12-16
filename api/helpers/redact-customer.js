module.exports = {


    friendlyName: 'Redact customer',
  
  
    description: 'Destructively remove properties from the provided User record to prepare it for publication.',
  
  
    sync: true,
  
  
    inputs: {
  
      customer: {
        type: 'ref',
        readOnly: false
      }
  
    },
  
  
    fn: function ({ customer }) {
      for (let [attrName, attrDef] of Object.entries(Cliente.attributes)) {
        if (attrDef.protect) {
          delete customer[attrName];
        }//ﬁ
      }//∞
    }
  
  
  };
  
  