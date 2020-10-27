const { Paragraph, TextRun, AlignmentType } = require('docx')

const createLine = (text, isBold) => {
  return new TextRun({
    text,
    font: 'Times New Roman',
    size: 22,
    bold: isBold,
  })
}

module.exports = (agreement) => {
  const { issuerType = 'academic' } = agreement

  // const typeOfAgreement =
  //   issuerType === 'academic'
  //     ? `pursuant to version 1.7 of the Credential Management Agreement (the “Agreement”), available online at https://info.credly.com/credential-management-agreement.`
  //     : `pursuant to version 1.1 of the Credential Management Agreement for Institutions of Higher Education (the “Agreement”), available online at https://info.credly.com/credential-management-agreement-institutions-of-higher-education.`

  const agreementLines =
    issuerType === 'academic'
      ? [
        createLine(
          `pursuant to version 1.7 of the Credential Management Agreement (the “`,
        ),
        createLine(`Agreement`, true),
        createLine(
          `”), available online at https://info.credly.com/credential-management-agreement`,
        ),
      ]
      : [
        createLine(
          `pursuant to version 1.1 of the Credential Management Agreement for Institutions of Higher Education (the “`,
        ),
        createLine(`Agreement`, true),
        createLine(
          `”), available online at https://info.credly.com/credential-management-agreement-institutions-of-higher-education`,
        ),
      ]

  return new Paragraph({
    children: [
      createLine(
        `By signing below, Issuer orders certain products and services for Issuer’s Credential program (the “`,
      ),
      createLine('Credential Package', true),
      createLine('”) from Credly '),
      ...agreementLines,
      createLine(
        `, which is incorporated herein by reference. The provisions of this Order Form do not modify or expand the licenses, representations, and limited warranties set forth in the Agreement. Credly will invoice Issuer as described in the Agreement. Capitalized terms not defined in this Order Form shall have the meanings set forth in the Agreement.`,
      ),
    ],
    alignment: AlignmentType.LEFT,
  })
}
