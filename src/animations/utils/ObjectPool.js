const ObjectPool = ({ factory }) => {
  const pool = []

  const recycle = obj => {
    pool.push(obj)
  }

  const get = () => (pool.length ? pool.pop() : factory())

  return { get, recycle }
}

export default ObjectPool
