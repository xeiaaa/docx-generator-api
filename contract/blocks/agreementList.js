const { Paragraph, TextRun, AlignmentType } = require('docx')
const moment = require('moment')

const createLine = (text, isBold) => {
  return new TextRun({
    text,
    font: 'Times New Roman',
    size: 22,
    bold: isBold,
  })
}

module.exports = (agreementListInfo) => {
  const {
    isFirstDayOfMonth = false,
    startDate = '',
    term = '',
    paymentTerms = 'quarterly',
    autoRenew = true,
  } = agreementListInfo

  const paymentTerm2 = paymentTerms === 'quarterly' ? 'quarter' : 'year'

  const firstParagraphChildren = [
    createLine(`Term. `, true),
    createLine(
      `The term of this Order Form shall begin on ${
        isFirstDayOfMonth
          ? 'the first day of the month following the date that this Order Form is signed by duly authorized representatives of the parties'
          : moment(startDate).format('MMMM D, YYYY')
      } (the “`,
    ),
    createLine(`Effective Date`, true),
    createLine(
      `”) and shall remain in effect thereafter for a period of ${term}`,
    ),
  ]

  if (autoRenew) {
    firstParagraphChildren.push(
      createLine(
        `. Thereafter, this Order Form shall automatically renew for successive one-year periods unless either party provides written notice to the other at least thirty days prior to the end of the then-existing term of the Order Form of its election not to renew this Order Form (collectively, the “`,
      ),
    )
    firstParagraphChildren.push(createLine(`Term`, true))
    firstParagraphChildren.push(createLine(`”).`))
  } else {
    firstParagraphChildren.push(createLine(` (the “`))
    firstParagraphChildren.push(createLine(`Term`, true))
    firstParagraphChildren.push(createLine(`”).`))
  }

  firstParagraphChildren.push(createLine('').break())

  return [
    new Paragraph({
      children: firstParagraphChildren,
      numbering: {
        level: 0,
        reference: 'default-reference',
        style: {
          paragraph: {
            size: 30,
          },
        },
      },
      alignment: AlignmentType.LEFT,
    }),
    new Paragraph({
      children: [
        createLine(`Payment. `, true),
        createLine(
          `Credly will invoice Issuer at the Effective Date of this Order Form and ${paymentTerms} thereafter at the beginning of each contract ${paymentTerm2}. Credly will invoice Issuer for optional items upon purchase.`,
        ),
        createLine('').break(),
      ],
      numbering: {
        level: 0,
        reference: 'default-reference',
      },
      alignment: AlignmentType.LEFT,
    }),
    new Paragraph({
      children: [
        createLine(`Description of Services. `, true),
        createLine(
          `The Credential Package will comprise the following services:`,
        ),
      ],
      numbering: {
        level: 0,
        reference: 'default-reference',
      },
      alignment: AlignmentType.LEFT,
    }),
  ]
}
