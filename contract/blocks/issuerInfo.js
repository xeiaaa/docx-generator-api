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

const noBorders = {
  top: {
    style: BorderStyle.NONE,
    size: 1,
  },
  bottom: {
    style: BorderStyle.NONE,
    size: 1,
  },
  left: {
    style: BorderStyle.NONE,
    size: 1,
  },
  right: {
    style: BorderStyle.NONE,
    size: 1,
  },
}

const createCell = (text = '', isBold = false, isItalicized = false) => {
  let isMultiline = text.split(`\n`).length > 1

  return new TableCell({
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
    borders: noBorders,
    width: {
      size: 50,
      type: WidthType.PERCENTAGE,
    },
  })
}

module.exports = (issuer) => {
  if (!issuer) {
    return null
  }

  const {
    name = '',
    address = '',
    corporateLocation = '',
    entity = '',
  } = issuer

  return new Table({
    rows: [
      new TableRow({
        children: [createCell('Credly', true), createCell('Issuer', true)],
      }),
      new TableRow({
        children: [createCell(''), createCell('')],
      }),
      new TableRow({
        children: [createCell('Credly Inc'), createCell(name)],
      }),
      new TableRow({
        children: [
          createCell('8349 5th Avenue, Suite 726'),
          createCell(address),
        ],
      }),
      new TableRow({
        children: [
          createCell('New York, NY 10016'),
          createCell(`${corporateLocation} ${entity}`),
        ],
      }),
      new TableRow({
        children: [
          createCell('Delaware corporation', false, true),
          createCell('', false, true),
        ],
      }),
    ],
    borders: noBorders,
  })
}
