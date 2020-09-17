const { Paragraph, TextRun } = require('docx')

module.exports = (text, isBold = false) => {
  return new Paragraph({
    children: [
      new TextRun({
        text,
        font: 'Times New Roman',
        size: 22,
        bold: isBold,
      }),
    ],
  })
}
