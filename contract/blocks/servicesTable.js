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

const {
  selfPacedImplementationCell,
  workshopImplementationCell,
  standardImplementationCell,
} = require('./contractFixedData')

const { formatCurrency } = require('../helpers')

const createCell = (
  text = '',
  isBold = false,
  isItalicized = false,
  width,
  cellStyle = {},
) => {
  const cellData = {
    children: [
      Array.isArray(text)
        ? new Paragraph({
            children: text.map((t, index) => {
              const defaultData = {
                text: '',
                font: 'Times New Roman',
                size: 22,
                italics: false,
                bold: false,
              }

              const data = { ...defaultData, ...t }
              return new TextRun(data)
            }),
          })
        : new Paragraph({
            children: text.split(`\n`).map((t, index) => {
              const data = {
                text: t,
                font: 'Times New Roman',
                size: 22,
                italics: isItalicized,
                bold: isBold,
              }
              if (text.split(`\n`).length > 1 && index > 0) {
                return new TextRun(data).break()
              } else {
                return new TextRun(data)
              }
            }),
          }),
    ],
    margins: {
      top: 100,
      bottom: 100,
      left: 100,
      right: 100,
    },
  }

  if (width) {
    cellData.width = {
      size: width,
      type: WidthType.PERCENTAGE,
    }
  }

  const updatedCellData = { ...cellData, ...cellStyle }

  return new TableCell(updatedCellData)
}

const createText = (text = '', isBold = false) => {
  return new TextRun({
    text,
    font: 'Times New Roman',
    size: 22,
    bold: isBold,
  })
}

