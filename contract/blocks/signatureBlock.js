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
  UnderlineType,
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

const underlinedCell = (label, spaces) => {
  return new TableCell({
    children: [
      new Paragraph({
        children: [
          new TextRun({
            text: `${label}: `,
            font: 'Times New Roman',
            size: 22,
          }),
          new TextRun({
            text: `${spaces}`,
            font: 'Times New Roman',
            size: 22,
            underline: {
              type: UnderlineType.SINGLE,
              color: '000000',
            },
          }),
        ],
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
        children: [createCell(''), createCell('')],
      }),
      new TableRow({
        children: [underlinedCell('By', '						'), underlinedCell('By', '						')],
      }),
      new TableRow({
        children: [createCell(''), createCell('')],
      }),
      new TableRow({
        children: [
          underlinedCell('Print Name', '					'),
          underlinedCell('Print Name', 'Daniel Doktori'),
        ],
      }),
      new TableRow({
        children: [createCell(''), createCell('')],
      }),
      new TableRow({
        children: [
          underlinedCell('Title', '						'),
          underlinedCell('Title', 'Chief of Staff & General Counsel'),
        ],
      }),
      new TableRow({
        children: [createCell(''), createCell('')],
      }),
      new TableRow({
        children: [underlinedCell('Date', '						'), underlinedCell('Date', '						')],
      }),
    ],
    borders: noBorders,
  })
}
