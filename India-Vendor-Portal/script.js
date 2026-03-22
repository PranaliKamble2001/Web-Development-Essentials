/**
 * Vendor Portal Data Engine
 */

const orderData = [
    { id: "BN-4001", state: "Maharashtra", amount: 4200, mode: "UPI", status: "Packed" },
    { id: "BN-4002", state: "Karnataka", amount: 1850, mode: "COD", status: "In-Transit" },
    { id: "BN-4003", state: "Maharashtra", amount: 9400, mode: "UPI", status: "Delivered" },
    { id: "BN-4004", state: "Delhi", amount: 2100, mode: "COD", status: "Packed" },
    { id: "BN-4005", state: "Maharashtra", amount: 3500, mode: "UPI", status: "Delivered" }
];

// Professional Currency Formatter (Indian Locale)
const inrFormatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
});

/**
 * Main Render Function
 */
function renderTable(data) {
    const tableBody = document.getElementById('order-rows');
    
    if (data.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 50px; color: #94a3b8;">No shipments found for this query.</td></tr>`;
        return;
    }

    tableBody.innerHTML = data.map(order => {
        const isDelivered = order.status === 'Delivered';
        const statusColor = isDelivered ? '#138808' : '#ff9933';

        return `
            <tr>
                <td style="font-weight:700; color: #0a192f;">${order.id}</td>
                <td>${order.state}</td>
                <td style="font-weight:800;">${inrFormatter.format(order.amount)}</td>
                <td><span class="badge ${order.mode.toLowerCase()}">${order.mode}</span></td>
                <td>
                    <span style="color: ${statusColor}; font-weight: 700; display: flex; align-items: center;">
                        <span class="status-dot" style="background: ${statusColor}"></span>
                        ${order.status}
                    </span>
                </td>
            </tr>
        `;
    }).join('');
}

/**
 * Live Search Filter
 */
function searchOrders() {
    const term = document.getElementById('vendorSearch').value.toLowerCase();
    const filtered = orderData.filter(order => 
        order.id.toLowerCase().includes(term) || 
        order.state.toLowerCase().includes(term)
    );
    renderTable(filtered);
}

/**
 * State-specific Filter
 */
function filterByState(stateName) {
    const filtered = orderData.filter(order => order.state === stateName);
    renderTable(filtered);
}

/**
 * Reset Dashboard
 */
function resetTable() {
    document.getElementById('vendorSearch').value = "";
    renderTable(orderData);
}

// Initial Load
document.addEventListener('DOMContentLoaded', () => {
    renderTable(orderData);
});
