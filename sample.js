const fs = require('fs')
const { AlignmentType, Document, Packer, Paragraph } = require('docx')

const doc = new Document()

doc.addSection({
  children: [
    new Paragraph({
      text: 'Hey you',
      numbering: {
        reference: 'my-crazy-numbering',
        level: 0,
      },
    }),
    new Paragraph({
      text: "What's up fam",
      numbering: {
        reference: 'my-crazy-numbering',
        level: 1,
      },
    }),
    new Paragraph({
      text: 'Hello World 2',
      numbering: {
        reference: 'my-crazy-numbering',
        level: 1,
      },
    }),
    new Paragraph({
      text: 'Yeah boi',
      numbering: {
        reference: 'my-crazy-numbering',
        level: 2,
      },
    }),
    new Paragraph({
      text: 'Hey you',
      bullet: {
        level: 0,
      },
    }),
    new Paragraph({
      text: "What's up fam",
      bullet: {
        level: 1,
      },
    }),
    new Paragraph({
      text: 'Hello World 2',
      bullet: {
        level: 2,
      },
    }),
    new Paragraph({
      text: 'Yeah boi',
      bullet: {
        level: 3,
      },
    }),
    new Paragraph({
      text: '101 MSXFM',
      numbering: {
        reference: 'my-crazy-numbering',
        level: 3,
      },
    }),
    new Paragraph({
      text: 'back to level 1',
      numbering: {
        reference: 'my-crazy-numbering',
        level: 1,
      },
    }),
    new Paragraph({
      text: 'back to level 0',
      numbering: {
        reference: 'my-crazy-numbering',
        level: 0,
      },
    }),
  ],
})

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync('My Document.docx', buffer)
})
