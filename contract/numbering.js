const { AlignmentType } = require('docx')

const numbering = {
  config: [
    {
      levels: [
        {
          level: 0,
          format: 'decimal',
          text: '%1.',
          alignment: AlignmentType.START,
          style: {
            paragraph: {
              indent: { left: 360, right: 0, hanging: 360 },
            },
            run: {
              size: 22,
            },
          },
        },
      ],
      reference: 'default-reference',
    },
    {
      levels: [
        {
          level: 0,
          format: 'decimal',
          text: '%1)',
          alignment: AlignmentType.START,
          style: {
            paragraph: {
              indent: { left: 0, right: 100, hanging: 0 },
            },
            run: {
              size: 22,
            },
          },
        },
      ],
      reference: 'cell-one',
    },
    {
      levels: [
        {
          level: 0,
          format: 'decimal',
          text: '%1)',
          alignment: AlignmentType.START,
          style: {
            paragraph: {
              indent: { left: 0, right: 100, hanging: 0 },
            },
            run: {
              size: 22,
            },
          },
        },
      ],
      reference: 'cell-two',
    },
    {
      levels: [
        {
          level: 0,
          format: 'decimal',
          text: '%1)',
          alignment: AlignmentType.START,
          style: {
            paragraph: {
              indent: { left: 0, right: 100, hanging: 0 },
            },
            run: {
              size: 22,
            },
          },
        },
      ],
      reference: 'cell-three',
    },
  ],
}

module.exports = numbering
