import { Component, OnInit } from '@angular/core';
import { openSans } from 'assets/fonts/OpenSans-Regular-normal';

declare var jsPDF: any;

@Component({
  selector: 'app-pdf-service',
  templateUrl: './pdf-service.component.html',
  styleUrls: ['./pdf-service.component.css']
})
export class PdfServiceComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  createSimplePdf(
    headers: Array<string[]>,
    data: Array<any[]>,
    documentName?: string
  ) {
    const doc = new jsPDF('landscape');

    // Added for Turkish Character Support
    const OpenSans = new openSans();
    doc.addFileToVFS('OpenSans-Regular.ttf', OpenSans.base64string);
    doc.addFont('OpenSans-Regular.ttf', 'OpenSans', 'normal');
    doc.setFont('OpenSans');

    doc.autoTable({
      /// Mandatory
      head: [headers],
      body: data,

      styles: {
        font: 'OpenSans',
        valign: 'middle',
        overflow: 'linebreak',
        tablewidth: 'auto'
      },
      headStyles: { overflow: 'linebreak', cellWidth: 'wrap' },
    });

    if (documentName == null || documentName === '') {
      doc.save('TableData.pdf');
    } else {
      doc.save(documentName + '.pdf');
    }
  }

  createAdvancedPdf(
    headers: Array<string[]>,
    data: Array<any[]>,
    documentName?: string
  ) {
    const doc = new jsPDF('landscape');

    // Added for Turkish Character Support
    const OpenSans = new openSans();
    doc.addFileToVFS('OpenSans-Regular.ttf', OpenSans.base64string);
    doc.addFont('OpenSans-Regular.ttf', 'OpenSans', 'normal');
    doc.setFont('OpenSans');
    const totalPagesExp = '{total_pages_count_string}';

    doc.autoTable({
      head: [headers],
      body: data,

      didDrawPage: function (data) {
        // Header
        doc.setFontSize(20);
        doc.setTextColor(40);
        doc.setFontStyle('normal');

        if (documentName !== null || documentName !== '') {
          doc.text(documentName, data.settings.margin.left, 15);
        }

        // Footer
        let str = 'Page ' + doc.internal.getNumberOfPages();
        if (typeof doc.putTotalPages === 'function') {
          str = str + ' of ' + totalPagesExp;
        }
        doc.setFontSize(10);

        const pageSize = doc.internal.pageSize;
        const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
        doc.text(str, data.settings.margin.left, pageHeight - 5, {
          lang: 'tr',
          align: 'left'
        });
      },
      margin: { top: 20 },
      styles: {
        font: 'OpenSans',
        valign: 'middle',
        overflow: 'linebreak',
        tablewidth: 'auto'
      },
      headStyles: { overflow: 'linebreak', cellWidth: 'wrap' },
      theme: 'grid'
    });

    // Total page number plugin only available in jspdf v1.0+
    if (typeof doc.putTotalPages === 'function') {
      doc.putTotalPages(totalPagesExp);
    }

    if (documentName == null || documentName == '') {
      doc.save('TableData.pdf');
    } else {
      doc.save(documentName.trim() + '.pdf');
    }
  }

}
