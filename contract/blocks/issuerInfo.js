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
  if (Array.isArray(text)) {
    return new TableCell({
      children: [
        new Paragraph({
          children: text.map((t, index) => {
            const { italics = false, bold = false } = t

            const data = {
              text: t.text,
              font: 'Times New Roman',
              size: 22,
              italics,
              bold,
            }
            if (index > 0) {
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
  } else {
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
          createCell([
            { text: '8349 5th Avenue, Suite 726' },
            { text: 'New York, NY 10016' },
          ]),
          createCell(address),
        ],
      }),
      new TableRow({
        children: [
          createCell('Delaware corporation', false, true),
          createCell(`${corporateLocation} ${entity}`, false, true),
        ],
      }),
      new TableRow({
        children: [createCell('', false, true), createCell('', false, true)],
      }),
    ],
    borders: noBorders,
  })
}
