const PENDING = Symbol.for('PENDNG')
const FULFULLED = Symbol.for('FULFULLED')
const REJECTED = Symbol.for('REJECTED')

class MyPromise {
  constructor(executor) {
    // TODO: 不是函数抛出错误
    this._status = PENDING
    this._value = undefined
    this._reason = undefined
    this._handleFulFulledCallback = []
    this._handleReJectedCallback = []
    try {
      executor(this._resolve, this._reject)
    } catch (e) {
      this.reject(e)
    }
  }
  _resolve = value => {
    if (value instanceof MyPromise) {
      return value.then(this._resolve, this._reject)
    }
    setTimeout(() => {
      if (this._status === PENDING) {
        this._status = FULFULLED
        this._value = value
        this._handleFulFulledCallback.forEach(fun => fun())
      }
    }, 0)
  }
  _reject = reason => {
    setTimeout(() => {
      if (this._status === PENDING) {
        this._status = REJECTED
        this._reason = reason
        this._handleReJectedCallback.forEach(fun => fun())
      }
    }, 0)
  }
  _resolvePromise = (promise2, x, resolve, reject) => {
    if (promise2 === x) {
      return reject(new TypeError('Chaining cycle detected for promise'))
    }
    let called = false
    if (x instanceof MyPromise) {
      if (x._status === PENDING) {
        x.then(
          y => this._resolvePromise(promise2, y, resolve, reject),
          reason => reject(reason)
        )
      } else {
        x.then(resolve, reject)
      }
    } else if (
      x !== null &&
      (typeof x === 'object' || typeof x === 'function')
    ) {
      try {
        let then = x.then
        if (typeof then === 'function') {
          then.call(
            x,
            y => {
              if (called) return
              called = true
              this._resolvePromise(promise2, y, resolve, reject)
            },
            reason => {
              if (called) return
              called = true
              reject(reason)
            }
          )
        } else {
          resolve(x)
        }
      } catch (error) {
        if (called) return
        called = true
        reject(error)
      }
    } else {
      resolve(x)
    }
  }
  then = (handleFulfulled, handleRejected) => {
    handleFulfulled =
      typeof handleFulfulled === 'function' ? handleFulfulled : value => value
    handleRejected =
      typeof handleRejected === 'function'
        ? handleRejected
        : reason => {
            throw reason
          }
    let promise2
    if (this._status === FULFULLED) {
      return (promise2 = new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            let x = handleFulfulled(this._value)
            this._resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      }))
    }
    if (this._status === REJECTED) {
      return (promise2 = new Promise((resolve, reject) => {
        setTimeout(() => {
          try {
            let x = handleRejected(this._reason)
            this._resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      }))
    }
    if (this._status === PENDING) {
      return (promise2 = new Promise((resolve, reject) => {
        this._handleFulFulledCallback.push(() => {
          try {
            let x = handleFulfulled(this._value)
            this._resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
        this._handleReJectedCallback.push(() => {
          try {
            let x = handleRejected(this._reason)
            this._resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }))
    }
  }
  static resolve(value) {
    return new MyPromise(resolve => {
      resolve(value)
    })
  }
  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason)
    })
  }
  catch = handleRejected => {
    return this.then(null, handleRejected)
  }
  static race(promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach(promise => {
        promise.then(resolve, reject)
      })
    })
  }
  _recordExecutorPromise = (promises, resolve) => {
    let count = 0
    let valueArr = []
    return (i, value) => {
      valueArr[i] = value
      if (++count === promises.length) {
        resolve(valueArr)
      }
    }
  }
  static all = promises => {
    return new MyPromise((resolve, reject) => {
      const exectorFun = this._recordExecutorPromise(promises, resolve)
      promises.forEach((fun, index) => {
        fun.then(data => {
          exectorFun(index, data)
        }, reject)
      })
    })
  }
  static finally = callback => {
    // 兼容不同Promises的库
    const p = this.constructor
    return this.then(value =>
      p.resolve(callback()).then(
        () => {
          return value
        },
        reason =>
          p.resolve(callback()).then(() => {
            return reason
          })
      )
    )
  }
  // 新增allSettled
  static allSettled = promises => {
    return new MyPromise((resolve, reject) => {
      const exectorFun = this._recordExecutorPromise(promises, resolve)
      promises.forEach((promise, index) => {
        promise.then(
          value => {
            exectorFun(index, value)
          },
          reason => {
            exectorFun(index, reason)
          }
        )
      })
    })
  }
}
// 执行单元测试所需要的设置 promises-aplues-tests
MyPromise.deferred = function() {
  // 延迟对象
  let defer = {}
  defer.promise = new MyPromise((resolve, reject) => {
    defer.resolve = resolve
    defer.reject = reject
  })
  return defer
}
module.exports = MyPromise
