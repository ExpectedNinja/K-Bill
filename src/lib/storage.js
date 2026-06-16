export const STORAGE_KEY = 'kbill_customers_data';

export function getCustomers() {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error("Failed to read customers from localStorage", err);
    return [];
  }
}

export function saveCustomers(customers) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
  } catch (err) {
    console.error("Failed to save customers to localStorage", err);
  }
}

export function addCustomer(customer) {
  const customers = getCustomers();
  // Generate a random ID if not exists
  const newCustomer = { 
    ...customer, 
    id: customer.id || Date.now().toString() 
  };
  customers.push(newCustomer);
  saveCustomers(customers);
  return newCustomer;
}

export function importCustomers(newCustomers) {
  const existing = getCustomers();
  // Assign IDs to new customers
  const formattedNew = newCustomers.map(c => ({
    ...c,
    id: c.id || Math.random().toString(36).substring(2, 9)
  }));
  
  const combined = [...existing, ...formattedNew];
  saveCustomers(combined);
}

export function getCustomerById(id) {
  const customers = getCustomers();
  return customers.find(c => String(c.id) === String(id));
}

export function clearCustomers() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
}
