import type { DimensionGroup, MaterialType } from './types'
import { isColorDark } from './utils'

export const exportActiveLayoutsToPDF = async (
  groups: DimensionGroup[],
  materials: MaterialType[]
): Promise<void> => {
  if (groups.length === 0) {
    alert('Add stock dimensions and parts before exporting.')
    return
  }

  const { jsPDF } = await import('jspdf')
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'letter',
  })

  groups.forEach((group, gIdx) => {
    if (gIdx > 0) doc.addPage()

    // Draw blueprint grid lines on background for PDF premium feel
    doc.setDrawColor(240, 245, 255)
    doc.setLineWidth(0.5)
    for (let i = 20; i < 750; i += 20) {
      doc.line(i, 20, i, 770)
    }
    for (let j = 20; j < 770; j += 20) {
      doc.line(20, j, 592, j)
    }

    // Main Header block
    doc.setDrawColor(216, 118, 40)
    doc.setLineWidth(2)
    doc.line(40, 45, 572, 45)

    doc.setFont('Helvetica', 'bold')
    doc.setFontSize(22)
    doc.setTextColor(26, 27, 28)
    doc.text('MATERIAL CUTS', 40, 75)

    // Retrieve material profile info
    const mat = materials.find((m) => m.id === group.materialId) || {
      id: 'wood-oak',
      name: 'Wood (Oak)',
      finish: 'wood' as const,
      color: '#b5804c',
    }

    // Dimension Section Subheader
    doc.setFontSize(14)
    doc.setTextColor(216, 118, 40)
    doc.text(
      `${group.dimension} - ${mat.name} (${group.stockLength.toFixed(1)}" stock)`,
      40,
      100
    )

    // Reset text color for board listing
    doc.setTextColor(50, 50, 50)
    doc.setFont('Helvetica', 'normal')

    let yOffset = 130
    const trackWidth = 430
    const trackHeight = 22

    // Render stock layout diagrams
    group.layouts.forEach((board) => {
      // Page overflow safety
      if (yOffset > 520) {
        doc.addPage()
        yOffset = 60
      }

      doc.setFont('Helvetica', 'bold')
      doc.setFontSize(10)
      doc.text(`Stock ${board.id}`, 40, yOffset + 14)

      // Draw Board Container
      doc.setDrawColor(80, 80, 80)
      doc.setLineWidth(1)
      doc.setFillColor(248, 249, 250)
      doc.rect(120, yOffset, trackWidth, trackHeight, 'FD')

      let currentX = 120
      board.segments.forEach((seg) => {
        const segW = (seg.length / group.stockLength) * trackWidth

        if (seg.isWaste) {
          // Diagonal stripes for waste segment
          doc.setFillColor(230, 230, 235)
          doc.rect(currentX, yOffset, segW, trackHeight, 'F')
          doc.rect(currentX, yOffset, segW, trackHeight, 'S')

          doc.setDrawColor(180, 180, 185)
          doc.setLineWidth(0.5)
          const numStripes = Math.floor(segW / 5)
          for (let s = 0; s < numStripes; s++) {
            const sX = currentX + s * 5
            doc.line(sX, yOffset + trackHeight, sX + 4, yOffset)
          }
          doc.setDrawColor(80, 80, 80)
          doc.setLineWidth(1)

          // Write label 'WASTE'
          if (segW > 35) {
            doc.setFont('Helvetica', 'bold')
            doc.setFontSize(7)
            doc.setTextColor(110, 110, 115)
            doc.text('WASTE', currentX + segW / 2, yOffset + 13, {
              align: 'center',
            })
          }
        } else if (seg.isKerf) {
          // Red kerf line representation
          doc.setFillColor(255, 95, 86)
          doc.rect(currentX, yOffset, segW, trackHeight, 'F')
        } else {
          // Render custom material color tint in PDF
          const hex = mat.color.replace('#', '')
          const r = parseInt(hex.substring(0, 2), 16)
          const g = parseInt(hex.substring(2, 4), 16)
          const b = parseInt(hex.substring(4, 6), 16)
          doc.setFillColor(r, g, b)

          doc.rect(currentX, yOffset, segW, trackHeight, 'F')
          doc.rect(currentX, yOffset, segW, trackHeight, 'S')

          // Label part inside
          if (segW > 25) {
            doc.setFont('Helvetica', 'bold')
            doc.setFontSize(8)
            // Use dark or light text for best contrast
            if (isColorDark(mat.color)) {
              doc.setTextColor(255, 255, 255)
            } else {
              doc.setTextColor(26, 27, 28)
            }

            // Label text and dimension
            const displayLabel = `${seg.name} (${seg.length.toFixed(1)}")`
            const truncated = doc.splitTextToSize(displayLabel, segW - 4)
            doc.text(truncated[0], currentX + segW / 2, yOffset + 14, {
              align: 'center',
            })
          }
        }
        currentX += segW
      })

      // Sub-label indicating board length
      doc.setFont('Helvetica', 'normal')
      doc.setFontSize(8)
      doc.setTextColor(100, 100, 100)
      doc.text(
        `${group.stockLength.toFixed(1)}" total`,
        120 + trackWidth,
        yOffset + 13,
        { align: 'left' }
      )

      yOffset += 45
    })

    // Parts Summary Table Block (forced to bottom or new page)
    if (yOffset > 560) {
      doc.addPage()
      yOffset = 60
    } else {
      yOffset += 20
    }

    // Table Section header
    doc.setFont('Helvetica', 'bold')
    doc.setFontSize(12)
    doc.setTextColor(26, 27, 28)
    doc.text('Parts Summary', 40, yOffset)
    yOffset += 10

    // Header Row
    doc.setFillColor(230, 235, 245)
    doc.rect(40, yOffset, 532, 20, 'F')
    doc.setFontSize(8)
    doc.setFont('Helvetica', 'bold')
    doc.setTextColor(80, 90, 110)
    doc.text('ID', 50, yOffset + 13)
    doc.text('Part #', 80, yOffset + 13)
    doc.text('Length', 210, yOffset + 13)
    doc.text('Qty', 270, yOffset + 13)
    doc.text('Stocks', 330, yOffset + 13)
    doc.text('Dimension', 440, yOffset + 13)

    doc.setDrawColor(200, 205, 215)
    doc.setLineWidth(0.5)
    doc.line(40, yOffset + 20, 572, yOffset + 20)
    yOffset += 20

    // Data Rows
    doc.setFont('Helvetica', 'normal')
    doc.setTextColor(50, 50, 50)
    group.partsSummary.forEach((pSummary, idx) => {
      doc.text((idx + 1).toString(), 50, yOffset + 13)
      doc.setFont('Helvetica', 'bold')
      doc.text(pSummary.name, 80, yOffset + 13)
      doc.setFont('Helvetica', 'normal')
      doc.text(`${pSummary.length.toFixed(2)}"`, 210, yOffset + 13)
      doc.text(pSummary.qty.toString(), 270, yOffset + 13)
      doc.text(pSummary.stocksUsed.join(', '), 330, yOffset + 13)
      doc.text(group.dimension, 440, yOffset + 13)

      doc.line(40, yOffset + 20, 572, yOffset + 20)
      yOffset += 20
    })

    // Page footer details
    doc.setFontSize(7)
    doc.setTextColor(150, 150, 150)
    doc.text('Generated by Rodun Cut Planning Suite', 40, 765)
    doc.text(`Page ${gIdx + 1} of ${groups.length}`, 530, 765)
  })

  // Trigger Download
  doc.save(`materials_cuts_${new Date().toISOString().slice(0, 10)}.pdf`)
}
