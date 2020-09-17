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

module.exports = () => {
  return new Table({
    rows: [
      new TableRow({
        children: [
          createCell('Issuer', false, true),
          createCell('Credly', false, true),
        ],
      }),
      new TableRow({
        children: [createCell(''), createCell('')],
      }),
      new TableRow({
        children: [createCell(''), createCell('')],
      }),
      new TableRow({
        children: [createCell(''), createCell('')],
      }),
      new TableRow({
        children: [createCell('By:'), createCell('By:')],
      }),
      new TableRow({
        children: [createCell(''), createCell('')],
      }),
      new TableRow({
        children: [
          createCell('Print Name:'),
          createCell('Print Name: Daniel Doktori'),
        ],
      }),
      new TableRow({
        children: [
          createCell('Title:'),
          createCell('Title: Chief of Staff & General Counsel'),
        ],
      }),
      new TableRow({
        children: [createCell('Date:'), createCell('Date:')],
      }),
    ],
    borders: noBorders,
  })
}
