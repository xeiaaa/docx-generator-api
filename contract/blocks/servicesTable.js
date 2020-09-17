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

module.exports = () => {
  return new Table({
    rows: [
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
            `[ACCESS STATEMENT]\n\nCredly will provide Issuer support and maintenance as described in the Agreement.`,
          ),
          createCell('[ACCESS FEE] '),
        ],
      }),

      new TableRow({
        children: [
          createCell('[NAME OF IMPLEMENTATION]', true),
          createCell(`[TEXT OF IMPLEMENTATION]`),
          createCell('[IMPLEMENTATION FEE]'),
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
          createCell(
            `Issuer shall have access to the Talent Directory feature.`,
          ),
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
    ],
  })
}
