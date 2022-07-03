enum InvoiceStatus {
  OPEN,
  PAID,
  DELAYED,
}

enum CustomerStatus {
  ACTIVE,
  INACTIVE,
}

interface Customer {
  getStatus(): CustomerStatus;
  hasFundsFor(invoice: Invoice): boolean;
  deductInvoiceFunds(invoice: Invoice): void;
}

interface Invoice {
  applyDelayPenalty(): void;
  getStatus(): InvoiceStatus;
  getCustomer(): Customer;
  setStatus(newStatus: InvoiceStatus): void;
}

interface InvoiceService {
  getByOrderId(orderId: string): Invoice;
  updateInvoice(invoice: Invoice): void;
}

class OrderService {
  private _invoiceService: InvoiceService;

  constructor(invoiceService: InvoiceService) {
    this._invoiceService = invoiceService;
  }

  payInvoiceFor(orderId: string) {
    const invoice = this._invoiceService.getByOrderId(orderId);

    if (
      [InvoiceStatus.OPEN, InvoiceStatus.DELAYED].includes(invoice.getStatus()) &&
      invoice.getCustomer().getStatus() === CustomerStatus.ACTIVE
    ) {
      if (invoice.getStatus() === InvoiceStatus.DELAYED) {
        invoice.applyDelayPenalty();
      }

      if (!invoice.getCustomer().hasFundsFor(invoice)) {
        throw new Error("Not enough funds to pay invoice.");
      }

      invoice.getCustomer().deductInvoiceFunds(invoice);
      invoice.setStatus(InvoiceStatus.PAID);

      this._invoiceService.updateInvoice(invoice);
    } else {
      throw new Error("Invoice is not payable.");
    }
  }
}

export {};
