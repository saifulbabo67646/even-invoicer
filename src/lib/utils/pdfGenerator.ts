import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from './vfs_fonts';
import type { ClientInfo, InvoiceInfo, TimeEntry } from '$lib/types';
import { formatCurrency } from './formatters';

pdfMake.vfs = pdfFonts;

export async function generateInvoicePDF(
  timeEntries: TimeEntry[],
  clientInfo: ClientInfo,
  invoiceInfo: InvoiceInfo
): Promise<void> {
  const totalAmount = timeEntries.reduce(
    (sum, entry) => sum + parseFloat(entry.Hours) * invoiceInfo.hourlyRate,
    0
  );

  const docDefinition = {
    pageSize: 'A4',
    pageMargins: [40, 40, 40, 40],
    content: [
      {
        canvas: [
          {
            type: 'rect',
            x: -40,
            y: -40,
            w: 400,
            h: 80,
            color: '#000000'
          },
          {
            type: 'rect',
            x: 360,
            y: -40,
            w: 235,
            h: 80,
            color: '#333333'
          }
        ]
      },
      {
        margin: [-40, -80, -40, 40],
        columns: [
          {
            width: '*',
            text: 'INVOICE',
            style: 'invoiceTitle'
          },
          {
            width: 'auto',
            stack: [
              { text: 'Amount Due (USD)', style: 'amountDueLabel' },
              { text: formatCurrency(totalAmount), style: 'amountDueValue' }
            ],
            margin: [0, 10, 40, 0]
          }
        ]
      },
      {
        columns: [
          {
            width: '*',
            stack: [
              { text: 'BILL TO', style: 'sectionTitle' },
              { text: clientInfo.name, style: 'clientName' },
              { text: clientInfo.company, style: 'clientDetails' },
              { text: clientInfo.address1, style: 'clientDetails' },
              clientInfo.address2 ? { text: clientInfo.address2, style: 'clientDetails' } : null,
              { 
                text: [
                  clientInfo.city || '',
                  clientInfo.city && clientInfo.state ? ', ' : '',
                  clientInfo.state || '',
                  ' ',
                  clientInfo.zip || ''
                ].join(''),
                style: 'clientDetails'
              },
              { text: clientInfo.country, style: 'clientDetails' },
              clientInfo.phone ? { text: clientInfo.phone, style: 'clientDetails', margin: [0, 10, 0, 0] } : null,
              clientInfo.email ? { text: clientInfo.email, style: 'clientDetails', margin: [0, 2, 0, 0] } : null
            ].filter(Boolean)
          },
          {
            width: 'auto',
            stack: [
              {
                columns: [
                  { text: 'Invoice Number:', style: 'label', width: 'auto' },
                  { text: invoiceInfo.number, style: 'value', width: 100, alignment: 'left' }
                ],
                columnGap: 10
              },
              {
                columns: [
                  { text: 'Invoice Date:', style: 'label', width: 'auto' },
                  { 
                    text: new Date(invoiceInfo.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    }), 
                    style: 'value', 
                    width: 150, 
                    alignment: 'left' 
                  }
                ],
                columnGap: 10
              },
              {
                columns: [
                  { text: 'Payment Due:', style: 'label', width: 'auto' },
                  { 
                    text: new Date(invoiceInfo.dueDate).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    }), 
                    style: 'value', 
                    width: 150, 
                    alignment: 'left' 
                  }
                ],
                columnGap: 10
              }
            ]
          }
        ]
      },
      {
        margin: [0, 40, 0, 0],
        table: {
          headerRows: 1,
          widths: ['*', 60, 80, 100],
          body: [
            [
              { text: 'ITEMS', style: 'tableHeader' },
              { text: 'HOURS', style: 'tableHeader', alignment: 'right' },
              { text: 'RATE', style: 'tableHeader', alignment: 'right', margin: [10, 0] },
              { text: 'AMOUNT', style: 'tableHeader', alignment: 'right' }
            ],
            ...timeEntries.map(entry => [
              {
                stack: [
                  { text: entry.Client, style: 'itemTitle' },
                  { text: entry.Task, style: 'itemDescription' }
                ]
              },
              { text: entry.Hours, style: 'tableCell', alignment: 'right' },
              { 
                text: formatCurrency(invoiceInfo.hourlyRate), 
                style: 'tableCell', 
                alignment: 'right',
                margin: [10, 0]
              },
              { 
                text: formatCurrency(parseFloat(entry.Hours) * invoiceInfo.hourlyRate), 
                style: 'tableCell', 
                alignment: 'right' 
              }
            ]),
            [
              { text: '', colSpan: 2 },
              {},
              { text: 'Total:', style: 'totalLabel', alignment: 'right', margin: [10, 0] },
              { text: formatCurrency(totalAmount), style: 'totalValue', alignment: 'right' }
            ],
            [
              { text: '', colSpan: 2 },
              {},
              { text: 'Amount Due (USD):', style: 'totalLabel', alignment: 'right', margin: [10, 0] },
              { text: formatCurrency(totalAmount), style: 'totalValue', alignment: 'right' }
            ]
          ]
        },
        layout: {
          hLineWidth: function(i: number, node: any) {
            if (i === 1) return 0.5;
            if (i === node.table.body.length - 2) return 0.5;
            return i === node.table.body.length - 1 ? 0 : 0.2;
          },
          vLineWidth: function() {
            return 0;
          },
          hLineColor: function(i: number) {
            if (i === 1) return '#E5E7EB';
            return '#F3F4F6';
          },
          paddingLeft: function(i: number, node: any) {
            if (i === 0) return 0;
            return 8;
          },
          paddingRight: function(i: number, node: any) {
            if (i === node.table.widths.length - 1) return 0;
            return 8;
          },
          paddingTop: function() {
            return 8;
          },
          paddingBottom: function() {
            return 8;
          }
        }
      }
    ],
    styles: {
      invoiceTitle: {
        fontSize: 32,
        bold: true,
        color: 'white',
        margin: [40, 20, 0, 0]
      },
      amountDueLabel: {
        fontSize: 12,
        color: 'white',
        alignment: 'right'
      },
      amountDueValue: {
        fontSize: 24,
        bold: true,
        color: 'white',
        alignment: 'right'
      },
      sectionTitle: {
        fontSize: 12,
        color: '#6B7280',
        margin: [0, 0, 0, 8],
        bold: true,
        letterSpacing: 1
      },
      clientName: {
        fontSize: 16,
        bold: true,
        margin: [0, 0, 0, 4]
      },
      clientDetails: {
        fontSize: 11,
        color: '#374151',
        lineHeight: 1.4
      },
      label: {
        fontSize: 11,
        color: '#6B7280'
      },
      value: {
        fontSize: 11,
        color: '#111827'
      },
      tableHeader: {
        fontSize: 10,
        bold: true,
        color: '#6B7280',
        margin: [0, 0, 0, 8],
        letterSpacing: 1
      },
      itemTitle: {
        fontSize: 11,
        bold: true,
        color: '#111827',
        margin: [0, 0, 0, 2]
      },
      itemDescription: {
        fontSize: 11,
        color: '#6B7280'
      },
      tableCell: {
        fontSize: 11,
        color: '#374151'
      },
      totalLabel: {
        fontSize: 11,
        bold: true,
        color: '#374151'
      },
      totalValue: {
        fontSize: 11,
        bold: true,
        color: '#111827'
      }
    },
    defaultStyle: {
      font: 'Roboto'
    }
  };

  pdfMake.createPdf(docDefinition).open();
}