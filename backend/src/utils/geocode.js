const BANGLADESH_DISTRICTS = {
  dhaka: { lat: 23.8103, lng: 90.4125 },
  chittagong: { lat: 22.3569, lng: 91.7832 },
  sylhet: { lat: 24.8949, lng: 91.8687 },
  rajshahi: { lat: 24.3745, lng: 88.6042 },
  khulna: { lat: 22.8456, lng: 89.5403 },
  barishal: { lat: 22.701, lng: 90.3535 },
  rangpur: { lat: 25.7439, lng: 89.2752 },
  mymensingh: { lat: 24.7471, lng: 90.4203 },
  comilla: { lat: 23.4607, lng: 91.1809 },
  gazipur: { lat: 23.9999, lng: 90.4203 },
  cox_bazar: { lat: 21.4272, lng: 92.0058 },
  rangamati: { lat: 22.6568, lng: 92.3597 },
  sirajganj: { lat: 24.4536, lng: 89.7227 },
  chapainawabganj: { lat: 24.5966, lng: 88.3583 },
};

export function getDistrictCenter(district) {
  if (!district) return { lat: 23.8103, lng: 90.4125 }; // Default: Dhaka
  const key = district.toLowerCase().replace(/\s+/g, "_");
  return BANGLADESH_DISTRICTS[key] || { lat: 23.8103, lng: 90.4125 };
}

export function getAllDistricts() {
  return Object.keys(BANGLADESH_DISTRICTS).map((key) => ({
    name: key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    ...BANGLADESH_DISTRICTS[key],
  }));
}

export function isWithinBangladesh(lat, lng) {
  return lat >= 20.5 && lat <= 26.7 && lng >= 88.0 && lng <= 92.7;
}

export function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg) {
  return deg * (Math.PI / 180);
}
