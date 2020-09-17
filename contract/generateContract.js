const fs = require('fs')
const { Document, Packer } = require('docx')

const blocks = require('./blocks')
const numbering = require('./numbering')

const generateContract = async (contractData = {}) => {
  const doc = new Document({
    numbering,
  })

  const { issuer, agreement, agreementList, services } = contractData

  doc.addSection({
    properties: {},
    children: [
      blocks.title(),
      blocks.emptyLine(),
      blocks.issuerInfo(issuer),
      blocks.emptyLine(),
      blocks.agreement(agreement),
      blocks.emptyLine(),
      ...blocks.agreementList(agreementList),
      blocks.emptyLine(),
      blocks.servicesTable(services),
      blocks.emptyLine(),
      blocks.emptyLine(),
      // blocks.emptyLine('Optional:', true),
      // blocks.emptyLine(),
      // blocks.optionalServicesTable(),
      // blocks.emptyLine(),
      // blocks.emptyLine(),
      blocks.signatureBlock(),
    ],
  })

  const buffer = await Packer.toBuffer(doc)
  fs.writeFileSync(`docs/doc-${+new Date()}.docx`, buffer)
}

module.exports = generateContract
