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

const createText = (text = '', isBold = false) => {
  return new TextRun({
    text,
    font: 'Times New Roman',
    size: 22,
    bold: isBold,
  })
}

exports.selfPacedImplementationCell = {
  children: [
    new Paragraph({
      children: [
        createText(
          'During the first year of the Term, Credly will provide the following services to Issuer:',
        ),
        createText('').break(),
      ],
    }),
    new Paragraph({
      children: [
        createText(
          `A 1-hour workshop-style virtual kickoff meeting, during which Credly shall:`,
        ),
      ],
      numbering: {
        level: 0,
        reference: 'cell-one',
      },
    }),
    new Paragraph({
      children: [createText(`Provide an overview of the Credly System.`)],
      bullet: {
        level: 0,
      },
    }),
    new Paragraph({
      children: [
        createText(
          `Provide an overview of the software providing the online onboarding course.`,
        ),
      ],
      bullet: {
        level: 0,
      },
    }),
    new Paragraph({
      children: [
        createText(`Confirm contact details for support requests.`),
        createText('').break(),
      ],
      bullet: {
        level: 0,
      },
    }),
    new Paragraph({
      children: [
        createText(
          `Access to a self-paced online onboarding course that includes:`,
        ),
      ],
      numbering: {
        level: 0,
        reference: 'cell-one',
      },
    }),

    new Paragraph({
      children: [
        createText(
          `45 minutes of video training describing how Administrators can use the Credly system, Credential template development, best practices and guidelines for developing Credentials, and suggestions for marketing and promoting the digital credential program.`,
        ),
      ],
      bullet: {
        level: 0,
      },
    }),

    new Paragraph({
      children: [
        createText(`PDF text guides to supplement the video training.`),
        createText('').break(),
      ],
      bullet: {
        level: 0,
      },
    }),
    new Paragraph({
      children: [
        createText(
          `[1] Credential template developed in collaboration with Credly (up to two feedback cycles).`,
        ),
        createText('').break(),
      ],
      numbering: {
        level: 0,
        reference: 'cell-one',
      },
    }),
    new Paragraph({
      children: [createText(`Access to Issuer Knowledge Base.`)],
      numbering: {
        level: 0,
        reference: 'cell-one',
      },
    }),
  ],
  margins: {
    top: 100,
    bottom: 100,
    left: 100,
    right: 100,
  },
}

exports.workshopImplementationCell = {
  children: [
    new Paragraph({
      children: [
        createText(
          'During the first year of the Term, Credly will provide the following services to Issuer:',
        ),
        createText('').break(),
      ],
    }),
    new Paragraph({
      children: [
        createText(
          `Up to 4 hours of workshop-style virtual training, during which Credly shall:`,
        ),
      ],
      numbering: {
        level: 0,
        reference: 'cell-one',
      },
    }),
    new Paragraph({
      children: [
        createText(
          `Advise Issuer in developing Credential system and taxonomy.`,
        ),
      ],
      bullet: {
        level: 0,
      },
    }),
    new Paragraph({
      children: [
        createText(
          `Provide feedback to Issuer for alignment with best practices and guidelines.`,
        ),
      ],
      bullet: {
        level: 0,
      },
    }),
    new Paragraph({
      children: [
        createText(`Train Administrators on using the Credly System.`),
        createText('').break(),
      ],
      bullet: {
        level: 0,
      },
    }),
    new Paragraph({
      children: [
        createText(
          `[1] Credential templates developed in collaboration with Credly (up to two feedback cycles).`,
        ),
        createText('').break(),
      ],
      numbering: {
        level: 0,
        reference: 'cell-one',
      },
    }),
    new Paragraph({
      children: [
        createText(`Assigned Customer Success Manager.`),
        createText('').break(),
      ],
      numbering: {
        level: 0,
        reference: 'cell-one',
      },
    }),
    new Paragraph({
      children: [createText(`1-2 Check-ins/year, upon request by Issuer.`)],
      numbering: {
        level: 0,
        reference: 'cell-one',
      },
    }),
  ],
  margins: {
    top: 100,
    bottom: 100,
    left: 100,
    right: 100,
  },
}

exports.standardImplementationCell = {
  children: [
    new Paragraph({
      children: [
        createText(
          'During the first year of the Term, Credly will provide the following services to Issuer:',
        ),
        createText('').break(),
      ],
    }),
    new Paragraph({
      children: [
        createText('Kickoff Meeting to discuss Credential program objectives.'),
        createText('').break(),
      ],
      numbering: {
        level: 0,
        reference: 'cell-one',
      },
    }),
    new Paragraph({
      children: [
        createText(
          `Up to 8 Weekly 30-minute calls, during which Credly shall:`,
        ),
      ],
      numbering: {
        level: 0,
        reference: 'cell-one',
      },
    }),
    new Paragraph({
      children: [
        createText(`Train Administrators on using the Credly System.`),
      ],
      bullet: {
        level: 0,
      },
    }),
    new Paragraph({
      children: [
        createText(
          `Advise Issuer in developing Credential system and taxonomy.`,
        ),
      ],
      bullet: {
        level: 0,
      },
    }),
    new Paragraph({
      children: [
        createText(
          `Provide feedback to Issuer for alignment with best practices and guidelines with respect to marketing and communications.`,
        ),
      ],
      bullet: {
        level: 0,
      },
    }),
    new Paragraph({
      children: [
        createText(
          `Review Issuer success metrics and identify Credly System analytics to track performance.`,
        ),
        createText('').break(),
      ],
      bullet: {
        level: 0,
      },
    }),
    new Paragraph({
      children: [
        createText(
          `[5] Credential templates developed in collaboration with Credly (up to two feedback cycles).`,
        ),
        createText('').break(),
      ],
      numbering: {
        level: 0,
        reference: 'cell-one',
      },
    }),
    new Paragraph({
      children: [
        createText(`Assigned Customer Success Manager.`),
        createText('').break(),
      ],
      numbering: {
        level: 0,
        reference: 'cell-one',
      },
    }),
    new Paragraph({
      children: [createText(`Quarterly Check-ins, upon request by Issuer.`)],
      numbering: {
        level: 0,
        reference: 'cell-one',
      },
    }),
  ],
  margins: {
    top: 100,
    bottom: 100,
    left: 100,
    right: 100,
  },
}
