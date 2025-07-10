export const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp * 1000);

  const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
  const day = date.getDate();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  const getOrdinalSuffix = (n: number) => {
    const s = ['TH', 'ST', 'ND', 'RD'];
    const v = n % 100;
    return s[(v - 20) % 10] || s[v] || s[0];
  };

  const dayWithSuffix = `${day}${getOrdinalSuffix(day)}`;

  return `${month} ${dayWithSuffix} ${hours}:${minutes}`;
};


export const getStatusLabel = (statusType: string) => {
  switch (statusType) {
    case 'finished':
      return 'ENDED';
    case 'inprogress':
      return 'LIVE';
    case 'notstarted':
      return 'PRE-MATCH';
    default:
      return statusType.toUpperCase();
  }
};
