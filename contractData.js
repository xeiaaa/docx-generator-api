const contractData = {
  issuer: {
    name: 'Bret Axl Sebastian',
    address: '27 Bonifacio St., Brgy. Pag-asa\nOlongapo City, Zambales, PH',
    corporateLocation: 'SBFZ, PH',
    entity: 'Sample',
  },
  agreement: {
    issuerType: 'academic', // academic , non-academic
  },
  agreementList: {
    /*
      startDate = could be
      1) “the first day of the month following the date that this Order Form is signed by duly authorized representatives of the parties”
      2) Other (to be entered)
    */
    startDate: 'September 18, 2020',
    term: '[TERM]',
    autoRenew: false,
    paymentTerms: 'annually', // quarterly, annually
  },
  services: {
    accessFee: '[ACCESS_FEE]',
    allotment: '[ALLOTMENT]',
    credentialsOrEarners: 'credentials', // credentials, activeEarners
    willPurchaseImplementation: false,
    implementation: 'selfPaced', // selfPaced, workshop, standard,
  },
}

module.exports = contractData
