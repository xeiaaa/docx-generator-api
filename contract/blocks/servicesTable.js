const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  AlignmentType,
  WidthType,
  BorderStyle,
} = require('docx')

const {
  selfPacedImplementationCell,
  workshopImplementationCell,
  standardImplementationCell,
} = require('./contractFixedData')

const createCell = (text = '', isBold = false, isItalicized = false, width) => {
  let isMultiline = text.split(`\n`).length > 1

  const cellData = {
    children: [
      new Paragraph({
        children: text.split(`\n`).map((t, index) => {
          const data = {
            text: t,
            font: 'Times New Roman',
            size: 22,
            italics: isItalicized,
            bold: isBold,
          }
          if (isMultiline && index > 0) {
            return new TextRun(data).break()
          } else {
            return new TextRun(data)
          }
        }),
      }),
    ],
  }

  if (width) {
    cellData.width = {
      size: width,
      type: WidthType.PERCENTAGE,
    }
  }

  return new TableCell(cellData)
}

const createText = (text = '', isBold = false) => {
  return new TextRun({
    text,
    font: 'Times New Roman',
    size: 22,
    bold: isBold,
  })
}

module.exports = (services) => {
  const {
    accessFee = '[ACCESS_FEE]',
    allotment = '[ALLOTMENT]',
    credentialsOrEarners = 'credentials',
    implementation = 'selfPaced',
    willPurchaseImplementation = false,
  } = services

  const accessStatement =
    credentialsOrEarners === 'credentials'
      ? `Issuer may issue ${allotment} Credentials per year.`
      : `Issuer may issue Credentials to ${allotment} Active Earners per year.`

  let rows = [
    new TableRow({
      children: [
        createCell('SERVICES', true, false, 22),
        createCell('DESCRIPTION', true, false, 56),
        createCell('FEE / ALOTTMENT', true, false, 22),
      ],
    }),

    new TableRow({
      children: [
        createCell('Access to the Credly System', true, false),
        createCell(
          `${accessStatement}\n\nCredly will provide Issuer support and maintenance as described in the Agreement.`,
        ),
        createCell('[ACCESS FEE] '),
      ],
    }),

    new TableRow({
      children: [
        createCell('Historical Credential Allotment', true),
        createCell(
          `Issuer may issue an additional [XXX] Credentials during the first contract year of the Term for recognition of achievements before the Effective Date of this Order Form.`,
        ),
        createCell('[$XXX] '),
      ],
    }),

    new TableRow({
      children: [
        createCell('Historical Active Earner Allotment', true),
        createCell(
          `Issuer may issue Credentials to an additional [XXX] Active Earners during the first contract year of the Term for recognition of achievements before the Effective Date of this Order Form.`,
        ),
        createCell('[$XXX]'),
      ],
    }),

    new TableRow({
      children: [
        createCell('Talent Directory Access', true),
        createCell(`Issuer shall have access to the Talent Directory feature.`),
        createCell('$2,500 per year'),
      ],
    }),

    new TableRow({
      children: [
        createCell('Employee Directory Access', true),
        createCell(
          `Issuer shall have access to the Employee Directory feature.`,
        ),
        createCell('$2,500 per year'),
      ],
    }),
  ]

  if (willPurchaseImplementation && implementation) {
    let nameOfImplementation = ''
    let textOfImplementationCellData
    switch (implementation) {
      case 'selfPaced':
        nameOfImplementation = 'Self-Paced Onboarding'
        textOfImplementationCellData = selfPacedImplementationCell
        break
      case 'workshop':
        nameOfImplementation = 'Workshop Package'
        textOfImplementationCellData = workshopImplementationCell
        break
      case 'standard':
        nameOfImplementation = 'Standard Implementation'
        textOfImplementationCellData = standardImplementationCell
        break
      default:
        break
    }

    const textOfImplementationCell = new TableCell(textOfImplementationCellData)

    const textOfImplementationRow = new TableRow({
      children: [
        createCell(nameOfImplementation, true),
        textOfImplementationCell,
        createCell('[IMPLEMENTATION_FEE]'),
      ],
    })

    rows = [...rows.slice(0, 2), textOfImplementationRow, ...rows.slice(2)]
  }

  const tableData = { rows }

  return new Table(tableData)
}