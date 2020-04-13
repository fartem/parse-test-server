const cache = module.exports = {
  lruCache: null,
  set: (lruCache) => {
    cache.lruCache = lruCache
  },
  clear: () => {
    cache.lruCache.reset()
  }
}
