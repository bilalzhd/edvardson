import axios from 'axios'

const checkoutUrl = 'https://api.playground.klarna.com/checkout/v3/orders'
const config = {
  headers: {
    Authorization: `Basic ${Buffer.from(
      `${process.env.KCO_USERNAME}:${process.env.KCO_PASSWORD}`
    ).toString('base64')}`,
    'Content-Type': 'application/json',
  },
}

const defaultData = {
  purchase_country: 'SE',
  purchase_currency: 'SEK',
  locale: 'en-GB',
  merchant_urls: {
    terms: 'http://localhost:3000/terms',
    checkout: 'http://localhost:3000?order_id={checkout.order.id}',
    confirmation:
      'http://localhost:3000/confirmation?order_id={checkout.order.id}',
    push: 'http://localhost:3000/api/push?order_id={checkout.order.id}',
  },
}

const calculateOrderLinesValues = (orderLines: any) => {
  let amount = 0,
    taxAmount = 0
  const currentOrderLines = orderLines.filter((orderLine: any) => orderLine.quantity)

  currentOrderLines.forEach((orderLine: any) => {
    orderLine['total_amount'] = orderLine.quantity * orderLine.unit_price
    orderLine['total_tax_amount'] =
      orderLine['total_amount'] -
      (orderLine['total_amount'] * 10000) / (10000 + orderLine.tax_rate)
    orderLine['total_discount_amount'] = 0

    amount += orderLine['total_amount']
    taxAmount += orderLine['total_tax_amount']
  })

  return {
    amount,
    taxAmount,
    orderLines: currentOrderLines,
  }
}

const create = async (initialOrderLines: any) => {
  const { amount, taxAmount, orderLines } = calculateOrderLinesValues(
    initialOrderLines
  )

  const data = {
    ...defaultData,
    order_amount: amount,
    order_tax_amount: taxAmount,
    order_lines: orderLines,
  }

  return axios.post(checkoutUrl, data, config)
}

const update = async (orderId: any, initialOrderLines: any) => {
  const { amount, taxAmount, orderLines } = calculateOrderLinesValues(
    initialOrderLines
  )

  const data = {
    ...defaultData,
    order_amount: amount,
    order_tax_amount: taxAmount,
    order_lines: orderLines,
  }

  return axios.post(`${checkoutUrl}/${orderId}`, data, config)
}

export default {
  read: async (orderId: any) => {
    if (!orderId) {
      return undefined
    }

    let response

    try {
      response = await axios.get(`${checkoutUrl}/${orderId}`, config)
    } catch (e) {}

    return response
  },
  updateOrCreate: async (orderId: any, initialOrderLines: any) => {
    let response

    if (orderId) {
      try {
        response = await update(orderId, initialOrderLines)
      } catch (e) {
        response = await create(initialOrderLines)
      }
    } else {
      response = await create(initialOrderLines)
    }

    return response;
  },
}