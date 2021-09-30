interface ICakeFactory {
	bake(): string
}

class VanillaCakeFactory implements ICakeFactory {
	bake(): string {
		return "vanilla cake"
	}
}

class VanillaCakeFactoryWrapper implements ICakeFactory {
	protected factory: ICakeFactory

	constructor(factory: ICakeFactory) {
		this.factory = factory
	}
	bake(): string {
		return this.factory.bake()
	}
}

class ChocolateCakeFactory extends VanillaCakeFactoryWrapper {
	bake(): string {
		return `Chocolate(${this.factory.bake()})`
	}
}

class CreamCakeFactory extends VanillaCakeFactoryWrapper {
	bake(): string {
		return `Cream(${this.factory.bake()})`
	}
}

const factory = new CreamCakeFactory(new ChocolateCakeFactory(new VanillaCakeFactory()))
console.log(factory.bake())