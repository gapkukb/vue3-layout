function autoBindMethod<This, Args extends any[], R, F extends (this: This, ...args: Args) => R>(target: F, context: ClassMethodDecoratorContext<This, F>) {
  context.addInitializer(function _autobind(this: any) {
    const name = context.name.toString()
    this[name] = this[name].bind(this)
  })

  return target
}

function autoBindClass<T extends { new (...args: any[]): {} }>(constructor: T, context: ClassDecoratorContext<T>) {
  return class extends constructor {
    constructor(...args: any[]) {
      super(...args)
      for (const key of Object.getOwnPropertyNames(constructor.prototype)) {
        const descriptor = Object.getOwnPropertyDescriptor(constructor.prototype, key)

        if (descriptor && typeof descriptor.value === 'function' && key !== 'constructor') {
          Object.defineProperty(this, key, {
            ...descriptor,
            value: descriptor.value.bind(this),
          })
        }
      }
    }
  }
}

export default function autobind(target: any, context: ClassMethodDecoratorContext | ClassDecoratorContext) {
  if (context.kind === 'method') {
    return autoBindMethod(target, context as ClassMethodDecoratorContext)
  } else {
    return autoBindClass(target, context as ClassDecoratorContext)
  }
}
