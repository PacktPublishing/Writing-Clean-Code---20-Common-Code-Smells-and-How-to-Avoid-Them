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
  deductInvoiceAmount(invoice: Invoice): void;
}

interface Invoice {
  applyDelayPenalty(): void;
  getStatus(): InvoiceStatus;
  getCustomer(): Customer;
  setStatus(newStatus: InvoiceStatus): void;
}

interface IInvoiceService {
  payInvoiceFor(orderId: string): void;
}

interface IInvoiceRepository {
  getByOrderId(orderId: string): Invoice;
  updateInvoice(invoice: Invoice): void;
}

class InvoiceService implements IInvoiceService {
  private _invoiceRepository: IInvoiceRepository;

  constructor(invoiceRepository: IInvoiceRepository) {
    this._invoiceRepository = invoiceRepository;
  }

  private isInvoicePayable(invoice: Invoice): boolean {
    return (
      [InvoiceStatus.OPEN, InvoiceStatus.DELAYED].includes(invoice.getStatus()) &&
      invoice.getCustomer().getStatus() === CustomerStatus.ACTIVE
    );
  }

  payInvoiceFor(orderId: string) {
    const invoice = this._invoiceRepository.getByOrderId(orderId);

    if (this.isInvoicePayable(invoice)) {
      if (invoice.getStatus() === InvoiceStatus.DELAYED) {
        invoice.applyDelayPenalty();
      }

      if (!invoice.getCustomer().hasFundsFor(invoice)) {
        throw new Error("Not enough funds to pay invoice.");
      }

      invoice.getCustomer().deductInvoiceAmount(invoice);
      invoice.setStatus(InvoiceStatus.PAID);

      this._invoiceRepository.updateInvoice(invoice);
    } else {
      throw new Error("Invoice is not payable.");
    }
  }
}

export {};
