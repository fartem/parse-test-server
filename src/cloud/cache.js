const cache = module.exports = {
  lruCache: null,
  set: function(lruCache) {
    cache.lruCache = lruCache
  },
  clear: function() {
    cache.lruCache.reset()
  }
}
