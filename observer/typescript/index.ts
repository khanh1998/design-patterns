interface Observer {
	update(event: string): boolean
}

interface Subject {
	subcribe(observer: Observer, event: string): boolean
	unsubcribe(observer: Observer, event: string): boolean
	notify(event: string): boolean
}

class Youtube implements Subject {
	protected channels: Array<String> = []
	protected chanToSub: Map<String, Array<Observer>> = new Map()

	constructor(channels: Array<String>) {
		this.channels = channels
		for (let chan of channels) {
			this.chanToSub.set(chan, [])
		}
	}

	notify(channel: string): boolean {
		const subs = this.chanToSub.get(channel)
		if (subs) {
			for (const sub of subs) {
				sub?.update(channel)
			}
		}
		return true
	}

	subcribe(user: Observer, channel: string): boolean {
		const index = this.channels.findIndex((chan) => chan === channel)
		if (index < 0) {
			return false
		}
		const subs = this.chanToSub.get(channel)
		subs?.push(user)
		return true
	}
	unsubcribe(user: Observer, channel: string): boolean {
		const indexChannel = this.channels.findIndex((chan) => chan === channel)
		if (indexChannel < 0) {
			return false
		}
		const subs = this.chanToSub.get(channel)
		const indexUser = subs?.findIndex((sub) => sub === user)
		if (indexUser && indexUser > -1) {
			subs?.splice(indexUser, 1)
		}
		return true
	}
}

class User implements Observer {
	protected name: string

	constructor(name: string) {
		this.name = name
	}

	update(event: string): boolean {
		console.log(`${this.name} gonna watch new videos on ${event}`)
		return true
	}
}
const channels = ['discovery', 'national geographic', 'hbo', 'cartoon network']
const youtube = new Youtube(channels)

const movieHolic = new User('kevin')
const cartoonHolic = new User('ben')

youtube.subcribe(movieHolic, channels[2])
youtube.subcribe(cartoonHolic, channels[3])

youtube.notify(channels[2])
youtube.notify(channels[3])