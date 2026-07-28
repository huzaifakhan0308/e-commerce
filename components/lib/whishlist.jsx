const STORAGE_KEY = "wishlist";

export function getWishlist() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function isInWishlist(id) {
  return getWishlist().includes(id);
}

export function toggleWishlist(id) {
  console.log("id", id);
  const current = getWishlist();
  const exists = current.includes(id);

  const updated = exists
    ? current.filter((itemId) => itemId !== id)
    : [...current, id];

  console.log("updated", updated);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event("wishlistChange"));

  return !exists; // returns the new "is in wishlist" state
}
