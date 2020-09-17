const { Paragraph, TextRun, AlignmentType } = require('docx')

module.exports = () => {
  return new Paragraph({
    children: [
      new TextRun({
        text: 'Credential Package Order Form',
        font: 'Times New Roman',
        size: 28,
        bold: true,
      }),
    ],
    alignment: AlignmentType.CENTER,
  })
}
