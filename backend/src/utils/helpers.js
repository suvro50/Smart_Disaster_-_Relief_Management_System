export function paginate(query, { page = 1, pageSize = 20 }) {
  const offset = (Number(page) - 1) * Number(pageSize);
  const limit = Number(pageSize);
  return {
    ...query,
    offset,
    limit,
  };
}

export function buildWhere(filters = {}) {
  const where = {};
  for (const [key, value] of Object.entries(filters)) {
    if (value !== undefined && value !== null && value !== "") {
      where[key] = value;
    }
  }
  return where;
}

export function buildSearchWhere(fields = [], searchTerm, Op) {
  if (!searchTerm || !fields.length || !Op) return {};
  const terms = fields.map((field) => ({
    [field]: { [Op.like]: `%${searchTerm}%` },
  }));
  return { [Op.or]: terms };
}

export function formatErrorResponse(err) {
  if (err.name === "SequelizeValidationError") {
    return {
      message: "Validation error",
      errors: err.errors.map((e) => ({ field: e.path, message: e.message })),
    };
  }
  if (err.name === "SequelizeUniqueConstraintError") {
    return {
      message: "Duplicate entry",
      errors: err.errors.map((e) => ({ field: e.path, message: e.message })),
    };
  }
  return { message: err.message || "Internal server error" };
}

export function generateSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg) {
  return deg * (Math.PI / 180);
}

export function getPaginationMeta({ total, page, pageSize }) {
  const totalPages = Math.ceil(total / Number(pageSize));
  return {
    total,
    page: Number(page),
    pageSize: Number(pageSize),
    totalPages,
    hasNext: Number(page) < totalPages,
    hasPrev: Number(page) > 1,
  };
}
