const { Paragraph, TextRun, AlignmentType } = require('docx')

const defaultTextStyle = {
  font: 'Times New Roman',
  size: 22,
  bold: false,
  italics: false,
}

const createLine = (text, textStyle = {}) => {
  const textData = { ...defaultTextStyle, ...textStyle, text }
  return new TextRun(textData)
}

exports.createBoldLine = (text) => {
  return createLine(text, { bold: true })
}

exports.createItalizedLine = (text) => {
  return createLine(text, { italics: true })
}

exports.createLineMap = (lineData) => {
  // lineData = string || [{ text, style }, { text, style }]

  return lineData.map((line, index) => {
    console.log({ line })
    if (typeof line === 'string') {
      return createLine(line)
    } else {
      const { text, style } = line
      return createLine(text, style)
    }
  })
}

exports.createLine = createLine

const createParagraph = (children) => {
  return new Paragraph({
    children,
  })
}

exports.formatCurrency = (num, currency = '$') => {
  const options = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }

  const formatted = Number(num).toLocaleString('en', options)
  return `${currency}${formatted}`
}
