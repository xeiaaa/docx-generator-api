const fs = require('fs')
const {
  Document,
  Packer,
  Footer,
  Paragraph,
  Header,
  Media,
  AlignmentType,
} = require('docx')

const blocks = require('./blocks')
const numbering = require('./numbering')

const generateContract = async (contractData = {}) => {
  const doc = new Document({
    numbering,
  })

  const logo = Media.addImage(
    doc,
    fs.readFileSync('credly-logo.png'),
    89.196850394,
    52.157480315,
  )

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
      blocks.emptyLine('Optional:', true),
      blocks.emptyLine(),
      blocks.optionalServicesTable(services),
      blocks.emptyLine(),
      blocks.emptyLine(),
      blocks.emptyLine(),
      blocks.signatureBlock(),
    ],
    footers: {
      default: new Footer({
        children: [new Paragraph('Confidential and Proprietary')],
      }),
    },
    headers: {
      default: new Header({
        children: [
          new Paragraph({
            children: [logo],
            alignment: AlignmentType.RIGHT,
          }),
        ],
      }),
    },
  })

  const buffer = await Packer.toBuffer(doc)
  const filename = `docs/doc-${+new Date()}.docx`
  fs.writeFileSync(filename, buffer)

  return filename
}

module.exports = generateContract
