// List of banks
const bankList = ['RIYAD_SAU', 'BSF_SAU', 'ALINMA_SAU', 'GIB_SAU', 'SNB_SAU', 'BILAD_SAU', 'ANB_SAU', 'BAJ_SAU', 'SIBC_SAU'];

const uuid = 'e36dfb06-b007-4dcb-8b99-b9d10451ace9'

// List of endpoints
const endpointList = {
  accounts: '/accounts',
  balances: `/accounts/${uuid}/balances`,
  beneficiaries: `/accounts/${uuid}/beneficiaries`,
  identity: `/parties`,
  transactions: `/accounts/${uuid}/transactions`,
  standingOrder: `/accounts/${uuid}/standing-orders`,
  scheduledPayments: `/accounts/${uuid}/scheduled-payments`,
  parties: `/accounts/${uuid}/parties`,
  reports: '/reports'
};

module.exports = {
  bankList,
  endpointList
};