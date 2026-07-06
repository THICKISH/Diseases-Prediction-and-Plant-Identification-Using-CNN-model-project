const chatHistory = [];
const plantScans = [];

export function saveChat(item) {
  chatHistory.push({ id: crypto.randomUUID(), createdAt: new Date().toISOString(), ...item });
}

export function savePlantScan(item) {
  plantScans.push({ id: crypto.randomUUID(), createdAt: new Date().toISOString(), ...item });
}

export function getStats() {
  return {
    totalChats: chatHistory.length,
    totalPlantScans: plantScans.length
  };
}
