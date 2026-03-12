function toggleDevice(card) {
    // 1. Toggle the 'active' class for visual changes
    card.classList.toggle('active');

    // 2. Update the status text
    const statusText = card.querySelector('.status');
    const isActive = card.classList.contains('active');
    
    statusText.textContent = isActive ? "On" : "Off";

  
    if (isActive) {
        console.log(`${card.querySelector('h3').textContent} activated.`);
    }
}