module.exports = (services) => {
  const {
    accessFee = '[ACCESS_FEE]',
    allotment = '[ALLOTMENT]',
    credentialsOrEarners = 'credentials',
    implementation = 'selfPaced',
    willPurchaseImplementation = false,
    willPurchaseHistoricCredentials = false,
    numberOfHistoricCredentials = '',
    feeForHistoricCredentials = '',
    willPurchaseHistoricalActiveEarners = false,
    numberOfHistoricalActiveEarners = '',
    feeForHistoricalActiveEarners = '',

    willPurchaseDirectory = false,
    employeeDirectoryFee = '',

    willPurchaseTalentDirectory = false,
    talentDirectoryFee = '',

    excessCredentialFee = '8888',
    excessActiveEarnerFee = '9999',

    implementationFee = '',

    credentialTemplates = '',

    isTiered = false,
    numberOfTiers = 1,
    tierData = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    selectedTier = 0,
  } = services

  const accessStatement =
    credentialsOrEarners === 'credentials'
      ? `Issuer may issue ${allotment} Credentials per year.`
      : `Issuer may issue Credentials to ${allotment} Active Earners per year.`

  const rows = [
    new TableRow({
      children: [
        createCell('SERVICES', true, false, 22),
        createCell('DESCRIPTION', true, false, 56, { columnSpan: 2 }),
        createCell('FEE / ALOTTMENT', true, false, 22),
      ],
    }),
  ]

  // IS TIERED?
  if (isTiered) {
    // loop numberOfTiers, tierData
    if (credentialsOrEarners === 'credentials') {
      rows.push(
        new TableRow({
          children: [
            createCell('Credential Tiers', true, false, undefined, {
              borders: {
                top: {
                  style: BorderStyle.NONE,
                  size: 1,
                },
                bottom: {
                  style: BorderStyle.NONE,
                  size: 1,
                },
                right: {
                  style: BorderStyle.NONE,
                  size: 1,
                },
              },
            }),
            createCell(
              [
                {
                  text: 'Credential Allotment - ',
                  bold: true,
                },
                {
                  text:
                    'Number of new Credentials that can be issued every year.',
                  bold: false,
                },
              ],
              true,
            ),
            createCell('Price per Credential', true),
            createCell('Annual Access Fee', true),
          ],
        }),
      )

      // loop x times
      Array.from(Array(parseInt(numberOfTiers)).keys()).map((_, index) => {
        rows.push(
          new TableRow({
            children: [
              createCell('', false, false, 0, {
                borders: {
                  top: {
                    style: BorderStyle.NONE,
                    size: 1,
                  },
                  bottom: {
                    style: BorderStyle.NONE,
                    size: 1,
                  },
                  right: {
                    style: BorderStyle.NONE,
                    size: 1,
                  },
                },
              }),
              createCell(
                `${tierData[index].count} Credentials per year`,
                false,
              ),
              createCell(formatCurrency(tierData[index].fee), false),
              createCell(
                `${formatCurrency(
                  parseFloat(tierData[index].count) *
                    parseFloat(tierData[index].fee),
                )} per year`,
                false,
              ),
            ],
          }),
        )
      })

      rows.push(
        new TableRow({
          children: [
            createCell('Access to the Credly System', true),
            createCell(
              `Issuer shall purchase one Credential Tier every contract year and inform Credly of the Credential Tier it wishes to purchase upon at least ten (10) days prior to the beginning of the next contract year. If Issuer does not provide such information, the parties agree that Issuer shall purchase the same the Credential Tier as it purchased the previous contract year.  Should Issuer desire to issue additional Credentials beyond those allotted in the purchased Credential Tier, Issuer may purchase excess Credentials at the Price per Credential at its chosen tier. \n
For the first contract year, Issuer shall purchase the ${tierData[selectedTier].count} Credential tier. \n
Credly will provide Issuer support and maintenance as described in the Agreement. 
            `,
              false,
              false,
              0,
              { columnSpan: 2 },
            ),
            createCell(
              `$${
                parseInt(tierData[selectedTier].count) *
                parseInt(tierData[selectedTier].fee)
              } for the first year of the Term`,
            ),
          ],
        }),
      )
    } else {
      rows.push(
        new TableRow({
          children: [
            createCell('Active Earner Tiers', true, false, undefined, {
              borders: {
                top: {
                  style: BorderStyle.NONE,
                  size: 1,
                },
                bottom: {
                  style: BorderStyle.NONE,
                  size: 1,
                },
                right: {
                  style: BorderStyle.NONE,
                  size: 1,
                },
              },
            }),
            createCell(
              [
                {
                  text: 'Credential Allotment ',
                  bold: true,
                },
                {
                  text:
                    '(Number of Active Earners that may be issued Credentials.)',
                  bold: false,
                },
              ],
              true,
            ),
            createCell('Price per Credential', true),
            createCell('Annual Access Fee', true),
          ],
        }),
      )

      // loop x times
      Array.from(Array(parseInt(numberOfTiers)).keys()).map((_, index) => {
        rows.push(
          new TableRow({
            children: [
              createCell('', false, false, 0, {
                borders: {
                  top: {
                    style: BorderStyle.NONE,
                    size: 1,
                  },
                  bottom: {
                    style: BorderStyle.NONE,
                    size: 1,
                  },
                  right: {
                    style: BorderStyle.NONE,
                    size: 1,
                  },
                },
              }),
              createCell(
                `${tierData[index].count} Active Earners per year`,
                false,
              ),
              createCell(formatCurrency(tierData[index].fee), false),
              createCell(
                `${formatCurrency(
                  parseFloat(tierData[index].count) *
                    parseFloat(tierData[index].fee),
                )} per year`,
                false,
              ),
            ],
          }),
        )
      })

      rows.push(
        new TableRow({
          children: [
            createCell('Access to the Credly System', true),
            createCell(
              `Issuer shall purchase one Active Earner Tier every contract year and inform Credly of the Active Earner Tier it wishes to purchase upon at least ten (10) days prior to the beginning of the next contract year. If Issuer does not provide such information, the parties agree that Issuer shall purchase the same the Active Earner Tier that it purchased the previous contract year.  Should Issuer desire to issue additional Active Earners beyond those allotted in the purchased Active Earner Tier, Issuer may purchase excess Active Earners at the Price per Active Earner for the Active Earner Tier it purchased. \n
For the first contract year, Issuer shall purchase ${tierData[selectedTier].count} Active Earner Tier.\n
Credly will provide Issuer support and maintenance as described in the Agreement. `,
              false,
              false,
              0,
              { columnSpan: 2 },
            ),
            createCell(
              `$${
                parseInt(tierData[selectedTier].count) *
                parseInt(tierData[selectedTier].fee)
              } for the first year of the Term`,
            ),
          ],
        }),
      )
    }
  } else {
    rows.push(
      new TableRow({
        children: [
          createCell('Access to the Credly System', true, false),
          createCell(
            `${accessStatement}\n\nCredly will provide Issuer support and maintenance as described in the Agreement.`,
            false,
            false,
            0,
            { columnSpan: 2 },
          ),
          createCell(`${accessFee} per year`),
        ],
      }),
    )
  }

  // IMPLEMENTATION
  if (willPurchaseImplementation && implementation) {
    let nameOfImplementation = ''
    let textOfImplementationCellData
    switch (implementation) {
      case 'selfPaced':
        nameOfImplementation = 'Self-Paced Onboarding'
        textOfImplementationCellData = selfPacedImplementationCell(
          credentialTemplates,
        )
        break
      case 'workshop':
        nameOfImplementation = 'Workshop Package'
        textOfImplementationCellData = workshopImplementationCell(
          credentialTemplates,
        )
        break
      case 'standard':
        nameOfImplementation = 'Standard Implementation'
        textOfImplementationCellData = standardImplementationCell(
          credentialTemplates,
        )
        break
      default:
        break
    }

    textOfImplementationCellData.columnSpan = 2

    const textOfImplementationCell = new TableCell(textOfImplementationCellData)

    const textOfImplementationRow = new TableRow({
      children: [
        createCell(nameOfImplementation, true),
        textOfImplementationCell,
        createCell(`${implementationFee}`),
      ],
    })

    rows.push(textOfImplementationRow)
  }

  // HISTORIC CREDENTIALS
  if (
    credentialsOrEarners === 'credentials' &&
    willPurchaseHistoricCredentials
  ) {
    rows.push(
      new TableRow({
        children: [
          createCell('Historical Credential Allotment', true),
          createCell(
            `Issuer may issue an additional ${numberOfHistoricCredentials} Credentials during the first contract year of the Term for recognition of achievements before the Effective Date of this Order Form.`,
            false,
            false,
            0,
            { columnSpan: 2 },
          ),
          createCell(`${feeForHistoricCredentials}`),
        ],
      }),
    )
  }

  // HISTORIC ACTIVE EARNERS
  if (
    credentialsOrEarners === 'activeEarners' &&
    willPurchaseHistoricalActiveEarners
  ) {
    rows.push(
      new TableRow({
        children: [
          createCell('Historical Active Earner Allotment', true),
          createCell(
            `Issuer may issue Credentials to an additional ${numberOfHistoricalActiveEarners} Active Earners during the first contract year of the Term for recognition of achievements before the Effective Date of this Order Form.`,
            false,
            false,
            0,
            { columnSpan: 2 },
          ),
          createCell(`${feeForHistoricalActiveEarners}`),
        ],
      }),
    )
  }

  // WILL PURCHASE Talent DIRECTORY
  if (willPurchaseTalentDirectory) {
    rows.push(
      new TableRow({
        children: [
          createCell('Talent Directory Access', true),
          createCell(
            `Issuer shall have access to the Talent Directory feature.`,
            false,
            false,
            0,
            { columnSpan: 2 },
          ),
          createCell(`${talentDirectoryFee} per year`),
        ],
      }),
    )
  }

  // WILL PURCHASE DIRECTORY
  if (willPurchaseDirectory) {
    rows.push(
      new TableRow({
        children: [
          createCell('Employee Directory Access', true),
          createCell(
            `Issuer shall have access to the Employee Directory feature.`,
            false,
            false,
            0,
            { columnSpan: 2 },
          ),
          createCell(`${employeeDirectoryFee} per year`),
        ],
      }),
    )
  }

  const tableData = { rows }

  return new Table(tableData)
}

/*
new TableRow({
      children: [
        createCell('Historical Credential Allotment', true),
        createCell(
          `Issuer may issue an additional [XXX] Credentials during the first contract year of the Term for recognition of achievements before the Effective Date of this Order Form.`,
        ),
        createCell('[$XXX] '),
      ],
    }),

    new TableRow({
      children: [
        createCell('Historical Active Earner Allotment', true),
        createCell(
          `Issuer may issue Credentials to an additional [XXX] Active Earners during the first contract year of the Term for recognition of achievements before the Effective Date of this Order Form.`,
        ),
        createCell('[$XXX]'),
      ],
    }),

    new TableRow({
      children: [
        createCell('Talent Directory Access', true),
        createCell(`Issuer shall have access to the Talent Directory feature.`),
        createCell('$2,500 per year'),
      ],
    }),

    new TableRow({
      children: [
        createCell('Employee Directory Access', true),
        createCell(
          `Issuer shall have access to the Employee Directory feature.`,
        ),
        createCell('$2,500 per year'),
      ],
    }),
*/
