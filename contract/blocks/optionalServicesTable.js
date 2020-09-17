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
          createCell('Additional Credential Templates', true, false),
          createCell(
            `Upon Issuer’s request, Credly may help Issuer create additional Credential templates.  There is no fee associated with Credential templates developed solely by the Issuer.`,
          ),
          createCell('$1,000 per Credential Template'),
        ],
      }),

      new TableRow({
        children: [
          createCell('Affiliate Accounts ', true),
          createCell(
            `Upon Issuer’s request, Credly may create additional Affiliate Accounts for Issuer.`,
          ),
          createCell('$2,000 per Affiliate Account per year'),
        ],
      }),

      new TableRow({
        children: [
          createCell('Excess Credential Fee', true),
          createCell(
            `Fee to issue Credentials in excess of the limit for this Credential Package.`,
          ),
          createCell('[EXCESSCREDENTIAL] per excess Credential'),
        ],
      }),

      new TableRow({
        children: [
          createCell('Excess Active Earner Fee', true),
          createCell(
            `Fee to issue Credentials to Earners in excess of the Active Earner limit. `,
          ),
          createCell('[EXCESSACTIVEEARNER] per excess Active Earner'),
        ],
      }),
    ],
  })
}
