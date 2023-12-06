const desc = (a, b) => new Date(b.createdAt) - new Date(a.createdAt);

const asc = (a, b) => new Date(a.createdAt) - new Date(b.createdAt);

module.exports = { desc, asc };
