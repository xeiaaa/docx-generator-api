const contractData = {
  issuer: {
    name: '',
    address: '',
    corporateLocation: '',
    entity: '',
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
    isFirstDayOfMonth: true,
    startDate: '',
    term: '',
    autoRenew: false,
    paymentTerms: 'annually', // quarterly, annually
  },
  services: {
    isTiered: true,
    numberOfTiers: 1,
    tierData: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    accessFee: '',
    allotment: '',
    credentialsOrEarners: 'activeEarners', // credentials, activeEarners
    willPurchaseImplementation: true,
    implementation: 'selfPaced', // selfPaced, workshop, standard,
    /*
      if credentialsOrEarners === credentials
    */
    willPurchaseHistoricCredentials: true,
    numberOfHistoricCredentials: '',
    feeForHistoricCredentials: '',
    /*
      if credentialsOrEarners === activeEarners
    */
    willPurchaseHistoricalActiveEarners: true,
    numberOfHistoricalActiveEarners: '',
    feeForHistoricalActiveEarners: '',

    willPurchaseTalentDirectory: true,
    talentDirectoryFee: '',

    willPurchaseDirectory: true,
    employeeDirectoryFee: '',

    excessCredentialFee: '',
    excessActiveEarnerFee: '',

    implementationFee: '',

    credentialTemplates: '',
  },
}

module.exports = contractData
