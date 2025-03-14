import { CONTACT_INFO } from "./constants"

interface LineItem {
  title: string
  quantity: number
  price: number
}

interface OrderEmailData {
  orderId: string
  customerName: string
  customerEmail: string
  items: LineItem[]
  subtotal: number
  tax: number
  shipping: number
  total: number
  taxesIncluded?: boolean
  taxRate?: number
  currency: string
  shippingAddress: {
    address1: string
    address2?: string
    city: string
    province: string
    zip: string
  }
  billingAddress?: {
    address1: string
    address2?: string
    city: string
    province: string
    zip: string
  }
  paymentMethod?: string
  notes?: string
 
}

export function generateOrderConfirmationEmail(data: OrderEmailData): string {
  const {
    orderId,
    customerName,
    customerEmail,
    items,
    subtotal,
    tax,
    shipping,
    total,
    currency,
    shippingAddress,
    billingAddress,
    paymentMethod,
    notes,
    taxesIncluded,
    taxRate,
  } = data

  // Format addresses
  const formatAddress = (address: typeof shippingAddress) => {
    return `${address.address1}${address.address2 ? `, ${address.address2}` : ""}, ${address.city}, ${address.province} ${address.zip}`
  }

  const shippingAddressFormatted = formatAddress(shippingAddress)
  const billingAddressFormatted = billingAddress ? formatAddress(billingAddress) : "Misma que la dirección de envío"

  // Format currency
  const formatCurrency = (amount: number) => {
    return `${currency}${Number(amount).toFixed(2)}`
  }

  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Confirmación de Pedido - Clefast</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        
        body {
          font-family: 'Poppins', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
          background-color: #f9f9f9;
        }
        
        .email-container {
          max-width: 600px;
          margin: 0 auto;
          background-color: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        }
        
        .email-header {
          background: linear-gradient(135deg, #1e3a8a 0%, #0ea5e9 100%);
          color: white;
          padding: 30px 20px;
          text-align: center;
        }
        
        .email-header h1 {
          margin: 0;
          font-size: 24px;
          font-weight: 600;
        }
        
        .email-header p {
          margin: 10px 0 0;
          font-size: 16px;
          opacity: 0.9;
        }
        
        .email-body {
          padding: 30px 20px;
        }
        
        .section {
          margin-bottom: 30px;
        }
        
        .section-title {
          font-size: 18px;
          font-weight: 600;
          color: #1e3a8a;
          margin-bottom: 15px;
          padding-bottom: 8px;
          border-bottom: 2px solid #e5e7eb;
        }
        
        .order-info {
          background-color: #f0f9ff;
          border-radius: 6px;
          padding: 15px;
          margin-bottom: 25px;
        }
        
        .order-number {
          font-size: 16px;
          font-weight: 600;
          color: #0ea5e9;
          margin: 0;
        }
        
        .order-date {
          font-size: 14px;
          color: #64748b;
          margin: 5px 0 0;
        }
        
        table {
          width: 100%;
          border-collapse: collapse;
        }
        
        th {
          background-color: #f1f5f9;
          text-align: left;
          padding: 12px;
          font-weight: 500;
          color: #1e293b;
          font-size: 14px;
        }
        
        td {
          padding: 12px;
          border-bottom: 1px solid #e5e7eb;
          font-size: 14px;
        }
        
        .item-title {
          font-weight: 500;
          color: #1e293b;
        }
        
        .text-right {
          text-align: right;
        }
        
        .text-center {
          text-align: center;
        }
        
        .totals {
          margin-top: 20px;
        }
        
        .totals-row {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          font-size: 14px;
        }
        
        .totals-row.final {
          font-weight: 600;
          font-size: 16px;
          color: #1e293b;
          border-top: 2px solid #e5e7eb;
          padding-top: 12px;
          margin-top: 8px;
        }
        
        .address-box {
          background-color: #f8fafc;
          border-radius: 6px;
          padding: 15px;
          margin-bottom: 15px;
        }
        
        .address-title {
          font-weight: 600;
          font-size: 15px;
          color: #1e293b;
          margin: 0 0 8px;
        }
        
        .address-content {
          font-size: 14px;
          color: #475569;
          margin: 0;
        }
        
        .payment-method {
          font-size: 14px;
          color: #475569;
          margin: 0;
        }
        
        .payment-method span {
          font-weight: 500;
          color: #1e293b;
        }
        
        .notes {
          background-color: #f0fdf4;
          border-left: 3px solid #22c55e;
          padding: 12px 15px;
          font-size: 14px;
          color: #475569;
          margin-top: 20px;
        }
        
        .notes-title {
          font-weight: 600;
          color: #16a34a;
          margin: 0 0 5px;
        }
        
        .cta-button {
          display: inline-block;
          background-color: #16a34a;
          color: white;
          text-decoration: none;
          padding: 12px 25px;
          border-radius: 6px;
          font-weight: 500;
          margin-top: 15px;
          text-align: center;
        }
        
        .email-footer {
          background-color: #f1f5f9;
          padding: 20px;
          text-align: center;
          font-size: 13px;
          color: #64748b;
        }
        
        .footer-links {
          margin-bottom: 15px;
        }
        
        .footer-links a {
          color: #0ea5e9;
          text-decoration: none;
          margin: 0 10px;
        }
        
        .social-links {
          margin-bottom: 15px;
        }
        
        .social-links a {
          display: inline-block;
          margin: 0 8px;
        }
        
        .company-info {
          margin-top: 15px;
          font-size: 12px;
        }
        
        @media only screen and (max-width: 600px) {
          .email-container {
            width: 100%;
            border-radius: 0;
          }
          
          th, td {
            padding: 8px;
          }
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="email-header">
          <h1>¡Gracias por tu compra!</h1>
          <p>Tu pedido ha sido recibido y está siendo procesado</p>
        </div>
        
        <div class="email-body">
          <div class="order-info">
            <p class="order-number">Pedido #${orderId}</p>
            <p class="order-date">Fecha: ${new Date().toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}</p>
          </div>
          
          <div class="section">
            <h2 class="section-title">Detalles del pedido</h2>
            <table>
              <thead>
                <tr>
                  <th>Producto</th>
                  <th class="text-center">Cantidad</th>
                  <th class="text-right">Precio</th>
                </tr>
              </thead>
              <tbody>
                ${items
                  .map(
                    (item) => `
                  <tr>
                    <td class="item-title">${item.title}</td>
                    <td class="text-center">${item.quantity}</td>
                    <td class="text-right">${formatCurrency(item.price * item.quantity)}</td>
                  </tr>
                `,
                  )
                  .join("")}
              </tbody>
            </table>
            
            <div class="totals">
              <div class="totals-row">
                <span>Subtotal:</span>
                <span>${formatCurrency(subtotal)}</span>
              </div>
              <div class="totals-row">
                <span>IGV (${((Number(taxRate) || 0.18) * 100).toFixed(0)}%)${taxesIncluded ? " (incluido)" : ""}:</span>
                <span>${formatCurrency(tax)}</span>
              </div>
              <div class="totals-row">
                <span>Envío:</span>
                <span>${formatCurrency(shipping)}</span>
              </div>
              <div class="totals-row final">
                <span>Total:</span>
                <span>${formatCurrency(total)}</span>
              </div>
            </div>
          </div>
          
          <div class="section">
            <h2 class="section-title">Información de envío</h2>
            <div class="address-box">
              <p class="address-title">Dirección de envío</p>
              <p class="address-content">${customerName}</p>
              <p class="address-content">${shippingAddressFormatted}</p>
            </div>
            
            <div class="address-box">
              <p class="address-title">Dirección de facturación</p>
              <p class="address-content">${billingAddressFormatted}</p>
            </div>
            
            ${
              paymentMethod
                ? `
              <p class="payment-method">Método de pago: <span>${paymentMethod}</span></p>
            `
                : ""
            }
            
            ${
              notes
                ? `
              <div class="notes">
                <p class="notes-title">Notas del pedido:</p>
                <p>${notes}</p>
              </div>
            `
                : ""
            }
          </div>
          
          <div class="section">
            <h2 class="section-title">Próximos pasos</h2>
            <p>Para completar el proceso de pago, por favor contáctanos por WhatsApp al número indicado a continuación.</p>
            <a href="https://wa.me/${CONTACT_INFO.phone.mobile.replace(/\s+/g, "")}?text=Hola, acabo de realizar el pedido %23${orderId} y quisiera coordinar el pago." class="cta-button">
              Contactar por WhatsApp
            </a>
          </div>
        </div>
        
        <div class="email-footer">
          <div class="footer-links">
            <a href="#">Mi cuenta</a>
            <a href="#">Seguimiento de pedido</a>
            <a href="#">Ayuda</a>
          </div>
          
          <div class="social-links">
            ${CONTACT_INFO.facebook ? `<a href="${CONTACT_INFO.facebook}">Facebook</a>` : ""}
            ${CONTACT_INFO.instagram ? `<a href="${CONTACT_INFO.instagram}">Instagram</a>` : ""}
          </div>
          
          <p>Si tienes alguna pregunta, contáctanos en <a href="mailto:${CONTACT_INFO.email}">${CONTACT_INFO.email}</a> o llámanos al ${CONTACT_INFO.phone.mobile}</p>
          
          <div class="company-info">
            <p>${CONTACT_INFO.address}</p>
            <p>&copy; ${new Date().getFullYear()} Clefast. Todos los derechos reservados.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `
}

